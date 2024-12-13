/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#40CEB4',
        'primary-dark': '#2A9B86',
        secondary: '#2D3748',
        background: '#FFFFFF',
      },
      animation: {
        'slow-spin': 'slow-spin 25s linear infinite',
        'reverse-slow-spin': 'reverse-slow-spin 30s linear infinite',
      },
      keyframes: {
        'slow-spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'reverse-slow-spin': {
          '0%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
      },
    },
  },
  plugins: [],
} 