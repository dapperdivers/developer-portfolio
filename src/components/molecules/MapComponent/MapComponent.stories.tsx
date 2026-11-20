import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import type { ClusterStatusData } from '@/types/cluster';
import MapComponent from './MapComponent';

const clusterFixture: ClusterStatusData = {
  updatedAt: '2026-11-20T14:32:00.000Z',
  badges: {
    cluster_status: { title: 'Cluster', value: 'up', color: 'green' },
    cluster_node_count: { title: 'Nodes', value: '11', color: 'green' },
    cluster_pod_count: { title: 'Pods', value: '266', color: 'green' },
    services_up: { title: 'Services', value: '69 up', color: 'green' },
    cluster_uptime_days: { title: 'Uptime', value: '7d', color: 'green' },
  },
};

const meta: Meta<typeof MapComponent> = {
  title: 'Molecules/MapComponent',
  component: MapComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A terminal-styled Leaflet map centred on a named place. The place is looked up in a built-in list, so no geocoding request leaves the browser; map tiles come from OpenStreetMap. The Leaflet instance is created once and updated in place when the props change.',
      },
    },
  },
  argTypes: {
    location: { control: 'text', description: 'Place name to show, e.g. "Canton, GA"' },
    clusterStatus: { control: 'object', description: 'Live cluster numbers: `{ status, data }`. Without them the metrics panel is left out.' },
    animated: { control: 'boolean', description: 'Whether the live dot pulses' },
  },
  args: { location: 'Canton, GA', animated: true },
};
export default meta;

type Story = StoryObj<typeof MapComponent>;

export const Default: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('The map mounts and shows the place', async () => {
      await waitFor(() => expect(canvasElement.querySelector('.leaflet-container')).not.toBeNull());
      await waitFor(() => expect(canvasElement.querySelector('.marker-label')).toHaveTextContent('Canton, GA'));
      await expect(canvas.getByText('34.2368°, -84.4908°')).toBeInTheDocument();
    });

    await step('Without cluster data there is no metrics panel', async () => {
      await expect(canvasElement.querySelector('.security-metrics-panel')).toBeNull();
    });

    await step('The grid can be switched off and on', async () => {
      const grid = canvas.getByRole('button', { name: 'Toggle grid overlay' });
      await expect(grid).toHaveAttribute('aria-pressed', 'true');
      await userEvent.click(grid);
      await expect(canvasElement.querySelector('.map-grid-overlay')).toBeNull();
      await userEvent.click(grid);
      await expect(canvasElement.querySelector('.map-grid-overlay')).not.toBeNull();
    });

    await step('The tiles switch between dark and light without rebuilding the map', async () => {
      const mapElement = canvasElement.querySelector('.leaflet-container');
      await userEvent.click(canvas.getByRole('button', { name: 'Switch to light map' }));
      await waitFor(() => expect(canvasElement.querySelector('.map-tiles--light')).not.toBeNull());
      await expect(canvasElement.querySelector('.map-tiles--dark')).toBeNull();
      await expect(canvasElement.querySelector('.leaflet-container')).toBe(mapElement);
      await userEvent.click(canvas.getByRole('button', { name: 'Switch to dark map' }));
      await waitFor(() => expect(canvasElement.querySelector('.map-tiles--dark')).not.toBeNull());
    });
  },
};

/** With live cluster numbers the metrics panel shows them. */
export const WithClusterStatus: Story = {
  args: { clusterStatus: { status: 'ok', data: clusterFixture } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('CLUSTER TELEMETRY')).toBeInTheDocument();
    await expect(canvas.getByText('266')).toBeInTheDocument();
  },
};

export const ClusterStatusLoading: Story = {
  args: { clusterStatus: { status: 'loading', data: null } },
};

/** Feed unavailable: the panel says telemetry is offline and shows no figures. */
export const ClusterStatusOffline: Story = {
  args: { clusterStatus: { status: 'error', data: null } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(/Telemetry offline/)).toBeInTheDocument();
  },
};

export const AnotherCity: Story = {
  args: { location: 'Seattle, WA' },
};

/** A wide area: the built-in list carries a zoom level per place. */
export const WholeCountry: Story = {
  args: { location: 'United States' },
};

/**
 * A place that is not in the built-in list. The map stays on its world view
 * with no marker, and the status line reads "LOCATION UNKNOWN".
 */
export const UnknownPlace: Story = {
  args: { location: 'Nowhere, ZZ' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await waitFor(() => expect(canvasElement.querySelector('.leaflet-container')).not.toBeNull());
    await expect(canvas.getByText('LOCATION UNKNOWN')).toBeInTheDocument();
    await expect(canvasElement.querySelector('.marker-label')).toBeNull();
  },
};

/** The label is inserted as text, so markup in a place name is shown literally. */
export const LabelIsEscaped: Story = {
  args: { location: 'Canton, GA <img src=x onerror=alert(1)>' },
  play: async ({ canvasElement }) => {
    await waitFor(() => expect(canvasElement.querySelector('.marker-label')).not.toBeNull());
    await expect(canvasElement.querySelector('.marker-label img')).toBeNull();
    await expect(canvasElement.querySelector('.marker-label')).toHaveTextContent('<img src=x onerror=alert(1)>');
  },
};

export const WithoutAnimation: Story = {
  args: { animated: false },
};

export const MobileView: Story = {
  globals: { viewport: { value: 'mobile1', isRotated: false } },
};

export const TabletView: Story = {
  globals: { viewport: { value: 'tablet', isRotated: false } },
};
