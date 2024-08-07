import { AppError } from "@error";
import { Component, ErrorInfo, ReactNode } from "react";
import { ErrorHandler } from "./ErrorHandler";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  error?: Error | AppError;
}

/**
 * Component level error boundary.
 */
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
    if (!!this.state.error) return <ErrorHandler error={this.state.error} />;
    else return this.props.children;
  }
}
