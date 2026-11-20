import type { Meta, StoryObj } from '@storybook/react-vite';
import EducationDetails from './EducationDetails';


const meta = {
  title: 'Molecules/EducationDetails',
  component: EducationDetails,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Education entry with degree and major split out of the sub-header, bullet points and certification badges.',
      },
    },
  },
} satisfies Meta<typeof EducationDetails>;
export default meta;

type Story = StoryObj<typeof meta>;


// Default story
export const Default: Story = {
  args: {
    schoolName: 'Georgia State University',
    subHeader: 'Bachelor of Business Administration in Computer Information Systems',
    duration: 'January 2015',
    desc: 'J. Mack Robinson College of Business',
    descBullets: ['Minor in Information Security'],
    certifications: [
      { name: 'Practical Network Penetration Tester', issuer: 'TCM Security', date: 'Apr 2022' },
    ],
  }
};

// Same content at a 320px viewport
export const Responsive: Story = {
  args: Default.args,
  globals: {
    viewport: { value: 'mobile1', isRotated: false },
  },
};