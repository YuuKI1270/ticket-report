import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import "dotenv/config";

const port = process.env.VITE_PORT;
// console.log(port);

export default defineConfig({
  plugins: [vue()],
  server: {
    host: true,
    port: +port,
  },
  preview: {
    port: +port,
  },
});
