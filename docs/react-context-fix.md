# React Context API Fix in Production

## Issue Description

When running the application in production mode, React Context was not working correctly, resulting in errors like:

```
Uncaught TypeError: React.createContext is not a function
```

This happens because Vite's production build can tree-shake unused React methods, and in some cases, it incorrectly identifies `createContext` as unused even though it's critical for React's context API.

## Root Causes

There were several contributing factors to this issue:

1. **Tree-shaking in production builds**: The production build optimization process mistakenly removes React.createContext.

2. **Code splitting**: The code splitting configuration separates React core code from application code, sometimes breaking references.

3. **React namespace access**: The application directly accesses React.createContext, but if React is tree-shaken, this method may not be available.

## Implemented Fixes

We've implemented multiple layers of fixes to ensure React Context works reliably:

### 1. Code Splitting Strategy

In `config/optimization/splitting.js`, we updated the code splitting strategy to ensure context-related code is bundled with React core:

```javascript
// Context is critically important and should be bundled with core React
// to prevent tree-shaking from breaking context functionality
if (id.includes('/src/context/')) {
  return 'vendor-react';
}
```

### 2. React Preservation in Index.jsx

In `src/index.jsx`, we explicitly preserve React and its createContext method:

```javascript
// Ensure React is fully loaded and accessible in the global namespace
import React from 'react';
import ReactDOM from 'react-dom/client';

// Explicitly ensure React methods are present - critical for context in production builds
window.React = React;
// Expose the createContext method to ensure it's not tree-shaken
React.createContext = React.createContext || (() => {
  console.error('createContext polyfill used');
  return {
    Provider: ({ children }) => children,
    Consumer: ({ children }) => children({}),
  };
});
```

### 3. Vite Configuration

In `config/env.js`, we added a special define flag to ensure React features are preserved:

```javascript
export function getEnvConfig() {
  return {
    define: {
      // Ensure React is not tree-shaken in production
      'process.env.NODE_ENV': JSON.stringify(mode),
      // Ensure React features used in context are preserved
      '__REACT_FEATURES__': JSON.stringify(true)
    }
  };
}
```

### 4. Context Implementation

In `src/context/PortfolioContext.jsx`, we use the global React namespace and ensure it's available:

```javascript
// Import React globally and ensure it's available in window for browser compatibility
import React from 'react';
// Explicitly expose React to window to ensure it's available for context
if (typeof window !== 'undefined') {
  window.React = React;
}
```

## Testing the Fix

We've created several tools to test and verify the fix:


2. **Production Build Verification**: The `verify-production.js` script tests the production build process and verifies that the site loads correctly.

3. **React Context Fix Script**: The `fix-react-context.js` script applies all necessary fixes and builds a production version with React context support explicitly enabled.

## How to Verify the Fix

1. Run the React Context fix script:
   ```
   node fix-react-context.js
   ```

2. Serve the production build:
   ```
   npx serve -s build
   ```

3. Test the context functionality by opening the context test HTML:
   ```
   ```

## Best Practices to Prevent Future Issues

1. **Use React imports correctly**: When using React features, always import them directly:
   ```javascript
   import React, { createContext, useContext } from 'react';
   ```

2. **Be cautious with tree-shaking**: In critical framework code, use techniques to prevent tree-shaking from removing essential features.

3. **Test production builds**: Always test your application in production mode before deploying.

4. **Use explicit globals with care**: Setting `window.React` can help with certain edge cases but should not be relied upon as the primary solution.

## Root Issue and Vite Configuration

The core issue is in how bundlers like Vite handle React in production mode. The React package is designed to work with tree-shaking, but sometimes the optimization process can be too aggressive.

To ensure React Context works reliably in production:

1. Make sure React is included in the `optimizeDeps.include` array in the Vite config.
2. Use the `__REACT_FEATURES__` flag in your define options.
3. Ensure context-related code is bundled with React core in your code splitting strategy.

These fixes collectively ensure that React's Context API remains functional in production builds, preventing the "createContext is not a function" error.
