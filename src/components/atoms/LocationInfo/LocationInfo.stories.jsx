import LocationInfo from './LocationInfo';

export default {
  title: 'atoms/LocationInfo',
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
  },
};

const Template = (args) => (
  <div className="bg-gray-900 p-8 min-h-screen">
    <div className="max-w-md">
      <LocationInfo {...args} />
    </div>
  </div>
);

const mockLocationData = {
  name: 'San Francisco, CA',
  lat: 37.7749,
  lng: -122.4194,
};

const nyLocationData = {
  name: 'New York, NY',
  lat: 40.7128,
  lng: -74.0060,
};

const londonLocationData = {
  name: 'London, UK',
  lat: 51.5074,
  lng: -0.1278,
};

export const Default = Template.bind({});
Default.args = {
  variant: 'default',
  locationData: mockLocationData,
  mapMode: 'dark',
};

export const Secure = Template.bind({});
Secure.args = {
  variant: 'secure',
  locationData: mockLocationData,
  mapMode: 'dark',
};

export const Breach = Template.bind({});
Breach.args = {
  variant: 'breach',
  locationData: nyLocationData,
  mapMode: 'satellite',
};

export const Critical = Template.bind({});
Critical.args = {
  variant: 'critical',
  locationData: londonLocationData,
  mapMode: 'satellite',
};

export const SatelliteMode = Template.bind({});
SatelliteMode.args = {
  variant: 'default',
  locationData: mockLocationData,
  mapMode: 'satellite',
};

export const NoLocation = Template.bind({});
NoLocation.args = {
  variant: 'default',
  locationData: null,
  mapMode: 'dark',
};

export const Interactive = Template.bind({});
Interactive.args = {
  variant: 'default',
  locationData: mockLocationData,
  mapMode: 'dark',
};
Interactive.argTypes = {
  variant: { control: { type: 'select' } },
  mapMode: { control: { type: 'select' } },
};