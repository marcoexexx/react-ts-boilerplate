import { SignInUserInput } from "@/components/auth";
import getConfig from "@/utils/getConfig";
import { AppError, AppErrorKind } from "@error";
import axios, { AxiosResponse } from "axios";

const BASE_URL = getConfig("backendEndpoint");

export const baseApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

baseApi.defaults.headers.common["Content-Type"] = "application/json";

async function handleResponseOnFulfilled(response: AxiosResponse<any, any>) {
  return response;
}

async function handleResponseOnRejected(error: any) {
  const res = error.response;
  const orgReq = error.config;

  if (!res) {
    return Promise.reject(
      AppError.new(
        AppErrorKind.NetworkError,
        `Please make sure you are connected to the internet and then try again.`,
      ),
    );
  }

  const type = res.data.type as string;
  const message = res.data.message as string;

  if (type === "NO_AUTH" && message.includes("expired") && !orgReq._retry) {
    orgReq._retry = true;
    await refreshAccessTokenFn();
    return baseApi(orgReq);
  }

  if (
    message.includes("Refresh token not found") || message.includes("Missing authorization token")
  ) {
    return Promise.reject(
      AppError.new(
        AppErrorKind.UserNotLoggedIn,
        `User not logged in. Please log in to access this resource.`,
      ),
    );
  }

  return Promise.reject(error);
}

baseApi.interceptors.response.use(handleResponseOnFulfilled, handleResponseOnRejected);

type AccessTokenResponse = { accessToken: string };

export async function refreshAccessTokenFn() {
  const res = await baseApi.get<AccessTokenResponse>("auth/refresh-token");
  return res.data;
}

export async function userLoginFn(user: SignInUserInput) {
  const res = await baseApi.post<AccessTokenResponse>("auth/login", user);
  return res.data;
}
