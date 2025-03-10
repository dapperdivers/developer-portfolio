import { mergeConfig } from 'vitest/config';
import baseConfig from './base.config';

/**
 * Storybook test configuration
 * Extends base config with Storybook specific settings
 */
export default mergeConfig(baseConfig, {
  test: {
    include: ['**/*.stories.{js,jsx,ts,tsx}', '**/*.story.{js,jsx,ts,tsx}'],
    setupFiles: [
      './src/test/setup.ts',
      './src/test/storybook-setup.ts'
    ]
  }
});