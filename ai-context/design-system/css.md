# CSS Methodology

This document outlines the CSS methodology and patterns used in the Developer Portfolio project. The project uses a combination of CSS Modules, BEM naming convention, and design tokens to create a maintainable and scalable CSS architecture.

## CSS Organization

### Directory Structure

CSS files are organized as follows:

```
src/
├── assets/
│   └── css/
│       ├── global.css             # Global styles
│       ├── typography.css         # Typography styles
│       ├── browser-fixes.css      # Browser compatibility fixes
│       ├── index.css              # Main CSS entry point
│       ├── tailwind.css           # Tailwind CSS entry point
│       ├── components/            # Shared component styles
│       ├── design-system/         # Design system tokens
│       └── utilities/             # Utility classes
└── components/
    └── [type]/
        └── [ComponentName]/
            └── [ComponentName].css  # Component-specific styles
```

### CSS Modules

The project uses CSS Modules for component-specific styles. CSS Modules provide local scoping of CSS by automatically creating unique class names, which helps prevent style conflicts.

Example:

```jsx
// Button.jsx
import styles from './Button.css';

const Button = ({ variant, children }) => (
  <button className={`${styles.button} ${styles[`button--${variant}`]}`}>
    {children}
  </button>
);
```

```css
/* Button.css */
.button {
  /* Base button styles */
}

.button--primary {
  /* Primary button styles */
}

.button--secondary {
  /* Secondary button styles */
}
```

### BEM Naming Convention

The project follows the BEM (Block, Element, Modifier) naming convention for CSS classes:

- **Block**: The component name (e.g., `button`)
- **Element**: A part of the component, denoted by double underscores (e.g., `button__icon`)
- **Modifier**: A variant of the component, denoted by double hyphens (e.g., `button--primary`)

Example:

```css
/* Block */
.card {
  /* Card styles */
}

/* Element */
.card__header {
  /* Card header styles */
}

.card__content {
  /* Card content styles */
}

.card__footer {
  /* Card footer styles */
}

/* Modifier */
.card--featured {
  /* Featured card styles */
}
```

## Design Tokens

The project uses design tokens for consistent visual attributes. These tokens are defined as CSS variables in the `src/assets/css/design-system/tokens/` directory.

Example:

```css
/* Using design tokens */
.button {
  background-color: var(--color-primary);
  color: var(--color-white);
  font-size: var(--font-size-md);
  padding: var(--spacing-2) var(--spacing-4);
  border-radius: var(--border-radius-md);
  transition: all var(--transition-hover);
}
```

See [Design System Tokens](./tokens.md) for more details on the token system.

## Global Styles

Global styles are defined in `src/assets/css/global.css` and include:

- Reset/normalize styles
- Base element styles
- Global typography
- Utility classes

Example:

```css
/* global.css */
/* Reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Base element styles */
body {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-md);
  line-height: var(--line-height-normal);
  color: var(--color-text);
  background-color: var(--color-background);
}

/* Global link styles */
a {
  color: var(--color-primary);
  text-decoration: none;
  transition: color var(--transition-hover);
}

a:hover {
  color: var(--color-primary-dark);
}
```

## Responsive Design

The project follows a mobile-first approach to responsive design, using breakpoint tokens for media queries:

```css
.container {
  padding: var(--spacing-4);
}

@media (min-width: var(--breakpoint-md)) {
  .container {
    padding: var(--spacing-6);
  }
}

@media (min-width: var(--breakpoint-lg)) {
  .container {
    padding: var(--spacing-8);
  }
}
```

## Utility Classes

Utility classes provide single-purpose styling that can be applied directly to HTML elements. They are defined in `src/assets/css/utilities/` and follow a consistent naming pattern.

Example:

```css
/* utilities/spacing.css */
.m-0 { margin: var(--spacing-0); }
.m-1 { margin: var(--spacing-1); }
.m-2 { margin: var(--spacing-2); }
/* ... */

.mt-0 { margin-top: var(--spacing-0); }
.mt-1 { margin-top: var(--spacing-1); }
.mt-2 { margin-top: var(--spacing-2); }
/* ... */

.p-0 { padding: var(--spacing-0); }
.p-1 { padding: var(--spacing-1); }
.p-2 { padding: var(--spacing-2); }
/* ... */
```

## CSS Best Practices

