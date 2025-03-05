# Component CSS Style Guide

This guide outlines the standards and best practices for component-specific CSS files in our portfolio project, ensuring consistency and maintainability across the codebase.

## Table of Contents

1. [File Organization](#file-organization)
2. [Naming Conventions](#naming-conventions)
3. [Design Token Usage](#design-token-usage)
4. [Component Structure](#component-structure)
5. [Responsive Design](#responsive-design)
6. [Accessibility Considerations](#accessibility-considerations)
7. [Performance Optimizations](#performance-optimizations)

## File Organization

Each component has its own dedicated CSS file located in the appropriate directory:

```
src/assets/css/components/
├── ui/              # UI component styles
│   ├── button.css
│   ├── card.css
│   └── ...
├── layout/          # Layout component styles
│   ├── section.css
│   ├── navigation.css
│   └── ...
└── index.css        # Main import file for all component styles
```

### Import Structure

Component CSS files are imported into the main CSS bundle via the `components/index.css` file:

```css
/* UI Components */
@import './ui/button.css';
@import './ui/card.css';
/* ... */

/* Layout Components */
@import './layout/section.css';
@import './layout/navigation.css';
/* ... */
```

## Naming Conventions

### Class Names

- Use kebab-case for all class names (lowercase with hyphens)
- Prefix class names with the component name to avoid collisions
- Use descriptive, meaningful names that reflect the purpose

Good examples:
```css
.button-primary
.card-header
.experience-card-inner
.social-links-icon
```

Poor examples:
```css
.btn
.card_header
.ExperienceCardInner
.socialLinksIcon
```

### Selector Specificity

- Keep selector specificity as low as possible
- Avoid deeply nested selectors (max 3 levels)
- Avoid using `!important` unless absolutely necessary

Good example:
```css
.card-header .title {
  color: var(--color-text-primary);
}
```

Poor example:
```css
.card .card-content div.header h4.title {
  color: #333 !important;
}
```

## Design Token Usage

Always use design tokens instead of hard-coded values. This ensures consistency and makes theme changes much easier.

### Available Token Categories

- **Colors**: `--color-*`
- **Spacing**: `--spacing-*`
- **Typography**: `--font-*`, `--line-height-*`
- **Borders**: `--border-*`
- **Shadows**: `--shadow-*`
- **Breakpoints**: `--breakpoint-*`
- **Z-Index**: `--z-index-*`
- **Transitions**: `--transition-*`

### Examples

```css
/* GOOD: Using tokens */
.component {
  padding: var(--spacing-4);
  color: var(--color-text-primary);
  font-size: var(--font-size-base);
  box-shadow: var(--shadow-md);
  transition: var(--transition-standard);
}

/* BAD: Hard-coded values */
.component {
  padding: 16px;
  color: #333333;
  font-size: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}
```

## Component Structure

Each component CSS file should follow this structure:

```css
/**
 * Component Name
 * 
 * Description of the component's purpose and usage
 */

/* Base component styles */
.component-name {
  /* Base properties */
}

/* Component parts */
.component-name-header {
  /* Header styles */
}

.component-name-body {
  /* Body styles */
}

/* Component states */
.component-name.is-active {
  /* Active state styles */
}

.component-name:hover {
  /* Hover state styles */
}

/* Accessibility considerations */
.component-name:focus {
  /* Focus styles */
}

.component-name .visually-hidden {
  /* Screen reader only content */
}

/* Responsive styles */
@media (max-width: var(--breakpoint-md)) {
  /* Tablet styles */
}

@media (max-width: var(--breakpoint-sm)) {
  /* Mobile styles */
}
```

## Responsive Design

### Mobile-First Approach

Start with base styles for mobile, then add media queries for larger screens:

```css
.component {
  /* Mobile styles */
  padding: var(--spacing-3);
  font-size: var(--font-size-sm);
}

@media (min-width: var(--breakpoint-md)) {
  /* Tablet styles */
  .component {
    padding: var(--spacing-4);
    font-size: var(--font-size-base);
  }
}

@media (min-width: var(--breakpoint-lg)) {
  /* Desktop styles */
  .component {
    padding: var(--spacing-5);
    font-size: var(--font-size-lg);
  }
}
```

### Breakpoint Variables

Always use the breakpoint variables for consistent responsive behavior:

- `--breakpoint-sm`: Small devices (mobile)
- `--breakpoint-md`: Medium devices (tablets)
- `--breakpoint-lg`: Large devices (laptops)
- `--breakpoint-xl`: Extra large devices (desktops)

## Accessibility Considerations

### Focus States

All interactive elements should have clear focus states:

```css
.button {
  /* Button styles */
}

.button:focus {
  outline: 2px solid var(--color-focus-ring);
  outline-offset: 2px;
}
```

### Reduced Motion

Respect user preferences for reduced motion:

```css
.card {
  transition: transform 0.3s ease;
}

@media (prefers-reduced-motion: reduce) {
  .card {
    transition: none;
  }
}
```

### Visual vs Screen Reader Content

Use the `.visually-hidden` class for content that should be available to screen readers but not visually:

```css
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

## Performance Optimizations

### Animation Performance

For animated components, use properties that trigger composite-only changes:

Good properties to animate:
- `transform`
- `opacity`
- `filter`

Avoid animating these properties when possible:
- `width`/`height`
- `margin`/`padding`
- `top`/`left`/`right`/`bottom`

Example:
```css
/* Good - composite only */
.component {
  transform: translateY(0);
  transition: transform 0.3s ease;
}

.component:hover {
  transform: translateY(-5px);
}

/* Bad - triggers layout */
.component {
  margin-top: 0;
  transition: margin-top 0.3s ease;
}

.component:hover {
  margin-top: -5px;
}
```

### Minimize Specificity

Use the lowest specificity possible to achieve the desired effect. This improves CSS rendering performance and makes styles easier to override.

### Will-Change Usage

Use `will-change` sparingly and only for elements that will be frequently animated:

```css
.frequently-animated {
  will-change: transform;
}
```

---

By following these guidelines, we ensure that our component CSS is maintainable, efficient, and consistent across the project.
