import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    allowedHosts: ["https://wholesome-forgiveness-production.up.railway.app"], // ✅ no https:// or trailing slash
    port: 5173,
  },
});
