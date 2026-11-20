import type { Meta, StoryObj } from '@storybook/react-vite';
import FeedbackQuote from './FeedbackQuote';

const meta = {
  title: 'Molecules/FeedbackQuote',
  component: FeedbackQuote,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A testimonial quote in Inter, upright, with small quotation marks. Line breaks in the text are kept.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '480px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    text: {
      control: 'text',
      description: 'The quote text to display',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply',
    },
    animated: {
      control: 'boolean',
      description: 'Whether to animate the quote in',
    },
  },
} satisfies Meta<typeof FeedbackQuote>;
export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Default story showing a short quote
 */
export const Default: Story = {
  args: {
    text: 'Derek was a dependable developer who always finished what he started, even while priorities kept changing. He picked up new languages, servers and platforms quickly and explained his work well.',
  },
};

/**
 * Story showing a longer quote
 */
export const LongQuote: Story = {
  args: {
    text: 'Derek joined in the middle of a difficult cloud migration and within a month had mapped every exposed service, closed the riskiest gaps and put automated checks in the pipeline so they stayed closed. He explains security trade-offs in terms the product team can act on, and he writes down what he learns so the next engineer does not have to rediscover it.',
  },
};

/**
 * Story showing a quote with special characters
 */
export const SpecialCharacters: Story = {
  args: {
    text: 'He turned a 3 a.m. page into a 10-minute fix & a better runbook: "check the cert first, then the proxy". Très professionnel.',
  },
};

/**
 * Story showing a quote with multiple paragraphs
 */
export const MultiParagraph: Story = {
  args: {
    text: 'First, he mapped what we had.\n\nThen he fixed what mattered most.\n\nFinally, he made sure it stayed fixed.',
  },
};

/**
 * Story with the entrance animation off
 */
export const WithoutAnimation: Story = {
  args: {
    text: 'Calm in an incident and clear afterwards.',
    animated: false,
  },
};

/**
 * Story showing a quote in mobile viewport
 */
export const MobileView: Story = {
  args: {
    text: 'A quote that adapts well to mobile screens: the text wraps inside the card and keeps its line height.',
  },
  globals: {
    viewport: { value: 'mobile1', isRotated: false },
  },
};
