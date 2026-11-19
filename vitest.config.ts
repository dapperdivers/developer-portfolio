import { mergeConfig } from 'vitest/config';
import unitConfig from './config/test/unit.config';

/**
 * Root Vitest configuration
 *
 * Runs the unit/component tests under src/. Shared settings (jsdom, globals,
 * setup file, aliases) live in config/test/base.config.ts.
 * Browser end-to-end tests live in e2e/ and run with Playwright.
 */
export default mergeConfig(unitConfig, {
  test: {
    name: 'unit',
    root: './src'
  }
});
