import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
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

export const Default: Story = {
  args: {
    onClick: action('scroll-clicked'),
    label: 'SCROLL_DOWN',
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
