import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn, expect, mocked, waitFor } from 'storybook/test';
import ErrorBoundary from './ErrorBoundary';

// Component that throws an error for testing
const BuggyComponent = ({ shouldThrow = false }: { shouldThrow?: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error from BuggyComponent');
  }
  return <div>Working component</div>;
};

// Custom fallback component
const CustomFallback = ({ error }: { error?: Error }) => (
  <div style={{ padding: '20px', border: '2px solid red', borderRadius: '4px' }}>
    <h3>Custom Error View</h3>
    <p>{error?.message}</p>
  </div>
);

const meta = {
  title: 'Molecules/ErrorBoundary',
  component: ErrorBoundary,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A component that catches JavaScript errors in child components and displays a fallback UI.',
      },
    },
  },
  args: {
    // Called during render when a child throws, so it needs an explicit spy
    onError: fn(),
  },
  argTypes: {
    fallback: {
      control: false,
      description: 'Custom fallback UI to show when an error occurs',
    },
    onError: {
      control: false,
      description: 'Callback function called when an error is caught',
    },
  },
} satisfies Meta<typeof ErrorBoundary>;
export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Default story showing the error boundary with a working component
 */
export const Working: Story = {
  args: {
    children: <BuggyComponent shouldThrow={false} />,
  },
};

/**
 * Story showing the error boundary catching an error
 */
export const WithError: Story = {
  args: {
    children: <BuggyComponent shouldThrow={true} />,
  },
};

/**
 * Story showing the error boundary with a custom fallback component
 */
export const WithCustomFallback: Story = {
  args: {
    children: <BuggyComponent shouldThrow={true} />,
    fallback: <CustomFallback />,
  },
};

/**
 * Story showing the error boundary with a fallback function
 */
export const WithFallbackFunction: Story = {
  args: {
    children: <BuggyComponent shouldThrow={true} />,
    fallback: (error) => (
      <div style={{ padding: '20px', borderRadius: 'var(--border-radius-lg)', border: '1px solid var(--color-danger)', backgroundColor: 'rgba(var(--color-danger-rgb), 0.12)', color: 'var(--color-text)' }}>
        <h3>Function Fallback</h3>
        <p>{error?.message}</p>
      </div>
    ),
  },
};

/**
 * Renders the same fallback as "With Error". The difference is behavioural: the
 * `onError` callback is called with the caught error (see the Actions and
 * Interactions panels).
 */
export const WithErrorCallback: Story = {
  args: {
    children: <BuggyComponent shouldThrow={true} />,
  },
  play: async ({ args }) => {
    if (!args.onError) throw new Error('onError arg is missing');
    const onError = mocked(args.onError);
    await waitFor(() => expect(onError).toHaveBeenCalled());
    const [error, errorInfo] = onError.mock.calls[0];
    await expect(error.message).toBe('Test error from BuggyComponent');
    await expect(errorInfo.componentStack).toBeTruthy();
  },
};

/**
 * Story showing the error boundary with nested components
 */
export const WithNestedComponents: Story = {
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