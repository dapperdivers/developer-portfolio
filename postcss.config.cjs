module.exports = {
  plugins: {
    '@tailwindcss/postcss': {}, // Tailwind 4: handles @import inlining itself (postcss-import no longer needed)
    // Tailwind 4 only prefixes for its own fixed browser targets and does not read the
    // project's browserslist, so autoprefixer stays to keep the same prefixes (e.g. -webkit-user-select).
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
