import { fileURLToPath, URL } from "url";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// freeCodeCamp vite tutorial link:
// https://youtu.be/VAeRhmpcWEQ?si=z6xAoynkTUFC3o6G

// eslint-disable-next-line no-unused-vars
export default defineConfig(({ command, mode }) => {
  // command -> serve/build
  // mode -> development/production

  // eslint-disable-next-line no-undef
  const env = loadEnv(mode, process.cwd(), "VITE_");

  const manifestForPlugin = {
    registerType: "autoUpdate",
    devOptions: {
      enabled: true,
    },
    workbox: {
      globPatterns: ["**/*.{js,jsx,css,html,ico,png,svg}"],
    },
    manifest: {
      short_name: "AMH",
      name: "Anshu Medical Hall",
      description: "Anshu Medical Hall is a medical shop",
      theme_color: "#ffffff",
      icons: [
        {
          src: "pwa-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
        {
          src: "maskable-icon-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "maskable",
        },
      ],
      id: "/?source=pwa",
      start_url: "/?source=pwa",
      background_color: "#3367D6",
      display: "standalone",
      scope: "/",
      shortcuts: [
        {
          name: "How's weather today?",
          short_name: "Today",
          description: "View weather information for today",
          url: "/today?source=pwa",
          icons: [{ src: "pwa-192x192.png", sizes: "192x192" }],
        },
        {
          name: "How's weather tomorrow?",
          short_name: "Tomorrow",
          description: "View weather information for tomorrow",
          url: "/tomorrow?source=pwa",
          icons: [{ src: "pwa-192x192.png", sizes: "192x192" }],
        },
      ],
    },
  };

  return {
    plugins: [react(), VitePWA(manifestForPlugin)],

    resolve: {
      alias: [
        {
          find: "@",
          replacement: fileURLToPath(new URL("./src", import.meta.url)),
        }, //https://stackoverflow.com/questions/66043612/vue3-vite-project-alias-src-to-not-working
      ],
    },

    server: {
      open: true,
      proxy: {
        // https://vitejs.dev/config/server-options.html#server-proxy

        // with options: http://localhost:5173/api/bar-> http://jsonplaceholder.typicode.com/bar

        // use only "api" for VITE_BASE_URL url as like "http://jsonplaceholder.typicode.com" becomes "api"

        "/api": {
          target: env.VITE_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
          secure: true,
        },
      },
    },
  };
});

// ========================//
// OLD CONFIGURATION BELOW //
// ========================//

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: [
//       {
//         find: "@",
//         replacement: fileURLToPath(new URL("./src", import.meta.url)),
//       }, //https://stackoverflow.com/questions/66043612/vue3-vite-project-alias-src-to-not-working
//     ],
//   },
// });
