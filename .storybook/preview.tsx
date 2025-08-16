import React, { useEffect } from 'react';
import type { Preview } from '@storybook/react';
import { 
  withHelmetProvider, 
  withPortfolioContext,
  withAnimationContext
} from './utils';

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

/**
 * Site Navigator decorator for cross-site navigation
 */
const withSiteNavigator = (Story: any) => {
  useEffect(() => {
    // Load the site navigator script if not already loaded
    if (!document.querySelector('script[src*="site-navigator"]') && !window.customElements?.get('site-navigator')) {
      const script = document.createElement('script');
      script.src = '/site-navigator.js';
      script.defer = true;
      document.head.appendChild(script);
    }
    
    // Ensure the site navigator component is added to DOM
    const ensureNavigator = () => {
      if (!document.querySelector('site-navigator') && window.customElements?.get('site-navigator')) {
        const navigator = document.createElement('site-navigator');
        document.body.appendChild(navigator);
      }
    };
    
    // Try immediately and also after a short delay
    ensureNavigator();
    const timeout = setTimeout(ensureNavigator, 500);
    
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return <Story />;
};

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
  },
  
  // Global decorators applied to all stories
  decorators: [
    // Add padding around all stories first
    (Story) => (
      <div style={{ padding: '2rem' }}>
        <Story />
      </div>
    ),
    // Site navigator for cross-site navigation
    withSiteNavigator,
    // Then wrap with context providers in proper order
    withAnimationContext,
    withPortfolioContext,
    withHelmetProvider,
  ],
};

export default preview; 