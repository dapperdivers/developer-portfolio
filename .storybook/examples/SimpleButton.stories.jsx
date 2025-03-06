import React from 'react';

// Simple button component
const SimpleButton = ({ label = 'Click Me' }) => (
  <button style={{ padding: '10px 20px', background: 'blue', color: 'white', border: 'none', borderRadius: '4px' }}>
    {label}
  </button>
);

// Storybook configuration
export default {
  title: 'Example/SimpleButton',
  component: SimpleButton,
};

// Story definition
export const Basic = () => <SimpleButton />;
export const WithLabel = () => <SimpleButton label="Custom Label" />;