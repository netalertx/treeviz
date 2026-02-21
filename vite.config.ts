import { defineConfig } from "vite";
import { resolve } from "path";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [dts({ include: ["src"] })],
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
