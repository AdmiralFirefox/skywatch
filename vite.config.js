import { resolve } from "path";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    VitePWA({
      manifest: {
        theme_color: "#18425A",
        background_color: "#18425A",
        display: "standalone",
        scope: "/",
        start_url: "/",
        name: "SkyWatch",
        short_name: "SkyWatch",
        description:
          "A weather application to know the weather of a specific place, either be a city or country.",
        icons: [
          {
            src: "/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icon-256x256.png",
            sizes: "256x256",
            type: "image/png",
          },
          {
            src: "/icon-384x384.png",
            sizes: "384x384",
            type: "image/png",
          },
          {
            src: "/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        weather: resolve(__dirname, "pages/weather/index.html"),
      },
    },
  },
});
