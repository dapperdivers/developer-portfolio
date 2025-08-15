import ExperienceToggle from './ExperienceToggle';

export default {
  title: 'atoms/ExperienceToggle',
  component: ExperienceToggle,
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
    onClick: { action: 'toggle clicked' },
  }
};

export const Default = {
  args: {
    variant: 'default',
    expanded: false
  }
};

export const Secure = {
  args: {
    variant: 'secure',
    expanded: false
  }
};

export const Breach = {
  args: {
    variant: 'breach',
    expanded: false
  }
};

export const Critical = {
  args: {
    variant: 'critical',
    expanded: false
  }
};

export const Expanded = {
  args: {
    variant: 'default',
    expanded: true
  }
};

export const SecureExpanded = {
  args: {
    variant: 'secure',
    expanded: true
  }
};

export const BreachExpanded = {
  args: {
    variant: 'breach',
    expanded: true
  }
};

export const CriticalExpanded = {
  args: {
    variant: 'critical',
    expanded: true
  }
};

export const Playground = {
  args: {
    variant: 'default',
    expanded: false
  }
};