# Component Organization Guidelines

This document outlines the component organization structure used in the Developer Portfolio project. The project follows a feature-based organization pattern where **all files related to a component are co-located in the same directory**.

## Component Directory Structure

Each component follows this organization pattern:

```
src/components/[type]/[ComponentName]/
├── [ComponentName].jsx       # Component implementation
├── [ComponentName].css       # Component styles
├── [ComponentName].stories.jsx # Storybook stories
├── [ComponentName].test.jsx  # Component tests (if any)
├── index.js                  # Re-exports the component
└── assets/                   # Component-specific assets (if any)
```

### Example

```
src/components/atoms/Button/
├── Button.jsx
├── Button.css
├── Button.stories.jsx
├── Button.test.jsx
├── index.js
└── assets/
```

## Benefits

This organization provides several key benefits:

1. **Co-location of related files**: All files for a component are in the same directory
2. **Easier maintenance**: No need to search across the codebase to find related files
3. **Improved discovery**: Makes it easy to see all aspects of a component at once
4. **Self-contained components**: Each component directory contains everything needed for that component
5. **Better encapsulation**: Assets and styles specifically for a component stay with that component
6. **Simplified refactoring**: Moving or reusing components becomes simpler as everything moves together

## Import Patterns

Components can be imported in two ways:

```jsx
// Method 1: Using the re-export from index.js (recommended for most cases)
import Button from '@atoms/Button';

// Method 2: Direct import (when you need to access specific exports)
import Button from '@atoms/Button/Button';
```

Alias paths are configured in both `tsconfig.json` and `vite.config.js` to support these import patterns.

## Guidelines for Creating New Components

When creating a new component:

1. Create a new directory in the appropriate location (`atoms`, `molecules`, `organisms`, or `layout`)
2. Place all related files in this directory
3. Create an `index.js` file that re-exports the component:
   ```js
   import ComponentName from './ComponentName';
   export default ComponentName;
   ```
4. Use the `yarn generate-component` script which will set up the appropriate structure

## Component Types

Components are organized by type, following atomic design principles:

1. **Atoms** (`src/components/atoms/`): 
   - Basic building blocks of the interface 
   - Examples: Button, Card, Input, Icon

2. **Molecules** (`src/components/molecules/`):
   - Groups of atoms functioning together
   - Examples: SearchForm, NavigationItem, ProjectCard

3. **Organisms** (`src/components/organisms/`): 
   - Complex UI components composed of molecules and atoms
   - Examples: Header, ProjectList, SkillsSection

4. **Layout** (`src/components/layout/`):
   - Components that handle page structure
   - Examples: Section, Container, Grid

## CSS Organization

Component CSS is co-located with the component:

1. Component-specific styles are in `[ComponentName].css`
2. Use CSS classes prefixed with the component name to avoid conflicts
3. Import the CSS file directly in the component file:
   ```jsx
   import './Button.css';
   ```

## Testing

Component tests are co-located with the component:

1. Tests are named `[ComponentName].test.jsx` 
2. They test the component's functionality and rendering
3. Import the component directly in tests:
   ```jsx
   import Button from './Button';
   ```

## Storybook Stories

Storybook stories are co-located with the component:

1. Stories are named `[ComponentName].stories.jsx`
2. They showcase the component's variants and props
3. Import the component directly in stories:
   ```jsx
   import Button from './Button';
   ```

## Migration Process

The project structure has been migrated to this organization pattern using the `reorganize-components` script:

```bash
yarn reorganize-components
```

For more details on the migration, see [Component Structure Migration Guide](./component-structure-migration.md).
