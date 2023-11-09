/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "blue-100": "#f7f9ff !important",
        "gray-300": "#fff !important",
        "orange-100": "#fe9b29 !important",
        "orange-200": "#fb830c !important",
        white: "#fff !important",
      },
    },
  },
  plugins: [],
};
