interface ImportMetaEnv {
  MODE:
    | "development"
    | "test"
    | "production";

  BACKEND_ENDPOINT: string;
}

interface ToString {
  toString: () => string;
}
