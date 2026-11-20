import type { Meta, StoryObj } from '@storybook/react-vite';
import CertificationList from './CertificationList';
import type { Certification } from '@/types/portfolio';

const certifications: Certification[] = [
  { name: 'Practical Network Penetration Tester', issuer: 'TCM Security', date: 'Apr 2022', credentialId: 'PNPT-0000' },
  { name: 'Security+', issuer: 'CompTIA', date: 'Jun 2020', credentialId: 'SEC-0000' },
  { name: 'Certified Kubernetes Administrator', issuer: 'CNCF', date: 'Sep 2023', credentialId: 'CKA-0000' },
  { name: 'Cloud Security Fundamentals', issuer: 'Example Cloud Academy', date: 'Jan 2024' },
];

const meta = {
  title: 'Molecules/CertificationList',
  component: CertificationList,
  tags: ['autodocs'],
  argTypes: {
    animated: {
      control: 'boolean',
      description: 'Whether the badges lift on hover',
    },
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
} satisfies Meta<typeof CertificationList>;
export default meta;

type Story = StoryObj<typeof meta>;

// Full grid
export const Default: Story = {
  args: {
    certifications,
  }
};

// One badge
export const SingleCertification: Story = {
  args: {
    certifications: [certifications[0]],
  }
};

// Same grid at a 320px viewport
export const Responsive: Story = {
  args: Default.args,
  globals: {
    viewport: { value: 'mobile1', isRotated: false },
  },
};
