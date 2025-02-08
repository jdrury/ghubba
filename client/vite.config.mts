import path from "path";
import { defineConfig } from "vite";
import relay from "vite-plugin-relay";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

// https://vite.dev/config/
export default defineConfig({
  build: {
    outDir: "../server/",
  },
  envDir: path.resolve(__dirname, "./config"),
  plugins: [
    react(),
    relay,
    tailwindcss(),
    TanStackRouterVite({ autoCodeSplitting: true }),
  ],
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx"], // lets Vite know which extensions to try when resolving imports
    alias: {
      "@": path.resolve(__dirname, "./src"),
      __generated__: path.resolve(__dirname, "./__generated__"),
    },
  },
  server: {
    proxy: {
      "/api": "http://localhost:8000",
    },
  },
});
