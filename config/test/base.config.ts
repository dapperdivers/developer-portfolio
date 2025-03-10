import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

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
    setupFiles: ['./src/test/setup.ts'],
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
    alias: {
      '@': path.resolve(__dirname, '../../src'),
      '@components': path.resolve(__dirname, '../../src/components'),
      '@atoms': path.resolve(__dirname, '../../src/components/atoms'),
      '@molecules': path.resolve(__dirname, '../../src/components/molecules'),
      '@organisms': path.resolve(__dirname, '../../src/components/organisms'),
      '@utils': path.resolve(__dirname, '../../src/utils'),
      '@hooks': path.resolve(__dirname, '../../src/hooks'),
      '@context': path.resolve(__dirname, '../../src/context'),
      '@assets': path.resolve(__dirname, '../../src/assets'),
      '@styles': path.resolve(__dirname, '../../src/styles')
    }
  }
});