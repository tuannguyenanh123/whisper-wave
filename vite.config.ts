import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  base: "./",
  resolve: {
    alias: {
      Components: path.resolve(__dirname, "./src/components"),
      Assets: path.resolve(__dirname, "./src/assets"),
    },
  },
  server: {
    watch: {
      usePolling: true,
    },
    cors: true,
    open: true
  },
});
