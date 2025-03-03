module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    ['@babel/preset-react', { runtime: 'automatic' }]
  ],
  plugins: [],
  env: {
    test: {
      // Additional settings for test environment
      plugins: []
    }
  }
};
