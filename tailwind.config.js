/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        doodles: "url('/doodles2.jpg')",
      },
    },
  },
  plugins: [require('daisyui')],
}
