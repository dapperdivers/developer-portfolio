import type { Meta, StoryObj } from '@storybook/react-vite';
import AcademicDetails from './AcademicDetails';
import { educationInfo } from '@/portfolio';

const real = educationInfo[0];

const meta = {
  title: 'Molecules/AcademicDetails',
  component: AcademicDetails,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'School, degree, fields of study and graduation date on the shared card surface. The same pieces as EducationCard (SchoolHeader, DegreeInfo, FieldsOfStudy, DateBubble), without the icon and certifications.',
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
} satisfies Meta<typeof AcademicDetails>;
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

export const NoMinor: Story = {
  args: {
    schoolName: 'Example University',
    degree: 'Bachelor of Science',
    major: 'Computer Science',
    graduationDate: 'May 2018',
  },
};

export const LongSchoolName: Story = {
  args: {
    schoolName: 'Example University, School of Engineering and Applied Sciences, Department of Computer Science',
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

export const ReducedMotion: Story = {
  args: {
    schoolName: 'Example University',
    degree: 'Bachelor of Science',
    major: 'Computer Science',
    minor: 'Mathematics',
    graduationDate: 'May 2018',
    animated: false,
  },
};
