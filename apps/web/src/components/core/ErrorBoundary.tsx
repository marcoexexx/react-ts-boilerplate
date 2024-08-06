import UserNotLoggedInErrorPage from "@/pages/status/error/UserNotLoggedInErrorPage";
import { AppError, AppErrorKind } from "@error";
import { Component, ErrorInfo, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  error?: Error | AppError;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      error: undefined,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ error });
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render(): ReactNode {
    if (!!this.state.error) {
      if (this.state.error instanceof AppError) {
        const err = this.state.error;
        switch (err.kind) {
          case AppErrorKind.UserNotLoggedIn:
            console.log("->> go to not logged page.");
            // return <UserNotLoggedInErrorPage />;
            return <h1>ApiError -^^</h1>;

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
            const _unreachable: never = err.kind;
            console.error({ _unreachable });

            // TODO: render ErrorPage
            return <h1>UncaughtErrorPage other kinds</h1>;
          }
        }
      } else return <h1>UncaughtErrorPage global</h1>;
    } else return this.props.children;
  }
}
