import ExperienceHeader from './ExperienceHeader';
import { placeholderImage } from '@stories-utils/placeholderImage';

export default {
  title: 'Atoms/ExperienceHeader',
  component: ExperienceHeader,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#0a192f' },
        { name: 'navy', value: '#162b3d' },
      ],
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'secure', 'breach', 'critical']
    },
    expanded: {
      control: 'boolean'
    },
    onHeaderClick: { action: 'header clicked' },
    onLinkClick: { action: 'link clicked' },
  }
};

const sampleData = {
  role: 'Senior Security Engineer',
  company: 'CyberSec Solutions',
  date: 'January 2022 – Present',
  logo: placeholderImage(96, 96, { label: 'CS' }),
  url: 'https://example.com'
};

export const Default = {
  args: {
    ...sampleData,
    variant: 'default',
    expanded: false
  }
};

export const Secure = {
  args: {
    ...sampleData,
    variant: 'secure',
    expanded: false
  }
};

export const Breach = {
  args: {
    ...sampleData,
    variant: 'breach',
    expanded: false
  }
};

export const Critical = {
  args: {
    ...sampleData,
    variant: 'critical',
    expanded: false
  }
};

export const Expanded = {
  args: {
    ...sampleData,
    variant: 'default',
    expanded: true
  }
};

export const WithoutLogo = {
  args: {
    ...sampleData,
    logo: undefined,
    variant: 'default',
    expanded: false
  }
};

export const WithoutURL = {
  args: {
    ...sampleData,
    url: undefined,
    variant: 'default',
    expanded: false
  }
};
