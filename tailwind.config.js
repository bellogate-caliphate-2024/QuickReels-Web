// const colors = require('tailwindcss/colors');

// module.exports = {
//   theme: {
//     extend: {
//       colors: {
//         slate: colors.slate,
//         gray: colors.gray,
//         zinc: colors.zinc,
//         neutral: colors.neutral,
//         stone: colors.stone,
//         red: colors.rose,
//         orange: colors.orange,
//         amber: colors.amber,
//         yellow: colors.yellow,
//         lime: colors.lime,
//         green: colors.green,
//         emerald: colors.emerald,
//         teal: colors.teal,
//         cyan: colors.cyan,
//         sky: colors.sky,
//         blue: colors.blue,
//         indigo: colors.indigo,
//         violet: colors.violet,
//         purple: colors.purple,
//         fuchsia: colors.fuchsia,
//         pink: colors.pink,
//         rose: colors.rose,
//       },
//     },
//   },
//   content: [
//     './app/**/*.{js,ts,jsx,tsx}',
//     './components/**/*.{js,ts,jsx,tsx}',
//     './pages/**/*.{js,ts,jsx,tsx}',
//   ],
//   plugins: [],
// };
// tailwind.config.js
const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        slate: colors.slate,
        gray: colors.gray,
        zinc: colors.zinc,
        neutral: colors.neutral,
        stone: colors.stone,
        red: colors.rose,
        orange: colors.orange,
        amber: colors.amber,
        yellow: colors.yellow,
        lime: colors.lime,
        green: colors.green,
        emerald: colors.emerald,
        teal: colors.teal,
        cyan: colors.cyan,
        sky: colors.sky,
        blue: colors.blue,
        indigo: colors.indigo,
        violet: colors.violet,
        purple: colors.purple,
        fuchsia: colors.fuchsia,
        pink: colors.pink,
        rose: colors.rose,
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        gradientHover: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'gradient-hover': 'gradientHover 3s ease infinite',
      },
    },
  },
  plugins: [],
};
