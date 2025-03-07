/**
 * Context Utilities
 * 
 * Provides standardized patterns and utilities for working with
 * React Context using a decoupled, factory-based approach.
 */

import { createContext, useContext, Context } from 'react';

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
}

/**
 * Create a typed context with a customized hook
 * 
 * This factory function creates a React Context along with a custom hook
 * for safely accessing the context value. Using this pattern helps decouple
 * context usage from React internals.
 * 
 * @param defaultValue - The default value for the context
 * @param hookName - Optional name for the hook (for error messages)
 * @returns Object containing the context and its associated hook
 */
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
