import getConfig from "@/utils/getConfig";
import { AppError, AppErrorKind } from "@error";
import axios, { AxiosResponse } from "axios";
import { AuthService } from "./auth.service";

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

  const message = res.data.message as string;

  if (message.includes("jwt expired") && !orgReq._retry) {
    orgReq._retry = true;

    await AuthService.refreshAccessToken();
    return baseApi(orgReq);
  }

  if (
    message.includes("Refresh token not found")
    || message.includes("Missing authorization token")
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
