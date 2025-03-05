# Tailwind CSS Style Guide

This guide outlines the standards and best practices for component styling using Tailwind CSS in our portfolio project, ensuring consistency and maintainability across the codebase.

## Table of Contents

1. [Tailwind Implementation](#tailwind-implementation)
2. [Component Style Structure](#component-style-structure)
3. [Design Token Integration](#design-token-integration)
4. [Naming Conventions](#naming-conventions)
5. [Responsive Design](#responsive-design)
6. [Accessibility Considerations](#accessibility-considerations)
7. [Performance Optimizations](#performance-optimizations)
8. [Custom Utilities](#custom-utilities)

## Tailwind Implementation

Our project uses Tailwind CSS v3.3.3 with a custom configuration. Component styles are organized in the main Tailwind CSS file with a layer-based approach:

```
src/assets/css/
└── tailwind.css    # Main CSS file with all component styles
```

### Layer Structure

We use Tailwind's layer system to organize our styles:

```css
/* Import design system tokens - preserved as CSS variables */
@import './design-system/index.css';

/* Tailwind CSS Base Layers */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom component styles that extend Tailwind */
@layer components {
  /* Button styles */
  .btn { ... }
  
  /* Card styles */
  .card { ... }
  
  /* ... more component styles ... */
}

/* Custom utilities that extend Tailwind */
@layer utilities {
  /* Custom utility classes */
  .text-gradient { ... }
  
  /* ... more utility classes ... */
}
```

## Component Style Structure

Our component styling approach combines utility-first Tailwind classes with custom component classes in the `@layer components` section of our tailwind.css file.

### Utility-First Approach

We use Tailwind utility classes directly in JSX for most styling needs:

```jsx
<button 
  className="inline-flex items-center justify-center px-4 py-2 rounded-md 
             bg-primary text-white font-medium hover:bg-primary-dark
             transition-all duration-200"
>
  Click Me
</button>
```

### Component Classes

For complex, reusable components, we define component classes in the `@layer components` section:

```css
@layer components {
  .btn {
    @apply inline-flex items-center justify-center font-medium leading-normal 
           text-center no-underline whitespace-nowrap align-middle cursor-pointer 
           select-none relative overflow-hidden px-button-x py-button-y 
           border border-solid border-transparent rounded 
           transition-all duration-200 ease-in-out;
  }
  
  .btn-primary {
    @apply bg-primary text-white border-primary;
  }
  
  .btn-primary:hover, .btn-primary:focus {
    @apply bg-primary-dark border-primary-dark shadow-sm;
  }
}
```

This allows for a simple, semantic usage in JSX:

```jsx
<button className="btn btn-primary">Click Me</button>
```

## Design Token Integration

We've integrated our design tokens with Tailwind's theme system while preserving our CSS custom properties.

### Theme Extensions

In `tailwind.config.cjs`, we extend Tailwind's theme using our design tokens:

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary)',
          light: 'var(--color-primary-light)',
          dark: 'var(--color-primary-dark)',
        },
        // ...more color tokens
      },
      spacing: {
        'button-x': 'var(--button-padding-x)',
        'button-y': 'var(--button-padding-y)',
        // ...more spacing tokens
      },
      // ...other token categories
    }
  }
}
```

### Naming Conventions

When creating component or utility classes in tailwind.css:

- Use kebab-case for all class names (lowercase with hyphens)
- Prefix component classes with the component name to avoid collisions
- Keep utility classes short and descriptive
- Follow Tailwind's naming patterns where appropriate

## Responsive Design

Tailwind's responsive utilities follow a mobile-first approach. We use breakpoint prefixes for responsive adjustments:

```jsx
<div className="w-full md:w-1/2 lg:w-1/3 p-4">
  {/* Full width on mobile, half width on tablets, one-third on desktop */}
</div>
```

### Custom Breakpoint Extensions

Our custom breakpoints in `tailwind.config.cjs` match our design system:

```js
screens: {
  sm: 'var(--breakpoint-sm)', // 640px
  md: 'var(--breakpoint-md)', // 768px 
  lg: 'var(--breakpoint-lg)', // 1024px
  xl: 'var(--breakpoint-xl)', // 1280px
  '2xl': 'var(--breakpoint-xxl)', // 1536px
}
```

### Responsive Component Classes

For complex responsive patterns, we create responsive variants in `@layer components`:

```css
@layer components {
  .card {
    @apply p-4 md:p-6 lg:p-8;
  }
  
  /* Responsive grid for skills */
  .skills-grid {
    @apply grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6;
  }
}
```

## Accessibility Considerations

### Focus States

All interactive elements should have clear focus states:

```css
@layer components {
  .btn:focus {
    @apply outline-none ring-2 ring-primary/50;
  }
  
  .btn:focus-visible {
    @apply outline outline-2 outline-primary outline-offset-2;
  }
}
```

### Reduced Motion

We respect user preferences for reduced motion using Tailwind's utilities and a custom media query:

```css
/* In component definition */
@media (prefers-reduced-motion: reduce) {
  .animation-element {
    @apply transition-none animate-none;
  }
}
```

### Screen Reader Only Content

We use the following utility for screen reader only content:

```css
@layer utilities {
  .sr-only {
    @apply absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0;
    clip: rect(0, 0, 0, 0);
  }
}
```

## Performance Optimizations

### Animation Performance

We optimize animations by using hardware-accelerated properties and Tailwind's utilities:

```css
@layer components {
  /* Hardware acceleration for animations */
  .card-animated {
    @apply transition-transform duration-300 ease-out will-change-transform 
           hover:-translate-y-1 hover:shadow-lg;
  }
}
```

We also add these performance optimization classes to elements that need them:

```jsx
<div className="transform-gpu backface-hidden">
  {/* Hardware-accelerated content */}
</div>
```

### Critical Rendering Path

- We minimize specificity by using Tailwind's flat class structure
- We avoid deeply nested selectors in our custom component classes
- We prefer composition over inheritance in our component design

## Custom Utilities

We've extended Tailwind with custom utilities for specific project needs:

### Text Gradient

```css
@layer utilities {
  .text-gradient {
    @apply bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent;
  }
}
```

### Opacity Variants

We've added opacity variant utilities for colors:

```css
.bg-primary/90 { background-color: rgba(var(--color-primary-rgb), 0.9); }
.border-primary/50 { border-color: rgba(var(--color-primary-rgb), 0.5); }
```

### Custom Spacing

```css
/* In tailwind.config.cjs */
spacing: {
  'card': 'var(--card-padding)',
  'button-x': 'var(--button-padding-x)',
  'button-y': 'var(--button-padding-y)',
}
```

### Custom Height/Width

```css
/* In tailwind.config.cjs */
extend: {
  minHeight: {
    '80': '20rem',
  }
}
```

---

By following these guidelines, we ensure that our Tailwind implementation is maintainable, efficient, and consistent across the project.
