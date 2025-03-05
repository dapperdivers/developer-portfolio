# Storybook Stories

This directory contains Storybook stories organized according to the Atomic Design methodology.

## Directory Structure

- `atoms/` - Stories for basic UI components (Button, Card, Input)
- `molecules/` - Stories for composite components made of atoms (Cards, Form groups)
- `organisms/` - Stories for full sections of the page
- `templates/` - Stories for layout components and page templates
- `design-system/` - Stories for design tokens and visual design elements
- `utils/` - Helper utilities for Storybook
- `assets/` - Static assets used in Storybook
- `legacy/` - Legacy stories for reference

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
