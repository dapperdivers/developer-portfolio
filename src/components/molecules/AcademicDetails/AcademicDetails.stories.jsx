import React from 'react';
import AcademicDetails from './AcademicDetails';

export default {
  title: 'Molecules/AcademicDetails',
  component: AcademicDetails,
  parameters: {
    docs: {
      description: {
        component: 'A composite component that displays academic information including school name, degree, fields of study, and graduation date.',
      },
    },
  },
  argTypes: {
    schoolName: {
      control: 'text',
      description: 'Name of the school or institution',
    },
    degree: {
      control: 'text',
      description: 'Degree title',
    },
    major: {
      control: 'text',
      description: 'Major field of study',
    },
    minor: {
      control: 'text',
      description: 'Minor field of study (optional)',
    },
    graduationDate: {
      control: 'text',
      description: 'Graduation date',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
};

/**
 * Default story showing complete academic details
 */
export const Default = {
  args: {
    schoolName: 'University of Technology',
    degree: 'Bachelor of Science',
    major: 'Computer Science',
    minor: 'Mathematics',
    graduationDate: 'May 2024',
  },
};

/**
 * Story showing academic details without a minor
 */
export const NoMinor = {
  args: {
    schoolName: 'State University',
    degree: 'Master of Engineering',
    major: 'Electrical Engineering',
    graduationDate: 'December 2023',
  },
};

/**
 * Story showing a long school name
 */
export const LongSchoolName = {
  args: {
    schoolName: 'Massachusetts Institute of Technology and Advanced Studies',
    degree: 'Doctor of Philosophy',
    major: 'Artificial Intelligence',
    minor: 'Robotics',
    graduationDate: 'June 2025',
  },
};

/**
 * Story showing multiple majors
 */
export const MultipleMajors = {
  args: {
    schoolName: 'Liberal Arts College',
    degree: 'Bachelor of Arts',
    major: 'Psychology and Sociology',
    minor: 'Business Administration',
    graduationDate: 'May 2023',
  },
};

/**
 * Story showing custom styling
 */
export const CustomStyling = {
  args: {
    schoolName: 'Design Institute',
    degree: 'Bachelor of Fine Arts',
    major: 'Digital Design',
    minor: 'Web Development',
    graduationDate: 'August 2024',
    className: 'bg-gray-100 p-6 rounded-lg shadow-md',
  },
};

/**
 * Story showing the component in dark mode
 */
export const DarkMode = {
  args: {
    schoolName: 'Night University',
    degree: 'Master of Science',
    major: 'Cybersecurity',
    minor: 'Digital Forensics',
    graduationDate: 'October 2024',
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};

/**
 * Story showing the component in mobile viewport
 */
export const MobileView = {
  args: {
    schoolName: 'Mobile University',
    degree: 'Bachelor of Technology',
    major: 'Mobile Development',
    minor: 'UX Design',
    graduationDate: 'July 2024',
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

/**
 * Story showing international date format
 */
export const InternationalDate = {
  args: {
    schoolName: 'International University',
    degree: 'Master of Business Administration',
    major: 'International Business',
    minor: 'Finance',
    graduationDate: '15 March 2024',
  },
}; 