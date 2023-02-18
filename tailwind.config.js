/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  important: true,
  theme: {
    extend: {
      fontFamily: {
        inter: ['var(--font-inter)', 'sans-serif'],
        playfair: ['var(--font-inter)', 'serif'],
      },
      colors: {
        'primary-dark': '#1D191F',
        'light-gold': '#D4A171',
        'light-purple': '#6B558D',
      },
      animation: {
        'spin-slow': 'spin 30s linear infinite',
      },
      transitionTimingFunction: {
        expo: 'cubic-bezier(0.6, 0.01, 0, 0.95)',
      },
    },
  },
  plugins: [],
};
