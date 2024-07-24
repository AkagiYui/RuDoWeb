import react from "@vitejs/plugin-react-swc"
import { fileURLToPath, URL } from "node:url"
import { defineConfig } from "vite"

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 5174,
  },
  preview: {
    host: "0.0.0.0",
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
})
