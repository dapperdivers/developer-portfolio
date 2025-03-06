import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineWorkspace } from 'vitest/config';

const dirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// Define workspaces for different test scenarios
export default defineWorkspace([
  // Main application tests
  {
    extends: './vite.config.js',
    test: {
      name: 'unit',
      // Use browser object with enabled: false instead of just false
      browser: {
        enabled: false
      },
      // Make sure we're using the configured test settings
      setupFiles: ['./src/setupVitest.js'],
      include: [
        'src/__tests__/**/*.{test,spec}.{js,jsx}',
        'src/**/__tests__/*.{test,spec}.{js,jsx}',
        'src/components/**/*.{test,spec}.{js,jsx}',
        'src/hooks/**/*.{test,spec}.{js,jsx}'
      ]
    }
  }
  // Storybook tests commented out for now until we fix the issues
  // {
  //   extends: './vite.config.js',
  //   plugins: [
  //     // Will be added back when Storybook testing is properly set up
  //   ],
  //   test: {
  //     name: 'storybook',
  //     browser: {
  //       enabled: true,
  //       headless: true,
  //       name: 'chromium',
  //       provider: 'playwright'
  //     },
  //     // Will need a proper setup file for Storybook tests
  //   },
  // },
]);
