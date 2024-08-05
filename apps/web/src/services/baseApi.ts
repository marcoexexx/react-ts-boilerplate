import getConfig from "@/utils/getConfig";
import { AppError, AppErrorKind } from "@error";
import axios from "axios";

const BASE_URL = getConfig("backendEndpoint");

export const baseApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

baseApi.defaults.headers.common["Content-Type"] = "application/json";

baseApi.interceptors.response.use(
  async response => response,
  async error => {
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

    if (type === "NO_AUTH" && !orgReq._retry) {
      orgReq._retry = true;
      // generate refreshAccessToken
      // document.location.href = "/auth/signin"  // For development.;
      return baseApi(orgReq);
    }

    return Promise.reject(error);
  },
);
