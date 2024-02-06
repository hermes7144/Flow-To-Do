/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      screens: {
        xs: '475px',
      },
      colors: {
        brand: '#fe5a4a',
      },
      backgroundImage: {
        banner: `url('../public/background.png')`,
      },
    },
  },
  plugins: [],
};
