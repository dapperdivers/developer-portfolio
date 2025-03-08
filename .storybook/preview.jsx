import React from 'react';
import { withHelmetProvider } from './utils/mockHelmetProvider';
import { withPortfolioContext } from './utils/decorators';

// Import global and design system styles only
import '../src/assets/css/design-system/index.css';
import '../src/assets/css/tailwind.css';
import '../src/assets/css/utilities/index.css';
import '../src/assets/css/typography.css';
import '../src/assets/css/browser-fixes.css';
import '../src/assets/css/global.css';

// Note: Component-specific CSS files are now imported directly by each component
// and don't need to be imported here. This follows the co-location principle
// where each component imports its own CSS file.

const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#f8fafc' },
        { name: 'dark', value: '#1e293b' },
        { name: 'primary', value: '#0062cc' },
      ],
    },
    layout: 'centered',
  },
  
  // Global decorators applied to all stories
  decorators: [
    // Wrap all stories with HelmetProvider
    withHelmetProvider,
    
    // Use Portfolio Context only for stories that need it
    // Comment this out if you want to apply it selectively in each story
    // withPortfolioContext,
    
    // Add padding around all stories
    (Story) => (
      <div style={{ padding: '2rem' }}>
        <Story />
      </div>
    ),
  ],
};

export default preview;