import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import type { ClusterStatusData } from '@/types/cluster';
import ClusterStatus from './ClusterStatus';

const badge = (title: string, value: string, color = 'green') => ({ title, value, color });

// Fixture shaped like the /api/cluster-status response
const upData: ClusterStatusData = {
  updatedAt: '2026-11-20T14:32:00.000Z',
  badges: {
    cluster_status: badge('Cluster', 'up'),
    cluster_node_count: badge('Nodes', '11'),
    cluster_pod_count: badge('Pods', '266'),
    services_up: badge('Services', '69 up'),
    cluster_uptime_days: badge('Uptime', '7d'),
    cluster_cpu_usage: badge('CPU', '18%'),
    cluster_memory_usage: badge('Memory', '54%'),
    cluster_power_usage: badge('Power', '1,234w'),
    cluster_alert_count: badge('Alerts', '0'),
  },
};

const degradedData: ClusterStatusData = {
  ...upData,
  badges: {
    ...upData.badges,
    cluster_status: badge('Cluster', 'degraded', 'yellow'),
    cluster_alert_count: badge('Alerts', '2', 'yellow'),
  },
};

const meta = {
  title: 'Molecules/ClusterStatus',
  component: ClusterStatus,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Live numbers from the homelab cluster in the terminal style, with a pulsing live dot (still under reduced motion). It only shows readings the cluster reported; while loading or when the feed is down it says so and shows no figures. Data comes from the `useClusterStatus` hook in a parent.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 320, padding: 16, background: 'var(--color-background-alt)', border: '1px solid var(--color-cyan)', borderRadius: 8 }}>
        <Story />
      </div>
    ),
  ],
  args: { status: 'ok', data: upData, animated: true, variant: 'panel' },
} satisfies Meta<typeof ClusterStatus>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Ok: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('ALL SYSTEMS UP')).toBeInTheDocument();
    await expect(canvas.getByText('266')).toBeInTheDocument();
    await expect(canvas.getByText('NODES')).toBeInTheDocument();
  },
};

export const Degraded: Story = {
  args: { data: degradedData },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByText('DEGRADED')).toBeInTheDocument();
  },
};

export const Loading: Story = {
  args: { status: 'loading', data: null },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('ACQUIRING')).toBeInTheDocument();
    await expect(canvas.queryByText('266')).toBeNull();
  },
};

export const ErrorState: Story = {
  args: { status: 'error', data: null },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(/Telemetry offline/)).toBeInTheDocument();
    await expect(canvas.queryByText('266')).toBeNull();
  },
};

/** Only some badges came back: the rest are left out, not guessed. */
export const PartialData: Story = {
  args: {
    data: { updatedAt: upData.updatedAt, badges: { cluster_pod_count: upData.badges.cluster_pod_count } },
  },
};

export const Compact: Story = {
  args: { variant: 'compact' },
};

export const WithoutAnimation: Story = {
  args: { animated: false },
};
