/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      },
      colors: {
        navy: {
          DEFAULT: '#0a0f1e',
          500: '#2e4170',
          600: '#1e2d50',
          800: '#111827',
        },
        accent: {
          DEFAULT: '#2563eb',
          light: '#3b82f6',
          subtle: '#eff6ff',
          border: '#bfdbfe',
        },
        surface: {
          DEFAULT: '#f8f9fb',
          2: '#f1f3f6',
        },
        border: {
          DEFAULT: '#e5e8ef',
          strong: '#cbd1dc',
        },
      },
    },
  },
  plugins: [],
}
