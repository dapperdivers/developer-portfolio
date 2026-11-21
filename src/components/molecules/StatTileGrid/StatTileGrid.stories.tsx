import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor, within } from 'storybook/test';
import StatTileGrid from './StatTileGrid';
import type { StatTileGridItem } from './StatTileGrid';

const tiles: StatTileGridItem[] = [
  { id: 'nodes', label: 'Nodes', value: '11' },
  { id: 'pods', label: 'Pods', value: '266' },
  { id: 'services', label: 'Services up', value: '69' },
  { id: 'uptime', label: 'Uptime', value: '8', unit: 'days' },
  { id: 'power', label: 'Power draw', value: '1,074', unit: 'W' },
  { id: 'cpu', label: 'CPU', value: '12.3', unit: '%' },
  { id: 'memory', label: 'Memory', value: '14', unit: '%' },
  { id: 'alerts', label: 'Alerts', value: '0', tone: 'success' },
];

const meta = {
  title: 'Molecules/StatTileGrid',
  component: StatTileGrid,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Responsive grid of StatTiles: four columns on wide screens, two on a phone, one at large text sizes. While loading it shows shimmer tiles with only their captions.',
      },
    },
  },
  args: {
    tiles,
    animated: true,
    placeholders: tiles.map((t) => t.label),
  },
} satisfies Meta<typeof StatTileGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await waitFor(() => expect(canvas.getByText('1,074')).toBeInTheDocument(), { timeout: 3000 });
    await expect(canvas.getAllByTestId('stat-tile')).toHaveLength(8);
  },
};

/** Alerts above zero show the real count in amber. */
export const WithAlert: Story = {
  args: { tiles: tiles.map((t) => (t.id === 'alerts' ? { ...t, value: '2', tone: 'warning' as const } : t)) },
};

export const Loading: Story = { args: { loading: true } };

export const NoAnimation: Story = { args: { animated: false } };

export const Phone: Story = {
  parameters: { viewport: { defaultViewport: 'mobile1' } },
};
