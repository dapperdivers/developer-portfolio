import type { Meta, StoryObj } from '@storybook/react-vite';
import ProfileError from './ProfileError';

const meta = {
  title: 'Molecules/ProfileError',
  component: ProfileError,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Error state for the profile card, on the shared card surface with a red icon badge and an optional Retry button.',
      },
    },
    componentSubtitle: 'A molecule component for error states and retry functionality',
  },
  argTypes: {
    message: { control: 'text' },
    onRetry: { action: 'retried' },
    animate: { control: 'boolean' },
  },
  render: (args) => (
    <ProfileError {...args} />
  ),
} satisfies Meta<typeof ProfileError>;
export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Default story shows the profile error with default message and retry button.
 */
export const Default: Story = {
  args: {
    message: 'Unable to load GitHub profile data. Please try again later.',
    
    animate: true,
  },
};

/**
 * Custom error message example.
 */
export const CustomMessage: Story = {
  args: {
    message: 'API rate limit exceeded. Please try again in a few minutes.',
    
    animate: true,
  },
};

/**
 * Without retry button example.
 */
export const WithoutRetry: Story = {
  args: {
    message: 'Unable to load GitHub profile data. Please try again later.',
    // The prop is optional; the explicit null is kept so the action argType does not supply a handler
    onRetry: null as unknown as undefined,
    animate: true,
  },
};

/**
 * Without animation example.
 */
export const NoAnimation: Story = {
  args: {
    message: 'Unable to load GitHub profile data. Please try again later.',
    
    animate: false,
  },
};