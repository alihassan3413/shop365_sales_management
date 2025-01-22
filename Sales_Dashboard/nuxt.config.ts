// https://nuxt.com/docs/api/configuration/nuxt-config
import dotenv from "dotenv";
dotenv.config();

export default defineNuxtConfig({
  app: {
    baseURL: "/sales-dashboard/",
  },
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  plugins: ["~/plugins/pinia.js"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  // Add runtime config for environment variables
  runtimeConfig: {
    databaseUrl: process.env.DATABASE_URL,
    // Public runtime config
    public: {
      apiBase: "/sales-dashboard/api",
    },
  },

  // Configure server settings
  nitro: {
    preset: "node-server",
  },

  compatibilityDate: "2025-01-16",
});
