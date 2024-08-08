import FailedLoginPage from "@/pages/status/error/FailedLoginPage";
import { AppError, AppErrorKind } from "@error";

interface ErrorHandlerProps {
  error: Error | AppError;
}

export function ErrorHandler(props: ErrorHandlerProps) {
  const { error } = props;

  if (error instanceof AppError) {
  } else return <h1>UncaughtErrorPage global</h1>;

  switch (error.kind) {
    case AppErrorKind.UserNotLoggedIn: // TODO: handle for only redirect relogin page.
    case AppErrorKind.FailedLogin: // TODO: handle for forget password or somethinng.
      return <FailedLoginPage />;

    case AppErrorKind.ApiError:
      return <h1>ApiError</h1>;

    case AppErrorKind.ContextError:
      return <h1>ContextError</h1>;

    case AppErrorKind.NetworkError:
      return <h1>NetworkError</h1>;

    case AppErrorKind.MaintenanceError:
      return <h1>MaintenanceError</h1>;

    case AppErrorKind.BlockedError:
      return <h1>BlockedError</h1>;

    case AppErrorKind.ServiceError:
      return <h1>ServiceError</h1>;

    case AppErrorKind.AccessDeniedError:
      return <h1>AccessDeniedError Page</h1>;

    case AppErrorKind.NotImplemented:
      return <h1>NotImplemented Page</h1>;

    // UnknownError
    case AppErrorKind.UnknownError:
      return <h1>UnknownError</h1>;

    default: {
      const _unreachable: never = error.kind;
      console.error({ _unreachable });

      // TODO: render ErrorPage
      return <h1>UncaughtErrorPage other kinds</h1>;
    }
  }
}
