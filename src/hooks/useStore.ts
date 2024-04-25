import { StoreContext } from "@/context";
import AppError, { AppErrorKind } from "@/utils/exception";
import { useContext } from "react";

export function useStore() {
  const ctx = useContext(StoreContext);

  if (!ctx) {
    throw AppError.new(AppErrorKind.ContextError, `useStore must provide`);
  }

  return ctx;
}
