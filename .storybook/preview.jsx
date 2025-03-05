/** @type { import('@storybook/react').Preview } */
import { fn } from '@storybook/test';
import React from 'react';
import theme from './theme';

// Import CSS with new structured paths
import '../src/assets/css/design-system/index.css'; // Design system tokens and base styles
import '../src/assets/css/utilities/index.css'; // Utility classes
import '../src/assets/css/components/index.css'; // Component styles

// Import design system tokens CSS
import '../src/assets/css/design-system/tokens/colors.css';
import '../src/assets/css/design-system/tokens/typography.css';
import '../src/assets/css/design-system/tokens/spacing.css';
import '../src/assets/css/design-system/tokens/borders.css';
import '../src/assets/css/design-system/tokens/shadows.css';
import '../src/assets/css/design-system/tokens/transitions.css';
import '../src/assets/css/design-system/tokens/breakpoints.css';
import '../src/assets/css/design-system/tokens/z-index.css';

// Import base CSS styles
import '../src/assets/css/design-system/base.css';
const preview = {
  argTypes: {
    onClick: { action: 'clicked', defaultValue: fn() },
    onMouseEnter: { action: 'mouse entered', defaultValue: fn() },
    onMouseLeave: { action: 'mouse left', defaultValue: fn() },
    onChange: { action: 'changed', defaultValue: fn() },
    onSubmit: { action: 'submitted', defaultValue: fn() }
  },
  parameters: {
    actions: {},
    docs: {
      theme: theme, // Apply our custom theme
    },
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
      <div style={{ padding: '1rem' }}>
        <Story />
      </div>
    )
  ]
};

export default preview;
