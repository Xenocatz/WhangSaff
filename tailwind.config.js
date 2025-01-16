/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        darkbg: "#090f0f",
        mediumDark: "#98de4f",
        lessDark: "#787F99",
        textForDarkBlue: "#f2eeec",
        textForGrey: "#EEEEEE",
        textForTime: "#A1A1A1",
        canvas: "#141d2c",
        "canvas-200": "#ccd9eb",
        "canvas-600": "#365e93",
        surfaces: "#243346",
        lightBlue: "#84e8ff",
        lightBlueHover: "#00d8dd",
        darkBlue: "#064185",
        chatBg: "#0061e3",
        lightRed: "#b00000",
        darkRed: "#2a0000",
      },
      boxShadow: {
        chatShadow: "0 0 10px 0 rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant("autofill", "&:-webkit-autofill");
    },
  ],
};
// #00d8dd biru stabilo
