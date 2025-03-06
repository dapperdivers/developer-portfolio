# Storybook Configuration

This directory contains the configuration files for Storybook in this project.

## Directory Structure

- **main.ts** - Main Storybook configuration (stories, addons, framework settings)
- **preview.jsx** - Preview configuration (global decorators, parameters)
- **assets/** - Static assets used in Storybook
- **examples/** - Example stories for reference
- **templates/** - Template stories (like App.stories.jsx)
- **utils/** - Helper utilities for Storybook stories

## Component Stories

Component stories are co-located with their components:

```
src/components/[type]/[ComponentName]/
├── [ComponentName].jsx
├── [ComponentName].css
├── [ComponentName].stories.jsx  // Stories are here!
├── [ComponentName].test.jsx
└── index.js
```

## Best Practices

1. Keep story files aligned with component structure
2. Use path aliases in imports (e.g., `@atoms/Button` instead of relative paths)
3. Provide documentation and examples for each component
4. Include interactive controls and variations where appropriate
5. Make sure stories are accessible and work with keyboard navigation

## Example Story

```jsx
// Button.stories.jsx
import React from 'react';
import Button from '@atoms/Button';

export default {
  title: 'Atoms/Button',
  component: Button,
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'outline'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
};

export const Primary = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};
```

## Useful Commands

- **Start Storybook**: `yarn storybook`
- **Build Storybook**: `yarn build-storybook`
- **Generate a story**: `yarn generate-story`