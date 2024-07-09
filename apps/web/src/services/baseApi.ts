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

    const message = res.data.message as string;

    if (
      (message.includes("not logged in")
        || message.includes("session has expired")) && !orgReq._retry
    ) {
      orgReq._retry = true;
      orgReq._retry = true;
      // generate refreshAccessToken
      return baseApi(orgReq);
    }

    if (message.includes("not refresh")) {
      document.location.href = "/auth/login";
    }

    if (message.includes("under maintenance")) {
      return Promise.reject(
        AppError.new(AppErrorKind.MaintenanceError, message),
      );
    }

    if (message.includes("You are blocked")) {
      return Promise.reject(
        AppError.new(AppErrorKind.BlockedError, message),
      );
    }

    return Promise.reject(error);
  },
);
