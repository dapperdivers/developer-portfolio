import ExperienceContent from './ExperienceContent';

export default {
  title: 'atoms/ExperienceContent',
  component: ExperienceContent,
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
  }
};

const sampleData = {
  description: 'Leading cybersecurity initiatives and implementing enterprise-grade security solutions for cloud infrastructure.',
  bullets: [
    'Implemented zero-trust security architecture reducing breach risk by 75%',
    'Developed automated threat detection system using AI/ML algorithms',
    'Led security audits and penetration testing for 50+ applications',
    'Mentored junior security analysts in incident response procedures'
  ]
};

export const Default = {
  args: {
    ...sampleData,
    variant: 'default',
    expanded: true
  }
};

export const Secure = {
  args: {
    ...sampleData,
    variant: 'secure',
    expanded: true
  }
};

export const Breach = {
  args: {
    ...sampleData,
    variant: 'breach',
    expanded: true
  }
};

export const Critical = {
  args: {
    ...sampleData,
    variant: 'critical',
    expanded: true
  }
};

export const OnlyDescription = {
  args: {
    description: sampleData.description,
    bullets: [],
    variant: 'default',
    expanded: true
  }
};

export const OnlyBullets = {
  args: {
    description: undefined,
    bullets: sampleData.bullets,
    variant: 'default',
    expanded: true
  }
};

export const ShortContent = {
  args: {
    description: 'Entry-level position focused on learning and contributing to various projects.',
    bullets: [
      'Contributed to frontend development using React',
      'Participated in code reviews and team meetings'
    ],
    variant: 'default',
    expanded: true
  }
};

export const Collapsed = {
  args: {
    ...sampleData,
    variant: 'default',
    expanded: false
  }
};

export const Playground = {
  args: {
    ...sampleData,
    variant: 'default',
    expanded: true
  }
};