/**
 * Context Utilities
 * 
 * Provides standardized patterns and utilities for working with
 * React Context using a factory pattern approach with registry tracking.
 */

// Use named imports to allow tree-shaking in production builds
import { createContext, useContext } from 'react';
import type { Context, Provider, Consumer } from 'react';
import contextRegistry from './contextRegistry';

/**
 * Type for the context hook result that includes both the context and its hook
 */
export interface TypedContextResult<T> {
  /** The React context object */
  context: Context<T>;
  
  /** Custom hook for using the context with safety checks */
  useTypedContext: () => T;
  
  /** Context provider component from React */
  Provider: Context<T>['Provider'];
  
  /** Context consumer component from React */
  Consumer: Context<T>['Consumer'];
  
  /** Name of this context (for debugging) */
  name: string;
}

/**
 * Create a typed context with a customized hook
 * 
 * This factory function creates a React Context along with a custom hook
 * for safely accessing the context value.
 * 
 * @param defaultValue - The default value for the context
 * @param hookName - Name for the hook (for error messages and registry)
 * @param description - Optional description of this context's purpose
 * @returns Object containing the context and its associated hook
 */
export function createTypedContext<T>(
  defaultValue: T, 
  hookName: string = 'useContext',
  description?: string
): TypedContextResult<T> {
  // Use named imports to allow tree-shaking to work properly
  const context = createContext<T>(defaultValue);
  
  // Register this context in the global registry for tracking
  contextRegistry.register(hookName, defaultValue, description);
  
  // Create a custom hook for this specific context
  function useTypedContext(): T {
    // Use named import useContext
    const value = useContext(context);
    
    // Verify context is used within provider (only verify if value is explicitly undefined)
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
    Consumer: context.Consumer,
    name: hookName
  };
}

// Export additional utility functions
export function getRegisteredContexts() {
  return contextRegistry.getAllContexts();
}

/**
 * Check if a context is registered
 * @param name - Name of the context to check
 */
export function isContextRegistered(name: string) {
  return contextRegistry.hasContext(name);
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
