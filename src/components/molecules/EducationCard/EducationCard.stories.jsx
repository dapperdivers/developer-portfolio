import React from 'react';
import EducationCard from './EducationCard';
import { within, userEvent, expect } from 'storybook/test';

// Sample education data for stories using the correct structure
const mockEducationData = {
  complete: {
    schoolName: "Stanford University",
    degree: "Master of Computer Science",
    major: "Artificial Intelligence",
    minor: "Mathematics",
    duration: "2018 - 2020",
    certifications: [
      {
        name: "AWS Certified Solutions Architect",
        issuer: "Amazon Web Services",
        date: "2020",
        credentialId: "AWS-SAA-123456"
      },
      {
        name: "Google Cloud Professional",
        issuer: "Google Cloud",
        date: "2019",
        credentialId: "GCP-PCA-789012"
      }
    ]
  },
  minimal: {
    schoolName: "MIT",
    degree: "Bachelor of Science",
    major: "Computer Engineering",
    duration: "2014 - 2018"
  },
  longNames: {
    schoolName: "Massachusetts Institute of Technology School of Engineering",
    degree: "Bachelor of Science in Computer Engineering with Specialization",
    major: "Robotics and Embedded Systems with Advanced Machine Learning",
    minor: "Applied Mathematics and Statistics",
    duration: "2014 - 2018"
  },
  certificate: {
    schoolName: "Udacity",
    degree: "Nanodegree",
    major: "Front End Web Development",
    duration: "2021",
    certifications: [
      {
        name: "React Developer Certification",
        issuer: "Meta",
        date: "2021",
        credentialId: "META-RDC-345678"
      }
    ]
  },
  // Data specifically for compact variant testing
  compact: {
    schoolName: "Georgia Institute of Technology",
    degree: "Master of Science",
    major: "Cybersecurity",
    minor: "Information Systems",
    duration: "2019 - 2021",
    certifications: [
      {
        name: "CISSP",
        issuer: "ISC2",
        date: "2021",
        credentialId: "CISSP-567890"
      },
      {
        name: "CEH",
        issuer: "EC-Council",
        date: "2020",
        credentialId: "CEH-234567"
      },
      {
        name: "OSCP",
        issuer: "Offensive Security",
        date: "2021",
        credentialId: "OSCP-890123"
      }
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
        component: 'Compact education card component for displaying educational background information including school name, degree, major/minor fields, duration, and certifications in a space-efficient layout.',
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
  <div style={{ maxWidth: '500px', margin: '0 auto' }}>
    <EducationCard {...args} />
  </div>
);

// Complete example with all fields (now uses compact styling by default)
export const Complete = {
  args: {
    education: mockEducationData.complete,
    index: 0
  }
};
Complete.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);
  
  await step('Initial render check', async () => {
    // Check that all information is displayed
    await expect(canvas.getByText('Stanford University')).toBeInTheDocument();
    await expect(canvas.getByText('Master of Computer Science')).toBeInTheDocument();
    await expect(canvas.getByText('2018 - 2020')).toBeInTheDocument();
    await expect(canvas.getByText('Artificial Intelligence')).toBeInTheDocument();
    await expect(canvas.getByText('Mathematics')).toBeInTheDocument();
  });
  
  await step('Certifications check', async () => {
    // Check that certifications are displayed
    await expect(canvas.getByText('Certifications')).toBeInTheDocument();
    await expect(canvas.getByText('AWS Certified Solutions Architect')).toBeInTheDocument();
    await expect(canvas.getByText('Google Cloud Professional')).toBeInTheDocument();
  });
};

// Minimal example with only required fields
export const Minimal = {
  args: {
    education: mockEducationData.minimal,
    index: 1
  }
};
Minimal.parameters = {
  docs: {
    description: {
      story: 'Shows an education card with only the required fields: school name, degree, major, and duration.'
    }
  }
};

// Example with long text to test text wrapping and space efficiency
export const LongTextHandling = {
  args: {
    education: mockEducationData.longNames,
    index: 2
  }
};
LongTextHandling.parameters = {
  docs: {
    description: {
      story: 'Demonstrates how the compact component handles very long school names and degree titles with proper text wrapping while maintaining space efficiency.'
    }
  }
};

