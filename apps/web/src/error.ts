import * as result from "result";

export type Result<T> = result.Result<T, AppError>;

export const AppErrorKind = {
  ApiError: "ApiError",
  NetworkError: "NetworkError",
  ContextError: "ContextError",
  MaintenanceError: "MaintenanceError",
  BlockedError: "BlockedError",
  ServiceError: "ServiceError",
  AccessDeniedError: "AccessDeniedError",
  NotImplemented: "NotImplemented",
  UserNotLoggedIn: "UserNotLoggedIn",

  UnknownError: "UnknownError",
} as const;
export type AppErrorKind = typeof AppErrorKind[keyof typeof AppErrorKind];

export class AppError extends Error implements ToString {
  constructor(public kind: AppErrorKind, message: string) {
    super(`${message}`);
  }

  static new(kind: AppErrorKind, message: string) {
    return new AppError(kind, message);
  }

  toString() {
    return `${this.kind}: ${this.message}`;
  }
}

export const todo = (msg?: string) =>
  AppError.new(
    AppErrorKind.NotImplemented,
    `This feature is not NotImplemented${msg ? `: ${msg}` : "."}`,
  );
