import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // @ts-ignore  for testing
  test: {
    environment: "happy-dom",
    global: true,
    setupFiles: "./test-setup.js"
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@result": path.resolve(__dirname, "./src/utils/result/"),
    },
  },
  // server: {
  //   https: {
  //     key: "./key.pem",
  //     cert: "./cert.pem",
  //   },
  // },
});
