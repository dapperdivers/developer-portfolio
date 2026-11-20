import SecurityClassification from './SecurityClassification';

export default {
  title: 'Atoms/SecurityClassification',
  component: SecurityClassification,
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
    animated: { control: 'boolean', description: 'Play animations; reduced motion always turns them off' },
    variant: {
      control: { type: 'select' },
      options: ['default', 'secure', 'breach', 'critical']
    },
    expanded: {
      control: 'boolean'
    },
    label: {
      control: 'text'
    }
  }
};

export const Default = {
  args: {
    label: 'DECLASSIFIED',
    variant: 'default',
    expanded: true
  }
};

export const Secure = {
  args: {
    label: 'AUTHORIZED',
    variant: 'secure',
    expanded: true
  }
};

export const Breach = {
  args: {
    label: 'COMPROMISED',
    variant: 'breach',
    expanded: true
  }
};

export const Critical = {
  args: {
    label: 'CRITICAL ALERT',
    variant: 'critical',
    expanded: true
  }
};

export const CustomLabel = {
  args: {
    label: 'TOP SECRET',
    variant: 'default',
    expanded: true
  }
};

export const Collapsed = {
  args: {
    label: 'DECLASSIFIED',
    variant: 'default',
    expanded: false
  }
};

export const Playground = {
  args: {
    label: 'DECLASSIFIED',
    variant: 'default',
    expanded: true
  }
};