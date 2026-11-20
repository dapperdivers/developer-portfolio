import type { Meta, StoryObj } from '@storybook/react-vite';
import EducationDetails from './EducationDetails';
import { educationInfo } from '@/portfolio';

const real = educationInfo[0];

const meta = {
  title: 'Molecules/EducationDetails',
  component: EducationDetails,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Education details on the shared card surface: school, degree and fields, dates, optional bullets and the ruled certification list. Built from the same pieces as EducationCard. `subHeader` may be "Degree in Major"; `desc` is the minor.',
      },
    },
  },
  argTypes: {
    schoolName: { control: 'text', description: 'Name of the school or institution' },
    subHeader: { control: 'text', description: 'Degree, optionally "Degree in Major"' },
    duration: { control: 'text', description: 'Time period of education' },
    desc: { control: 'text', description: 'Minor field of study' },
    descBullets: { control: 'object', description: 'Bullet points for additional details' },
    certifications: { control: 'object', description: 'Certifications earned' },
    className: { control: 'text', description: 'Additional CSS classes' },
    animated: { control: 'boolean', description: 'Whether the block animates in' },
  },
  decorators: [(Story) => <div style={{ maxWidth: '40rem' }}><Story /></div>],
} satisfies Meta<typeof EducationDetails>;
export default meta;

type Story = StoryObj<typeof meta>;

/** The real site data */
export const Default: Story = {
  args: {
    schoolName: real.schoolName,
    subHeader: `${real.degree} in ${real.major}`,
    desc: real.minor,
    duration: real.duration,
    certifications: real.certifications,
  },
};

export const WithBullets: Story = {
  args: {
    schoolName: 'Example University',
    subHeader: 'Bachelor of Science in Computer Science',
    desc: 'Mathematics',
    duration: 'Aug 2014 – May 2018',
    descBullets: [
      'Capstone: a campus network monitoring tool for the Example University IT office',
      'Teaching assistant for Introduction to Operating Systems',
    ],
    certifications: [
      { name: 'Example Security Practitioner', issuer: 'Example Certification Board', date: 'Mar 2021', credentialId: 'EX-104233' },
      { name: 'Example Cloud Associate', issuer: 'Example Cloud Institute', date: 'Nov 2019' },
    ],
  },
};

export const NoCertifications: Story = {
  args: {
    schoolName: 'Example University',
    subHeader: 'Bachelor of Science in Computer Science',
    duration: 'May 2018',
  },
};

export const Narrow: Story = {
  args: {
    schoolName: 'Example University',
    subHeader: 'Bachelor of Science in Computer Science',
    desc: 'Mathematics',
    duration: 'May 2018',
    certifications: [
      { name: 'Example Security Practitioner', issuer: 'Example Certification Board', date: 'Mar 2021', credentialId: 'EX-104233' },
    ],
  },
  decorators: [(Story) => <div style={{ maxWidth: '20rem' }}><Story /></div>],
};
