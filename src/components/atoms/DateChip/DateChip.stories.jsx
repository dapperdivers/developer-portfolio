import React from 'react';
import DateChip from './DateChip';

const meta = {
  title: 'Atoms/DateChip',
  component: DateChip,
  tags: ['autodocs'],
  argTypes: {
    date: {
      control: 'text',
      description: 'The date or duration text to display',
    },
  },
};

export default meta;

// Default date chip
export const Default = {
  args: {
    date: '2020 - 2024',
  }
};

// Short date
export const ShortDate = {
  args: {
    date: '2024',
  }
};

// Duration
export const Duration = {
  args: {
    date: '3 Years',
  }
};

// Multiple chips
export const MultipleChips = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <DateChip date="2022 - Present" />
      <DateChip date="2020 - 2022" />
      <DateChip date="2018 - 2020" />
    </div>
  )
};
