/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        turretroad: ["TurretRoad"],
        presstart: ["PressStart2P"],
      },
      colors: {
        darkPurple: "#262630",
        yellow: "#FFD702",
        darkGrey: "#30303C",
        lightBrown: "#FED7AA",
        darkBrown: "#C1410B",
        darkBrownText: "#3E1600",
        lightViolet: "#BDBCFF",
        darkViolet: "#6765A7",
        darkVioletText: "#3E2A57",
      },
      zIndex: {
        9999: 9999,
      },
      screens: {
        "3xl": "1600px",
      },
    },
  },
  plugins: [],
};
