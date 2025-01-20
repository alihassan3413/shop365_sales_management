/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1E293B", // Custom primary color
        secondary: "#BDBCBC", // Custom secondary color
        accent: "#FFF2AC", // Accent color
        hoverPrimary: "#f3f4f6", // Hover effect primary color
        hoverSecondary: "#334155", // Hover effect secondary color
        background: "#F1F0F0",
      },
    },
  },
  plugins: [],
};
