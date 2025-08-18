# Site Navigator Integration Guide

## Overview
The Site Navigator is a cross-platform web component that provides navigation between:
- Main Portfolio Site
- Storybook Component Library  
- Technical Documentation

## Integration Instructions

### 1. Main React App
Add to your main HTML template or App component:

```html
<!-- In public/index.html or via React -->
<script src="/site-navigator.js"></script>
<site-navigator></site-navigator>
```

### 2. Storybook
Add to `.storybook/preview.tsx`:

```typescript
// Add the script import
import '../public/site-navigator.js';

// In preview decorators or parameters
export const decorators = [
  (Story) => {
    useEffect(() => {
      if (!document.querySelector('site-navigator')) {
        const navigator = document.createElement('site-navigator');
        document.body.appendChild(navigator);
      }
    }, []);
    
    return <Story />;
  },
];
```

### 3. Jekyll Documentation Site
Add to `_layouts/default.html`:

```html
<!-- In the <head> section -->
<script src="{{ '/assets/js/site-navigator.js' | relative_url }}" defer></script>

<!-- The component will auto-initialize -->
```

## Configuration

### URL Configuration
The component auto-detects the environment and configures URLs accordingly:

- **Development**: Uses localhost with different ports
- **Production**: Adjust the `getSiteConfiguration()` method for your deployment URLs

### Customization
You can customize the component by:

1. Modifying the CSS custom properties in the shadow DOM
2. Updating the site configuration in `getSiteConfiguration()`
3. Adjusting the detection logic in `detectCurrentSite()`

## Deployment Notes

### Production URLs
Update the production URLs in the component based on your deployment:

```javascript
// Example production configuration
main: { url: 'https://derekmackley.com' },
storybook: { url: 'https://storybook.derekmackley.com' },
docs: { url: 'https://docs.derekmackley.com' }
```

### Build Integration
Add the build script to your CI/CD pipeline:

```bash
npm run build:site-navigator
```

## Browser Support
- Modern browsers with Web Components support
- Fallback handling for older browsers
- Progressive enhancement approach

## Accessibility
- ARIA labels and roles
- Keyboard navigation support
- Focus management
- Screen reader compatible

Generated on: 2025-08-18T20:00:07.878Z
