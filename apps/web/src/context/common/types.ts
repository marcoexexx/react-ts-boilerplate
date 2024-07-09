interface Toast {
  status: boolean;
  message?: string;
  anchorOrigin?: import("@mui/material").SnackbarOrigin;
  severity:
    | "success"
    | "error"
    | "warning"
    | "info";
}

interface CommonStore {
  theme: import("@/themes").AppTheme;
  toast: Toast;
}

interface ThemeAction {
  type: ActionType<"@@COMMON", "TOGGLE_THEME">;
}

interface ToastCloseAction {
  type: ActionType<"@@COMMON", "CLOSE_TOAST">;
}

interface ToastOpenAction {
  type: ActionType<"@@COMMON", "OPEN_TOAST">;
  payload: Omit<Toast, "status">;
}

type CommonAction =
  | ThemeAction
  | ToastCloseAction
  | ToastOpenAction;
