import type { Meta, StoryObj } from '@storybook/react-vite';
import LocationInfo from './LocationInfo';
import type { LocationData } from './LocationInfo';

const meta = {
  title: 'Atoms/LocationInfo',
  component: LocationInfo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Location information panel with security metrics and data streams for maps.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'secure', 'breach', 'critical'],
      description: 'Security variant theme'
    },
    mapMode: {
      control: { type: 'select' },
      options: ['dark', 'satellite'],
      description: 'Current map display mode'
    },
    locationData: {
      control: { type: 'object' },
      description: 'Location data object'
    },
    animated: {
      control: { type: 'boolean' },
      description: 'Whether the status dot and data streams animate'
    },
  },
  // Shared wrapper for every story
  render: (args) => (
    <div className="bg-gray-900 p-8 min-h-screen">
      <div className="max-w-md">
        <LocationInfo {...args} />
      </div>
    </div>
  ),
} satisfies Meta<typeof LocationInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockLocationData: LocationData = {
  name: 'San Francisco, CA',
  lat: 37.7749,
  lng: -122.4194,
};

const nyLocationData: LocationData = {
  name: 'New York, NY',
  lat: 40.7128,
  lng: -74.0060,
};

const londonLocationData: LocationData = {
  name: 'London, UK',
  lat: 51.5074,
  lng: -0.1278,
};

export const Default: Story = {
  args: {
    variant: 'default',
    locationData: mockLocationData,
    mapMode: 'dark',
  },
};

export const Secure: Story = {
  args: {
    variant: 'secure',
    locationData: mockLocationData,
    mapMode: 'dark',
  },
};

export const Breach: Story = {
  args: {
    variant: 'breach',
    locationData: nyLocationData,
    mapMode: 'satellite',
  },
};

export const Critical: Story = {
  args: {
    variant: 'critical',
    locationData: londonLocationData,
    mapMode: 'satellite',
  },
};

export const SatelliteMode: Story = {
  args: {
    variant: 'default',
    locationData: mockLocationData,
    mapMode: 'satellite',
  },
};

export const NoLocation: Story = {
  args: {
    variant: 'default',
    locationData: undefined,
    mapMode: 'dark',
  },
};
