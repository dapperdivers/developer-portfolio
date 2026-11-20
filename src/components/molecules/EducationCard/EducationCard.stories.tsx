import type { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import EducationCard from './EducationCard';
import type { EducationCardProps } from './EducationCard';
import type { Education } from '@/types/portfolio';

// Sample education data for stories
const mockEducationData = {
  complete: {
    schoolName: "Northfield State University",
    degree: "Master of Science",
    major: "Computer Science",
    minor: "Applied Mathematics",
    duration: "2018 - 2020",
    certifications: [
      {
        name: "Cloud Solutions Architect",
        issuer: "Cloud Certification Board",
        date: "2020",
        credentialId: "CSA-123456"
      },
      {
        name: "Cloud Security Practitioner",
        issuer: "Cloud Certification Board",
        date: "2019",
        credentialId: "CSP-789012"
      },
      {
        name: "Container Platform Administrator",
        issuer: "Open Infrastructure Institute",
        date: "2020",
        credentialId: "CPA-567890"
      }
    ]
  },
  minimal: {
    schoolName: "Lakeshore Technical College",
    degree: "Bachelor of Science",
    major: "Computer Engineering",
    duration: "2014 - 2018"
  },
  cybersecurity: {
    schoolName: "Ridgeview Institute of Technology",
    degree: "Master of Science",
    major: "Cybersecurity",
    minor: "Information Systems",
    duration: "2019 - 2021",
    certifications: [
      {
        name: "Information Security Professional",
        issuer: "Security Certification Council",
        date: "2021",
        credentialId: "ISP-567890"
      },
      {
        name: "Incident Response Analyst",
        issuer: "Security Certification Council",
        date: "2020",
        credentialId: "IRA-234567"
      },
      {
        name: "Offensive Security Practitioner",
        issuer: "Penetration Testing Guild",
        date: "2021",
        credentialId: "OSP-890123"
      }
    ]
  },
  bootcamp: {
    schoolName: "Harbor Code Academy",
    degree: "Application Security Bootcamp",
    major: "Secure Software Development",
    duration: "2020",
    certifications: [
      {
        name: "Secure Coding Certificate",
        issuer: "Harbor Code Academy",
        date: "2020",
        credentialId: "SCC-345678"
      }
    ]
  }
} satisfies Record<string, Education>;

const meta = {
  title: 'Molecules/EducationCard',
  component: EducationCard,
  tags: ['autodocs'],
  argTypes: {
    animated: {
      control: 'boolean',
      description: 'Whether the card animates in and reacts to hover',
    },
    education: {
      control: 'object',
      description: 'Education data object containing information about educational background',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'secure', 'breach', 'critical'],
      description: 'Theme variant for cybersecurity contexts'
    },
    index: {
      control: 'number',
      description: 'Index for staggered animations',
      defaultValue: 0
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes'
    }
  },
  parameters: {
    docs: {
      description: {
        component: 'A modern, self-contained education card component that displays educational background information including school name, degree, major/minor fields, duration, and certifications. Features cybersecurity theming with multiple variants and optimized Framer Motion animations.',
      },
    },
    layout: 'padded',
  },
} satisfies Meta<typeof EducationCard>;
export default meta;

type Story = StoryObj<typeof meta>;
type FnStory = StoryFn<typeof EducationCard>;

// Default story
export const Default: Story = {
  args: {
    education: mockEducationData.complete,
    variant: 'default',
    index: 0
  }
};

// Security variant story
export const Secure: Story = {
  args: {
    education: mockEducationData.cybersecurity,
    variant: 'secure',
    index: 0
  },
  parameters: {
    docs: {
      description: {
        story: 'Security-themed variant with green accents, ideal for cybersecurity education or certified secure programs.'
      }
    }
  }
};

// Breach variant story
export const Breach: Story = {
  args: {
    education: {
      ...mockEducationData.cybersecurity,
      schoolName: "Penetration Testing Academy",
      degree: "Advanced Penetration Testing",
      major: "Ethical Hacking"
    },
    variant: 'breach',
    index: 0
  },
  parameters: {
    docs: {
      description: {
        story: 'Breach-themed variant with red accents, suitable for offensive security or penetration testing education.'
      }
    }
  }
};

// Critical variant story
export const Critical: Story = {
  args: {
    education: {
      ...mockEducationData.cybersecurity,
      schoolName: "Critical Infrastructure Institute",
      degree: "Critical Systems Security",
      major: "Infrastructure Protection"
    },
    variant: 'critical',
    index: 0
  },
  parameters: {
    docs: {
      description: {
        story: 'Critical-themed variant with yellow accents, appropriate for critical infrastructure or high-priority security education.'
      }
    }
  }
};

// Minimal education (no certifications)
export const Minimal: Story = {
  args: {
    education: mockEducationData.minimal,
    variant: 'default',
    index: 0
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows an education card with only the required fields: school name, degree, major, and duration.'
      }
    }
  }
};

// Bootcamp/Alternative education
export const AlternativeEducation: Story = {
  args: {
    education: mockEducationData.bootcamp,
    variant: 'default',
    index: 0
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates how the component displays non-traditional education like bootcamps, online courses, or alternative programs.'
      }
    }
  }
};

