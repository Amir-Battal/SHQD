import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { VitePWA } from "vite-plugin-pwa"
import tailwindcss from "@tailwindcss/vite"
import path from "path"

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["./src/assets/SHQD-ICON.jpg", "./src/assets/SHQD-ICON.jpg"],
      manifest: {
        name: "محول العملة السورية",
        short_name: "شقد",
        description: "تحويل العملة السورية بعد حذف صفرين",
        theme_color: "#0f172a",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "./src/assets/SHQD-ICON.jpg",
            sizes: "192x192",
            type: "image/jpg"
          },
          {
            src: "./src/assets/SHQD-ICON.jpg",
            sizes: "512x512",
            type: "image/jpg"
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
