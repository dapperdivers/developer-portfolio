import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Error Boundary component to catch JavaScript errors in child components
 * and display a fallback UI instead of crashing the whole application.
 *
 * @component
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      error: null,
      errorInfo: null
    };
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
    const { hasError, error, errorInfo } = this.state;
    const { fallback, children } = this.props;

    if (hasError) {
      // If a custom fallback is provided, use it
      if (fallback) {
        return typeof fallback === 'function' 
          ? fallback(error, errorInfo) 
          : fallback;
      }

      // Default fallback UI
      return (
        <div className="error-boundary" role="alert">
          <h2>Something went wrong.</h2>
          <details>
            <summary>Error details</summary>
            <p>{error?.toString()}</p>
            <p>{errorInfo?.componentStack}</p>
          </details>
        </div>
      );
    }

    // When there's no error, render children normally
    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  fallback: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  onError: PropTypes.func
};

export default ErrorBoundary;