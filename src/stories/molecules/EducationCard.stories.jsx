import React from 'react';
import EducationCard from '../../components/EducationCard';
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

// Sample education data for stories
const mockEducationData = {
  complete: {
    schoolName: "Stanford University",
    subHeader: "Master of Computer Science",
    duration: "2018 - 2020",
    desc: "Specialized in Artificial Intelligence and Machine Learning. Graduated with honors and participated in multiple research projects.",
    descBullets: [
      "Thesis on Deep Learning applications in healthcare",
      "Received Outstanding Graduate Student Award",
      "Teaching Assistant for Algorithms course",
      "Published 2 papers in peer-reviewed journals"
    ]
  },
  minimal: {
    schoolName: "MIT",
    subHeader: "Bachelor of Science in Computer Engineering",
    duration: "2014 - 2018"
  },
  longNames: {
    schoolName: "Massachusetts Institute of Technology School of Engineering and Computer Science",
    subHeader: "Bachelor of Science in Computer Engineering with Specialization in Robotics and Embedded Systems",
    duration: "2014 - 2018",
    desc: "Graduated with honors. Focused on embedded systems and robotics."
  },
  certificate: {
    schoolName: "Udacity",
    subHeader: "Nanodegree in Front End Web Development",
    duration: "2021",
    desc: "Completed a 6-month intensive program on modern front-end technologies and best practices.",
    descBullets: [
      "Built a weather app using React and OpenWeather API",
      "Developed a restaurant review application with offline capabilities",
      "Created a travel planning dashboard using Redux and Google Maps API"
    ]
  }
};

export default {
  title: 'Molecules/EducationCard',
  component: EducationCard,
  tags: ['autodocs'],
  argTypes: {
    education: {
      control: 'object',
      description: 'Education data object containing information about educational background',
    },
    index: {
      control: 'number',
      description: 'Index for staggered animations',
      defaultValue: 0
    }
  },
  parameters: {
    docs: {
      description: {
        component: 'Education card component for displaying educational background information including school name, degree, duration, and additional details.',
      },
    },
    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', reviewOnFail: true },
          { id: 'list', reviewOnFail: true },
          { id: 'heading-order', reviewOnFail: true }
        ],
      },
    },
    layout: 'padded',
  },
};


// Template for the component
const Template = (args) => (
  <div style={{ maxWidth: '400px', margin: '0 auto' }}>
    <EducationCard {...args} />
  </div>
);

// Complete example with all fields
export const Complete = Template.bind({});
Complete.args = {
  education: mockEducationData.complete,
  index: 0
};
Complete.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);
  
  await step('Initial render check', () => {
    // Check that all information is displayed
    expect(canvas.getByText('Stanford University')).toBeInTheDocument();
    expect(canvas.getByText('Master of Computer Science')).toBeInTheDocument();
    expect(canvas.getByText('2018 - 2020')).toBeInTheDocument();
    
    // Check that description text is displayed
    expect(canvas.getByText(/Specialized in Artificial Intelligence/)).toBeInTheDocument();
    
    // Check that bullet points are displayed
    expect(canvas.getByText('Thesis on Deep Learning applications in healthcare')).toBeInTheDocument();
  });
  
  await step('Keyboard navigation test', async () => {
    // Tab to focusable elements in the component
    await userEvent.tab(); // Focus school name
    expect(canvas.getByText('Stanford University')).toHaveFocus();
    
    await userEvent.tab(); // Focus degree
    expect(canvas.getByText('Master of Computer Science')).toHaveFocus();
    
    await userEvent.tab(); // Focus description
    expect(canvas.getByText(/Specialized in Artificial Intelligence/)).toHaveFocus();
    
    // Tab through bullet points
    for (let i = 0; i < mockEducationData.complete.descBullets.length; i++) {
      await userEvent.tab();
      expect(canvas.getByText(mockEducationData.complete.descBullets[i])).toHaveFocus();
    }
  });
};

