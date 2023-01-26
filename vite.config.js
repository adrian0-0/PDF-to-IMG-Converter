import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 8080,
    watch: {
      usePolling: true
    },
    
    proxy: {
      "/api": "http://localhost:5000/",
    },
  },
  plugins: [react()],
});

