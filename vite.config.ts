import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-oxc";
import tailwind from "@tailwindcss/vite";

export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwind()],
}));
