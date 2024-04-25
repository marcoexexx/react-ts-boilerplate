export const AppErrorKind = {
  ApiError: "ApiError",
  NetworkError: "NetworkError",
  ContextError: "ContextError",
  UnknownError: "UnknownError",
  MaintenanceError: "MaintenanceError",
  BlockedError: "BlockedError",
  ServiceError: "ServiceError",
} as const;
export type AppErrorKind = typeof AppErrorKind[keyof typeof AppErrorKind];

export default class AppError extends Error implements ToString {
  constructor(public kind: AppErrorKind, message: string) {
    super(`${message}: ${kind}`);
  }

  static new(kind: AppErrorKind, message: string) {
    return new AppError(kind, message);
  }

  toString() {
    return `${this.kind}: "${this.message}"`;
  }
}
