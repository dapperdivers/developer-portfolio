import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import './ErrorBoundary.css';

// Animation variants for error fallback
const errorContainerVariants = {
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

/**
 * Error Boundary component to catch JavaScript errors in child components
 * and display a fallback UI instead of crashing the whole application.
 * Enhanced with framer-motion animations for smooth transitions.
 *
 * @component
 */
class ErrorBoundary extends Component {
  constructor(props) {
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
      const listener = (event) => {
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

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
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

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  fallback: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  onError: PropTypes.func
};

export default ErrorBoundary;