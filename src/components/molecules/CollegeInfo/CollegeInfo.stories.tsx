import type { Meta, StoryObj } from '@storybook/react-vite';
import CollegeInfo from './CollegeInfo';


const meta = {
  title: 'Molecules/CollegeInfo',
  component: CollegeInfo,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'School name, degree, major, optional minor and graduation date for one education entry.',
      },
    },
  },
} satisfies Meta<typeof CollegeInfo>;
export default meta;

type Story = StoryObj<typeof meta>;


// Default story
export const Default: Story = {
  args: {
    schoolName: 'Georgia State University',
    degree: 'Bachelor of Business Administration',
    major: 'Computer Information Systems',
    minor: 'Information Security',
    graduationDate: 'January 2015',
  }
};

// Same content at a 320px viewport
export const Responsive: Story = {
  args: Default.args,
  globals: {
    viewport: { value: 'mobile1', isRotated: false },
  },
};