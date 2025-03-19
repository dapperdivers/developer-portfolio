# Design System Tokens

This document outlines the design token system used in the Developer Portfolio project. Design tokens are the visual design atoms of the design system — specifically, they are named entities that store visual design attributes.

## Token Organization

Design tokens are organized in the `src/assets/css/design-system/tokens/` directory, with each category in its own file:

```
src/assets/css/design-system/tokens/
├── colors.css       # Color tokens
├── typography.css   # Typography tokens
├── spacing.css      # Spacing tokens
├── borders.css      # Border tokens
├── shadows.css      # Shadow tokens
├── transitions.css  # Transition tokens
├── breakpoints.css  # Breakpoint tokens
└── z-index.css      # Z-index tokens
```

These token files are imported in `src/assets/css/design-system/index.css`, which is then imported in the main CSS file.

## Token Categories

### Colors

Color tokens define the color palette used throughout the application. They are organized into the following groups:

- **Primary**: Main brand colors
- **Secondary**: Supporting brand colors
- **Semantic**: Colors with specific meanings (success, error, warning, info)
- **Neutrals**: Grayscale colors for text, backgrounds, and borders

```css
/* src/assets/css/design-system/tokens/colors.css */
:root {
  /* Primary Colors */
  --color-primary: #007bff;
  --color-primary-light: #4da3ff;
  --color-primary-dark: #0056b3;
  
  /* Secondary Colors */
  --color-secondary: #6c757d;
  --color-secondary-light: #a1a8ae;
  --color-secondary-dark: #494f54;
  
  /* Semantic Colors */
  --color-success: #28a745;
  --color-error: #dc3545;
  --color-warning: #ffc107;
  --color-info: #17a2b8;
  
  /* Neutrals */
  --color-white: #ffffff;
  --color-gray-100: #f8f9fa;
  --color-gray-200: #e9ecef;
  --color-gray-300: #dee2e6;
  --color-gray-400: #ced4da;
  --color-gray-500: #adb5bd;
  --color-gray-600: #6c757d;
  --color-gray-700: #495057;
  --color-gray-800: #343a40;
  --color-gray-900: #212529;
  --color-black: #000000;
  
  /* Functional Colors */
  --color-text: var(--color-gray-900);
  --color-text-light: var(--color-gray-600);
  --color-background: var(--color-white);
  --color-background-light: var(--color-gray-100);
  --color-border: var(--color-gray-300);
}
```

### Typography

Typography tokens define font families, sizes, weights, and line heights:

```css
/* src/assets/css/design-system/tokens/typography.css */
:root {
  /* Font Families */
  --font-family-primary: 'Roboto', sans-serif;
  --font-family-secondary: 'Montserrat', sans-serif;
  --font-family-code: 'Source Code Pro', monospace;
  
  /* Font Sizes */
  --font-size-xs: 0.75rem;    /* 12px */
  --font-size-sm: 0.875rem;   /* 14px */
  --font-size-md: 1rem;       /* 16px */
  --font-size-lg: 1.125rem;   /* 18px */
  --font-size-xl: 1.25rem;    /* 20px */
  --font-size-2xl: 1.5rem;    /* 24px */
  --font-size-3xl: 1.875rem;  /* 30px */
  --font-size-4xl: 2.25rem;   /* 36px */
  --font-size-5xl: 3rem;      /* 48px */
  
  /* Font Weights */
  --font-weight-light: 300;
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  
  /* Line Heights */
  --line-height-tight: 1.25;
  --line-height-snug: 1.375;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.625;
  --line-height-loose: 2;
  
  /* Letter Spacing */
  --letter-spacing-tight: -0.025em;
  --letter-spacing-normal: 0;
  --letter-spacing-wide: 0.025em;
  --letter-spacing-wider: 0.05em;
  --letter-spacing-widest: 0.1em;
}
```

### Spacing

Spacing tokens define consistent spacing values throughout the application:

```css
/* src/assets/css/design-system/tokens/spacing.css */
:root {
  --spacing-0: 0;
  --spacing-1: 0.25rem;   /* 4px */
  --spacing-2: 0.5rem;    /* 8px */
  --spacing-3: 0.75rem;   /* 12px */
  --spacing-4: 1rem;      /* 16px */
  --spacing-5: 1.25rem;   /* 20px */
  --spacing-6: 1.5rem;    /* 24px */
  --spacing-8: 2rem;      /* 32px */
  --spacing-10: 2.5rem;   /* 40px */
  --spacing-12: 3rem;     /* 48px */
  --spacing-16: 4rem;     /* 64px */
  --spacing-20: 5rem;     /* 80px */
  --spacing-24: 6rem;     /* 96px */
  --spacing-32: 8rem;     /* 128px */
  
  /* Semantic Spacing */
  --spacing-xs: var(--spacing-1);
  --spacing-sm: var(--spacing-2);
  --spacing-md: var(--spacing-4);
  --spacing-lg: var(--spacing-6);
  --spacing-xl: var(--spacing-8);
  --spacing-2xl: var(--spacing-12);
  --spacing-3xl: var(--spacing-16);
  --spacing-4xl: var(--spacing-20);
}
```

