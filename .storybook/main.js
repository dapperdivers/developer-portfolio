import path from 'path';

/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: [
    '../src/stories/docs/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-a11y',
    '@chromatic-com/storybook',
    '@storybook/experimental-addon-test'
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {
      builder: {
        viteConfigPath: 'vite.config.js',
      }
    }
  },
  staticDirs: [
    '../src/assets/images',
    '../src/assets/animations',
    '../src/assets/fonts',
    '../src/assets/css'
  ],
  docs: {
    autodocs: true,
    defaultName: 'Documentation'
  },
  viteFinal: async (config) => {
    // Add path aliases
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '../src'),
      '@components': path.resolve(__dirname, '../src/components'),
      '@atoms': path.resolve(__dirname, '../src/components/atoms'),
      '@molecules': path.resolve(__dirname, '../src/components/molecules'),
      '@organisms': path.resolve(__dirname, '../src/components/organisms'),
      '@layout': path.resolve(__dirname, '../src/components/layout'),
      '@assets': path.resolve(__dirname, '../src/assets'),
      '@utils': path.resolve(__dirname, '../src/utils'),
      '@hooks': path.resolve(__dirname, '../src/hooks'),
      '@context': path.resolve(__dirname, '../src/context'),
      '@stories-utils': path.resolve(__dirname, '../src/stories/utils'),
    };
    
    // Add specific configurations for Storybook build
    if (config.build) {
      // Handle the eval warnings
      if (!config.build.rollupOptions) {
        config.build.rollupOptions = {};
      }
      
      // Add onwarn handler to Rollup options
      config.build.rollupOptions.onwarn = (warning, warn) => {
        // Ignore eval warnings from third-party libraries
        if (warning.code === 'EVAL' && 
            (warning.id?.includes('node_modules/@storybook') || 
             warning.id?.includes('lottie-web'))) {
          return;
        }
        warn(warning);
      };
      
      // Add manual chunks for better code splitting
      config.build.rollupOptions.output = {
        ...config.build.rollupOptions.output,
        manualChunks: (id) => {
          // React and related packages
          if (id.includes('node_modules/react') || 
              id.includes('node_modules/react-dom') ||
              id.includes('node_modules/react-helmet-async') ||
              id.includes('node_modules/react-router-dom') ||
              id.includes('node_modules/react-icons')) {
            return 'react-vendor';
          }
          
          // UI component dependencies
          if (id.includes('node_modules/framer-motion') ||
              id.includes('node_modules/@iconify/react') ||
              id.includes('node_modules/lottie-react')) {
            return 'ui-vendor';
          }
          
          // Utility libraries
          if (id.includes('node_modules/moment') ||
              id.includes('node_modules/axios') ||
              id.includes('node_modules/classnames')) {
            return 'utils-vendor';
          }
          
          // Storybook addons
          if (id.includes('node_modules/@storybook/addon')) {
            return 'storybook-addons';
          }
          
          // Storybook blocks
          if (id.includes('node_modules/@storybook/blocks')) {
            return 'storybook-blocks';
          }
          
          // Storybook core
          if (id.includes('node_modules/@storybook/react') ||
              id.includes('node_modules/@storybook/test')) {
            return 'storybook-core';
          }
          
          // Other node_modules in fewer chunks
          if (id.includes('node_modules')) {
            // Get package name from path
            const packageMatch = id.match(/node_modules\/(@[^/]+\/[^/]+|[^/]+)/);
            if (packageMatch) {
              const packageName = packageMatch[1];
              // Group by first letter to avoid too many chunks
              const firstChar = packageName.charAt(0).toLowerCase();
              return `vendor-${firstChar}`;
            }
          }
        }
      };
      
      // Increase the chunk size warning limit
      config.build.chunkSizeWarningLimit = 2000;
      
      // Add esbuild options
      if (!config.build.esbuildOptions) {
        config.build.esbuildOptions = {};
      }
      
      config.build.esbuildOptions.logOverride = {
        'unsupported-js-syntax': 'silent',
        'eval-in-js': 'silent'
      };
    }
    
    return config;
  }
};

export default config;