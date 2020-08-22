const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  theme: {
    extend: {
      colors: {
        black: "#060606",
        beige: "#FFF4F4",
        primary: "#4563BF",
        darkgray: "#343434",
        yellow: "#E5D53C",
      },
      borderRadius: {
        ...defaultTheme.borderRadius,
        md: "3rem",
        large: "4rem",
      },
      fontFamily: {
        display: ["Didot"],
        serif: ["Didot", ...defaultTheme.fontFamily.serif],
        sans: ["Sen", "Avenir", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/ui")],
};
