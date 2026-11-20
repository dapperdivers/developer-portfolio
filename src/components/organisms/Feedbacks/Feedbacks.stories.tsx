import type { Meta, StoryObj } from '@storybook/react-vite';
import Feedbacks from './Feedbacks';
import { within, expect } from 'storybook/test';
import type { Feedback } from '@/types/portfolio';
import { withViewport } from '@stories-utils';
import { placeholderImage } from '@stories-utils/placeholderImage';
import { siteData, withSiteData, withSettledMotion } from '../storyFixtures';

const meta = {
  title: 'Organisms/Feedbacks',
  component: Feedbacks,
  tags: ['autodocs'],
  // This component has no direct props, as it gets data from context
  decorators: [withSettledMotion],
  parameters: {
    docs: {
      description: {
        component: 'Feedbacks section that displays testimonials and recommendations. Renders a FeedbackCard for each entry within a Section layout, using data from PortfolioContext. Stories turn the scroll-in animation off so the section is visible straight away.',
      },
    },
    layout: 'fullscreen',
    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', enabled: true },
          { id: 'heading-order', enabled: true }
        ],
      },
    },
  },
} satisfies Meta<typeof Feedbacks>;

export default meta;
type Story = StoryObj<typeof meta>;

// Extra, clearly fictional testimonials for the multi-card stories
const extraFeedbacks: Feedback[] = [
  {
    name: "Maya Okafor",
    feedback: "Derek reviewed our release pipeline, found two ways a bad build could reach production and closed both within the week. He explained each fix to the team in plain terms and left a runbook behind.",
    highlight: "Closed both within the week and left a runbook behind.",
    designation: "VP of Engineering, Northwind Freight",
    rating: 5,
    avatar: placeholderImage(150, 150, { label: 'MO' }),
  },
  {
    name: "Tomas Alvarez",
    feedback: "Calm in an incident and clear afterwards. Our on-call team now follows the checklists he wrote.",
    designation: "Site Reliability Lead, Example University",
    rating: 4,
  },
];

// The real testimonial from the site
export const Default: Story = {
  decorators: [withSiteData()],
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Check section title', async () => {
      await expect(canvas.getByText('Personal Feedback')).toBeInTheDocument();
    });

    await step('Check the testimonial is rendered', async () => {
      await expect(canvas.getByText(siteData.feedbacks[0].name)).toBeInTheDocument();
      const stars = canvas.getAllByLabelText(/out of 5 stars/i);
      await expect(stars.length).toBe(siteData.feedbacks.length);
    });
  },
};

// Several testimonials: one with a photo, one without, one with a 4-star rating
export const WithMultipleFeedbacks: Story = {
  decorators: [withSiteData({ feedbacks: [...siteData.feedbacks, ...extraFeedbacks] })],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Maya Okafor')).toBeInTheDocument();
    await expect(canvas.getByText('Tomas Alvarez')).toBeInTheDocument();
    await expect(canvas.getAllByLabelText(/out of 5 stars/i).length).toBe(3);
  },
};

/**
 * Empty state shows what happens when there are no feedbacks available.
 * The component renders nothing per the implementation.
 */
export const EmptyState: Story = {
  decorators: [withSiteData({ feedbacks: [] })],
  parameters: {
    docs: {
      description: {
        story: 'When no feedback items are available, the component returns null and nothing is rendered.'
      }
    }
  },
};

// Mobile view
export const Mobile: Story = {
  decorators: [
    withSiteData({ feedbacks: [...siteData.feedbacks, ...extraFeedbacks] }),
    withViewport('mobile')
  ],
  parameters: {
    docs: {
      description: {
        story: 'Feedbacks section in mobile view, with feedback cards stacked vertically.'
      }
    }
  },
};
