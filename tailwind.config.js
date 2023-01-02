const { color } = require("@mui/system");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,png}", "./pages/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        showIn: "showIn 200ms ease-in-out",
        showOut: "showOut 200ms ease-in-out",
      },

      keyframes: (theme) => ({
        showIn: {
          "0%": { transform: "scale(0)" },
          "100%": {},
        },
        showOut: {
          "0%": {},
          "100%": { transform: "scale(0)" },
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
      },
    },
  },
  extend: {},
  plugins: [require("tailwind-scrollbar")],
};
