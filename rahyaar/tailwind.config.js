/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // primary: "#2835A7",
        primary: "#00167a",
        secondary: "#D8E7FF",
        complementry: "#EA7317",
        textColor: "#282828",
      },
    },
  },
  plugins: [],
};
