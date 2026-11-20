import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn, expect, mocked, waitFor, within } from 'storybook/test';
import ErrorBoundary from './ErrorBoundary';

// Component that throws an error for testing
const BuggyComponent = ({ shouldThrow = false }: { shouldThrow?: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error from BuggyComponent');
  }
  return <div style={{ color: 'var(--color-text)' }}>Working component</div>;
};

// Custom fallback component
const CustomFallback = ({ error }: { error?: Error }) => (
  <div>
    <h3 style={{ margin: '0 0 var(--spacing-2)', color: 'var(--color-text)' }}>Custom error view</h3>
    <p style={{ margin: 0, color: 'var(--color-text-muted)' }}>{error?.message ?? 'The weather panel is unavailable.'}</p>
  </div>
);

const meta = {
  title: 'Molecules/ErrorBoundary',
  component: ErrorBoundary,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Catches JavaScript errors in child components and shows a fallback. The default fallback is a security-console error on the shared card surface: terminal title bar, ERR code, a short message, error details and a Retry button that renders the children again. A custom fallback is shown inside the same card.',
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(await canvas.findByText('ERR')).toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: 'Retry' })).toBeInTheDocument();
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
      <div>
        <h3 style={{ margin: '0 0 var(--spacing-2)', color: 'var(--color-text)' }}>Function fallback</h3>
        <p style={{ margin: 0, color: 'var(--color-text-muted)', fontFamily: 'var(--font-family-jetbrains)' }}>{error?.message}</p>
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
        <h4 style={{ color: 'var(--color-text)' }}>Parent component</h4>
        <BuggyComponent shouldThrow={false} />
        <div>
          <h4 style={{ color: 'var(--color-text)' }}>Nested component</h4>
          <BuggyComponent shouldThrow={true} />
        </div>
      </div>
    ),
  },
};