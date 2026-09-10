import vinext from "vinext";
import { defineConfig } from "vite";
import { sites } from "./build/sites-vite-plugin";

// This is a static frontend: no Worker, database, or authentication runtime.
// The production script uses Next.js static export for Windows compatibility.
export default defineConfig({
  plugins: [vinext(), sites({ mockAuth: false })],
});
