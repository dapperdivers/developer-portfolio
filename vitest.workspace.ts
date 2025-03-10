import { defineWorkspace } from 'vitest/config';

/**
 * Vitest workspace configuration
 * 
 * This configuration orchestrates different test workspaces:
 * - Unit tests: Component and utility unit tests
 * - Storybook tests: Component stories and visual regression tests
 * - E2E tests: End-to-end integration tests
 * 
 * Each workspace extends its specific configuration from config/test/
 * which in turn extends the base configuration.
 * 
 * To run a specific workspace:
 * - yarn test unit
 * - yarn test storybook
 * - yarn test e2e
 */
export default defineWorkspace([
  // Unit tests workspace
  {
    extends: './config/test/unit.config.ts',
    test: {
      name: 'unit',
      root: './src',
      // These globals are needed for all workspaces
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./src/test/setup.ts'],
      include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
      exclude: [
        '**/node_modules/**',
        '**/dist/**',
        '**/.{idea,git,cache}/**',
        '**/*.stories.{js,jsx,ts,tsx}',
        '**/*.e2e.{js,jsx,ts,tsx}'
      ]
    }
  },

  // Storybook tests workspace
  {
    extends: './config/test/storybook.config.ts',
    test: {
      name: 'storybook',
      root: './src',
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./src/test/setup.ts'],
      include: ['**/*.stories.{js,jsx,ts,tsx}', '**/*.story.{js,jsx,ts,tsx}'],
      exclude: [
        '**/node_modules/**',
        '**/dist/**',
        '**/.{idea,git,cache}/**'
      ]
    }
  },

  // E2E tests workspace
  {
    extends: './config/test/e2e.config.ts',
    test: {
      name: 'e2e',
      root: './src',
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./src/test/setup.ts'],
      include: ['**/*.e2e.{js,jsx,ts,tsx}'],
      exclude: [
        '**/node_modules/**',
        '**/dist/**',
        '**/.{idea,git,cache}/**'
      ]
    }
  }
]);