// Animation sequence with multiple cards
export const AnimationSequence: FnStory = () => (
  <div style={{ maxWidth: '800px', margin: '0 auto' }}>
    {([
      { education: mockEducationData.complete, variant: 'default' },
      { education: mockEducationData.cybersecurity, variant: 'secure' },
      { education: mockEducationData.minimal, variant: 'breach' },
      { education: mockEducationData.bootcamp, variant: 'critical' }
    ] satisfies Pick<EducationCardProps, 'education' | 'variant'>[]).map((props, index) => (
      <EducationCard 
        key={`edu-${index}`} 
        education={props.education}
        variant={props.variant}
        index={index}
      />
    ))}
  </div>
);

AnimationSequence.parameters = {
  docs: {
    description: {
      story: 'Demonstrates the staggered animation sequence of multiple education cards with different variants.'
    }
  },
  chromatic: { delay: 1000 } // Delay for capturing animations
};

// Variant comparison
export const VariantComparison: FnStory = () => (
  <div style={{ 
    display: 'grid', 
    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
    gap: '24px', 
    maxWidth: '1200px', 
    margin: '0 auto' 
  }}>
    {(['default', 'secure', 'breach', 'critical'] as const).map((variant, index) => (
      <div key={variant}>
        <h4 style={{ 
          color: 'var(--color-cyan)', 
          marginBottom: '16px', 
          textAlign: 'center',
          textTransform: 'capitalize'
        }}>
          {variant} Variant
        </h4>
        <EducationCard 
          education={mockEducationData.cybersecurity}
          variant={variant}
          index={index}
        />
      </div>
    ))}
  </div>
);

VariantComparison.parameters = {
  docs: {
    description: {
      story: 'Side-by-side comparison of all available theme variants showing different color schemes and styling.'
    }
  }
};

// Long text handling
export const LongTextHandling: Story = {
  args: {
    education: {
      schoolName: "Ridgeview Institute of Technology School of Engineering and Applied Sciences",
      degree: "Bachelor of Science in Computer Engineering with Specialization in Embedded Systems",
      major: "Robotics and Embedded Systems with Advanced Machine Learning Applications",
      minor: "Applied Mathematics, Statistics, and Computational Sciences",
      duration: "2014 - 2018",
      certifications: [
        {
          name: "Professional Cloud Solutions Architect with Advanced Networking and Security Specialization",
          issuer: "Cloud Certification Board Training and Certification",
          date: "2020",
          credentialId: "CCB-PCSA-ANSS-123456789"
        }
      ]
    },
    variant: 'default',
    index: 0
  },
  parameters: {
    docs: {
      description: {
        story: 'Tests how the component handles very long school names, degree titles, and certification names with proper text wrapping.'
      }
    }
  }
};

// Mobile view testing
export const MobileView: Story = {
  args: {
    education: mockEducationData.complete,
    variant: 'secure',
    index: 0
  },
  globals: {
    viewport: { value: 'mobile1', isRotated: false },
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows how the education card appears and functions on mobile devices with responsive layout adjustments.'
      }
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
 *       schoolName: "Northfield State University",
 *       degree: "Master of Science",
 *       major: "Computer Science",
 *       minor: "Applied Mathematics",
 *       duration: "2018 - 2020",
 *       certifications: [
 *         {
 *           name: "Cloud Solutions Architect",
 *           issuer: "Cloud Certification Board",
 *           date: "2020",
 *           credentialId: "CSA-123456"
 *         }
 *       ]
 *     }
 *   ];
 *   
 *   return (
 *     <div className="education-section">
 *       {educationData.map((education, index) => (
 *         <EducationCard 
 *           key={index} 
 *           education={education} 
 *           variant="secure"
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
 * | education.schoolName | string | required | Name of the educational institution |
 * | education.degree | string | required | Degree or certification title |
 * | education.major | string | required | Major field of study |
 * | education.minor | string | optional | Minor field of study |
 * | education.duration | string | required | Time period of education |
 * | education.certifications | Array | optional | Array of certification objects |
 * | variant | string | 'default' | Theme variant (default, secure, breach, critical) |
 * | index | number | 0 | Index number for staggered animations |
 * | className | string | '' | Additional CSS classes |
 * 
 * ## Cybersecurity Theme Variants
 * 
 * - **default**: Standard cyan theming with professional appearance
 * - **secure**: Green accents indicating secure, verified, or certified programs
 * - **breach**: Red accents for offensive security, penetration testing, or vulnerability research
 * - **critical**: Yellow accents for critical infrastructure, high-priority, or warning contexts
 * 
 * ## Animation Features
 * 
 * - Optimized Framer Motion animations with performance considerations
 * - Staggered entry animations for multiple cards
 * - Smooth hover effects and micro-interactions
 * - Respects user's motion preferences automatically
 * - Viewport-based triggering for better performance
 * 
 * ## Accessibility Features
 * 
 * - Semantic HTML structure with proper heading hierarchy
 * - ARIA attributes for screen readers
 * - Adequate color contrast ratios maintained across variants
 * - Keyboard navigation support
 * - High contrast mode support
 * - Reduced motion support for accessibility preferences
 */