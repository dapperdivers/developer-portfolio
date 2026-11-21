import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor, within } from 'storybook/test';
import type { ClusterStatusData } from '@/types/cluster';
import ClusterTelemetry from './ClusterTelemetry';

const badge = (title: string, value: string, color = 'green') => ({ title, value, color });

// Shaped like the /api/cluster-status response
const okData: ClusterStatusData = {
  updatedAt: '2026-11-20T19:12:00.000Z',
  badges: {
    cluster_status: badge('Cluster', 'up'),
    cluster_node_count: badge('Nodes', '11'),
    cluster_pod_count: badge('Pods', '266'),
    services_up: badge('Services', '69 up'),
    cluster_uptime_days: badge('Uptime', '8d'),
    cluster_age_days: badge('Age', '646d', 'red'),
    cluster_cpu_usage: badge('CPU', '12.3%'),
    cluster_memory_usage: badge('Memory', '13.8%'),
    cluster_power_usage: badge('Power', '1,074w'),
    cluster_alert_count: badge('Alerts', '0'),
    talos_version: badge('Talos', '1.14.5', 'blue'),
    kubernetes_version: badge('Kubernetes', '1.37.2', 'blue'),
    flux_version: badge('Flux', '2.10.1', 'blue'),
  },
};

const degradedData: ClusterStatusData = {
  ...okData,
  badges: {
    ...okData.badges,
    cluster_status: badge('Cluster', 'degraded', 'yellow'),
    cluster_alert_count: badge('Alerts', '3', 'red'),
  },
};

const meta = {
  title: 'Organisms/ClusterTelemetry',
  component: ClusterTelemetry,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The live telemetry band under the hero: stat tiles with the numbers from the cluster serving the page, a status line, version chips and a link to the repo. Colours follow the data with the site\'s own meaning: zero alerts green, any alerts amber (with the real count), degraded amber, cluster age never red. Loading shows shimmer tiles; when the feed is down it says "Telemetry offline" and shows no numbers. In the app it reads `useClusterStatus`; the stories pass `result` instead.',
      },
    },
  },
  args: { result: { status: 'ok', data: okData } },
} satisfies Meta<typeof ClusterTelemetry>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Ok: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('heading', { name: /runs in my garage/i })).toBeInTheDocument();
    await waitFor(() => expect(canvas.getByText('1,074')).toBeInTheDocument(), { timeout: 3000 });
    await expect(canvas.getByText('cluster up')).toBeInTheDocument();
    await expect(canvas.getByText('running for 646 days')).toBeInTheDocument();
  },
};

export const Degraded: Story = {
  args: { result: { status: 'ok', data: degradedData } },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByText('cluster degraded')).toBeInTheDocument();
  },
};

export const Loading: Story = {
  args: { result: { status: 'loading', data: null } },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).queryByText('266')).toBeNull();
  },
};

export const ErrorState: Story = {
  args: { result: { status: 'error', data: null } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Telemetry offline')).toBeInTheDocument();
    await expect(canvas.queryByText('266')).toBeNull();
  },
};
