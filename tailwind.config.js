/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './contents/**/*.{md,mdx}'],
  important: true,
  theme: {
    extend: {
      fontFamily: {
        inter: ['var(--font-inter)', 'sans-serif'],
        playfair: ['var(--font-playfair)', 'serif'],
      },
      colors: {
        'primary-dark': '#1D191F',
        gold: '#8E7864',
        'light-gold': '#D4A171',
        'pale-gold': '#8A6D6D',
        'light-purple': '#6B558D',
        'pale-purple': '#4F4256',
        'washed-purple': '#DDD1EC',
      },
      animation: {
        'spin-slow': 'spin 30s linear infinite',
        hover: 'hovering 3s ease-in-out infinite',
      },
      keyframes: {
        hovering: {
          '0%, 100%': { transform: 'translateY(0) rotate(3deg)' },
          '50%': { transform: 'translateY(-10px) rotate(4deg)' },
        },
      },
      transitionTimingFunction: {
        expo: 'cubic-bezier(0.6, 0.01, 0, 0.95)',
      },
    },
  },
  plugins: [require('tailwind-scrollbar'), require('@tailwindcss/typography')],
};
