import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import MapComponent from './MapComponent';

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
    animated: { control: 'boolean', description: 'Whether the status light pulses' },
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
