import type { Meta, StoryObj } from '@storybook/react-vite';
import CollegeInfo from './CollegeInfo';
import { educationInfo } from '@/portfolio';

const real = educationInfo[0];

const meta = {
  title: 'Molecules/CollegeInfo',
  component: CollegeInfo,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'University name, academic details and graduation date. It renders AcademicDetails, so the two always look the same.',
      },
    },
  },
  argTypes: {
    schoolName: { control: 'text', description: 'Name of the school or institution' },
    degree: { control: 'text', description: 'Degree title' },
    major: { control: 'text', description: 'Major field of study' },
    minor: { control: 'text', description: 'Minor field of study (optional)' },
    graduationDate: { control: 'text', description: 'Graduation date' },
    className: { control: 'text', description: 'Additional CSS classes' },
    animated: { control: 'boolean', description: 'Whether the block animates in' },
  },
  decorators: [(Story) => <div style={{ maxWidth: '40rem' }}><Story /></div>],
} satisfies Meta<typeof CollegeInfo>;
export default meta;

type Story = StoryObj<typeof meta>;

/** The real site data */
export const Default: Story = {
  args: {
    schoolName: real.schoolName,
    degree: real.degree,
    major: real.major,
    minor: real.minor,
    graduationDate: real.duration,
  },
};

export const Example: Story = {
  args: {
    schoolName: 'Example University',
    degree: 'Bachelor of Science',
    major: 'Computer Science',
    minor: 'Mathematics',
    graduationDate: 'May 2018',
  },
};

export const Narrow: Story = {
  args: {
    schoolName: 'Example University',
    degree: 'Bachelor of Science',
    major: 'Computer Science',
    minor: 'Mathematics',
    graduationDate: 'May 2018',
  },
  decorators: [(Story) => <div style={{ maxWidth: '20rem' }}><Story /></div>],
};
