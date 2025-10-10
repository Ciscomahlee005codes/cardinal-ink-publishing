import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    allowedHosts: ["earnest-imagination-production-eed6.up.railway.app"],
    port: 5173,
  },
});
