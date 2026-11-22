import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import VersionChips from './VersionChips';

const meta = {
  title: 'Molecules/VersionChips',
  component: VersionChips,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Chips for the software the cluster runs, with an optional quiet note after them. Renders nothing when it has neither.',
      },
    },
  },
  args: {
    items: [
      { label: 'Talos', value: '1.14.5' },
      { label: 'Kubernetes', value: '1.37.2' },
      { label: 'Flux', value: '2.10.1' },
    ],
    note: 'running for 646 days',
  },
} satisfies Meta<typeof VersionChips>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Talos')).toBeInTheDocument();
    await expect(canvas.getByText('running for 646 days')).toBeInTheDocument();
  },
};

export const ChipsOnly: Story = { args: { note: undefined } };

export const NoteOnly: Story = { args: { items: [] } };

/** The telemetry band reuses the chips for Flux object counts, with its own list name. */
export const FluxObjects: Story = {
  args: {
    items: [
      { label: 'Kustomizations', value: '131' },
      { label: 'HelmReleases', value: '110' },
    ],
    note: 'all reconciled',
    label: 'Flux objects',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('list', { name: 'Flux objects' })).toBeInTheDocument();
  },
};
