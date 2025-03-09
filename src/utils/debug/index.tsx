/**
 * Consolidated Debugging Module
 * 
 * This file consolidates all debugging tools into a single import.
 * Components only need to import from this file to get all debugging capabilities.
 */

// Export everything from our debugging modules
export * from './DebugManager';
export * from './debugHooks';

// Create convenience exports for common patterns
import React, { ComponentType, useContext, useEffect, useRef } from 'react';
import { withDebugging as withDebug } from './DebugManager';
import { useRenderTracking, useAdaptivePerformance, useBackgroundEffects } from './debugHooks';
import { DebugContext } from './DebugManager';

/**
 * Higher-Order Component that adds all standard debugging capabilities to a component
 * @param Component The component to enhance
 * @param componentName The name of the component (for tracking)
 * @param options Additional options
 * @returns Enhanced component with debugging
 */
export function withDebugFeatures<P extends object>(
  Component: ComponentType<P>,
  componentName: string,
  options: {
    trackRenders?: boolean;
    adaptivePerformance?: boolean;
    performanceInitialCount?: number;
    backgroundEffects?: boolean;
  } = {}
): React.FC<P> {
  // Set default options
  const {
    trackRenders = true,
    adaptivePerformance = false,
    performanceInitialCount = 100,
    backgroundEffects = false
  } = options;
  
  // Create the wrapped component with all requested debug features
  const DebugEnhancedComponent: React.FC<P> = (props) => {
    // Apply debugging hooks based on options
    if (trackRenders) {
      useRenderTracking(componentName);
    }
    
    // Get performance data if requested
    const performanceData = adaptivePerformance 
      ? useAdaptivePerformance(performanceInitialCount)
      : null;
    
    // Check if background effects should be shown
    const showEffects = backgroundEffects 
      ? useBackgroundEffects() 
      : true;
    
    // Add debug data to component props if needed
    const enhancedProps = {
      ...props,
      __debug: {
        componentName,
        performanceData,
        showEffects
      }
    } as any;
    
    return <Component {...enhancedProps} />;
  };
  
  // Set display name for debugging
  DebugEnhancedComponent.displayName = `DebugEnhanced(${componentName})`;
  
  // Wrap with core debugging
  return withDebug(DebugEnhancedComponent, componentName);
}

/**
 * Create a debuggable version of a component with one line
 * @param Component The component to debug
 * @param componentName The component name (optional, defaults to Component.displayName)
 * @returns A debuggable version of the component
 */
export function createDebuggable<P extends object>(
  Component: ComponentType<P>, 
  componentName?: string
): React.FC<P> {
  const name = componentName || Component.displayName || Component.name || 'UnknownComponent';
  return withDebugFeatures(Component, name);
}

// Add a function to apply common debugging to all components in an object
export function createDebuggableComponents(components: Record<string, ComponentType<any>>) {
  const debuggableComponents: Record<string, React.FC<any>> = {};
  
  Object.entries(components).forEach(([name, Component]) => {
    debuggableComponents[name] = withDebugFeatures(Component, name);
  });
  
  return debuggableComponents;
}

// NEW: Function to auto-register components at runtime
export function getDebuggedComponents<T extends Record<string, ComponentType<any>>>(
  components: T
): T {
  // Create a wrapper function to dynamically register components
  const ComponentRegistrar: React.FC = () => {
    const debugContext = useContext(DebugContext);
    const registeredRef = useRef(false);
    
    useEffect(() => {
      // Only register once
      if (registeredRef.current) return;
      registeredRef.current = true;
      
      // Register each component
      Object.entries(components).forEach(([name, Component]) => {
        if (debugContext && debugContext.autoRegisterComponent) {
          debugContext.autoRegisterComponent(Component, name);
        }
      });
    }, [debugContext]);
    
    return null;
  };
  
  // Store the registrar component on the components object
  (components as any).ComponentRegistrar = ComponentRegistrar;
  
  return components;
}

// Export a standalone registrar component for use in App.jsx
export const ComponentRegistrar: React.FC<{
  components: Record<string, ComponentType<any>>
}> = ({ components }) => {
  const debugContext = useContext(DebugContext);
  const registeredRef = useRef(false);
  
  useEffect(() => {
    // Only register once
    if (registeredRef.current) return;
    registeredRef.current = true;
    
    // Register each component
    Object.entries(components).forEach(([name, Component]) => {
      if (debugContext && debugContext.autoRegisterComponent) {
        debugContext.autoRegisterComponent(Component, name);
      }
    });
  }, [debugContext, components]);
  
  return null;
}; 