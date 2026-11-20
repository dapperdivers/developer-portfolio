import React from 'react';
import CertificationList from './CertificationList';

const certifications = [
  { name: 'Practical Network Penetration Tester', issuer: 'TCM Security', date: 'Apr 2022', credentialId: 'PNPT-0000' },
  { name: 'Security+', issuer: 'CompTIA', date: 'Jun 2020', credentialId: 'SEC-0000' },
  { name: 'Certified Kubernetes Administrator', issuer: 'CNCF', date: 'Sep 2023', credentialId: 'CKA-0000' },
  { name: 'Cloud Security Fundamentals', issuer: 'Example Cloud Academy', date: 'Jan 2024' },
];

export default {
  title: 'Molecules/CertificationList',
  component: CertificationList,
  tags: ['autodocs'],
  argTypes: {
    certifications: {
      control: 'object',
      description: 'Certification objects: name, issuer, date, credentialId',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Grid of certification badges. Renders nothing when the list is empty.',
      },
    },
  },
};

// Full grid
export const Default = {
  args: {
    certifications,
  }
};

// One badge
export const SingleCertification = {
  args: {
    certifications: [certifications[0]],
  }
};

// Same grid at a 320px viewport
export const Responsive = {
  args: Default.args,
  globals: {
    viewport: { value: 'mobile1', isRotated: false },
  },
};
