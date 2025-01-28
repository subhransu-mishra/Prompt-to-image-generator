/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#141415',
        secondary: '#0a0a0a', 
      },
    },
  },
  plugins: [
    daisyui,
  ],
}