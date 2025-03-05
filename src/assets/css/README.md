# CSS Assets Organization

This directory contains all CSS assets organized by purpose and abstraction level, following atomic design principles.

## Directory Structure

```
css/
├── design-system/       # Design system implementation
│   ├── tokens/          # Design tokens (colors, spacing, typography)
│   ├── base.css         # Base styles and resets
│   └── index.css        # Imports all design system files
├── components/          # Component-specific styles
├── utilities/           # Utility styles and helpers
└── vendor/              # Third-party CSS
```

## Naming Conventions

- CSS files for components should match the component name using kebab-case
  - Example: `button.css` for `Button.jsx`
- Design token files should represent a clear category
  - Example: `colors.css`, `typography.css`
- Utility files should describe their purpose
  - Example: `animations.css`, `browser-fixes.css`

## CSS Organization Guidelines

### Design System Tokens

- Design tokens are implemented using CSS custom properties (variables)
- Each token category has its own file for better maintainability
- All tokens are defined on the `:root` selector for global access
- Token naming follows the pattern: `--category-subcategory-variant`
  - Example: `--color-primary-500`, `--spacing-4`

### Component Styles

- Component-specific CSS should be modular and isolated
- Styles should utilize design tokens for consistency
- Class naming follows component name + element approach
  - Example: `.button`, `.button__icon`

### Utilities

- Utility CSS provides helper classes for common styling needs
- Browser-specific fixes are isolated in their own file
- Animation and transition utilities are standardized

### Vendor Files

- Third-party CSS is isolated in the vendor directory
- Minimized versions are preferred for production
- Keep original source files for reference when available
