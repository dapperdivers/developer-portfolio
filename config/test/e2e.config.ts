import { mergeConfig } from 'vitest/config';
import baseConfig from './base.config';

/**
 * E2E test configuration
 * Extends base config with E2E specific settings
 */
export default mergeConfig(baseConfig, {
  test: {
    include: ['**/*.e2e.{js,jsx,ts,tsx}'],
    environment: 'node',
    setupFiles: [
      './src/test/setup.ts',
      './src/test/e2e-setup.ts'
    ],
    testTimeout: 30000 // Longer timeout for E2E tests
  }
});