// Example of an online certificate/nanodegree with compact design
export const OnlineCertificate = {
  args: {
    education: mockEducationData.certificate,
    index: 3
  }
};
OnlineCertificate.parameters = {
  docs: {
    description: {
      story: 'Shows how the compact component displays online certificates, nanodegrees, or other non-traditional education with associated certifications.'
    }
  }
};

// Compact variant with multiple certifications
export const CompactWithMultipleCertifications = {
  args: {
    education: mockEducationData.compact,
    index: 0
  }
};
CompactWithMultipleCertifications.parameters = {
  docs: {
    description: {
      story: 'Demonstrates the compact design with multiple certifications. Note the reduced spacing, smaller fonts, and efficient use of screen space while maintaining readability.'
    }
  }
};

// Multiple cards to show animation sequence and space efficiency
export const AnimationSequence = () => (
  <div style={{ maxWidth: '600px', margin: '0 auto' }}>
    {[
      mockEducationData.complete,
      mockEducationData.minimal,
      mockEducationData.compact,
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
      story: 'Demonstrates the staggered animation of multiple compact education cards in sequence. Notice how the compact design allows more cards to fit in the same space.'
    }
  },
  chromatic: { delay: 500 } // Delay for capturing animations
};

// Side-by-side comparison for space efficiency demonstration
export const SpaceEfficiencyComparison = () => (
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', maxWidth: '1000px', margin: '0 auto' }}>
    <div>
      <h4 style={{ color: 'var(--color-cyan)', marginBottom: '16px', textAlign: 'center' }}>Compact Design</h4>
      <EducationCard education={mockEducationData.compact} index={0} />
    </div>
    <div>
      <h4 style={{ color: 'var(--color-cyan)', marginBottom: '16px', textAlign: 'center' }}>With Certifications</h4>
      <EducationCard education={mockEducationData.complete} index={1} />
    </div>
  </div>
);
SpaceEfficiencyComparison.parameters = {
  docs: {
    description: {
      story: 'Side-by-side comparison showing the space efficiency of the compact design with different certification loads.'
    }
  }
};

/**
 * ## Component Usage
 * 
 * ```jsx
 * import EducationCard from './EducationCard';
 * 
 * function Education() {
 *   const educationData = [
 *     {
 *       schoolName: "Stanford University",
 *       degree: "Master of Computer Science",
 *       major: "Artificial Intelligence",
 *       minor: "Mathematics",
 *       duration: "2018 - 2020",
 *       certifications: [
 *         {
 *           name: "AWS Certified Solutions Architect",
 *           issuer: "Amazon Web Services",
 *           date: "2020",
 *           credentialId: "AWS-SAA-123456"
 *         }
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
 * | education.degree | string | required | Degree or certification title |
 * | education.major | string | required | Major field of study |
 * | education.minor | string | optional | Minor field of study |
 * | education.duration | string | required | Time period of education |
 * | education.certifications | Array | optional | Array of certification objects |
 * | index | number | 0 | Index number for staggered animations |
 * 
 * ## Compact Design Features
 * 
 * The compact design includes several space-saving optimizations:
 * - Reduced padding and margins throughout
 * - Smaller icon sizes and compact certification indicators
 * - Inline layout for school name and date
 * - Side-by-side degree and major/minor information
 * - Condensed certification badges with smaller fonts
 * - Optimized responsive breakpoints for mobile devices
 * 
 * ## Accessibility Features
 * 
 * This component maintains accessibility while being compact:
 * - Proper heading hierarchy and semantic HTML
 * - Adequate color contrast ratios maintained
 * - Keyboard navigation preserved
 * - Screen reader friendly structure
 * - Responsive design that works on all devices
 * 
 * ## Animation Performance
 * 
 * Optimized animations for the compact design:
 * - Reduced animation complexity for better performance
 * - Consolidated motion variants
 * - Efficient viewport-based animations
 * - Respect for user motion preferences
 */

// Mobile view for responsive testing
export const MobileView = {
  args: {
    education: mockEducationData.compact,
    index: 0
  }
};
MobileView.parameters = {
  viewport: {
    defaultViewport: 'mobile1',
  },
  docs: {
    description: {
      story: 'Shows how the compact education card appears on mobile devices. Note the further reduced spacing and reorganized layout for optimal mobile viewing.'
    }
  }
};

// Playground for interactive testing
export const Playground = {
  args: {
    education: mockEducationData.complete,
    index: 0
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground to test different education data configurations. Modify the education object to see how the compact design adapts.'
      }
    }
  }
};