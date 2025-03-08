import type { StorybookConfig } from '@storybook/react-vite';
import path from 'path';

const config: StorybookConfig = {
  "stories": [
    "./examples/*.stories.@(jsx|tsx)",
    "./templates/*.stories.@(jsx|tsx)",
    "../src/components/**/*.stories.@(jsx|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  "framework": {
    "name": "@storybook/react-vite",
    "options": {
      "builder": {
        "viteConfigPath": 'vite.config.js',
      }
    }
  },
  "staticDirs": [
    "../src/assets/images",
    "../src/assets/animations/lottie",
    "../src/assets/fonts",
    "../src/assets/css",
    "./assets"
  ],
  "viteFinal": async (config) => {
    // Add path aliases
    if (!config.resolve) {
      config.resolve = {};
    }
    
    if (!config.resolve.alias) {
      config.resolve.alias = {};
    }
    
    // Add extensions for better module resolution
    config.resolve.extensions = ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'];
    
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
      '@stories-utils': path.resolve(__dirname, './utils'),
    };
    
    return config;
  }
};
export default config;