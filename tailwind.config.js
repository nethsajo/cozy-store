module.exports = {
  content: ['./public/**/*.{html,js}', './src/**/*.{html,js}'],
  theme: {
    extend: {
      screens: {
        xs: { max: '320px' },
      },
      dropShadow: {
        customOne: '0 8px 12px rgba(0,0,0,0.15)',
      },
    },
  },
  plugins: [],
};
