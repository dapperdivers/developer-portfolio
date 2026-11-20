import type { Meta, StoryObj } from '@storybook/react-vite';
import SchoolHeader from './SchoolHeader';
import { educationInfo } from '@/portfolio';

const meta = {
  title: 'Atoms/SchoolHeader',
  component: SchoolHeader,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'The school name as a card heading: Inter semibold on the text colour. Long names wrap.',
      },
    },
  },
  argTypes: {
    schoolName: { control: 'text', description: 'Name of the school or institution' },
    className: { control: 'text', description: 'Additional CSS classes' },
    animated: { control: 'boolean', description: 'Whether the heading slides in' },
  },
} satisfies Meta<typeof SchoolHeader>;
export default meta;

type Story = StoryObj<typeof meta>;

/** The school from the real site data */
export const Default: Story = {
  args: { schoolName: educationInfo[0].schoolName },
};

export const ShortName: Story = {
  args: { schoolName: 'Example University' },
};

export const LongName: Story = {
  args: {
    schoolName: 'Example University, School of Engineering and Applied Sciences, Department of Computer Science',
  },
  decorators: [(Story) => <div style={{ maxWidth: '24rem' }}><Story /></div>],
};

export const ReducedMotion: Story = {
  args: { schoolName: 'Example University', animated: false },
};
