// https://nuxt.com/docs/api/configuration/nuxt-config
import dotenv from "dotenv";
dotenv.config();

export default defineNuxtConfig({
  ssr: false,

  port: process.env.port,
  host: process.env.host,
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  plugins: ["~/plugins/pinia.js"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || "",
    },
  },

  // Configure server settings
  nitro: {
    preset: "node-server",
  },

  compatibilityDate: "2025-01-16",
});
