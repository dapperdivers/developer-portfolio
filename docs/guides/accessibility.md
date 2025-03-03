# Accessibility Guide

This guide outlines the accessibility features implemented in the developer portfolio project and provides guidance on maintaining and enhancing accessibility.

## Accessibility Standards

The portfolio follows the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards. Key principles include:

1. **Perceivable**: Information and user interface components must be presentable to users in ways they can perceive.
2. **Operable**: User interface components and navigation must be operable.
3. **Understandable**: Information and the operation of user interface must be understandable.
4. **Robust**: Content must be robust enough to be interpreted reliably by a wide variety of user agents, including assistive technologies.

## Implemented Accessibility Features

### Semantic HTML

The portfolio uses semantic HTML elements that clearly communicate the purpose of content:

- `<header>`, `<main>`, `<footer>` for page structure
- `<nav>` for navigation
- `<section>` with appropriate ARIA landmarks
- `<article>` for self-contained content
- Proper heading hierarchy (`<h1>` through `<h6>`)

Example of proper semantic structure:

```jsx
<header>
  <nav aria-label="Main navigation">
    {/* Navigation items */}
  </nav>
</header>

<main id="content">
  <section aria-labelledby="greeting-title">
    <h1 id="greeting-title">Title</h1>
    {/* Section content */}
  </section>
  
  {/* Additional sections */}
</main>

<footer>
  {/* Footer content */}
</footer>
```

### Keyboard Navigation

All interactive elements are keyboard accessible:

- Interactive elements are focusable in a logical order
- Focus styles are visible and enhanced beyond browser defaults
- Custom components maintain keyboard navigation patterns
- No keyboard traps

Implementation example:

```jsx
// Enhanced focus styles in design-tokens.css
:root {
  --focus-ring: 0 0 0 3px rgba(0, 98, 204, 0.5);
}

:focus-visible {
  outline: none;
  box-shadow: var(--focus-ring);
}

// Button component with keyboard support
function Button({ children, onClick, ...props }) {
  return (
    <button
      onClick={onClick}
      onKeyDown={(e) => {
        // Ensure Enter and Space trigger onClick
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(e);
        }
      }}
      {...props}
    >
      {children}
    </button>
  );
}
```

### Skip Navigation

A "Skip to Content" link is available at the beginning of the page that allows keyboard users to bypass repetitive navigation:

```jsx
// src/components/SkipToContent.jsx
import React from 'react';
import './SkipToContent.css';

function SkipToContent() {
  return (
    <a href="#content" className="skip-to-content">
      Skip to content
    </a>
  );
}

export default SkipToContent;
```

### ARIA Attributes

ARIA attributes enhance the accessibility of custom components:

- `aria-label` for elements without visible text
- `aria-labelledby` to associate elements with their labels
- `aria-describedby` for additional descriptions
- `aria-expanded` for expandable components
- `aria-hidden="true"` for decorative elements
- `aria-live` regions for dynamic content

Example:

```jsx
// Card component with ARIA
<div 
  role="region"
  aria-labelledby={`card-title-${id}`}
  className="card"
>
  <h3 id={`card-title-${id}`}>{title}</h3>
  <div aria-hidden="true" className="card-decorative-element"></div>
  <div className="card-content">
    {children}
  </div>
</div>
```

### Color Contrast

All text meets WCAG AA contrast requirements:

- Normal text (below 18pt): 4.5:1 minimum contrast ratio
- Large text (18pt or 14pt bold and above): 3:1 minimum contrast ratio
- UI components and graphical objects: 3:1 minimum contrast ratio

Implementation:

```css
/* High contrast design tokens */
:root {
  --color-text: #172b4d;          /* Dark text on light background: ~13:1 ratio */
  --color-text-secondary: #5e6c84; /* Secondary text: ~7:1 ratio */
  --color-primary: #0052cc;       /* Primary color: ~4.5:1 ratio */
  --color-error: #d50000;         /* Error color: ~5:1 ratio */
}

/* Dark mode with sufficient contrast */
@media (prefers-color-scheme: dark) {
  :root {
    --color-text: #e6e6e6;         /* Light text on dark background: ~14:1 ratio */
    --color-text-secondary: #b0b8c4; /* Secondary text: ~7:1 ratio */
    --color-primary: #4c9aff;      /* Primary color: ~4.5:1 ratio */
    --color-error: #ff6b6b;        /* Error color: ~4.5:1 ratio */
  }
}
```

### Images and Non-Text Content

All images include proper alternative text:

- Informative images have descriptive alt text
- Decorative images use empty alt attributes (`alt=""`)
- Complex images have detailed descriptions
- SVG elements have appropriate ARIA labels

Example:

