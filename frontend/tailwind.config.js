/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./pages/**/*.{html,js}",
  ],
  theme: {
    colors: {
      'transparent': 'transparent',
      'black': '#000000',
      'white': '#ffffff',
      'blue': '#f2f1ff',
      'gradient': '#cec7ff',
      'purple': '#5f2ff8',
      'orange': '#ed7634'
    },
    fontFamily: {
      'caveat': ['Caveat', 'sans-serif'],
      'geist': ['Geist', 'sans-serif'],
      'playfair': ['Playfair Display', 'serif'],
      'roboto': ['Roboto', 'sans-serif']
    },
    extend: {},
  },
  plugins: [],
}