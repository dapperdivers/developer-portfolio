# Decoupled Context Pattern

This document describes the decoupled context pattern implemented in the project to avoid React tree-shaking issues and improve maintainability.

## The Problem

Previously, the context implementation was tightly coupled to React's internals, which caused several issues:

1. **Tree-shaking problems**: The build process would sometimes incorrectly remove critical React methods like `createContext`
2. **Global namespace pollution**: Storing React in `window.React` created potential conflicts
3. **Defensive code**: We had complex fallbacks and checks that were difficult to maintain
4. **Environment-specific behavior**: Different behavior in dev vs. production led to "works on my machine" issues
5. **Bundle size**: Preventing tree-shaking increased bundle size unnecessarily

## The Solution: Decoupled Factory Pattern

We've implemented a factory-based approach that creates self-contained context objects:

### 1. Context Factory

The core of this pattern is the `createTypedContext` factory function in `src/utils/contextUtils.ts`:

```typescript
export function createTypedContext<T>(
  defaultValue: T, 
  hookName: string = 'useContext'
): TypedContextResult<T> {
  // Create the context directly from React's imported createContext
  const context = createContext<T>(defaultValue);
  
  // Create a custom hook for this specific context
  function useTypedContext(): T {
    const value = useContext(context);
    
    // Verify context is used within provider
    if (value === undefined) {
      throw new Error(`${hookName} must be used within its corresponding Provider`);
    }
    
    return value;
  }
  
  // Return all needed context parts in one object
  return {
    context,
    useTypedContext,
    Provider: context.Provider,
    Consumer: context.Consumer
  };
}
```

### 2. Usage Pattern

The usage pattern involves creating a context with its hook and provider in a single step:

```typescript
const { 
  context: MyContext,
  useTypedContext: useMyContext,
  Provider: MyContextProvider
} = createTypedContext(defaultValue, 'useMyContext');
```

Then exporting the necessary pieces:

```typescript
export { MyContext, useMyContext };
export const MyProvider = ({ children }) => (
  <MyContextProvider value={someValue}>
    {children}
  </MyContextProvider>
);
```

## Benefits

1. **Improved reliability**: The code works consistently across development and production
2. **Smaller bundle size**: No need to preserve unused React methods
3. **Better maintainability**: Less defensive code, cleaner implementation
4. **Type safety**: Better TypeScript integration
5. **Decoupled from React internals**: Less susceptible to React version changes
6. **Improved testability**: Easier to mock and test

## Implementation Examples

### Animation Context

See `src/context/AnimationContext.tsx` for a complete implementation example:

```typescript
const { 
  context: AnimationContext, 
  useTypedContext: useAnimation,
  Provider: AnimationContextProvider
} = createTypedContext<AnimationContextType>(defaultAnimationContext, 'useAnimation');

export const AnimationProvider = ({ children }) => {
  // ... implementation
  return (
    <AnimationContextProvider value={contextValue}>
      {children}
    </AnimationContextProvider>
  );
};

export { AnimationContext, useAnimation };
```

### Portfolio Context

See `src/context/PortfolioContext.jsx` for another implementation:

```jsx
const { 
  context: PortfolioContext, 
  useTypedContext: usePortfolio,
  Provider: PortfolioContextProvider
} = createTypedContext(defaultPortfolioData, 'usePortfolio');

export const PortfolioProvider = ({ children, testValue = null }) => {
  // ... implementation
  return (
    <PortfolioContextProvider value={contextValue}>
      {children}
    </PortfolioContextProvider>
  );
};

export { PortfolioContext, usePortfolio };
```

## Migration Guide

When migrating existing context implementations:

1. Replace `createContext` calls with `createTypedContext`
2. Destructure the returned object to get `context`, `useTypedContext`, and `Provider`
3. Use the `Provider` from the factory result rather than `Context.Provider`
4. Export the context and hook explicitly
5. Remove any global React assignments (`window.React = React`)
6. Remove defensive code for context availability

This pattern provides a more robust and maintainable approach to React context across all build environments.
