import { chunkSplitPlugin } from "vite-plugin-chunk-split";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), chunkSplitPlugin()],
  build: { outDir: "docs" },
  server: { open: true },
});
