# Naming Conventions

This document outlines the naming conventions used throughout the Developer Portfolio project. Consistent naming patterns help maintain code readability and organization.

## Component Naming

### Component Files

- Use **PascalCase** for component files and component names
- Match the component name exactly with the file name
- Examples:
  - `Button.jsx`
  - `ProjectCard.jsx`

### Component Directories

- Use **PascalCase** for component directories
- Match the directory name with the component name
- Examples:
  - `src/components/atoms/Button/`
  - `src/components/molecules/ProjectCard/`
  - `src/components/organisms/SkillsSection/`

## Utility and Hook Naming

### Utility Functions

- Use **camelCase** for utility functions
- Name should clearly describe the function's purpose
- Examples:
  - `formatDate.js`
  - `validateEmail.js`
  - `calculateExperience.js`

### Custom Hooks

- Use **camelCase** with `use` prefix for hooks
- Name should clearly describe the hook's purpose
- Examples:
  - `useProjects.js`
  - `useExperience.js`
  - `useIntersectionObserver.js`

## File Extensions

- React components: `.jsx` or `.tsx` (for TypeScript)
- JavaScript utilities: `.js` or `.ts` (for TypeScript)
- CSS files: `.css`
- Test files: `.test.jsx` or `.test.tsx`
- Enhanced test files: `.enhanced.test.jsx`
- Storybook stories: `.stories.jsx` or `.stories.tsx`

## CSS Naming

- CSS files match component names exactly
- Example: `Button.css` for the `Button.jsx` component
- Follow BEM (Block, Element, Modifier) naming convention for CSS classes:
  - Block: The component name (e.g., `button`)
  - Element: A part of the component (e.g., `button__icon`)
  - Modifier: A variant of the component (e.g., `button--primary`)

## Import/Export Patterns

### Default Exports

- Use default exports for components
- Example:
  ```jsx
  // Button.jsx
  const Button = (props) => { /* ... */ };
  export default Button;
  
  // index.js
  import Button from './Button';
  export default Button;
  ```

### Named Exports

- Use named exports for utility functions and hooks
- Example:
  ```jsx
  // utils.js
  export const formatDate = (date) => { /* ... */ };
  export const validateEmail = (email) => { /* ... */ };
  ```

## Prop Naming

### Standard Props

- Use **camelCase** for props
- Be descriptive and consistent
- Examples:
  - `className` for additional CSS classes
  - `variant` for style variations (primary, secondary, etc.)
  - `size` for size variations (small, medium, large)
  - `children` for component content

### Boolean Props

- Use `is` or `has` prefix for boolean props
- Examples:
  - `isDisabled` instead of `disabled`
  - `hasIcon` instead of `icon`
  - `isExternal` for external links

### Event Handler Props

- Use `on` prefix followed by the event name
- Examples:
  - `onClick` for click events
  - `onChange` for input changes
  - `onSubmit` for form submissions

## Context and Provider Naming

- Use **PascalCase** with `Context` suffix for context objects
- Use **PascalCase** with `Provider` suffix for provider components
- Examples:
  - `PortfolioContext` and `PortfolioProvider`
  - `ThemeContext` and `ThemeProvider`

## Test Naming

- Test files should match the component name with `.test.jsx` extension
- Test descriptions should clearly describe what is being tested
- Example:
  ```jsx
  // Button.test.jsx
  describe('Button component', () => {
    it('renders correctly with default props', () => { /* ... */ });
    it('applies the correct class when variant is primary', () => { /* ... */ });
  });
  ```

## Benefits of Consistent Naming

- Improves code readability and maintainability
- Makes it easier to find files and components
- Reduces cognitive load when working with the codebase
- Facilitates automated tooling and scripts
- Helps new developers understand the codebase more quickly