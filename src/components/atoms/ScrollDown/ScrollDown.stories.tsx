import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentProps } from 'react';
import { action } from 'storybook/actions';
import ScrollDown from './ScrollDown';

/**
 * ScrollDown component for indicating scrollable content below
 * 
 * This atom component provides a visual indicator for users to scroll down for more content.
 * It features a customizable label and animated dot to draw attention.
 */
const meta = {
  title: 'Atoms/ScrollDown',
  component: ScrollDown,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A scroll indicator component that uses animation to encourage users to scroll down. Features a customizable label and animated dot in a styled container.'
      }
    },
    backgrounds: {
      default: 'dark',
    }
  },
  tags: ['autodocs'],
  argTypes: {
    animated: { control: 'boolean', description: 'Play animations; reduced motion always turns them off' },
    onClick: { action: 'clicked', description: 'Function called when the scroll indicator is clicked' },
    label: { control: 'text', description: 'Text label above the scroll indicator' },
    className: { control: 'text', description: 'Additional CSS class names' }
  },
  decorators: [
    (Story) => (
      <div style={{ 
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', 
        padding: '100px', 
        height: '400px',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center'
      }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ScrollDown>;

export default meta;
type Story = StoryObj<typeof meta>;

// The indicator is absolutely positioned at the bottom of its section
const HeroFrame = (args: ComponentProps<typeof ScrollDown>) => (
  <div
    style={{
      position: 'relative',
      width: 'min(32rem, 90vw)',
      height: '22rem',
      background: 'var(--surface-card)',
      border: '1px solid var(--surface-border)',
      borderRadius: 'var(--radius-card)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      color: 'var(--color-text)',
    }}
  >
    <h2 style={{ margin: 0, fontSize: 'var(--font-size-3xl, 2rem)' }}>Derek Mackley</h2>
    <p style={{ margin: 0, color: 'var(--color-text-muted)', fontFamily: 'var(--font-family-jetbrains)' }}>
      Principal Security Engineer
    </p>
    <ScrollDown {...args} />
  </div>
);

export const Default: Story = {
  render: (args) => <HeroFrame {...args} />,
  args: {
    onClick: action('scroll-clicked'),
    label: '>>_NEXT',
    className: ''
  }
};

export const CustomLabel: Story = {
  args: {
    onClick: action('scroll-clicked'),
    label: 'MORE BELOW',
    className: ''
  }
};

export const WithCustomStyling: Story = {
  args: {
    onClick: action('scroll-clicked'),
    label: 'EXPLORE',
    className: 'custom-scroll-indicator'
  },
  decorators: [
    (Story) => (
      <div style={{ 
        background: 'linear-gradient(135deg, #131e36 0%, #2b1d40 100%)', 
        padding: '100px', 
        height: '400px',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center'
      }}>
        <style>
          {`
            .custom-scroll-indicator span {
              color: #f472b6 !important;
            }
            .custom-scroll-indicator .border {
              border-color: #f472b6 !important;
            }
            .custom-scroll-indicator .bg-cyan-500 {
              background-color: #f472b6 !important;
            }
          `}
        </style>
        <Story />
      </div>
    ),
  ]
};
