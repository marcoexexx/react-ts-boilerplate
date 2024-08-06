interface ImportMetaEnv {
  MODE:
    | "development"
    | "test"
    | "production";

  VITE_BACKEND_ENDPOINT: string;
}

interface ToString {
  toString: () => string;
}
