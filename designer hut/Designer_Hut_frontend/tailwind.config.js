// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        'gradient-move': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      animation: {
        'bg-gradient': 'gradient-move 8s ease infinite',
      },
      backgroundSize: {
        '200': '200% 200%',
      },
    },
  },
}
