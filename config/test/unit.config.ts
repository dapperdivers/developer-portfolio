import { mergeConfig } from 'vitest/config';
import baseConfig from './base.config';

/**
 * Unit test configuration
 * Extends base config with unit test specific settings
 */
export default mergeConfig(baseConfig, {
  test: {
    include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    coverage: {
      include: ['src/**/*.{js,jsx,ts,tsx}'],
      exclude: [
        'src/**/*.stories.{js,jsx,ts,tsx}',
        'src/**/*.e2e.{js,jsx,ts,tsx}'
      ]
    }
  }
});