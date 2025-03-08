import React from 'react';
import DateChip from './DateChip';

const meta = {
  title: 'Atoms/DateChip',
  component: DateChip,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: 'Stylized date and duration display with interactive effects',
    docs: {
      description: {
        component: 'The DateChip component presents dates and durations in an elegant, interactive format. It features a gradient background, hover animations, glowing effects, and responsive design. The component is perfect for timelines, experience sections, and anywhere that requires visually appealing date displays. It includes accessibility features and respects reduced motion preferences.'
      }
    }
  },
  argTypes: {
    date: {
      control: 'text',
      description: 'The date or duration text to display',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      }
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for custom styling',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
      }
    }
  }
};

export default meta;

// Container component for consistent display
const ChipContainer = ({ children, background = 'var(--color-background)' }) => (
  <div style={{
    padding: '2rem',
    background,
    borderRadius: '8px',
    margin: '1rem 0'
  }}>
    {children}
  </div>
);

// Default date chip
export const Default = {
  args: {
    date: '2020 - 2024'
  },
  render: (args) => (
    <ChipContainer>
      <DateChip {...args} />
    </ChipContainer>
  )
};

// Date Formats
export const DateFormats = {
  render: () => (
    <ChipContainer>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <h4 style={{ marginBottom: '1rem', color: 'var(--color-text-muted)' }}>Year Range</h4>
          <DateChip date="2020 - 2024" />
        </div>
        <div>
          <h4 style={{ marginBottom: '1rem', color: 'var(--color-text-muted)' }}>Single Year</h4>
          <DateChip date="2024" />
        </div>
        <div>
          <h4 style={{ marginBottom: '1rem', color: 'var(--color-text-muted)' }}>Present Date</h4>
          <DateChip date="2022 - Present" />
        </div>
        <div>
          <h4 style={{ marginBottom: '1rem', color: 'var(--color-text-muted)' }}>Month Range</h4>
          <DateChip date="Jan 2023 - Dec 2023" />
        </div>
      </div>
    </ChipContainer>
  )
};

// Duration Formats
export const DurationFormats = {
  render: () => (
    <ChipContainer>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <h4 style={{ marginBottom: '1rem', color: 'var(--color-text-muted)' }}>Years</h4>
          <DateChip date="3 Years" />
        </div>
        <div>
          <h4 style={{ marginBottom: '1rem', color: 'var(--color-text-muted)' }}>Months</h4>
          <DateChip date="6 Months" />
        </div>
        <div>
          <h4 style={{ marginBottom: '1rem', color: 'var(--color-text-muted)' }}>Combined</h4>
          <DateChip date="2 Years 3 Months" />
        </div>
      </div>
    </ChipContainer>
  )
};

// Timeline Example
export const InTimeline = {
  render: () => (
    <ChipContainer>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '1rem',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          left: '50%',
          top: '0',
          bottom: '0',
          width: '2px',
          background: 'var(--color-border)',
          transform: 'translateX(-50%)'
        }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
          <DateChip date="2024" />
          <span style={{ color: 'var(--color-text-muted)' }}>Graduation</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
          <DateChip date="2022 - 2023" />
          <span style={{ color: 'var(--color-text-muted)' }}>Internship</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
          <DateChip date="2020" />
          <span style={{ color: 'var(--color-text-muted)' }}>Started University</span>
        </div>
      </div>
    </ChipContainer>
  )
};

// Custom Styling
export const CustomStyling = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <ChipContainer background="var(--color-background-alt)">
        <DateChip date="2023 - 2024" className="custom-date-dark" />
      </ChipContainer>
      <ChipContainer background="var(--color-background-light)">
        <DateChip date="2021 - 2022" className="custom-date-light" />
      </ChipContainer>
    </div>
  )
};

// Responsive Example
export const Responsive = {
  render: () => (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>Desktop View</h3>
        <ChipContainer>
          <DateChip date="2020 - Present" />
        </ChipContainer>
      </div>
      <div>
        <h3 style={{ marginBottom: '1rem' }}>Mobile View</h3>
        <ChipContainer>
          <div style={{ maxWidth: '320px' }}>
            <DateChip date="2020 - Present" />
          </div>
        </ChipContainer>
      </div>
    </div>
  )
};

// Multiple Chips Grid
export const ChipsGrid = {
  render: () => (
    <ChipContainer>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
        gap: '1rem'
      }}>
        <DateChip date="2024" />
        <DateChip date="2023 - 2024" />
        <DateChip date="6 Months" />
        <DateChip date="2020 - Present" />
        <DateChip date="3 Years" />
        <DateChip date="Jan - Dec 2023" />
      </div>
    </ChipContainer>
  )
};
