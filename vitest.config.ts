import { defineConfig } from 'vitest/config';
import baseConfig from './config/test/base.config';

/**
 * Root Vitest configuration
 * 
 * This configuration serves as the default test setup.
 * For workspace-specific configurations, see config/test/*.config.ts
 */
export default defineConfig({
  test: {
    include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    exclude: ['**/node_modules/**', '**/dist/**', '**/.{idea,git,cache}/**'],
    root: './src'
  }
});