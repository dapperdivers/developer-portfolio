import { mergeConfig } from 'vitest/config';
import baseConfig from './base.config';

/**
 * Unit test configuration
 * Extends base config with unit test specific settings
 */
export default mergeConfig(baseConfig, {
  test: {
    include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    exclude: [
      'e2e/**/*', // Exclude all e2e directory files from unit tests
      '**/*.e2e.{js,jsx,ts,tsx}' // Exclude e2e test files
    ],
    coverage: {
      include: ['src/**/*.{js,jsx,ts,tsx}'],
      exclude: [
        'src/**/*.stories.{js,jsx,ts,tsx}',
        'src/**/*.e2e.{js,jsx,ts,tsx}'
      ]
    }
  }
});