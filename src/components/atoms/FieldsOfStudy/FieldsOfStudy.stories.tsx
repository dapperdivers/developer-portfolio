import type { Meta, StoryObj } from '@storybook/react-vite';
import FieldsOfStudy from './FieldsOfStudy';
import { educationInfo } from '@/portfolio';

const meta = {
  title: 'Atoms/FieldsOfStudy',
  component: FieldsOfStudy,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'MAJOR and MINOR fields of study, each a mono label over an Inter semibold value. Side by side when there is room, stacked when not. A leading "Minor in " is dropped; an empty field is left out.',
      },
    },
  },
  argTypes: {
    major: { control: 'text', description: 'Major field of study' },
    minor: { control: 'text', description: 'Minor field of study (optional)' },
    className: { control: 'text', description: 'Additional CSS classes' },
    animated: { control: 'boolean', description: 'Whether the block slides in' },
  },
} satisfies Meta<typeof FieldsOfStudy>;
export default meta;

type Story = StoryObj<typeof meta>;

/** Major and minor from the real site data */
export const Default: Story = {
  args: { major: educationInfo[0].major, minor: educationInfo[0].minor },
};

export const MajorOnly: Story = {
  args: { major: 'Computer Science' },
};

export const MinorPrefixDropped: Story = {
  args: { major: 'Computer Science', minor: 'Minor in Mathematics' },
};

export const Narrow: Story = {
  args: { major: 'Computer Information Systems', minor: 'Information Security' },
  decorators: [(Story) => <div style={{ maxWidth: '16rem' }}><Story /></div>],
};

export const ReducedMotion: Story = {
  args: { major: 'Computer Science', minor: 'Mathematics', animated: false },
};
