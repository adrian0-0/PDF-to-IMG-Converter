import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
    port: 8080,
    
    proxy: {
      "/api": "http://localhost:5000/",
    },
  },
  plugins: [react()],
});
