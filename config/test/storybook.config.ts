import { mergeConfig } from 'vitest/config';
import baseConfig from './base.config';

/**
 * Storybook stories test configuration
 * Ensures Storybook stories run under Vitest with the correct setup file.
 */
export default mergeConfig(baseConfig, {
  test: {
    include: ['src/**/*.stories.{js,jsx,ts,tsx}'],
    setupFiles: ['./src/test/storybook-setup.ts'],
  },
});