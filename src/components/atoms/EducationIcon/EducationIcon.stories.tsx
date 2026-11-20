import type { Meta, StoryObj } from '@storybook/react-vite';
import { FaCertificate, FaUniversity } from 'react-icons/fa';
import EducationIcon from './EducationIcon';

const meta = {
  title: 'Atoms/EducationIcon',
  component: EducationIcon,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'An education glyph in an inset tile with the shared border. Defaults to the graduation cap in brand cyan; pass `icon` and `color` for the card variants.',
      },
    },
  },
  argTypes: {
    className: { control: 'text', description: 'Additional CSS classes' },
    animated: { control: 'boolean', description: 'Whether the tile scales in' },
    color: { control: 'text', description: 'Glyph colour' },
  },
} satisfies Meta<typeof EducationIcon>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <EducationIcon {...args} />
      <EducationIcon {...args} icon={FaUniversity} color="var(--color-success)" />
      <EducationIcon {...args} icon={FaCertificate} color="var(--color-danger)" />
    </div>
  ),
};

export const ReducedMotion: Story = {
  args: { animated: false },
};
