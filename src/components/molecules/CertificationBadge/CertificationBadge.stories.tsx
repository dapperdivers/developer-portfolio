import type { Meta, StoryObj } from '@storybook/react-vite';
import CertificationBadge from './CertificationBadge';
import { educationInfo } from '@/portfolio';

const certs = educationInfo[0].certifications ?? [];
const practical = certs[1];
const divemaster = certs[3];

const meta = {
  title: 'Molecules/CertificationBadge',
  component: CertificationBadge,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'One certification as a single row of the ruled list: the name on the left; issuer, date and ID in small mono on the right, with a hairline below. Use `as="li"` inside a `ul` (CertificationList does).',
      },
    },
  },
  argTypes: {
    name: { control: 'text', description: 'Name of the certification' },
    issuer: { control: 'text', description: 'Issuing organization' },
    date: { control: 'text', description: 'Date of certification' },
    credentialId: { control: 'text', description: 'Credential ID' },
    as: { control: 'select', options: ['div', 'li'], description: 'Element to render' },
    className: { control: 'text', description: 'Additional CSS classes' },
    animated: { control: 'boolean', description: 'Whether the row fades in' },
  },
  decorators: [(Story) => <div style={{ maxWidth: '40rem' }}><Story /></div>],
} satisfies Meta<typeof CertificationBadge>;
export default meta;

type Story = StoryObj<typeof meta>;

/** A real certification, with a credential ID */
export const Default: Story = {
  args: { name: practical.name, issuer: practical.issuer, date: practical.date, credentialId: practical.credentialId },
};

export const WithoutCredentialId: Story = {
  args: { name: divemaster.name, issuer: divemaster.issuer, date: divemaster.date },
};

export const NameOnly: Story = {
  args: { name: 'Example Security Practitioner' },
};

export const LongName: Story = {
  args: {
    name: 'Example Professional Cloud Solutions Architect with Advanced Networking and Security Specialization',
    issuer: 'Example Certification Board',
    date: 'Mar 2021',
    credentialId: 'EX-104233',
  },
};

export const Narrow: Story = {
  args: { name: practical.name, issuer: practical.issuer, date: practical.date, credentialId: practical.credentialId },
  decorators: [(Story) => <div style={{ maxWidth: '20rem' }}><Story /></div>],
};

export const ReducedMotion: Story = {
  args: { name: practical.name, issuer: practical.issuer, date: practical.date, animated: false },
};
