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
5. **Pages**: Complete portfolio page with real content
6. **Design System**: Documentation of design tokens and patterns

## Creating New Stories

### Using the Enhanced Generator Script

We've provided an enhanced script to easily generate comprehensive story files with interaction tests and detailed documentation:

```bash
# Basic usage
node scripts/generate-story.js --component=ComponentName --type=atom

# Advanced usage with all options
node scripts/generate-story.js --component=ComponentName --type=atom --interactions --context=portfolio --detailed

# Options:
# --component: Name of the component (required)
# --type: atomic design category (atom, molecule, organism, template) (required)
# --path: Custom path to the component file (optional)
# --interactions: Include interaction test templates (optional flag)
# --context: Add context support (values: portfolio, theme)
# --detailed: Add detailed documentation templates (optional flag)

# Examples:
node scripts/generate-story.js --component=Button --type=atom
node scripts/generate-story.js --component=ProjectCard --type=molecule --interactions
node scripts/generate-story.js --component=Navigation --type=organism --context=portfolio
node scripts/generate-story.js --component=Skills --type=organism --interactions --context=portfolio --detailed
node scripts/generate-story.js --component=CustomComponent --type=atom --path=src/custom/CustomComponent.jsx
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

## Interaction Testing with Play Functions

### What are Play Functions?

Play functions in Storybook allow you to create automated interaction tests for your components. They simulate user actions (clicks, typing, etc.) and verify the component responds correctly.

### Basic Play Function Structure

```jsx
MyStory.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);
  
  // Test logic here
};
```

### Step-by-Step Testing

Use the `step` function to organize your tests into logical sections:

```jsx
MyStory.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);
  
  await step('First step: Check initial state', async () => {
    await expect(canvas.getByText('Initial')).toBeInTheDocument();
  });
  
  await step('Second step: Interact with component', async () => {
    await userEvent.click(canvas.getByRole('button'));
  });
  
  await step('Third step: Verify changed state', async () => {
    await expect(canvas.getByText('Changed')).toBeInTheDocument();
  });
};
```

### Common User Interactions

```jsx
// Click a button
await userEvent.click(canvas.getByRole('button'));

// Type in an input
await userEvent.type(canvas.getByRole('textbox'), 'Hello');

// Navigate with keyboard
await userEvent.tab();
await userEvent.keyboard('{Enter}');

// Hover over element
await userEvent.hover(canvas.getByRole('button'));
```

### Testing Assertions

```jsx
// Check element exists
await expect(element).toBeInTheDocument();

// Check element is visible
await expect(element).toBeVisible();

// Check text content
await expect(element).toHaveTextContent('Text');

// Check attribute
await expect(element).toHaveAttribute('aria-expanded', 'true');

// Check CSS property
await expect(element).toHaveStyle({ display: 'flex' });

// Check element has focus
await expect(element).toHaveFocus();
```

### Best Practices for Play Functions

1. **Always use `await` with async operations**
2. **Use semantic queries** (getByRole, getByLabelText) instead of test IDs
3. **Test from the user's perspective**, not implementation details
4. **Organize steps logically** to make tests easier to understand
5. **Test both positive and negative cases**
6. **Check accessibility** as part of your tests

## Working with Context in Stories

Many components in the portfolio need access to the PortfolioContext. For these components, use the provided decorators:

```jsx
import { withPortfolioContext } from '../utils/decorators';

export default {
  decorators: [withPortfolioContext],
  // ...
};
```

For custom context data, create a specific decorator:

```jsx
const createContextWithCustomData = (customData) => {
  return (Story) => (
    <PortfolioContext.Provider value={{ ...mockPortfolioData, ...customData }}>
      <Story />
    </PortfolioContext.Provider>
  );
};

export const CustomDataStory = Template.bind({});
CustomDataStory.decorators = [
  createContextWithCustomData({ projects: customProjects })
];
```

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

## Responsive Testing

Test component responsiveness using the viewport addon and our custom decorators:

```jsx
import { withViewport } from '../utils/decorators';

export const MobileView = Template.bind({});
MobileView.decorators = [withViewport('mobile')];

export const TabletView = Template.bind({});
TabletView.decorators = [withViewport('tablet')];
```

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
- [Testing Library Documentation](https://testing-library.com/docs/)
- [Storybook Interaction Testing](https://storybook.js.org/docs/react/essentials/interactions)
