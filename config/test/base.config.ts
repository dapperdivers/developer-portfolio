import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { createAliases, dirs } from '../vite/base/paths';

/**
 * Base Vitest configuration
 * 
 * This configuration provides common settings shared across all test types:
 * - React plugin setup
 * - JSDOM test environment
 * - Global test setup files
 * - Coverage reporting configuration
 * - Path aliases for imports
 * - Common test exclusions
 */
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: [path.join(dirs.src, 'test/setup.ts')],
    mockReset: false,
    clearMocks: true,
    testTimeout: 10000,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      reportsDirectory: './coverage',
      exclude: [
        'node_modules/**',
        'src/test/**',
        '**/*.d.ts',
        '**/*.config.*',
        '**/coverage/**',
        '**/*.stories.*',
        '**/*.story.*'
      ]
    },
    exclude: [
      'node_modules/**',
      'dist/**',
      '.idea/**',
      '.git/**',
      '.cache/**'
    ]
  },
  resolve: {
    // Single source of truth for aliases, shared with the Vite build
    alias: createAliases()
  }
});