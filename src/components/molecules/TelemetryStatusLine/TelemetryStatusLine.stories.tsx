import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import TelemetryStatusLine from './TelemetryStatusLine';

const meta = {
  title: 'Molecules/TelemetryStatusLine',
  component: TelemetryStatusLine,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A live dot, the cluster state in words and the local time of the last reading. The dot pulses; it stays still under reduced motion or when `animated` is false. Degraded is amber, offline and loading are grey.',
      },
    },
  },
  args: { state: 'up', updatedAt: '2026-11-20T19:12:00.000Z', animated: true },
  argTypes: { state: { control: 'inline-radio', options: ['up', 'degraded', 'loading', 'offline'] } },
} satisfies Meta<typeof TelemetryStatusLine>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Up: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('cluster up')).toBeInTheDocument();
    await expect(canvas.getByText(/updated/)).toBeInTheDocument();
  },
};

export const Degraded: Story = { args: { state: 'degraded' } };

export const Loading: Story = { args: { state: 'loading', updatedAt: undefined } };

export const Offline: Story = { args: { state: 'offline', updatedAt: undefined } };

export const NoAnimation: Story = { args: { animated: false } };
