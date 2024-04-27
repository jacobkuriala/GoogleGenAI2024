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
      colors:{
        corporate: {
          400: '#2F4FA7',
          500: '#183B9D',
        },
        white: '#F8FAFC',
        black: '#020617',
      }
    },
  },
  plugins: [],
};
