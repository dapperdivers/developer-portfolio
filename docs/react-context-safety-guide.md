# React Context Safety Guide

This guide outlines the best practices for using React Context and other React APIs to prevent tree-shaking issues in production builds.

## Quick Reference

| ❌ Avoid | ✅ Use Instead |
|---------|--------------|
| `import { createContext } from 'react'` | `import React from 'react'` |
| `createContext(defaultValue)` | `React.createContext(defaultValue)` |
| `import { useState, useContext } from 'react'` | `import React from 'react'` |
| Direct React.createContext usage | `createTypedContext()` from `src/utils/contextUtils.ts` |

## Problem Overview

In production builds with heavy optimization and tree-shaking, certain React APIs can be incorrectly removed, particularly:

1. **React.createContext** - Causes the common error `Cannot read properties of undefined (reading 'createContext')`
2. **React.memo** - Results in component memoization failing silently
3. **React.Component** - Breaks class components with the error `Cannot read properties of undefined (reading 'Component')`

## Root Causes

1. **Destructured Imports** - Importing specific parts of React makes them vulnerable to tree-shaking
   ```javascript
   // ❌ Avoid this
   import { createContext, useState, useEffect } from 'react';
   ```

2. **Code Splitting** - When React core and components using its features are split into different chunks, initialization order issues can occur

3. **Tree-Shaking Optimization** - Production build optimizers can incorrectly identify React APIs as unused

## Safe Context Implementation

### Using contextUtils.ts

We've provided a standardized helper module for context creation:

```typescript
// src/utils/contextUtils.ts is already available in the project
import { createTypedContext } from '@utils/contextUtils';

// Create a type-safe context
const MyContext = createTypedContext<MyContextType>({
  // default values
});

// Create a typed hook
export const useMyContext = createContextHook(MyContext, 'useMyContext');
```

### Direct React Namespace Usage

If you're not using contextUtils.ts, always use direct React namespace access:

```typescript
import React from 'react';

// ✅ Good: Use React namespace to prevent tree-shaking
const MyContext = React.createContext<MyContextType>({
  // default values
});

export const useMyContext = () => {
  const context = React.useContext(MyContext);
  
  if (context === undefined) {
    throw new Error('useMyContext must be used within a MyProvider');
  }
  
  return context;
};
```

## ESLint Plugin

We've created a custom ESLint plugin to enforce these patterns:

```javascript
// .eslintrc.js
module.exports = {
  // ... other config
  plugins: [
    // ... other plugins
    'react-context-safety',
  ],
  extends: [
    // ... other extends
    'plugin:react-context-safety/recommended',
  ],
};
```

The plugin enforces three rules:
1. `no-destructured-react-import` - Prevents destructured imports from React
2. `use-react-namespace` - Enforces React namespace usage for critical APIs
3. `use-context-utils` - Encourages use of our contextUtils.ts helpers

## Analysis Tools

To analyze your codebase for potential issues:

```bash
# Run the quick analyzer
node analyze-react-deps.js

# Generate a detailed report
node analyze-react-deps.js > reports/react-usage-report.txt
```

The analyzer identifies high-risk files that should be prioritized for updates.

## Real-World Example

Before:
```tsx
// ❌ Before - vulnerable to tree-shaking
import { createContext, useContext, useState } from 'react';

type ThemeContextType = {
  theme: string;
  setTheme: (theme: string) => void;
};

// Direct usage of createContext is vulnerable
const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  setTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
```

After:
```tsx
// ✅ After - protected from tree-shaking
import React from 'react';
import { createTypedContext, createContextHook } from '@utils/contextUtils';

type ThemeContextType = {
  theme: string;
  setTheme: (theme: string) => void;
};

// Use the helper function that has built-in safety
const ThemeContext = createTypedContext<ThemeContextType>({
  theme: 'light',
  setTheme: () => {},
});

// Create a type-safe hook with helpful error messages
export const useTheme = createContextHook(ThemeContext, 'useTheme');

export const ThemeProvider: React.FC = ({ children }) => {
  // Use React namespace for hooks
  const [theme, setTheme] = React.useState('light');
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
```

## Production Bundling Strategy

To ensure compatibility without compromising performance:

1. Components using React context, memo, forwardRef, etc. should be bundled with React's core bundle
2. Special care should be taken with components that extend React.Component or PureComponent
3. Hooks that use React APIs should also be carefully bundled

For detailed guidance on bundle configuration, refer to `docs/react-production-build-fixes.md`.
