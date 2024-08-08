import { ErrorBoundaryRouter } from "@/components/core";
import { AuthLoader } from "@/components/core/authLoader";
import { BaseLayout, OtherLayout } from "@/layouts";
import { ResourceKey } from "@/services";
import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import PageLoader from "./pageLoader";

const HomePage = PageLoader(lazy(() => import("@/pages/home/index")));

/// AUTH PAGES
const SignInPage = PageLoader(lazy(() => import("@/pages/auth/SignIn")));

/// TASKS PAGES
const TaskListPage = PageLoader(lazy(() => import("@/pages/tasks/ListTasks")));

/// ERROR PAGES

const routes = createBrowserRouter([
  /**
   * Other Layout
   */
  {
    id: "root",
    path: "",
    Component: OtherLayout,
    ErrorBoundary: ErrorBoundaryRouter,
    loader: AuthLoader,
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
            path: "sign-in",
            Component: SignInPage,
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

      {
        path: "*",
        Component: () => <h1>Global 404</h1>,
      },
    ],
  },
]);

export default routes;
