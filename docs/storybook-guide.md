# Storybook Guide for Developer Portfolio

This guide explains how to use Storybook for developing, documenting, and testing UI components following atomic design principles.

## Getting Started

### Running Storybook

```bash
# Start Storybook development server
npm run storybook

# Build Storybook for static deployment
npm run build-storybook
```

Storybook will be available at http://localhost:6006 by default.

## Atomic Design Structure

Our Storybook is organized according to atomic design principles:

1. **Atoms**: Basic UI components (Button, Card, Skill)
2. **Molecules**: Combinations of atoms (ExperienceCard, ProjectCard)
3. **Organisms**: Complex UI components (Navigation, Skills section)
4. **Templates**: Page-level components (Section)
5. **Design System**: Documentation of design tokens and patterns

## Creating New Stories

### Using the Enhanced Generator Script

We've provided an enhanced script to easily generate comprehensive story files with interaction tests and detailed documentation:

```bash
# Basic usage
npm run generate-story -- --component=ComponentName --type=atom

# Advanced usage with all options
npm run generate-story -- --component=ComponentName --type=atom --interactions --context=portfolio --detailed

# Options:
# --component: Name of the component (required)
# --type: atomic design category (atom, molecule, organism, template) (required)
# --path: Custom path to the component file (optional)
# --interactions: Include interaction test templates (optional flag)
# --context: Add context support (values: portfolio, theme)
# --detailed: Add detailed documentation templates (optional flag)

# Examples:
npm run generate-story -- --component=Button --type=atom
npm run generate-story -- --component=ProjectCard --type=molecule --interactions
npm run generate-story -- --component=Navigation --type=organism --context=portfolio
npm run generate-story -- --component=Skills --type=organism --interactions --context=portfolio --detailed
npm run generate-story -- --component=CustomComponent --type=atom --path=src/custom/CustomComponent.jsx
```

#### Generated Features Based on Options

- **--interactions**: Adds Storybook interaction testing boilerplate with step-by-step tests
- **--context**: Adds context provider decorators for components that need context
- **--detailed**: Adds comprehensive documentation sections including usage examples, property tables, accessibility notes, and edge cases

### Manual Story Creation

If you prefer to create stories manually, follow this structure:

```jsx
// src/stories/atoms/ComponentName.stories.jsx
import React from 'react';
import ComponentName from '../../components/ui/ComponentName';

export default {
  title: 'Atoms/ComponentName',
  component: ComponentName,
  tags: ['autodocs'],
  argTypes: {
    // Define controls for component props
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
      description: 'Component variant',
    },
  },
};

// Basic template
const Template = (args) => <ComponentName {...args} />;

// Create stories
export const Default = Template.bind({});
Default.args = {
  // Default props
};

export const CustomVariant = Template.bind({});
CustomVariant.args = {
  // Custom props
};
```

## Best Practices

### 1. Complete Documentation

Use the `autodocs` tag to automatically generate documentation from component JSDoc comments and PropTypes. Make sure your components have proper:

- JSDoc descriptions
- Complete PropTypes
- Examples in comments

### 2. Story Organization

- Group related stories together
- Use consistent naming conventions
- Start with a "Default" story that shows the most common usage
- Include stories for different states, variants, and edge cases

### 3. Controls & Actions

- Set up controls for all meaningful props
- Use Actions to log interactions (clicks, changes, etc.)
- Use appropriate control types (select, radio, boolean, etc.)

### 4. Accessibility Testing

Storybook includes an accessibility addon:

1. Check the "Accessibility" tab in the Storybook UI
2. Review and fix any accessibility issues
3. Test keyboard navigation and screen reader compatibility

## Working with Design Tokens

Our design tokens are documented in Storybook under "Design System/Design Tokens". When creating or editing components:

1. Reference the design tokens instead of hard-coded values
2. Use CSS variables from the design system:

```css
.my-component {
  color: var(--color-text);
  font-size: var(--font-size-base);
  padding: var(--spacing-2) var(--spacing-4);
}
```

## Testing Components

Storybook provides several ways to test components:

1. **Visual testing**: Manually interact with components in different states
2. **Accessibility testing**: Use the a11y addon to check for issues
3. **Interaction testing**: Test component interactions in the "Interactions" panel
4. **Console output**: Check browser console for warnings or errors

## Additional Features

- **Viewport addon**: Test responsiveness at different screen sizes
- **Backgrounds addon**: View components against different backgrounds
- **Docs**: View auto-generated documentation for components
- **Controls**: Dynamically change component props
- **Actions**: Monitor component events

## Resources

- [Storybook Documentation](https://storybook.js.org/docs/react/get-started/introduction)
- [Atomic Design Methodology](https://bradfrost.com/blog/post/atomic-web-design/)
- [Component-Driven Development](https://www.componentdriven.org/)
