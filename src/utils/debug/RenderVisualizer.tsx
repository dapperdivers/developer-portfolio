import React, { useState, useEffect, useCallback, useRef } from 'react';
import type { ComponentType, ReactNode } from 'react';

export interface RenderVisualizerOptions {
  /** Background colour flashed on each render */
  highlightColor?: string;
  /** Milliseconds the highlight takes to fade */
  fadeOutTime?: number;
  /** Log each render to the console */
  log?: boolean;
  /** Name shown in the badge; defaults to the component's own name */
  componentName?: string;
}

export interface RenderVisualizerProps {
  children?: ReactNode;
  /** Whether visualization starts enabled; defaults to on in development */
  enabled?: boolean;
}

/**
 * HOC that adds a visual indication when a component renders
 * Helps identify which components are re-rendering and how frequently
 * @param {React.Component} Component - Component to wrap with visualization
 * @param {Object} options - Configuration options
 * @returns {React.Component} - Enhanced component with visual render indicator
 */
export const withRenderVisualizer = <P extends object>(
  Component: ComponentType<P>,
  {
    highlightColor = 'rgba(255, 0, 0, 0.3)',
    fadeOutTime = 500,
    log = false,
    componentName = Component.displayName || Component.name || 'UnknownComponent'
  }: RenderVisualizerOptions = {}
) => {
  // Create the enhanced component
  const VisualizedComponent = (props: P) => {
    const [renderCount, setRenderCount] = useState(0);
    const [isHighlighted, setIsHighlighted] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    
    // Show highlight effect on render
    useEffect(() => {
      // Clear previous timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      // Increment render count
      setRenderCount(count => count + 1);
      
      // Add highlight
      setIsHighlighted(true);
      
      // Remove highlight after specified time
      timeoutRef.current = setTimeout(() => {
        setIsHighlighted(false);
      }, fadeOutTime);
      
      // Log render information if enabled
      if (log) {
        console.log(`[RENDER] ${componentName} rendered (count: ${renderCount + 1})`);
      }
      
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }, [props, log]);
    
    return (
      <div 
        ref={containerRef}
        style={{
          position: 'relative',
          transition: `background-color ${fadeOutTime / 1000}s ease-out`,
          backgroundColor: isHighlighted ? highlightColor : 'transparent'
        }}
        data-render-count={renderCount}
        data-component-name={componentName}
      >
        {/* Show render badge in development mode */}
        {import.meta.env.DEV && (
          <div
            style={{
              position: 'absolute',
              top: '2px',
              right: '2px',
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              color: 'white',
              fontSize: '10px',
              padding: '2px 4px',
              borderRadius: '3px',
              zIndex: 9000,
              pointerEvents: 'none',
              opacity: isHighlighted ? 1 : 0,
              transition: `opacity ${fadeOutTime / 1000}s ease-out`,
            }}
          >
            {componentName} ({renderCount})
          </div>
        )}
        
        <Component {...props} />
      </div>
    );
  };
  
  // Add display name
  VisualizedComponent.displayName = `Visualized(${componentName})`;
  
  return VisualizedComponent;
};

/**
 * Master control component for render visualization
 * Allows enabling/disabling visualization globally
 */
const RenderVisualizer = ({ children, enabled = import.meta.env.DEV }: RenderVisualizerProps) => {
  const [isEnabled, setIsEnabled] = useState(enabled);
  
  // Toggle with Ctrl+Shift+V keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'V') {
        setIsEnabled(prev => !prev);
        console.log(`Render visualization ${!isEnabled ? 'enabled' : 'disabled'}`);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isEnabled]);
  
  // Inject global CSS for highlighting
  useEffect(() => {
    if (isEnabled) {
      // Add global CSS for render visualization
      const style = document.createElement('style');
      style.id = 'render-visualizer-styles';
      style.innerHTML = `
        [data-render-count] {
          position: relative;
        }
        
        [data-render-count]:hover::after {
          content: attr(data-component-name) " (" attr(data-render-count) " renders)";
          position: absolute;
          bottom: calc(100% + 5px);
          right: 0;
          background-color: rgba(0, 0, 0, 0.8);
          color: white;
          font-size: 12px;
          padding: 4px 8px;
          border-radius: 4px;
          z-index: 9999;
          white-space: nowrap;
          pointer-events: none;
        }
      `;
      
      document.head.appendChild(style);
      
      return () => {
        const existingStyle = document.getElementById('render-visualizer-styles');
        if (existingStyle) {
          existingStyle.remove();
        }
      };
    }
  }, [isEnabled]);
  
  // Set global visualization state for other components to access
  useEffect(() => {
    window.RENDER_VISUALIZATION_ENABLED = isEnabled;
  }, [isEnabled]);
  
  return children;
};

export default RenderVisualizer; 