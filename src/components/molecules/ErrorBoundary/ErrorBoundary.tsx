import React, { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import './ErrorBoundary.css';

// Animation variants for error fallback
const errorContainerVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5, 
      ease: "easeOut"
    }
  },
  exit: { 
    opacity: 0, 
    y: 20, 
    transition: { 
      duration: 0.3, 
      ease: "easeIn" 
    }
  }
};

export interface ErrorBoundaryProps {
  /** Content to guard */
  children: ReactNode;
  /** Shown in place of the children after an error: a node, or a function given the error and its info */
  fallback?: ReactNode | ((error: Error | null, errorInfo: ErrorInfo | null) => ReactNode);
  /** Called with each error that is caught */
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  /** False while the visitor prefers reduced motion */
  animationsEnabled: boolean;
}

/**
 * Error Boundary component to catch JavaScript errors in child components
 * and display a fallback UI instead of crashing the whole application.
 * Enhanced with framer-motion animations for smooth transitions.
 *
 * @component
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  private removeListener?: () => void;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { 
      hasError: false,
      error: null,
      errorInfo: null,
      // Track animation state
      animationsEnabled: true
    };
  }

  componentDidMount() {
    // Check for reduced motion preference
    if (typeof window !== 'undefined') {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        this.setState({ animationsEnabled: false });
      }

      // Listen for changes in motion preference
      const mediaQueryList = window.matchMedia('(prefers-reduced-motion: reduce)');
      const listener = (event: MediaQueryListEvent) => {
        this.setState({ animationsEnabled: !event.matches });
      };
      
      if (mediaQueryList.addEventListener) {
        mediaQueryList.addEventListener('change', listener);
      } else {
        // Fallback for older browsers
        mediaQueryList.addListener(listener);
      }

      // Store cleanup function
      this.removeListener = () => {
        if (mediaQueryList.removeEventListener) {
          mediaQueryList.removeEventListener('change', listener);
        } else {
          mediaQueryList.removeListener(listener);
        }
      };
    }
  }

  componentWillUnmount() {
    // Clean up event listener
    if (this.removeListener) {
      this.removeListener();
    }
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error to console or error reporting service
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    this.setState({ errorInfo });
    
    // If onError callback is provided, call it
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  render() {
    const { hasError, error, errorInfo, animationsEnabled } = this.state;
    const { fallback, children } = this.props;

    // Use AnimatePresence for smooth animations
    return (
      <AnimatePresence mode="wait">
        {hasError ? (
          <motion.div
            key="error-fallback"
            initial={animationsEnabled ? "hidden" : "visible"}
            animate="visible"
            exit="exit"
            variants={errorContainerVariants}
            className="error-boundary"
            role="alert"
          >
            {/* If a custom fallback is provided, use it */}
            {fallback ? (
              typeof fallback === 'function' 
                ? fallback(error, errorInfo) 
                : fallback
            ) : (
              // Default fallback UI
              <>
                <motion.h2 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Something went wrong.
                </motion.h2>
                <motion.details
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <summary>Error details</summary>
                  <p>{error?.toString()}</p>
                  <p>{errorInfo?.componentStack}</p>
                </motion.details>
              </>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="children-content"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
}

export default ErrorBoundary;