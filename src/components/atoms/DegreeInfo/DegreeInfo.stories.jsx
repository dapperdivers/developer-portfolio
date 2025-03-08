import React from 'react';
import DegreeInfo from './DegreeInfo';

const meta = {
  title: 'Atoms/DegreeInfo',
  component: DegreeInfo,
  tags: ['autodocs'],
  argTypes: {
    degree: {
      control: 'text',
      description: 'Degree title',
    },
  },
};

export default meta;

// Default degree info
export const Default = {
  args: {
    degree: 'Bachelor of Science in Computer Science',
  }
};

// Short degree
export const ShortDegree = {
  args: {
    degree: 'B.Sc. Computer Science',
  }
};

// Master's degree
export const MastersDegree = {
  args: {
    degree: 'Master of Science in Cybersecurity',
  }
};

// Multiple degrees
export const MultipleDegrees = {
  render: () => (
    <div>
      <DegreeInfo degree="Ph.D. in Computer Science" />
      <DegreeInfo degree="M.Sc. in Software Engineering" />
      <DegreeInfo degree="B.Sc. in Computer Science" />
    </div>
  )
};
