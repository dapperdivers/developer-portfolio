import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import EducationCard from './EducationCard';
import type { Education } from '@/types/portfolio';
import { educationInfo } from '@/portfolio';

// Fictional sample, used wherever the real data is not the point
const exampleUniversity: Education = {
  schoolName: 'Example University',
  degree: 'Bachelor of Science',
  major: 'Computer Science',
  minor: 'Mathematics',
  duration: 'May 2018',
  certifications: [
    { name: 'Example Security Practitioner', issuer: 'Example Certification Board', date: 'Mar 2021', credentialId: 'EX-104233' },
    { name: 'Example Cloud Associate', issuer: 'Example Cloud Institute', date: 'Nov 2019' },
  ],
};

const meta = {
  title: 'Molecules/EducationCard',
  component: EducationCard,
  tags: ['autodocs'],
  argTypes: {
    animated: { control: 'boolean', description: 'Whether the card animates in' },
    education: { control: 'object', description: 'Education data: school, degree, major, minor, duration, certifications' },
    variant: {
      control: { type: 'select' },
      options: ['default', 'secure', 'breach', 'critical'],
      description: 'Changes the icon glyph and its colour, nothing else',
    },
    index: { control: 'number', description: 'Index for staggered animations' },
    className: { control: 'text', description: 'Additional CSS classes' },
  },
  parameters: {
    docs: {
      description: {
        component: 'The reference card for the education family: school name, a DEGREE / MAJOR / MINOR block and certifications as a ruled list, on the shared card surface. It is composed of EducationIcon, SchoolHeader, DateBubble, DegreeInfo, FieldsOfStudy and CertificationList.',
      },
    },
    layout: 'padded',
  },
  decorators: [(Story) => <div style={{ maxWidth: '44rem' }}><Story /></div>],
} satisfies Meta<typeof EducationCard>;
export default meta;

type Story = StoryObj<typeof meta>;

/** The real site data */
export const Default: Story = {
  args: { education: educationInfo[0] },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(educationInfo[0].schoolName)).toBeInTheDocument();
    await expect(canvas.getByText('Certifications')).toBeInTheDocument();
    await expect(canvas.getAllByRole('listitem')).toHaveLength(educationInfo[0].certifications?.length ?? 0);
  },
};

export const Example: Story = {
  args: { education: exampleUniversity },
};

export const NoMinorNoCertifications: Story = {
  args: {
    education: {
      schoolName: 'Example University',
      degree: 'Bachelor of Science',
      major: 'Computer Science',
      duration: 'May 2018',
    },
  },
};

export const Secure: Story = {
  args: { education: exampleUniversity, variant: 'secure' },
};

export const Breach: Story = {
  args: { education: exampleUniversity, variant: 'breach' },
};

export const Critical: Story = {
  args: { education: exampleUniversity, variant: 'critical' },
};

export const LongText: Story = {
  args: {
    education: {
      schoolName: 'Example University, School of Engineering and Applied Sciences',
      degree: 'Bachelor of Science in Computer Engineering with a Specialization in Embedded Systems',
      major: 'Robotics and Embedded Systems',
      minor: 'Applied Mathematics, Statistics and Computational Sciences',
      duration: 'Aug 2014 – May 2018',
      certifications: [
        {
          name: 'Example Professional Cloud Solutions Architect with Advanced Networking and Security Specialization',
          issuer: 'Example Certification Board',
          date: 'Mar 2021',
          credentialId: 'EX-PCSA-ANSS-123456789',
        },
      ],
    },
  },
};

export const Mobile: Story = {
  args: { education: educationInfo[0] },
  globals: { viewport: { value: 'mobile1', isRotated: false } },
};

export const ReducedMotion: Story = {
  args: { education: educationInfo[0], animated: false },
};
