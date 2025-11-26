/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  darkMode: 'class',

  theme: {
    extend: {
      fontFamily: {
        'display': ['Montserrat', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
        'heading': ['Mulish', 'sans-serif'],
        'ui': ['Roboto', 'sans-serif'],
        'mono': ['IBM Plex Sans', 'monospace'],
      },
      aspectRatio: {
        '4/3': '4 / 3',
        '21/9': '21 / 9',
      },
    },
  },

  plugins: [
    // require('@tailwindcss/aspect-ratio'),
  ],
};
