const { color } = require("@mui/system");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        fade: "fadeIn 300ms ease-in-out",
      },

      keyframes: (theme) => ({
        fadeIn: {
          "0%": { opacity: "0%", transform: "translateY(-3rem)" },
          "100%": { opacity: 100 },
        },
      }),
      colors: {
        themeBgBody: "rgb(229 231 235)",

        themeLighter: "rgb(245, 225, 220)",
        themeLight: "rgb(239 68 68)",
        themeMedium: "rgb(185 28 28)",
        themeDark: "rgb(153 27 27)",
        themeDarker: "rgb(127 29 29)",

        themeTextLight: "rgb(249 250 251)",
        themeTextMedium: "rgb(185 28 28)",
        themeTextDark: "rgb(153 27 27)",

        primary: "#0d6efd",
        secondary: "#6f42c1",

        disabled: "#f8f9fa",

        info: "#0dcaf0",

        success: "#198754",

        warning: "#ffc107",

        danger: "#dc3545",
      },
    },
  },
  extend: {},
  plugins: [],
};
