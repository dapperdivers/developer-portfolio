import type { Meta, StoryObj } from '@storybook/react-vite';
import FeedbackQuote from './FeedbackQuote';

const meta = {
  title: 'Molecules/FeedbackQuote',
  component: FeedbackQuote,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A component for displaying testimonial quotes with decorative quotation marks.',
      },
    },
  },
  argTypes: {
    text: {
      control: 'text',
      description: 'The quote text to display',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply',
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
    text: 'This is a fantastic portfolio website!',
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
 * Story showing a quote with custom styling
 */
export const CustomStyling: Story = {
  args: {
    text: 'A beautifully styled quote!',
    className: 'bg-gray-900 border border-gray-700 p-6 rounded-lg shadow-md',
  },
};

/**
 * Story showing a quote in dark mode
 */
export const DarkMode: Story = {
  args: {
    text: 'A quote that looks great in dark mode.',
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};

/**
 * Story showing a quote with special characters
 */
export const SpecialCharacters: Story = {
  args: {
    text: '¡This quote includes special characters! @#$%^&*()_+ áéíóú',
  },
};

/**
 * Story showing a quote with HTML entities
 */
export const WithHtmlEntities: Story = {
  args: {
    text: 'This quote has HTML entities: &amp; &lt; &gt; &quot;',
  },
};

/**
 * Story showing a quote with multiple paragraphs
 */
export const MultiParagraph: Story = {
  args: {
    text: 'First paragraph of the quote.\n\nSecond paragraph of the quote.\n\nThird paragraph with more content.',
  },
};

/**
 * Story showing a quote in mobile viewport
 */
export const MobileView: Story = {
  args: {
    text: 'A quote that adapts well to mobile screens.',
  },
  globals: {
    viewport: { value: 'mobile1', isRotated: false },
  },
}; 