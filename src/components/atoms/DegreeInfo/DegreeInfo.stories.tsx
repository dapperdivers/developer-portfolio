import type { Meta, StoryObj } from '@storybook/react-vite';
import DegreeInfo from './DegreeInfo';
import { educationInfo } from '@/portfolio';

const meta = {
  title: 'Atoms/DegreeInfo',
  component: DegreeInfo,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A DEGREE label (mono, uppercase) over the degree title in Inter semibold. The same label style is used for MAJOR and MINOR.',
      },
    },
  },
  argTypes: {
    degree: { control: 'text', description: 'Degree title' },
    className: { control: 'text', description: 'Additional CSS classes' },
    animated: { control: 'boolean', description: 'Whether the block slides in' },
  },
} satisfies Meta<typeof DegreeInfo>;
export default meta;

type Story = StoryObj<typeof meta>;

/** The degree from the real site data */
export const Default: Story = {
  args: { degree: educationInfo[0].degree },
};

export const Example: Story = {
  args: { degree: 'Bachelor of Science' },
};

export const LongTitle: Story = {
  args: { degree: 'Master of Science in Cybersecurity Operations and Applied Cryptography' },
  decorators: [(Story) => <div style={{ maxWidth: '18rem' }}><Story /></div>],
};

export const ReducedMotion: Story = {
  args: { degree: 'Bachelor of Science', animated: false },
};
