module.exports = {
  plugins: {
    'postcss-import': {},  // Add postcss-import to properly handle @import rules
    '@tailwindcss/postcss': {}, // Updated for Tailwind CSS v3.4
    autoprefixer: {},
    cssnano: {
      preset: 'default',
    }
  }
}
