import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-oxc";
import tailwind from "@tailwindcss/vite";
import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwind(), cloudflare()],
}));
