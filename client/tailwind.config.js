/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#f43397', // Meesho Pink
        secondary: '#333333',
      }
    },
  },
  plugins: [],
}
