/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body: ['Plus Jakarta Sans', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 40px rgba(45, 212, 191, 0.2)',
      },
      colors: {
        surface: 'rgba(15, 23, 42, 0.5)',
      },
    },
  },
  plugins: [],
}

