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

interface User {
  id: string;

  username: string;
  email: string;
  password: string;
  type: import("@/context/common").UserType;
  emailVerificationToken: string | null;
  emailVerified: boolean;
  optAuthUrl: string | null;
  optEnabled: boolean;
  optToken: string | null;
  optVerified: boolean | null;

  role?: Role;
  roleId?: string;

  createdAt: string;
  updatedAt: string;
}

/**
 * Context type declaration
 */
interface CommonContextStore {
  auth: User | undefined;
  theme: import("@/themes").AppTheme;
  toast: Toast;
}

/**
 * Context action variants type declaration
 */
interface SignUserContextAction {
  type: ContextActionType<"@@COMMON", "SIGN_USER">;
  payload: User;
}

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
  | SignUserContextAction
  | ThemeContextAction
  | ToastCloseContextAction
  | ToastOpenContextAction;
