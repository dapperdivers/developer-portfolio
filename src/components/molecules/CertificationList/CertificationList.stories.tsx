import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import CertificationList from './CertificationList';
import { educationInfo } from '@/portfolio';

const meta = {
  title: 'Molecules/CertificationList',
  component: CertificationList,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Certifications as a ruled list: one CertificationBadge row per item, hairline dividers, an optional mono heading. Renders nothing when there are none.',
      },
    },
  },
  argTypes: {
    certifications: { control: 'object', description: 'Certifications to show' },
    title: { control: 'text', description: 'Optional heading above the list' },
    className: { control: 'text', description: 'Additional CSS classes' },
    animated: { control: 'boolean', description: 'Whether rows fade in' },
  },
  decorators: [(Story) => <div style={{ maxWidth: '40rem' }}><Story /></div>],
} satisfies Meta<typeof CertificationList>;
export default meta;

type Story = StoryObj<typeof meta>;

/** The real certifications from the site data */
export const Default: Story = {
  args: { certifications: educationInfo[0].certifications, title: 'Certifications' },
  play: async ({ canvasElement }) => {
    const items = within(canvasElement).getAllByRole('listitem');
    await expect(items).toHaveLength(educationInfo[0].certifications!.length);
  },
};

export const WithoutTitle: Story = {
  args: { certifications: educationInfo[0].certifications },
};

export const SingleCertification: Story = {
  args: {
    title: 'Certifications',
    certifications: [
      { name: 'Example Security Practitioner', issuer: 'Example Certification Board', date: 'Mar 2021', credentialId: 'EX-104233' },
    ],
  },
};

export const MixedDetail: Story = {
  args: {
    title: 'Certifications',
    certifications: [
      { name: 'Example Security Practitioner', issuer: 'Example Certification Board', date: 'Mar 2021', credentialId: 'EX-104233' },
      { name: 'Example Cloud Associate', issuer: 'Example Cloud Institute', date: 'Nov 2019' },
      { name: 'Example Incident Response Foundations', issuer: 'Example Security Council', date: 'Jan 2024' },
    ],
  },
};

export const Narrow: Story = {
  args: { certifications: educationInfo[0].certifications, title: 'Certifications' },
  decorators: [(Story) => <div style={{ maxWidth: '20rem' }}><Story /></div>],
};

export const ReducedMotion: Story = {
  args: { certifications: educationInfo[0].certifications, title: 'Certifications', animated: false },
};
