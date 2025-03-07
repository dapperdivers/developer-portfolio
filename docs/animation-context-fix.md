# Animation Context Fix in Production

## Problem

After fixing the main portfolio context, we encountered a similar issue with the animation context in the vendor-animation bundle:

```
Uncaught TypeError: React.createContext is not a function
```

This error occurs because the `framer-motion` library and our `AnimationContext` both use React's Context API, which was being tree-shaken in production builds.

## Root Causes

The issue had similar causes to the original context problem:

1. **Tree-shaking in the animation bundle**: The production build optimization was removing React.createContext from the vendor-animation bundle.

2. **TypeScript imports**: The AnimationContext was using destructured imports (`import { createContext, useContext }`) rather than accessing these methods directly from the React namespace.

## Solution

We applied the same fixes that worked for PortfolioContext:

### 1. Update AnimationContext.tsx

We modified `src/context/AnimationContext.tsx` to:

1. Import the full React namespace
2. Ensure React is available in the window object
3. Use React.createContext instead of destructured createContext
4. Use React.useContext instead of destructured useContext

```typescript
// Import React globally and ensure it's available in window for browser compatibility
import React, { ReactNode, useState, useCallback, useEffect, useMemo } from 'react';
// Explicitly expose React to window to ensure it's available for context
if (typeof window !== 'undefined') {
  window.React = React;
}

// ...

// Using direct React namespace access to prevent tree-shaking issues
const AnimationContext = React.createContext<AnimationContextType>({
  // ...initial context values
});

// ...

export const useAnimation = (): AnimationContextType => {
  const context = React.useContext(AnimationContext);
  // ...
};
```

### 2. Update Code Splitting Strategy

We modified `config/optimization/splitting.js` to ensure animation-related context code is bundled with React core:

```javascript
// Context is critically important and should be bundled with core React
if (id.includes('/src/context/')) {
  // Both the PortfolioContext and AnimationContext should be bundled with React core
  return 'vendor-react';
}

// Animation-related code should also preserve React context functionality
if (id.includes('framer-motion') || id.includes('lottie')) {
  if (id.includes('context') || id.includes('provider')) {
    // Bundle any animation context/provider with React core
    return 'vendor-react';
  }
}
```

This ensures that any animation-related code that uses context is bundled with the React core, preventing tree-shaking from removing the createContext function.

## Build Process

After making these changes, we ran:

1. `yarn build:prod` - To build the production version with our fixes
2. `npx serve -s build` - To serve the production build for testing

## Results

The animation context now works correctly in production builds. This fix demonstrates the importance of:

1. Being careful with destructured imports of critical React functionality
2. Using the React namespace directly for context creation
3. Ensuring proper code splitting for context-related code
4. Bundling related context code with the React core

## Prevention

To prevent similar issues in the future:

1. Always use `React.createContext()` instead of destructured `createContext()`
2. Be mindful of tree-shaking when using third-party libraries that rely on React context
3. Consider keeping context-related code bundled with React core
4. Test production builds regularly

This pattern can be applied to any other contexts that might be experiencing similar issues in production builds.
