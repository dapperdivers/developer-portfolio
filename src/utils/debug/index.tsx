/**
 * Debug Utilities
 * 
 * Easy-to-use debugging tools for React applications.
 * 
 * Quick Start:
 * 1. Wrap your app with <DebugProvider>
 *    ```jsx
 *    import { DebugProvider } from 'utils/debug';
 *    
 *    <DebugProvider>
 *      <App />
 *    </DebugProvider>
 *    ```
 * 
 * 2. Enable debugging with keyboard shortcut: Ctrl+Shift+D
 * 
 * 3. Track component performance (pick one):
 *    ```jsx
 *    // Option 1: HOC
 *    import { withDebug } from 'utils/debug';
 *    export default withDebug(MyComponent);
 *    
 *    // Option 2: Hook within component
 *    import { useDebug } from 'utils/debug';
 *    const MyComponent = () => {
 *      useDebug('MyComponent');
 *      return <div>...</div>;
 *    }
 *    
 *    // Option 3: Add performance monitor
 *    import { PerformanceDisplay } from 'utils/debug';
 *    
 *    <PerformanceDisplay enabled={true} position="bottom-right" />
 *    ```
 * 
 * Keyboard Shortcuts:
 * - Ctrl+Shift+D: Toggle debug panel
 * - Ctrl+Shift+P: Toggle performance monitor
 */

// Export the simplified API components first
export { DebugProvider } from './DebugManager';
export { default as PerformanceMonitor, SimplePerformanceMonitor as PerformanceDisplay } from './PerformanceMonitor';

// Simplified hook/HOC API
import { withDebugging } from './DebugManager';
import { useRenderTracking } from './debugHooks';

/**
 * Main debugging hook - use this inside components to enable debugging
 * @param componentName The name to identify this component in debug tools
 */
export const useDebug = (componentName: string) => {
  return useRenderTracking(componentName);
};

/**
 * Main HOC for debugging - wrap components with this to enable debugging
 * @param Component The component to debug
 * @param name Optional name (defaults to Component.displayName)
 */
export const withDebug = withDebugging;

// Export other utility functions
export * from './DebugManager';
export * from './debugHooks';

// Re-export the Component Registrar with a more intuitive name
import { DebugComponentRegistrar } from './DebugManager';

/**
 * Auto-registers multiple components for debugging
 */
export const RegisterDebugComponents = DebugComponentRegistrar;

/**
 * One-liner to create a debuggable version of a component
 */
// Implementation of simple createDebuggable as it was missing from exports
import React, { ComponentType } from 'react';

export function createDebuggable<P extends object>(
  Component: ComponentType<P>, 
  componentName?: string
): React.FC<P> {
  const name = componentName || Component.displayName || Component.name || 'UnknownComponent';
  return withDebugging(Component, name);
} 