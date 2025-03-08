const tailwindcss = require('tailwindcss');

module.exports = {
  plugins: {
    'postcss-import': {},  // Add postcss-import to properly handle @import rules
    'tailwindcss': {}, // Use direct tailwindcss package instead of @tailwindcss/postcss
    autoprefixer: {},
    cssnano: {
      preset: 'default',
    }
  }
}
