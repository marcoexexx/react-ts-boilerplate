import { useRouteError } from "react-router-dom";
import { EnhancedText } from "../common";
import { ErrorHandler } from "./ErrorHandler";

/**
 * Router page level error boundary.
 */
export function ErrorBoundaryRouter() {
  const error = useRouteError() as Error | undefined;

  if (error) return <ErrorHandler error={error} />; // All of possible errors handle

  return <EnhancedText>Unknown internal error</EnhancedText>; // Display unknown error, but This will never reach.
}
