module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // Enable dark mode support
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'], // Add Poppins font here
      },
      keyframes: {
        typing: {
          '0%': { width: '0%', visibility: 'hidden' },
          '100%': { width: '100%', visibility: 'visible' },
        },
        caret: {
          '0%, 100%': { borderColor: 'transparent' },
          '50%': { borderColor: 'transparent' },
        },
      },
      animation: {
        typing: 'typing 2s steps(20) 1 forwards',
        caret: 'caret 1s step-end infinite',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
