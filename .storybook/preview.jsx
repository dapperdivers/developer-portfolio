import { fn } from '@storybook/test';
import React from 'react';
import { PortfolioProvider } from '@context/PortfolioContext';
import { HelmetProvider } from 'react-helmet-async';

// Import polished mock to fix issues
import polishedMock from './fixes/polished-fix';

// Handle polished mock globally
if (typeof window !== 'undefined') {
  window.polished = polishedMock;
}

// Import all styles using relative paths to ensure they load
import '../src/assets/css/design-system/tokens/colors.css';
import '../src/assets/css/design-system/tokens/typography.css';
import '../src/assets/css/design-system/tokens/spacing.css';
import '../src/assets/css/design-system/tokens/borders.css';
import '../src/assets/css/design-system/tokens/shadows.css';
import '../src/assets/css/design-system/tokens/transitions.css';
import '../src/assets/css/design-system/tokens/breakpoints.css';
import '../src/assets/css/design-system/tokens/z-index.css';
import '../src/assets/css/design-system/base.css';
import '../src/assets/css/design-system/index.css';
import '../src/assets/css/utilities/index.css';
import '../src/assets/css/components/index.css';
import '../src/assets/css/tailwind.css';

// Import Storybook-specific styles
import './styles.css';

const preview = {
  argTypes: {
    onClick: { action: 'clicked', defaultValue: fn() },
    onMouseEnter: { action: 'mouse entered', defaultValue: fn() },
    onMouseLeave: { action: 'mouse left', defaultValue: fn() },
    onChange: { action: 'changed', defaultValue: fn() },
    onSubmit: { action: 'submitted', defaultValue: fn() }
  },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#121212' },
        { name: 'neutral', value: '#f8f9fa' }
      ],
    },
    layout: 'centered',
    viewport: {
      viewports: {
        mobile1: { name: 'Small Mobile', styles: { width: '320px', height: '568px' } },
        tablet: { name: 'Tablet', styles: { width: '768px', height: '1024px' } },
        desktop: { name: 'Desktop', styles: { width: '1920px', height: '1080px' } }
      },
    },
    a11y: { config: { rules: [{ id: '*', enabled: true }] } }
  },
  decorators: [
    (Story) => (
      <HelmetProvider>
        <PortfolioProvider>
          <div className="storybook-wrapper" style={{ padding: '1rem' }}>
            <Story />
          </div>
        </PortfolioProvider>
      </HelmetProvider>
    )
  ]
};

export default preview;