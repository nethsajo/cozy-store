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
        customXs: '0 2px 16px rgba(32,32,32,0.03)',
        customSm: '0 8px 16px rgba(32,32,32,0.08)',
      },
      keyframes: {
        ripple: {
          '0%': {
            top: '52px',
            left: '52px',
            width: 0,
            height: 0,
            opacity: 1,
          },
          '100%': {
            top: 0,
            left: 0,
            width: '104px',
            height: '104px',
            opacity: 0,
          },
        },
      },
      animation: {
        ripple: 'ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite',
      },
    },
  },
  plugins: [
    require('tailwindcss-animation-delay'),
    plugin(function ({ addVariant, addUtilities }) {
      addVariant('slash', '.breadcrumb:not(:first-child):before');
      addUtilities({
        '.rtl': {
          direction: 'rtl',
        },
        '.ltr': {
          direction: 'ltr',
        },
      });
    }),
  ],
};
