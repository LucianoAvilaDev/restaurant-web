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
        sidebarHeaderColor: "rgb(185 28 28)",
        sidebarHeaderText: "rgb(249 250 251)",

        sidebarHeaderIconColor: "rgb(249 250 251)",
        sidebarHeaderIconHover: "rgb(185 28 28)",
        sidebarHeaderIconBgHover: "rgb(249 250 251 / 0.8)",

        sidebarMenuBgColor: "rgb(153 27 27)",
        sidebarMenuBorder: "rgb(239 68 68)",
        sidebarMenuHover: "rgb(249 250 251 / 0.7)",

        sidebarTextColor: "rgb(249 250 251)",
        sidebarTextHover: "rgb(153 27 27)",

        sidebarSubMenu: "rgb(127 29 29)",
        sidebarSubMenuBorder: "rgb(153 27 27)",

        sidebarSelectedMenu: "rgb(249 250 251 / 0.9)",

        navbarBgColor: "rgb(185 28 28)",
        navbarIconColor: "rgb(249 249 249)",
        navbarIconHover: "rgb(249 249 249)",
        navbarTextColor: "transparent",
        navbarTextHover: "rgb(239 68 68 )",

        navbarUserBg: "white",
        navbarUserMenu: "white",
        navbarUserMenuHover: "rgb(153 27 27)",
        navbarUserText: "rgb(153 27 27)",
        navbarUserTextHover: "rgb(249 249 249)",

        breadcrumbBgColor: "rgb(127 29 29)",
        breadcrumbText: "white",

        mainBgColor: "rgb(229 231 235)",
      },
    },
  },
  extend: {},
  plugins: [],
};
