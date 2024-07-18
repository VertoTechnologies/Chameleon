/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      scrollbar: ['rounded'],
      colors: {
        'blue-500': '#',
        'gray-100': '#f7fafc',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],

};

