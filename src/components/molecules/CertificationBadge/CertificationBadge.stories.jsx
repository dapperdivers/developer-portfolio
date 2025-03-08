import React from 'react';
import CertificationBadge from './CertificationBadge';
import { FaAward, FaCertificate, FaUserGraduate } from 'react-icons/fa';

export default {
  title: 'Molecules/CertificationBadge',
  component: CertificationBadge,
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description: 'Name of the certification',
    },
    issuer: {
      control: 'text',
      description: 'Organization that issued the certification',
    },
    date: {
      control: 'text',
      description: 'Date of certification',
    },
    credentialId: {
      control: 'text',
      description: 'Credential ID if available',
    },
    iconName: {
      control: 'text',
      description: 'Icon name to override the default medal icon',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'CertificationBadge is a component that displays certification information, including the certification name, issuer, date, and credential ID.',
      },
    },
    a11y: {
      config: {
        rules: [
          { id: 'heading-order', enabled: true },
        ],
      },
    },
  },
};


// Default story
export const Default = {
  args: {
    name: 'AWS Certified Developer',
    issuer: 'Amazon Web Services',
    date: 'Jan 2023',
    credentialId: 'AWS-DEV-12345',
  }
};

// Without Credential ID
export const WithoutCredentialId = {
  args: {
    name: 'Certified Scrum Master',
    issuer: 'Scrum Alliance',
    date: 'Mar 2022',
  }
};

// Without Date and Credential
export const MinimalInformation = {
  args: {
    name: 'JavaScript Fundamentals',
    issuer: 'Frontend Masters',
  }
};

// Multiple Certifications
export const MultipleCertifications = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <CertificationBadge 
        name="React Developer" 
        issuer="Meta" 
        date="Feb 2023" 
        credentialId="REACT-123" 
      />
      <CertificationBadge 
        name="Node.js Specialist" 
        issuer="OpenJS Foundation" 
        date="Nov 2022" 
      />
      <CertificationBadge 
        name="UI/UX Design" 
        issuer="Google" 
        date="Sep 2022" 
        credentialId="DESIGN-456" 
      />
    </div>
  )
};

// Long Certification Names
export const LongCertificationNames = {
  args: {
    name: 'Advanced Machine Learning and Artificial Intelligence with TensorFlow and PyTorch Specialization',
    issuer: 'Comprehensive Data Science Institute of Technology and Advanced Studies',
    date: 'Dec 2022',
    credentialId: 'MLAI-987654321',
  }
};

// Responsive behavior example
export const Responsive = {
  args: {
    name: 'Mobile-Friendly Certification',
    issuer: 'Responsive Design Institute',
    date: 'June 2023',
    credentialId: 'RWD-789',
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  }
};