import { ErrorBoundaryRouter } from "@/components/core";
import { BaseLayout } from "@/layouts";
import { createBrowserRouter } from "react-router-dom";

const routes = createBrowserRouter([
  {
    path: "",
    ErrorBoundary: ErrorBoundaryRouter,
    children: [
      /**
       * Base Layout
       */
      {
        path: "",
        Component: BaseLayout,
        children: [
          /**
           * Authentication routes
           */
          {
            path: "auth",
            children: [],
          },

          /**
           * Status routes
           */
          {
            path: "status",
            children: [],
          },

          /**
           * Other routes
           */
          {
            path: "verify-email/:verifyEmailCode",
            Component: () => <h1>verify email</h1>,
          },
        ],
      },
    ],
  },
]);

export default routes;
