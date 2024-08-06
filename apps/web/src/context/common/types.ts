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

/**
 * Context type declaration
 */
interface CommonContextStore {
  theme: import("@/themes").AppTheme;
  toast: Toast;
}

/**
 * Context action variants type declaration
 */
interface ThemeContextAction {
  type: ContextActionType<"@@COMMON", "TOGGLE_THEME">;
}

interface ToastCloseContextAction {
  type: ContextActionType<"@@COMMON", "CLOSE_TOAST">;
}

interface ToastOpenContextAction {
  type: ContextActionType<"@@COMMON", "OPEN_TOAST">;
  payload: Omit<Toast, "status">;
}

/**
 * Main context action
 */
type CommonContextAction =
  | ThemeContextAction
  | ToastCloseContextAction
  | ToastOpenContextAction;
