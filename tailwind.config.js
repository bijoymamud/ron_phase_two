/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "2rem",
        screens: {
          "2xl": "1400px",
          "3xl": "1600px",
          "4xl": "1900px",
          "5xl": "2200px",
        },
		},


      backgroundImage: {
        'faq-pattern':  "url('./src/assets/faq-bg.svg')",
      }
    },
  },
  plugins: [daisyui],
}
