# D3.js Components Integration Guide

This guide outlines how to integrate our custom D3.js visualization components with the project's component generator system. This integration enables efficient creation of security-focused data visualizations for our portfolio redesign.

## Overview

We've created specialized D3.js component templates in `scripts/d3-component-template.js` that need to be integrated with the existing component generator (`scripts/generate-component.js`). This integration will allow us to easily generate new security visualization components with the appropriate structure, documentation, and D3.js integration patterns.

## Integration Steps

### 1. Update Component Generator

First, we need to modify the `scripts/generate-component.js` file to add support for D3.js components:

1. Import the D3.js template functions at the top of the file:

```javascript
// Import D3.js component templates
const {
  generateD3ComponentTemplate,
  generateRadarChartTemplate,
  generateNetworkGraphTemplate
} = require('./d3-component-template');
```

2. Add a new component type for D3.js visualizations in the config section:

```javascript
// Configuration
const config = {
  defaultType: 'ui', // ui, layout, container, d3
  defaultDir: 'src/components',
  designTokensPath: 'src/assets/css/design-system/tokens',
  types: ['ui', 'layout', 'container', 'd3'],
  // ... other existing config
};
```

3. Update the template selection logic to include D3.js components:

```javascript
// Generate the JSX component file
async function generateComponentFile(componentPath, componentName, componentType) {
  const extension = config.useTypeScript ? 'tsx' : 'jsx';
  const filename = `${componentName}.${extension}`;
  const filepath = path.join(componentPath, filename);
  
  // Template based on component type
  let template = '';
  
  // Select template based on component type
  if (componentType === 'd3') {
    template = generateD3ComponentTemplate(componentName, config);
  } else if (componentType === 'ui') {
    // Existing UI component template
    // ...
  } else if (componentType === 'layout') {
    // Existing layout component template
    // ...
  } else if (componentType === 'container') {
    // Existing container component template
    // ...
  }
  
  // ... rest of the function
}
```

### 2. Add Specialized D3 Component Types

Update the script to support specific D3 visualization types:

```javascript
// Process CLI arguments into an object
function parseArgs(args) {
  const result = {};
  args.forEach(arg => {
    if (arg.startsWith('--')) {
      const [key, value] = arg.replace('--', '').split('=');
      result[key] = value || true;
    }
  });
  return result;
}

// Add visualization type handling
const visualizationType = args.visualization || 'basic';
let template = '';

if (componentType === 'd3') {
  switch (visualizationType) {
    case 'radar':
      template = generateRadarChartTemplate(componentName, config);
      break;
    case 'network':
      template = generateNetworkGraphTemplate(componentName, config);
      break;
    case 'basic':
    default:
      template = generateD3ComponentTemplate(componentName, config);
      break;
  }
} else {
  // Existing template logic
}
```

### 3. Update CSS generation for D3 components

Add specific CSS handling for D3 components:

```javascript
// Generate the CSS file
async function generateCssFile(componentName, componentType) {
  // For D3 components, use a different directory structure
  const cssDir = componentType === 'd3' 
    ? `src/assets/css/components/d3`
    : `src/assets/css/components/${componentType}`;
    
  const cssFilename = `${componentName.toLowerCase()}.css`;
  const cssFilepath = path.join(cssDir, cssFilename);
  
  // Ensure CSS directory exists
  const dirCreated = await ensureDirectoryExists(cssDir);
  if (!dirCreated) return false;
  
  // CSS template based on component type
  let cssTemplate = '';
  
  if (componentType === 'd3') {
    cssTemplate = `/**
 * ${componentName} D3 Visualization Styles
 * 
 * Styling for the ${componentName} D3.js visualization component.
 */

.${componentName.toLowerCase()} {
  /* Base container styles */
  position: relative;
  width: 100%;
  height: 100%;
}

/* SVG base styles */
.${componentName.toLowerCase()} svg {
  font-family: var(--font-family-mono);
  background-color: transparent;
}

/* Axis styles */
.${componentName.toLowerCase()} .axis path,
.${componentName.toLowerCase()} .axis line {
  stroke: var(--color-gray-400);
  stroke-width: 1px;
}

.${componentName.toLowerCase()} .axis text {
  fill: var(--color-gray-600);
  font-size: 10px;
}

/* Tooltip styles */
.${componentName.toLowerCase()} .tooltip {
  position: absolute;
  padding: 8px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  border-radius: 4px;
  pointer-events: none;
  z-index: 10;
  font-size: 12px;
  max-width: 200px;
}

/* Responsive behavior */
@media (max-width: 768px) {
  .${componentName.toLowerCase()} svg {
    height: 300px;
  }
}
`;
  } else {
    // Existing CSS template logic
  }
  
  // ... rest of the function
}
```

## Usage Examples

### 1. Generate a Basic D3 Component

```bash
node scripts/generate-component.js --name=SecurityMetricsChart --type=d3 --dir=src/components/atoms/SecurityMetricsChart
```

This will create a basic D3.js component with the necessary boilerplate for creating a custom visualization.

### 2. Generate a Radar Chart Component

```bash
node scripts/generate-component.js --name=SecurityDomainRadar --type=d3 --visualization=radar --dir=src/components/molecules/SecurityDomainRadar
```

This will create a radar chart component specifically designed for visualizing security domain expertise.

### 3. Generate a Network Graph Component

```bash
node scripts/generate-component.js --name=KubernetesArchitectureGraph --type=d3 --visualization=network --dir=src/components/molecules/KubernetesArchitectureGraph
```

This will create a network graph component for visualizing Kubernetes architecture and security relationships.

## Component Structure

The generated D3.js components will have the following structure:

```
src/components/[atoms|molecules|organisms]/ComponentName/
├── ComponentName.jsx         # Main component file with D3.js integration
├── ComponentName.css         # Styles for the visualization
├── ComponentName.stories.jsx # Storybook documentation
└── ComponentName.test.jsx    # Tests for the component
```

## Implementation Notes

### React and D3.js Integration Pattern

The generated components follow these best practices for integrating D3.js with React:

1. **React manages the DOM structure** - React renders the base SVG element
2. **D3 handles the visualization logic** - D3.js manipulates the SVG elements within useEffect
3. **React controls the props and state** - All visualization configurations come through props
4. **D3 handles interactions and animations** - D3.js manages interactions and transitions

### Performance Considerations

1. **Component Memoization** - Components are memoized to prevent unnecessary re-renders
2. **Dependency Arrays** - useEffect hooks have proper dependency arrays
3. **Resize Observer** - Components use ResizeObserver for responsive behavior
4. **Cleanup Functions** - All D3.js selections and observers are properly cleaned up

### Accessibility Features

1. **ARIA Attributes** - SVG elements have proper ARIA labels
2. **Title and Description** - Visualizations include title and desc elements
3. **Keyboard Navigation** - Interactive elements support keyboard focus
4. **Screen Reader Support** - Data is accessible to screen readers

## Next Steps

After integrating these changes into the component generator, we can begin implementing the security visualizations outlined in our security portfolio redesign plan:

1. First create the basic D3 container components (atoms)
2. Then implement the specialized visualizations (molecules)
3. Finally assemble them into the interactive dashboards (organisms)

This systematic approach will ensure consistent implementation across all our security visualizations while maintaining the project's component architecture.
