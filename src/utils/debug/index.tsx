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

import { useRenderTracking } from './debugHooks';
import { withDebugging } from './DebugManager';
import type { ComponentType } from 'react';

// Performance monitoring exports
export { default as PerformanceMonitor } from './PerformanceMonitor';
export { SimplePerformanceMonitor, withRenderTracking } from './PerformanceMonitor';

// Debug hooks exports
export { useTrackRender } from './debugHooks';

// Debug context exports
export { DebugProvider, useDebugManager } from './DebugManager';
export type { DebugConfig } from './DebugManager';

// Export utility hooks
export {
  useRenderTracking,
  useAdaptivePerformance,
  useAnimationDebug,
  useBackgroundEffects,
  useLayoutDebug
} from './debugHooks';

// Export HOCs and components
export { withDebugging } from './DebugManager';
export { DebugComponentRegistrar as RegisterDebugComponents } from './DebugManager';

/**
 * Main debugging hook - use this inside components to enable debugging
 */
export function useDebug(componentName: string) {
  return useRenderTracking(componentName);
}

/**
 * One-liner to create a debuggable version of a component
 */
export function createDebuggable<P extends object>(
  Component: ComponentType<P>, 
  componentName?: string
): React.FC<P> {
  const name = componentName || Component.displayName || Component.name || 'UnknownComponent';
  
  // Create a named function component for better Fast Refresh support
  function DebuggableComponent(props: P) {
    const WrappedComponent = withDebugging(Component, name);
    return <WrappedComponent {...props} />;
  }
  
  DebuggableComponent.displayName = `Debuggable(${name})`;
  return DebuggableComponent;
} 