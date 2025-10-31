import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/", // ensures correct routing
  build: {
    outDir: "dist", // Vercel looks here for build output
  },
  server: {
    port: 5173, // optional: for local dev consistency
  },
});
