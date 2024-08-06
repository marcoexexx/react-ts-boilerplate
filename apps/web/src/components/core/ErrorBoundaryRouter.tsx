import { AppErrorKind } from "@/error";
import { Navigate, useLocation, useRouteError } from "react-router-dom";

export function ErrorBoundaryRouter() {
  const error = useRouteError() as Error | undefined;
  const location = useLocation();

  if ((error as any).kind === AppErrorKind.UserNotLoggedIn) {
    return <Navigate to="/auth/sign-in" state={{ from: location }} />;
  }

  return (
    <h1>
      UncaughtRouterErrorPage: <pre>{JSON.stringify(error)}</pre>
    </h1>
  );
}
