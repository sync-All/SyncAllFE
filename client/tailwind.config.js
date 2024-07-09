/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    // screens: {
    //   sms: '640px',
    //   mds: '768px',
    //   lgs: '1440px'
    // },
    extend: {
      colors: {
        black: '#000',
        black2: '#013131',
        yellow: '#EFA705',
        grey: {
          100: '#F0F2F5',
          200: '#2C2C2C',
          300: '#D0D5DD',
          400: '#98A2B3',
          500: '#EEEFFC',
          600: '#161616',
          700: '#252525',
        },
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        'formular-extraLight': ['formular-extralight'],
        'formular-light': ['formular-light'],
        'formular-regular': ['formular-regular'],
        'formular-medium': ['formular-medium'],
        'formular-bold': ['formular-bold'],
        'formular-ultra': ['formular-ultra'],
        gitSans: ['Git-sans'],
        'Utile-extralight': ['Utile-extralight'],
        'Utile-light': ['Utile-light'],
        'Utile-regular': ['Utile-regular'],
        'Utile-medium': ['Utile-medium'],
        'Utile-bold': ['Utile-bold'],
        poppins: ['Poppins']
      },
      fontFamily : {
        'inter': ['Inter', 'sans-serif'],
        'formular-extraLight' : ['formular-extralight'],
        'formular-light' : ['formular-light'],
        'formular-regular' : ['formular-regular'],
        'formular-medium' : ['formular-medium'],
        'formular-bold' : ['formular-bold'],
        'formular-ultra' : ['formular-ultra'],
        'gitSans' : ['Git-sans', "sans-serif"],
        'Utile-extralight' : ['Utile-extralight'],
        'Utile-light' : ['Utile-light'],
        'Utile-regular' : ['Utile-regular'],
        'Utile-medium' : ['Utile-medium'],
        'Utile-bold' : ['Utile-bold']
      },
      backgroundImage : {
        syncbg : "url('/src/assets/syncbg.png')"
      }
    },
  },
  plugins: [],
};

