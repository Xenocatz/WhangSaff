/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        darkbg: "#232531",
        mediumDark: "#333645",
        lessDark: "#787F99",
        lightBlue: "#94DBFB",
      },
    },
  },
  plugins: [],
};
