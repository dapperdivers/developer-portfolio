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
        }],
        ['@babel/preset-react', { runtime: 'automatic' }]
      ],
      // Add any test-specific plugins here
      plugins: []
    },
    development: {
      // Development-specific settings
      presets: [
        ['@babel/preset-env', {
          targets: { node: 'current' },
          modules: false // Preserve ES modules for dev mode
        }],
        ['@babel/preset-react', { runtime: 'automatic' }]
      ]
    },
    production: {
      // Production-specific settings
      presets: [
        ['@babel/preset-env', {
          targets: { 
            browsers: ['>0.2%', 'not dead', 'not op_mini all']
          },
          modules: false // Preserve ES modules for bundlers
        }],
        ['@babel/preset-react', { runtime: 'automatic' }]
      ]
    }
  }
};
