import { ErrorBoundaryRouter } from "@/components/core";
import { BaseLayout, OtherLayout } from "@/layouts";
import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import PageLoader from "./pageLoader";

const HomePage = PageLoader(lazy(() => import("@/pages/home/index")));

const routes = createBrowserRouter([
  /**
   * Other Layout
   */
  {
    path: "",
    Component: OtherLayout,
    children: [
      {
        path: "",
        Component: HomePage,
      },
      {
        path: "home",
        element: <Navigate to="/" />,
      },
    ],
  },

  /**
   * Base Layout
   */
  {
    path: "",
    ErrorBoundary: ErrorBoundaryRouter,
    Component: BaseLayout,
    children: [
      /**
       * Authentication routes
       */
      {
        path: "auth",
        children: [
          {
            path: "signin",
            Component: () => <h1>Signin</h1>,
          },
        ],
      },

      /**
       * Status routes
       */
      {
        path: "status",
        children: [
          {
            path: "404",
            Component: () => <h1>404</h1>,
          },
        ],
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
]);

export default routes;
