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
      // Fix for polished library error - mock the polished library with our custom implementation
      'polished': path.resolve(__dirname, './fixes/polished-fix.js'),
      'polished/lib/internalHelpers': path.resolve(__dirname, './fixes/polished-fix.js'),
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