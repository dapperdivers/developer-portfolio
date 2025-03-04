/** @type { import('@storybook/react').Preview } */
import { fn } from '@storybook/test';
import React from 'react';

// CSS imports
import '../src/assets/css/design-tokens.css';
import '../src/assets/css/custom-bootstrap.css';
import '../src/assets/css/typography.css';
import '../src/assets/css/component-styles.css';

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
