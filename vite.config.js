import { defineConfig, transformWithEsbuild } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const src = path.join(root, "src");

export default defineConfig({
  plugins: [
    {
      name: "js-as-jsx",
      async transform(code, id) {
        if (!id.includes("/src/") && !id.includes("\\src\\")) return null;
        if (!id.endsWith(".js")) return null;
        if (id.includes("node_modules")) return null;
        return transformWithEsbuild(code, id, {
          loader: "jsx",
          jsx: "automatic",
        });
      },
    },
    react(),
  ],
  resolve: {
    alias: {
      "@": src,
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        ".js": "jsx",
      },
    },
  },
  server: {
    port: 5173,
    host: "127.0.0.1",
  },
  preview: {
    port: 5173,
    host: "127.0.0.1",
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
