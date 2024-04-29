/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      fontFamily: {
        work: "Work Sans, Arial, sans-serif",
      },
      colors: {
        corporate: {
          400: "#2F4FA7",
          500: "#183B9D",
        },
        white: "#F8FAFC",
        black: "#020617",
      },
      boxShadow: {
        'custom': '379px 346px 144px 0px rgba(0,0,0,0.00) inset, 242px 221px 131px 0px rgba(0,0,0,0.01) inset, 136px 124px 111px 0px rgba(0,0,0,0.05) inset, 61px 55px 82px 0px rgba(0,0,0,0.09) inset, 15px 14px 45px 0px rgba(0,0,0,0.10) inset'
      }
    },
  },
  plugins: [],
};
