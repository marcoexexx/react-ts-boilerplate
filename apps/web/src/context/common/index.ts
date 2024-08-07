import { LOCAL_STORE_THEME_KEY } from "@/themes";
import { getLocalStore, setLocalStore } from "@/utils";
import { AppError, AppErrorKind } from "@error";

export const UserType = {
  User: "User",
  Superuser: "Superuser",
} as const;
export type UserType = typeof UserType[keyof typeof UserType];

export const initialCommonStore: CommonContextStore = {
  auth: undefined,
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
  store: CommonContextStore,
  action: CommonContextAction,
): CommonContextStore {
  switch (action.type) {
    case "@@COMMON/SIGN_USER": {
      return {
        ...store,
        auth: action.payload,
      };
    }

    case "@@COMMON/TOGGLE_THEME": {
      const theme = store.theme === "light" ? "dark" : "light";
      setLocalStore(LOCAL_STORE_THEME_KEY, theme);
      return { ...store, theme };
    }

    case "@@COMMON/OPEN_TOAST": {
      return {
        ...store,
        toast: { ...store.toast, status: true, ...action.payload },
      };
    }

    case "@@COMMON/CLOSE_TOAST": {
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
