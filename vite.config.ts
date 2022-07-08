import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/multi-step-form-vite-react-typescript-chakraui/",
  plugins: [eslint(), tsconfigPaths(), react()],
});
