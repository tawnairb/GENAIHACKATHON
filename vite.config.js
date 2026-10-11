import { defineConfig } from "vite";

export default defineConfig({
  root: "src",
  base: "/GENAIHACKATHON/",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
  },
});
