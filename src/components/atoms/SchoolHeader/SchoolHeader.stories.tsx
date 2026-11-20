import type { Meta, StoryObj, StoryFn } from '@storybook/react-vite';
import SchoolHeader from './SchoolHeader';

const meta = {
  title: 'Atoms/SchoolHeader',
  component: SchoolHeader,
  tags: ['autodocs'],
  argTypes: {
    schoolName: {
      control: 'text',
      description: 'Name of the school or institution',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
} satisfies Meta<typeof SchoolHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    schoolName: 'University of Technology',
  }
};

// Long school name
export const LongSchoolName: Story = {
  args: {
    schoolName: 'Massachusetts Institute of Technology - School of Computer Science and Engineering',
  }
};

// With custom class
export const WithCustomClass: Story = {
  args: {
    schoolName: 'Stanford University',
    className: 'highlighted-header',
  }
};

// Multiple schools example
export const MultipleSchools: StoryFn = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
    <SchoolHeader schoolName="Harvard University" />
    <SchoolHeader schoolName="Yale University" />
    <SchoolHeader schoolName="Princeton University" />
  </div>
);

// With container
export const WithContainer: StoryFn = () => (
  <div style={{ 
    maxWidth: '600px', 
    padding: '2rem',
    backgroundColor: 'var(--color-background-alt)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--border-radius-lg)'
  }}>
    <SchoolHeader schoolName="Oxford University" />
    <p style={{ marginTop: '1rem', color: 'var(--color-text-muted)' }}>
      Founded in 1096, Oxford University is one of the oldest and most prestigious universities in the world.
    </p>
  </div>
); 