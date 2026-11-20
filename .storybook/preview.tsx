import React from 'react';
import type { Preview } from '@storybook/react-vite';
import { 
  withHelmetProvider, 
  withPortfolioContext,
  withAnimationContext
} from './utils';

// Load the same fonts and global stylesheets, in the same order, as src/index.tsx,
// so a component looks the same here as it does on the site.
import '../src/utils/fontLoader';
import '../src/assets/css/design-system/index.css';
import '../src/assets/css/index.css';

// Note: Component-specific CSS files are now imported directly by each component
// and don't need to be imported here. This follows the co-location principle
// where each component imports its own CSS file.

// Note: Site Navigator removed from Storybook for cleaner component development experience

/**
 * Default Storybook preview configuration
 * Controls global parameters and decorators for all stories
 */
const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'light', value: '#f8fafc' },
        { name: 'dark', value: '#1e293b' },
        { name: 'primary', value: '#0062cc' },
      ],
    },
    layout: 'centered',
    options: {
      storySort: {
        order: ['Introduction', 'Foundations', ['Components at a glance', 'Colors', 'Typography', 'Spacing and shape', 'Motion'], 'Atoms', 'Molecules', 'Organisms', 'Layout', 'Templates'],
      },
    },
  },
  
  // Global decorators applied to all stories
  decorators: [
    // Add padding around all stories first
    (Story) => (
      <div style={{ padding: '2rem' }}>
        <Story />
      </div>
    ),
    // Wrap with context providers in proper order
    withAnimationContext,
    withPortfolioContext,
    withHelmetProvider,
  ],
};

export default preview; 