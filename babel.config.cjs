// Define aliases once to avoid duplication
const aliases = {
  '@': './src',
  '@components': './src/components',
  '@atoms': './src/components/atoms',
  '@molecules': './src/components/molecules',
  '@organisms': './src/components/organisms',
  '@layout': './src/components/layout',
  '@assets': './src/assets',
  '@utils': './src/utils',
  '@hooks': './src/hooks',
  '@context': './src/context',
  // Specific component aliases
  '@layout/Section': './src/components/layout/Section',
  '@atoms/Card': './src/components/atoms/Card',
  '@atoms/EducationIcon': './src/components/atoms/EducationIcon',
  '@atoms/SchoolHeader': './src/components/atoms/SchoolHeader',
  '@atoms/DegreeInfo': './src/components/atoms/DegreeInfo',
  '@atoms/FieldsOfStudy': './src/components/atoms/FieldsOfStudy',
  '@atoms/DateChip': './src/components/atoms/DateChip',
  '@molecules/CertificationBadge': './src/components/molecules/CertificationBadge'
};

// Define the module-resolver plugin configuration once
const moduleResolverPlugin = [
  'module-resolver',
  {
    root: ['./src'],
    alias: aliases
  }
];

module.exports = {
  presets: [
    ['@babel/preset-env', { 
      targets: { node: 'current' },
      modules: 'auto' // This allows Babel to handle both ESM and CommonJS
    }],
    ['@babel/preset-react', { runtime: 'automatic' }],
    // Add TypeScript preset to properly handle .tsx files
    '@babel/preset-typescript'
  ],
  plugins: [
    moduleResolverPlugin,
    // Fix for react-is issues in production
    process.env.NODE_ENV === 'production' && ['transform-react-remove-prop-types', { removeImport: true }]
  ].filter(Boolean),
  env: {
    test: {
      // Settings for test environment to ensure Vitest compatibility
      presets: [
        ['@babel/preset-env', {
          targets: { node: 'current' },
          modules: false // Preserve ES modules for Vitest
        }],
        ['@babel/preset-react', { runtime: 'automatic' }]
      ],
      // Keep module-resolver plugin in test environment
      plugins: [moduleResolverPlugin]
    },
    development: {
      // Development-specific settings
      presets: [
        ['@babel/preset-env', {
          targets: { node: 'current' },
          modules: false // Preserve ES modules for dev mode
        }],
        ['@babel/preset-react', { runtime: 'automatic' }]
      ],
      // Keep module-resolver plugin in development environment
      plugins: [moduleResolverPlugin]
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
      ],
      // Keep module-resolver plugin in production environment
      plugins: [moduleResolverPlugin]
    }
  }
};
