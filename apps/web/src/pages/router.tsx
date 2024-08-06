import { ErrorBoundaryRouter } from "@/components/core";
import { BaseLayout, OtherLayout } from "@/layouts";
import { ResourceKey } from "@/services";
import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import PageLoader from "./pageLoader";

const HomePage = PageLoader(lazy(() => import("@/pages/home/index")));

/// TASKS PAGES
const TaskListPage = PageLoader(lazy(() => import("@/pages/tasks/ListTasks")));

const routes = createBrowserRouter([
  /**
   * Other Layout
   */
  {
    path: "",
    Component: OtherLayout,
    ErrorBoundary: ErrorBoundaryRouter,
    children: [
      {
        path: "",
        Component: HomePage,
      },
      {
        path: "home",
        element: <Navigate to="/" />,
      },

      /// TASKS ROUTES
      {
        path: ResourceKey.Task,
        children: [
          {
            path: "",
            Component: TaskListPage,
          },
          {
            path: "list",
            element: <Navigate to={`/${ResourceKey.Task}`} />,
          },
        ],
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
        path: "verify/email", // verify/email/?v=<token>
        Component: () => <h1>verify email</h1>,
      },
    ],
  },
]);

export default routes;
