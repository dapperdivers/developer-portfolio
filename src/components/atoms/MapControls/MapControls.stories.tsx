import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import MapControls from './MapControls';
import type { MapControlsProps } from './MapControls';

const meta = {
  title: 'Atoms/MapControls',
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
    animated: {
      control: { type: 'boolean' },
      description: 'Whether the buttons react to hover and tap'
    },
    onResetView: { action: 'reset-view' },
    onToggleMapMode: { action: 'toggle-map-mode' },
    onToggleGrid: { action: 'toggle-grid' },
  },
} satisfies Meta<typeof MapControls>;

export default meta;
type Story = StoryObj<typeof meta>;

const Template = (args: MapControlsProps) => (
  <div className="bg-gray-900 p-8 min-h-screen">
    <MapControls {...args} />
  </div>
);

export const Default: Story = {
  render: Template,
  args: {
    variant: 'default',
    mapMode: 'dark',
    showGrid: false,
  },
};

export const Secure: Story = {
  render: Template,
  args: {
    variant: 'secure',
    mapMode: 'dark',
    showGrid: false,
  },
};

export const Breach: Story = {
  render: Template,
  args: {
    variant: 'breach',
    mapMode: 'satellite',
    showGrid: true,
  },
};

export const Critical: Story = {
  render: Template,
  args: {
    variant: 'critical',
    mapMode: 'satellite',
    showGrid: true,
  },
};

// Buttons drive local state: toggle the map mode and grid, reset restores the args
const InteractiveTemplate = ({ mapMode: initialMode, showGrid: initialGrid, ...args }: MapControlsProps) => {
  const [mapMode, setMapMode] = useState(initialMode);
  const [showGrid, setShowGrid] = useState(initialGrid);

  return (
    <div className="bg-gray-900 p-8 min-h-screen">
      <MapControls
        {...args}
        mapMode={mapMode}
        showGrid={showGrid}
        onToggleMapMode={(event) => {
          setMapMode((mode) => (mode === 'dark' ? 'satellite' : 'dark'));
          args.onToggleMapMode?.(event);
        }}
        onToggleGrid={(event) => {
          setShowGrid((grid) => !grid);
          args.onToggleGrid?.(event);
        }}
        onResetView={(event) => {
          setMapMode(initialMode);
          setShowGrid(initialGrid);
          args.onResetView?.(event);
        }}
      />
      <p className="mt-4 text-sm text-gray-400">
        View: {mapMode === 'dark' ? 'standard' : 'satellite'} · Grid: {showGrid ? 'on' : 'off'}
      </p>
    </div>
  );
};

export const Interactive: Story = {
  render: InteractiveTemplate,
  args: {
    variant: 'default',
    mapMode: 'dark',
    showGrid: false,
  },
};
