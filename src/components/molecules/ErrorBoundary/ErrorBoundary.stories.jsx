import React from 'react';
import ErrorBoundary from './ErrorBoundary';

// Component that throws an error for testing
const BuggyComponent = ({ shouldThrow = false }) => {
  if (shouldThrow) {
    throw new Error('Test error from BuggyComponent');
  }
  return <div>Working component</div>;
};

// Custom fallback component
const CustomFallback = ({ error }) => (
  <div style={{ padding: '20px', border: '2px solid red', borderRadius: '4px' }}>
    <h3>Custom Error View</h3>
    <p>{error?.message}</p>
  </div>
);

export default {
  title: 'Molecules/ErrorBoundary',
  component: ErrorBoundary,
  parameters: {
    docs: {
      description: {
        component: 'A component that catches JavaScript errors in child components and displays a fallback UI.',
      },
    },
  },
  argTypes: {
    fallback: {
      control: 'none',
      description: 'Custom fallback UI to show when an error occurs',
    },
    onError: {
      control: 'none',
      description: 'Callback function called when an error is caught',
    },
  },
};

/**
 * Default story showing the error boundary with a working component
 */
export const Working = {
  args: {
    children: <BuggyComponent shouldThrow={false} />,
  },
};

/**
 * Story showing the error boundary catching an error
 */
export const WithError = {
  args: {
    children: <BuggyComponent shouldThrow={true} />,
  },
};

/**
 * Story showing the error boundary with a custom fallback component
 */
export const WithCustomFallback = {
  args: {
    children: <BuggyComponent shouldThrow={true} />,
    fallback: <CustomFallback />,
  },
};

/**
 * Story showing the error boundary with a fallback function
 */
export const WithFallbackFunction = {
  args: {
    children: <BuggyComponent shouldThrow={true} />,
    fallback: (error) => (
      <div style={{ padding: '20px', backgroundColor: '#ffebee' }}>
        <h3>Function Fallback</h3>
        <p>{error?.message}</p>
      </div>
    ),
  },
};

/**
 * Story showing the error boundary with an error callback
 */
export const WithErrorCallback = {
  args: {
    children: <BuggyComponent shouldThrow={true} />,
    onError: (error, errorInfo) => {
      console.log('Error caught:', error);
      console.log('Error info:', errorInfo);
    },
  },
};

/**
 * Story showing the error boundary with nested components
 */
export const WithNestedComponents = {
  args: {
    children: (
      <div>
        <h4>Parent Component</h4>
        <BuggyComponent shouldThrow={false} />
        <div>
          <h4>Nested Component</h4>
          <BuggyComponent shouldThrow={true} />
        </div>
      </div>
    ),
  },
};

/**
 * Story showing the error boundary in dark mode
 */
export const DarkMode = {
  args: {
    children: <BuggyComponent shouldThrow={true} />,
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
}; 