import MapControls from './MapControls';

export default {
  title: 'atoms/MapControls',
  component: MapControls,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Map control buttons for resetting view, toggling map mode, and grid overlay with cybersecurity theming.',
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
    showGrid: {
      control: { type: 'boolean' },
      description: 'Whether grid overlay is active'
    },
    onResetView: { action: 'reset-view' },
    onToggleMapMode: { action: 'toggle-map-mode' },
    onToggleGrid: { action: 'toggle-grid' },
  },
};

const Template = (args) => (
  <div className="bg-gray-900 p-8 min-h-screen">
    <MapControls {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  variant: 'default',
  mapMode: 'dark',
  showGrid: false,
};

export const Secure = Template.bind({});
Secure.args = {
  variant: 'secure',
  mapMode: 'dark',
  showGrid: false,
};

export const Breach = Template.bind({});
Breach.args = {
  variant: 'breach',
  mapMode: 'satellite',
  showGrid: true,
};

export const Critical = Template.bind({});
Critical.args = {
  variant: 'critical',
  mapMode: 'satellite',
  showGrid: true,
};

export const Interactive = Template.bind({});
Interactive.args = {
  variant: 'default',
  mapMode: 'dark',
  showGrid: false,
};
Interactive.argTypes = {
  variant: { control: { type: 'select' } },
  mapMode: { control: { type: 'select' } },
  showGrid: { control: { type: 'boolean' } },
};