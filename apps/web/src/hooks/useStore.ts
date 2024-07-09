import { StoreContext } from "@/context";
import { AppError, AppErrorKind } from "@error";
import { useContext } from "react";

export function useStore() {
  const ctx = useContext(StoreContext);

  if (!ctx) {
    throw AppError.new(AppErrorKind.ContextError, `useStore must provide`);
  }

  return ctx;
}
