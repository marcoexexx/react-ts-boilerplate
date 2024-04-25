import { LOCAL_STORE_THEME_KEY } from "@/themes";
import { getLocalStore, setLocalStore } from "@/utils";
import AppError, { AppErrorKind } from "@/utils/exception";
import { createAction } from "..";

export const commonAction = (action: CommonAction) =>
  createAction("common", action);

export const initialCommonStore: CommonStore = {
  theme: getLocalStore(LOCAL_STORE_THEME_KEY) || "light",
  toast: {
    status: false,
    anchorOrigin: {
      vertical: "top",
      horizontal: "left",
    },
    severity: "info",
  },
};

export function commonReducer(
  store: CommonStore,
  action: CommonAction,
): CommonStore {
  switch (action.type) {
    case "TOGGLE_THEME": {
      const theme = store.theme === "light" ? "dark" : "light";
      setLocalStore(LOCAL_STORE_THEME_KEY, theme);
      return { ...store, theme };
    }
    case "OPEN_TOAST": {
      return {
        ...store,
        toast: { ...store.toast, status: true, ...action.payload },
      };
    }
    case "CLOSE_TOAST": {
      return { ...store, toast: { ...store.toast, status: false } };
    }

    default: {
      const _unreachable: never = action;
      const message = "Unreachable action type";
      console.warn({ message, _unreachable });
      throw AppError.new(AppErrorKind.ContextError, message);
    }
  }
}
