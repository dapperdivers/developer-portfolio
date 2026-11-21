import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor, within } from 'storybook/test';
import StatTile from './StatTile';

const meta = {
  title: 'Molecules/StatTile',
  component: StatTile,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'One live number: a big monospace figure, a small unit and a mono caption. The figure counts up from 0 the first time it is seen (final value at once under reduced motion). Tones: success for good news, warning (amber) for anything that needs a look. Never red. Must sit inside a `dl`.',
      },
    },
  },
  decorators: [
    (Story) => (
      <dl style={{ margin: 0, width: 200 }}>
        <Story />
      </dl>
    ),
  ],
  args: { label: 'Pods', value: '266', animated: true },
  argTypes: {
    tone: { control: 'inline-radio', options: ['default', 'success', 'warning'] },
    loading: { control: 'boolean' },
    animated: { control: 'boolean' },
  },
} satisfies Meta<typeof StatTile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Pods')).toBeInTheDocument();
    await waitFor(() => expect(canvas.getByText('266')).toBeInTheDocument(), { timeout: 3000 });
  },
};

export const WithUnit: Story = { args: { label: 'Power draw', value: '1,074', unit: 'W' } };

export const Decimal: Story = { args: { label: 'Memory', value: '13.8', unit: '%' } };

export const Success: Story = { args: { label: 'Alerts', value: '0', tone: 'success' } };

/** Alerts above zero are amber with the real count. */
export const Warning: Story = { args: { label: 'Alerts', value: '1', tone: 'warning' } };

export const Loading: Story = { args: { loading: true } };

export const NoAnimation: Story = {
  args: { animated: false, label: 'Nodes', value: '11' },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByText('11')).toBeInTheDocument();
  },
};
