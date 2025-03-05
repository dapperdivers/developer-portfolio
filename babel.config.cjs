module.exports = {
  presets: [
    ['@babel/preset-env', { 
      targets: { node: 'current' },
      modules: 'auto' // This allows Babel to handle both ESM and CommonJS
    }],
    ['@babel/preset-react', { runtime: 'automatic' }]
  ],
  plugins: [],
  env: {
    test: {
      // Settings for test environment to ensure Jest compatibility
      presets: [
        ['@babel/preset-env', {
          targets: { node: 'current' },
          modules: 'commonjs' // Force CommonJS for tests since Jest works better with it
        }]
      ]
    }
  }
};
