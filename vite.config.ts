import { defineConfig } from "vite";
import { resolve } from "path";
import dts from "vite-plugin-dts";

export default defineConfig({
  // dts' `root`/`include` resolve against Vite's global `root` by default; since that's
  // "./example" below, pin dts' own root to the project root so `include: ["src"]` finds
  // the real src/ dir instead of the nonexistent example/src.
  plugins: [dts({ include: ["src"], root: __dirname })],
  root: "./example",
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      formats: ["es", "iife"],
      name: "Treeviz",
    },
    rollupOptions: {
      input: {
        app: "./example/index.html",
      },
    },
    copyPublicDir: false,
    outDir: resolve(__dirname, "dist"),
  },
  server: {
    open: true,
  },
});
