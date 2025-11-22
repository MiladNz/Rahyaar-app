/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // primary: "#2835A7",
        // primary: "#3860CE",
        // secondary: "#FF906B",
        // complementry: "#F2A65A",
        // textColor: "#282828",
        // primary: "#3860CE",
        // secondary: "#5CA9E6",
        // complementry: "#FFA419",
        // textColor: "#282828",
        primary: "#3860CE",
        secondary: "#2C3D8F",
        complementry: "#FDB713",
        textColor: "#282828",
      },
    },
  },
  plugins: [],
};