### Borders

Border tokens define border widths, styles, and radiuses:

```css
/* src/assets/css/design-system/tokens/borders.css */
:root {
  /* Border Widths */
  --border-width-none: 0;
  --border-width-thin: 1px;
  --border-width-medium: 2px;
  --border-width-thick: 4px;
  
  /* Border Styles */
  --border-style-solid: solid;
  --border-style-dashed: dashed;
  --border-style-dotted: dotted;
  
  /* Border Radiuses */
  --border-radius-none: 0;
  --border-radius-sm: 0.125rem;  /* 2px */
  --border-radius-md: 0.25rem;   /* 4px */
  --border-radius-lg: 0.5rem;    /* 8px */
  --border-radius-xl: 1rem;      /* 16px */
  --border-radius-full: 9999px;
  
  /* Semantic Borders */
  --border-default: var(--border-width-thin) var(--border-style-solid) var(--color-border);
  --border-focus: var(--border-width-medium) var(--border-style-solid) var(--color-primary);
  --border-error: var(--border-width-thin) var(--border-style-solid) var(--color-error);
}
```

### Shadows

Shadow tokens define box shadows for different elevation levels:

```css
/* src/assets/css/design-system/tokens/shadows.css */
:root {
  /* Box Shadows */
  --shadow-none: none;
  --shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05);
  --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04);
  --shadow-2xl: 0 25px 50px rgba(0, 0, 0, 0.25);
  --shadow-inner: inset 0 2px 4px rgba(0, 0, 0, 0.06);
  
  /* Semantic Shadows */
  --shadow-card: var(--shadow-sm);
  --shadow-dropdown: var(--shadow-md);
  --shadow-modal: var(--shadow-lg);
  --shadow-popover: var(--shadow-md);
}
```

### Transitions

Transition tokens define durations and easing functions:

```css
/* src/assets/css/design-system/tokens/transitions.css */
:root {
  /* Durations */
  --duration-instant: 0ms;
  --duration-fast: 150ms;
  --duration-normal: 300ms;
  --duration-slow: 500ms;
  --duration-slower: 700ms;
  
  /* Easing Functions */
  --easing-linear: linear;
  --easing-ease: ease;
  --easing-ease-in: ease-in;
  --easing-ease-out: ease-out;
  --easing-ease-in-out: ease-in-out;
  
  /* Semantic Transitions */
  --transition-hover: var(--duration-fast) var(--easing-ease-out);
  --transition-focus: var(--duration-normal) var(--easing-ease-in-out);
  --transition-expand: var(--duration-normal) var(--easing-ease-out);
  --transition-fade: var(--duration-normal) var(--easing-ease-in-out);
}
```

### Breakpoints

Breakpoint tokens define responsive design breakpoints:

```css
/* src/assets/css/design-system/tokens/breakpoints.css */
:root {
  --breakpoint-xs: 0;
  --breakpoint-sm: 576px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 992px;
  --breakpoint-xl: 1200px;
  --breakpoint-2xl: 1400px;
}
```

### Z-Index

Z-index tokens define stacking contexts:

```css
/* src/assets/css/design-system/tokens/z-index.css */
:root {
  --z-index-hide: -1;
  --z-index-base: 0;
  --z-index-raised: 1;
  --z-index-dropdown: 1000;
  --z-index-sticky: 1100;
  --z-index-fixed: 1200;
  --z-index-modal: 1300;
  --z-index-popover: 1400;
  --z-index-tooltip: 1500;
}
```

## Using Design Tokens

### In CSS

Use design tokens in CSS files by referencing the CSS variables:

```css
.button {
  background-color: var(--color-primary);
  color: var(--color-white);
  font-family: var(--font-family-primary);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
  padding: var(--spacing-2) var(--spacing-4);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-hover);
}

.button:hover {
  background-color: var(--color-primary-dark);
  box-shadow: var(--shadow-md);
}
```

### In JavaScript

Access design tokens in JavaScript using the `getComputedStyle` method:

```javascript
const getDesignToken = (token) => {
  return getComputedStyle(document.documentElement).getPropertyValue(token);
};

const primaryColor = getDesignToken('--color-primary');
```

### Responsive Design

Use breakpoint tokens with media queries:

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

## Benefits of Design Tokens

- **Consistency**: Ensures visual consistency across the application
- **Maintainability**: Makes it easier to update the design system
- **Scalability**: Supports theme variations and responsive design
- **Documentation**: Provides a clear reference for designers and developers
- **Collaboration**: Improves communication between design and development

## Best Practices

- Use semantic token names when appropriate (e.g., `--color-primary` instead of `--color-blue`)
- Keep the token system flat and avoid deep nesting
- Document the purpose and usage of each token
- Use design tokens consistently throughout the application
- Update the token system when design requirements change