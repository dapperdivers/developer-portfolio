/**
 * Context Utilities
 * 
 * Provides standardized patterns and utilities for working with
 * React Context in a way that's compatible with production builds
 * and prevents tree-shaking issues.
 */

import React from 'react';

// TypeScript type for React Context (without destructuring)
type ReactContext<T> = React.Context<T>;

/**
 * Create a typed context with production build protections
 * 
 * This helper function creates a React Context with additional safeguards
 * that prevent tree-shaking from breaking context functionality in production.
 * It also provides better TypeScript type safety and consistent patterns.
 * 
 * @param defaultValue - The default value for the context
 * @returns A React Context with added safety features
 */
export function createTypedContext<T>(defaultValue: T): ReactContext<T> {
  // Force React to be globally available
  if (typeof window !== 'undefined') {
    window.React = window.React || React;
  }
  
  // Ensure createContext is available directly from the React object
  // This fixes issues where React might be available but createContext is tree-shaken
  if (!React.createContext) {
    console.warn('React.createContext was missing, restoring from global React');
    // Try to get it from window.React as a fallback
    if (window && window.React && window.React.createContext) {
      React.createContext = window.React.createContext;
    } else {
      // We can't create a proper polyfill that satisfies TypeScript
      // Instead, we'll throw an error to help debugging
      console.error('React.createContext is not available - this is a critical error');
      throw new Error(
        'React.createContext is not available. This is likely due to tree-shaking in production. ' +
        'Please ensure React is properly imported and available globally.'
      );
    }
  }
  
  // Create the context with React namespace to avoid destructured import issues
  const context = React.createContext<T>(defaultValue);
  
  return context;
}

/**
 * Create a custom hook for using a context with safety checks
 * 
 * This function creates a hook that verifies the context is used within a provider
 * and provides better error messages for debugging.
 * 
 * @param context - The React Context to create a hook for
 * @param hookName - The name of the hook for error messages
 * @returns A custom hook function that uses the context safely
 */
export function createContextHook<T>(context: ReactContext<T>, hookName: string) {
  return function useTypedContext(): T {
    // Use React namespace methods for direct access
    const contextValue = React.useContext(context);
    
    // Verify context is used within provider
    if (contextValue === undefined) {
      throw new Error(`${hookName} must be used within its corresponding Provider`);
    }
    
    return contextValue;
  };
}

/**
 * Example Usage:
 * 
 * ```typescript
 * // AnimationContext.tsx
 * import { createTypedContext, createContextHook } from '@utils/contextUtils';
 * 
 * export interface AnimationState {
 *   // state properties
 * }
 * 
 * // Create the context
 * const AnimationContext = createTypedContext<AnimationState>({
 *   // default values
 * });
 * 
 * // Create a typed hook
 * export const useAnimation = createContextHook(AnimationContext, 'useAnimation');
 * 
 * // Export the provider
 * export const AnimationProvider: React.FC<AnimationProviderProps> = ({ children }) => {
 *   // implementation
 * };
 * ```
 */
