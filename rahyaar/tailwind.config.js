/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2835A7",
        secondary: "#D8E7FF",
        complementry: "#009ECA",
        textColor: "#282828",
      },
    },
  },
  plugins: [],
};
