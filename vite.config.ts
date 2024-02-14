import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import VueImages from "vite-plugin-vue-images";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VueImages(), // Add the ViteImagesPlugin here
  ],
  build: {
    chunkSizeWarningLimit: 1000, // set your desired limit in kilobytes
  },
});
