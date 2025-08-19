const tailwindcss = require('tailwindcss');

module.exports = {
  plugins: {
    'postcss-import': {},  // Add postcss-import to properly handle @import rules
    'tailwindcss': {}, // Use direct tailwindcss package instead of @tailwindcss/postcss
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production' ? {
      cssnano: {
        preset: ['default', {
          discardComments: {
            removeAll: false, // Keep important comments
          },
          reduceIdents: false, // Don't mangle CSS custom property names
          colormin: false, // Don't optimize colors that might break CSS variables
        }],
      }
    } : {})
  }
}
