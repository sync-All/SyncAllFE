/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors : {
        yellow : "#EFA705",
        grey : {
          100 : "#F0F2F5",
          300 : "#D0D5DD",
          400 : "#EEEFFC"
        }
      }
    },
  },
  plugins: [],
}

