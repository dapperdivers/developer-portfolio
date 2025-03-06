import path from 'path';

/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: [
    '../src/**/*.stories.@(js|jsx)'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials'
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
    autodocs: true
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
    
    return config;
  }
};

export default config;