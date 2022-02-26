const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
        body: ['Open Sans', 'sans-serif']
      },
      colors: {
        primary: {
          light: "#d56059",
          DEFAULT: "#4565DB",
          dark: "#6a0009",
        },
        lemon: '#F5FF00'
      },

      typography: {
        DEFAULT: {
          css: {
            color: '#333',
            a: {
              backgroundImage: 'linear-gradient(90deg, #F5FF00, #F5FF00)',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '100% .25em',
              backgroundPosition: '0 80%',
              textDecoration: 'none',
              '&:hover': {
                backgroundSize: '100% 100%',
              },
            },
          },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}