import type { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import Loading from './Loading';
import { within, expect } from 'storybook/test';

const meta = {
  title: 'Atoms/Loading',
  component: Loading,
  tags: ['autodocs'],
  argTypes: {
    animated: { control: 'boolean', description: 'Play animations; reduced motion always turns them off' },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the loading indicator',
    },
    variant: {
      control: 'select',
      options: ['', 'security', 'terminal'],
      description: 'Visual variant',
    },
    type: {
      control: 'select',
      options: ['spinner', 'pulse', 'dots'],
      description: 'Loading animation type',
    },
  },
} satisfies Meta<typeof Loading>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default loading spinner story
export const Default: Story = {
  args: {
    size: 'md',
    variant: 'security',
    type: 'spinner',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 'min(24rem, 90vw)' }}>
        <Story />
      </div>
    ),
  ],
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    
    await step('Accessibility verification', async () => {
      // Check that the loading element has the correct ARIA attributes
      const loadingElement = canvas.getByRole('status');
      await expect(loadingElement).toBeInTheDocument();
      await expect(loadingElement).toHaveAttribute('aria-busy', 'true');
      await expect(loadingElement).toHaveAttribute('aria-live', 'polite');
      
      // Check that there's a visually hidden message for screen readers
      const hiddenText = canvas.getByText('Content is loading...');
      await expect(hiddenText).toBeInTheDocument();
    });
  }
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
      <Loading size="sm" />
      <Loading size="md" />
      <Loading size="lg" />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
      <Loading variant="" />
      <Loading variant="security" />
      <Loading variant="terminal" />
    </div>
  ),
};

export const Types: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
      <Loading type="spinner" />
      <Loading type="pulse" />
      <Loading type="dots" />
    </div>
  ),
};

// Loading in a constrained container - shows how the spinner behaves in limited space
export const ConstrainedContainer: StoryFn<typeof Loading> = () => (
  <div style={{ width: '100px', height: '100px', border: '1px dashed #ccc' }}>
    <Loading />
  </div>
);
ConstrainedContainer.parameters = {
  docs: {
    description: {
      story: 'Shows how the loading spinner adapts to smaller container sizes.'
    }
  }
};

// Loading as an overlay - demonstrates how to use the spinner as an overlay on content
export const ContentOverlay: StoryFn<typeof Loading> = () => (
  <div style={{ position: 'relative', width: '300px', height: '200px', border: '1px solid var(--surface-border)', borderRadius: 'var(--radius-card)', background: 'var(--surface-card)', color: 'var(--color-text)', padding: '1rem', overflow: 'hidden' }}>
    <p>This content is being updated...</p>
    <div style={{ 
      position: 'absolute', 
      top: 0, 
      left: 0, 
      right: 0, 
      bottom: 0, 
      backgroundColor: 'rgba(var(--color-navy-rgb), 0.85)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Loading />
    </div>
  </div>
);
ContentOverlay.parameters = {
  docs: {
    description: {
      story: 'Demonstrates how to use the loading spinner as an overlay on content that is being updated.'
    }
  }
};

// Loading in a card - shows integration with other UI components
export const InCard: StoryFn<typeof Loading> = () => (
  <div style={{ 
    maxWidth: '300px',
    padding: '1rem',
    borderRadius: 'var(--radius-card)',
    border: '1px solid var(--surface-border)',
    boxShadow: 'var(--shadow-card)',
    backgroundColor: 'var(--surface-card)',
    color: 'var(--color-text)'
  }}>
    <h3 style={{ margin: '0 0 1rem 0' }}>Loading Data</h3>
    <Loading />
    <p style={{ textAlign: 'center', marginTop: '1rem', color: 'var(--color-text-muted)' }}>
      Please wait while we fetch your data...
    </p>
  </div>
);
InCard.parameters = {
  docs: {
    description: {
      story: 'Shows how to integrate the loading spinner within a card component.'
    }
  }
};

// Implementation that demonstrates a full-page loading state
export const FullPageLoading: StoryFn<typeof Loading> = () => (
  <div style={{ 
    position: 'fixed', 
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0,
    backgroundColor: 'var(--color-background)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem'
  }}>
    <Loading />
    <p style={{ color: 'var(--color-text-muted)', fontWeight: 500 }}>Loading application...</p>
  </div>
);
FullPageLoading.parameters = {
  docs: {
    description: {
      story: 'Demonstrates how to create a full-page loading state during initial application load.'
    }
  },
  layout: 'fullscreen'
};

/**
 * ## Component Usage
 * 
 * ```jsx
 * import Loading from '@molecules/Loading';
 * 
 * // Basic usage
 * function BasicExample() {
 *   return <Loading />;
 * }
 * 
 * // In a conditional render
 * function ConditionalExample({ isLoading, data }) {
 *   return isLoading ? <Loading /> : <DataDisplay data={data} />;
 * }
 * 
 * // As an overlay
 * function OverlayExample({ isLoading }) {
 *   return (
 *     <div style={{ position: 'relative' }}>
 *       <Content />
 *       
 *       {isLoading && (
 *         <div className="overlay">
 *           <Loading />
 *         </div>
 *       )}
 *     </div>
 *   );
 * }
 * ```
 * 
 * ## Accessibility Features
 * 
 * This component follows these accessibility best practices:
 * - Uses `role="status"` to identify the component as a status indicator
 * - Uses `aria-live="polite"` to announce state changes to screen readers
 * - Uses `aria-busy="true"` to indicate that the section is being updated
 * - Includes visually hidden text for screen readers
 * - Has sufficient color contrast for the spinner
 * 
 * ## Animation Details
 * 
 * The loading spinner uses CSS animations with the following characteristics:
 * - Smooth 360° rotation animation
 * - 1-second animation duration
 * - Infinite loop
 * - Hardware-accelerated with will-change and transform properties
 * - Fade-in animation for smooth appearance
 * 
 * ## Implementation Notes
 * 
 * - The component is designed to be used in various contexts, from small components to full-page loading states
 * - The spinner size and colors are based on design tokens for consistency
 * - The component handles its own accessibility requirements without needing props
 * - The loading indicator is designed to remain visible if the user is using data-saving modes or has disabled animations
 */