```jsx
// Informative image
<img src="project-screenshot.jpg" alt="Project dashboard showing analytics data" />

// Decorative image
<img src="decorative-pattern.jpg" alt="" aria-hidden="true" />

// SVG icon
<svg aria-hidden="true" focusable="false" className="icon">
  <use href="#icon-github"></use>
</svg>
```

### Screen Reader Support

Content is optimized for screen readers:

- Proper document language is specified
- Landmarks are used to identify page regions
- Accessible names are provided for all controls
- Dynamic content changes are announced
- Reading order matches visual order

Implementation:

```jsx
// HTML document language
<html lang="en">

// Live region for status updates
<div
  role="status"
  aria-live="polite"
  className="sr-only"
>
  {statusMessage}
</div>

// Visually hidden text for context
<span className="visually-hidden">
  (Opens in a new window)
</span>
```

### Motion and Animation

Motion and animations respect user preferences:

- Animations are disabled for users with `prefers-reduced-motion` enabled
- No content flashes more than three times per second
- No purely decorative animations distract from content

Example:

```css
/* In design-tokens.css */
@media (prefers-reduced-motion: reduce) {
  :root {
    --transition-fast: 0s;
    --transition-normal: 0s;
    --transition-slow: 0s;
  }
  
  * {
    animation-duration: 0.001s !important;
    transition-duration: 0.001s !important;
  }
}
```

And in React components:

```jsx
// Using a hook to check reduced motion preference
function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const onChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', onChange);
    
    return () => mediaQuery.removeEventListener('change', onChange);
  }, []);
  
  return prefersReducedMotion;
}
```

### Touch Target Size

Touch targets are appropriately sized:

- Interactive elements are at least 44×44 pixels
- Sufficient spacing between interactive elements
- No tiny buttons or links that are difficult to tap

Implementation:

```css
/* Ensuring adequate touch target sizes */
button, 
.button,
a.nav-link,
input[type="checkbox"],
input[type="radio"] {
  min-height: 44px;
  min-width: 44px;
  padding: 10px 16px;
}
```

## Testing Accessibility

The portfolio includes automated and manual accessibility testing:

### Automated Testing

We use tools to identify potential accessibility issues:

- axe DevTools for in-browser testing
- jest-axe for automated accessibility tests
- eslint-plugin-jsx-a11y for catching issues during development

Example Jest test with axe:

```jsx
import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import Button from '../components/ui/Button';

expect.extend(toHaveNoViolations);

describe('Button component', () => {
  it('should not have accessibility violations', async () => {
    const { container } = render(<Button>Click me</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

### Manual Testing

In addition to automated testing, perform these manual accessibility checks:

1. **Keyboard navigation testing**
   - Navigate through the entire site using only Tab, Shift+Tab, Enter, and arrow keys
   - Verify that focus indicators are visible
   - Ensure all functionality is available without a mouse

2. **Screen reader testing**
   - Test with at least one screen reader (NVDA, VoiceOver, or JAWS)
   - Verify that all content is announced correctly
   - Check that dynamic content updates are announced

3. **Zoom testing**
   - Test the site at 200% zoom
   - Verify that all content is still readable and usable
   - Check that no content is cut off or overlapping

## Accessibility Checklist

Use this checklist when adding new components or features:

- [ ] Semantic HTML elements are used appropriately
- [ ] Proper heading structure is maintained
- [ ] Interactive elements are keyboard accessible
- [ ] Color contrast meets WCAG AA standards
- [ ] Images have appropriate alt text
- [ ] ARIA attributes are used correctly when needed
- [ ] Touch targets are at least 44×44 pixels
- [ ] Animations respect prefers-reduced-motion
- [ ] Form elements have associated labels
- [ ] Error messages are announced to screen readers
- [ ] Focus order matches visual order
- [ ] Font sizes use relative units (rem/em)
- [ ] Text can be resized up to 200% without breaking layout

## Useful Accessibility Utilities

The portfolio includes utility functions in `src/utils/accessibility.js` to help maintain accessibility:

```jsx
// Import accessibility utilities
import { 
  announceToScreenReader,
  generateUniqueId,
  handleKeyboardEvent
} from '../utils/accessibility';

// Announce dynamic content to screen readers
announceToScreenReader('Your form has been submitted successfully');

// Generate unique IDs for aria-labelledby relationships
const titleId = generateUniqueId('section-title');

// Handle keyboard events for custom interactive elements
<div
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => handleKeyboardEvent(e, handleClick, ['Enter', ' '])}
>
  Click me
</div>
```

## Resources

- [WebAIM - Web Accessibility In Mind](https://webaim.org/)
- [The A11Y Project](https://www.a11yproject.com/)
- [MDN Web Docs - Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [WCAG 2.1 Guidelines](https://www.w3.org/TR/WCAG21/)
- [Accessible Rich Internet Applications (ARIA)](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA)