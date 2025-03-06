module.exports = {
  plugins: {
    'postcss-import': {},  // Add postcss-import to properly handle @import rules
    tailwindcss: {},
    autoprefixer: {},
    cssnano: {
      preset: 'default',
    }
  }
}