### Selector Specificity

- Keep selector specificity as low as possible
- Avoid using IDs for styling
- Limit nesting to a maximum of 3 levels
- Use classes instead of element selectors when possible

### CSS Properties

- Group related properties together
- Use shorthand properties when appropriate
- Use design tokens instead of hardcoded values
- Avoid using `!important`

Example:

```css
/* Good */
.button {
  /* Positioning */
  position: relative;
  z-index: var(--z-index-raised);
  
  /* Box model */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-2) var(--spacing-4);
  
  /* Typography */
  font-family: var(--font-family-primary);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
  
  /* Visual */
  background-color: var(--color-primary);
  color: var(--color-white);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-sm);
  
  /* Misc */
  cursor: pointer;
  transition: all var(--transition-hover);
}
```

### Media Queries

- Use breakpoint tokens for consistent breakpoints
- Follow a mobile-first approach
- Group media queries at the end of the component styles

### Performance

- Avoid expensive properties (e.g., `box-shadow`, `filter`)
- Use `will-change` property sparingly and only when needed
- Minimize the use of CSS animations for better performance
- Use `transform` and `opacity` for animations when possible

Example:

```css
.card {
  transition: transform var(--transition-hover);
}

.card:hover {
  transform: translateY(-4px);
}
```

## CSS Modules Configuration

CSS Modules are configured in the project's build system (Vite) to automatically generate unique class names for component styles.

Example configuration in `vite.config.js`:

```js
export default defineConfig({
  css: {
    modules: {
      localsConvention: 'camelCase',
      generateScopedName: '[name]__[local]___[hash:base64:5]',
    },
  },
});
```

## Tailwind CSS Integration

The project uses Tailwind CSS for utility-based styling. Tailwind is configured to use the project's design tokens.

Example configuration in `tailwind.config.js`:

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        // ...
      },
      spacing: {
        '1': 'var(--spacing-1)',
        '2': 'var(--spacing-2)',
        // ...
      },
      // ...
    },
  },
  // ...
};
```

## CSS Variables

CSS variables (custom properties) are used for design tokens and dynamic values:

```css
/* Static CSS variables (design tokens) */
:root {
  --color-primary: #007bff;
  --spacing-4: 1rem;
}

/* Dynamic CSS variables */
.theme-dark {
  --color-background: #121212;
  --color-text: #ffffff;
}

.theme-light {
  --color-background: #ffffff;
  --color-text: #121212;
}
```

## Browser Compatibility

The project includes browser fixes and fallbacks for cross-browser compatibility:

```css
/* browser-fixes.css */
/* Fix for Firefox */
@-moz-document url-prefix() {
  .selector {
    /* Firefox-specific styles */
  }
}

/* Fix for Safari */
@supports (-webkit-touch-callout: none) {
  .selector {
    /* Safari-specific styles */
  }
}
```

## CSS Comments

Use comments to document complex styles and explain the purpose of CSS rules:

```css
/* ==========================================================================
   Component: Button
   ========================================================================== */

/**
 * Button component styles.
 * 1. Ensure proper vertical alignment
 * 2. Prevent text selection
 * 3. Ensure proper spacing for icons
 */

.button {
  display: inline-flex; /* 1 */
  align-items: center; /* 1 */
  user-select: none; /* 2 */
  gap: var(--spacing-2); /* 3 */
  /* ... */
}
```

## CSS Linting

The project uses stylelint for CSS linting to enforce consistent coding style and catch errors:

```json
// .stylelintrc.json
{
  "extends": "stylelint-config-standard",
  "rules": {
    "selector-class-pattern": "^[a-z][a-zA-Z0-9]*(__[a-z][a-zA-Z0-9]*)?(--[a-z][a-zA-Z0-9]*)?$",
    "declaration-property-value-disallowed-list": {
      "/^border/": ["none"],
      "font-weight": ["normal"],
      "color": ["#fff", "#000"]
    }
  }
}
```

## CSS Optimization

The project includes CSS optimization in the build process:

- Minification
- Autoprefixing
- Unused CSS removal
- CSS splitting

These optimizations are configured in the build system (Vite) and PostCSS.

Example PostCSS configuration:

```js
// postcss.config.js
module.exports = {
  plugins: [
    require('autoprefixer'),
    require('cssnano')({
      preset: 'default',
    }),
  ],
};