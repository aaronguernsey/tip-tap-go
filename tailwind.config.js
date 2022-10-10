/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        short: { raw: "(max-height: 650px)" },
        xshort: { raw: "(max-height: 560px)" },
        xxshort: { raw: "(max-height: 490px)" },
      },
    },
  },
  plugins: [],
};
