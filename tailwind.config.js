const { color } = require("@mui/system");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // fontFamily: {
      //   'sans': ['ui-sans-serif', 'system-ui'],
      //   'serif': ['ui-serif', 'Georgia'],
      //   'mono': ['ui-monospace', 'SFMono-Regular'],
      //   'display': ['Oswald'],
      //   'body': ['"Open Sans"'],
      // },
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
  plugins: [],
};
