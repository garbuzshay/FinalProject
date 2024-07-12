module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // Enable dark mode support
  theme: {
    extend: {
      animation: {
        'random-move': 'randomMove 10s infinite',
      },
      keyframes: {
        randomMove: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)', opacity: '0.7' },
          '50%': { transform: 'translate(50px, 50px) scale(1.5)', opacity: '0.4' },
        },
      },
    },
  },
  plugins: [],
}