// Minimal example with only required fields
export const Minimal = Template.bind({});
Minimal.args = {
  education: mockEducationData.minimal,
  index: 1
};
Minimal.parameters = {
  docs: {
    description: {
      story: 'Shows an education card with only the required fields: school name, degree, and duration.'
    }
  }
};

// Example with long text to test text wrapping and truncation
export const LongTextHandling = Template.bind({});
LongTextHandling.args = {
  education: mockEducationData.longNames,
  index: 2
};
LongTextHandling.parameters = {
  docs: {
    description: {
      story: 'Demonstrates how the component handles very long school names and degree titles with proper text wrapping and truncation when necessary.'
    }
  }
};

// Example of an online certificate/nanodegree
export const OnlineCertificate = Template.bind({});
OnlineCertificate.args = {
  education: mockEducationData.certificate,
  index: 3
};
OnlineCertificate.parameters = {
  docs: {
    description: {
      story: 'Shows how the component can be used to display online certificates, nanodegrees, or other non-traditional education.'
    }
  }
};

// Multiple cards to show animation sequence
export const AnimationSequence = () => (
  <div style={{ maxWidth: '600px', margin: '0 auto' }}>
    {[
      mockEducationData.complete,
      mockEducationData.minimal,
      mockEducationData.certificate
    ].map((education, index) => (
      <EducationCard 
        key={`edu-${index}`} 
        education={education} 
        index={index} 
      />
    ))}
  </div>
);
AnimationSequence.parameters = {
  docs: {
    description: {
      story: 'Demonstrates the staggered animation of multiple education cards in sequence.'
    }
  },
  chromatic: { delay: 500 } // Delay for capturing animations
};

/**
 * ## Component Usage
 * 
 * ```jsx
 * import EducationCard from '../components/EducationCard';
 * 
 * function Education() {
 *   const educationData = [
 *     {
 *       schoolName: "Stanford University",
 *       subHeader: "Master of Computer Science",
 *       duration: "2018 - 2020",
 *       desc: "Specialized in AI and ML",
 *       descBullets: [
 *         "Thesis on Deep Learning applications",
 *         "Teaching Assistant for Algorithms"
 *       ]
 *     },
 *     // More education items...
 *   ];
 *   
 *   return (
 *     <div className="education-section">
 *       {educationData.map((education, index) => (
 *         <EducationCard 
 *           key={index} 
 *           education={education} 
 *           index={index} 
 *         />
 *       ))}
 *     </div>
 *   );
 * }
 * ```
 * 
 * ## Properties
 * 
 * | Name | Type | Default | Description |
 * |------|------|---------|-------------|
 * | education | Object | required | Education data object |
 * | education.schoolName | string | required | Name of the school or institution |
 * | education.subHeader | string | required | Degree or certification title |
 * | education.duration | string | required | Time period of education |
 * | education.desc | string | undefined | Description or details |
 * | education.descBullets | Array<string> | undefined | Array of bullet points for additional details |
 * | index | number | 0 | Index number for staggered animations |
 * 
 * ## Accessibility Features
 * 
 * This component follows these accessibility best practices:
 * - Proper heading hierarchy (h5 for school name, h6 for degree)
 * - Semantic HTML with correct list markup for bullet points
 * - ARIA labels for duration badge and bullet points list
 * - Keyboard navigation with tabIndex on all interactive elements
 * - Appropriate color contrast for all text elements
 * - Proper text overflow handling for long content
 * 
 * ## Animation Details
 * 
 * The card animates into view when it enters the viewport:
 * - Uses intersection observer for efficient scroll-based animations
 * - Slides in from left with fade-in effect
 * - Staggered timing based on index prop
 * - Subtle animation that doesn't interfere with readability
 */

// Mobile view for responsive testing
export const MobileView = Template.bind({});
MobileView.args = {
  education: mockEducationData.complete,
  index: 0
};
MobileView.parameters = {
  viewport: {
    defaultViewport: 'mobile1',
  },
  docs: {
    description: {
      story: 'Shows how the education card appears on mobile devices. Note that the graduation cap icon is hidden on mobile to conserve space.'
    }
  }
};