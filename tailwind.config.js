let plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./public/**/*.{html,js}', './src/**/*.{html,js}'],
  theme: {
    extend: {
      screens: {
        xs: { max: '320px' },
      },
      dropShadow: {
        customSm: '0 8px 12px rgba(0,0,0,0.15)',
      },
      boxShadow: {
        customSm: '0 4px 18px rgba(32,32,32,0.05)',
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant('slash', '.breadcrumb:not(:first-child):before');
    }),
  ],
};
