/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./views/**/*.ejs'],
  theme: {
    extend: {
      fontFamily : {
        'inter': ['Inter', 'sans-serif'],
        'formular-extraLight' : ['formular-extralight'],
        'formular-light' : ['formular-light'],
        'formular-regular' : ['formular-regular'],
        'formular-medium' : ['formular-medium'],
        'formular-bold' : ['formular-bold'],
        'formular-ultra' : ['formular-ultra'],
      },
    },
  },
  plugins: [],
}

