# CSS Architecture

This document outlines the CSS architecture for the Developer Portfolio project, explaining how the styling system is organized and how to extend it.

## Directory Structure

```
src/assets/css/
├── index.css                # Main CSS entry point
├── tailwind.css             # Tailwind configuration and component extensions
├── README.md                # This documentation file
├── browser-fixes.css        # Browser-specific fixes and polyfills
├── design-system/           # Design system architecture
│   ├── index.css            # Imports all design tokens
│   ├── base.css             # Reset and base element styling
│   └── tokens/              # Design tokens organized by category
│       ├── colors.css       # Color palette and semantic colors
│       ├── typography.css   # Font families, sizes, weights, etc.
│       ├── spacing.css      # Spacing scale and semantic spacing
│       ├── borders.css      # Border widths, radii, etc.
│       ├── shadows.css      # Box shadows for different elevations
│       ├── transitions.css  # Transition properties
│       ├── breakpoints.css  # Responsive breakpoints
│       └── z-index.css      # Z-index scale
├── components/              # Component-specific styles
│   ├── index.css            # Imports all component styles
│   ├── ui/                  # UI component styles
│   └── layout/              # Layout component styles
├── utilities/               # Utility classes
│   ├── index.css            # Imports all utilities
│   └── animations.css       # Animation utilities
└── [legacy section files]   # Legacy CSS files being gradually migrated
```

## Import Hierarchy

The import hierarchy is designed to ensure that styles are loaded in the correct order:

1. **Design Tokens**: CSS variables that define the design system foundations
2. **Tailwind**: Tailwind CSS base, components, and utilities with design token integration
3. **Component Styles**: Specific styles for components not handled by Tailwind
4. **Utilities**: Additional utility classes that extend Tailwind
5. **Legacy Styles**: Old section-specific CSS files being gradually migrated

## Design System

Our design system is implemented through CSS variables (custom properties) that are organized into separate token files by category. This provides a single source of truth for all design values used throughout the application.

### Using Design Tokens

Design tokens should be used via Tailwind classes when possible:

```jsx
// Preferred: Using Tailwind classes
<button className="bg-primary text-white px-4 py-2 rounded">Button</button>

// When needed: Direct CSS variable usage
<div style={{ backgroundColor: 'var(--color-primary)' }}>Custom element</div>
```

### Extending the Design System

To add new design tokens:

1. Identify the appropriate token category file
2. Add the new token following the existing naming conventions
3. If needed, update the Tailwind config to make the token available as a Tailwind class

## Tailwind Extensions

We extend Tailwind in two ways:

1. **Theme Extension**: In `tailwind.config.cjs`, we extend Tailwind's theme using our design tokens
2. **Custom Components**: In `tailwind.css`, we define custom component classes using `@layer components`

## Migration Path

We are gradually migrating from legacy CSS files to Tailwind:

1. For each legacy CSS file:
   - Convert styles to Tailwind utility classes in component JSX
   - For component-specific styles, add them to `@layer components` in `tailwind.css`
   - For complex components, create a dedicated CSS file in `components/ui/` or `components/layout/`

2. Once a section is fully migrated:
   - Remove its import from the legacy section in `index.css`
   - Document the migration in `activeContext.md`

## Best Practices

1. **Use Tailwind First**: Prefer Tailwind utility classes for styling
2. **Component Encapsulation**: Keep component-specific styles with their components
3. **Design Token Consistency**: Always use design tokens for values like colors, spacing, etc.
4. **Documentation**: Document complex styles and custom components
5. **Performance**: Be mindful of CSS specificity and performance

## Common Patterns

### Responsive Design

Use Tailwind's responsive prefixes:

```jsx
<div className="w-full md:w-1/2 lg:w-1/3">Responsive width</div>
```

### Dark Mode Support

Use Tailwind's dark mode utilities when adding dark mode support:

```jsx
<div className="bg-white text-gray-900 dark:bg-gray-800 dark:text-white">
  Works in light and dark mode
</div>
```

### Animation

Use Tailwind's animation utilities or define custom animations in the utilities directory:

```jsx
<div className="animate-fadeIn">Fades in</div>
