import { defineWorkspace } from 'vitest/config';

/**
 * Vitest workspace configuration
 * 
 * This configuration orchestrates different test workspaces:
 * - Unit tests: Component and utility unit tests
 * - Storybook tests: Component stories and visual regression tests
 * - E2E tests: End-to-end integration tests
 * 
 * To run a specific workspace:
 * - yarn test unit
 * - yarn test storybook
 * - yarn test e2e
 */
export default defineWorkspace([
  // Unit tests workspace
  {
    test: {
      name: 'unit',
      root: './src'
    },
    extends: './config/test/unit.config.ts'
  },

  // Storybook tests workspace
  {
    test: {
      name: 'storybook',
      root: './src'
    },
    extends: './config/test/storybook.config.ts'
  },

  // E2E tests workspace
  {
    test: {
      name: 'e2e',
      root: './src'
    },
    extends: './config/test/e2e.config.ts'
  }
]);