import { useRouteError } from "react-router-dom";

export function ErrorBoundaryRouter() {
  const error = useRouteError() as Error | undefined;

  // TODO: render UncaughtErrorPage
  return <h1>UncaughtErrorPage: router :: {error?.message}</h1>;
}
