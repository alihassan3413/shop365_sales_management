// https://nuxt.com/docs/api/configuration/nuxt-config
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

  compatibilityDate: "2025-01-16",
});
