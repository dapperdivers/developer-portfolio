import TerminalFooter from './TerminalFooter';

export default {
  title: 'atoms/TerminalFooter',
  component: TerminalFooter,
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
    prompt: {
      control: 'text'
    }
  }
};

export const Default = {
  args: {
    prompt: 'user@portfolio:~$',
    variant: 'default',
    expanded: true
  }
};

export const Secure = {
  args: {
    prompt: 'admin@secure:~$',
    variant: 'secure',
    expanded: true
  }
};

export const Breach = {
  args: {
    prompt: 'root@compromised:~#',
    variant: 'breach',
    expanded: true
  }
};

export const Critical = {
  args: {
    prompt: 'system@critical:~!',
    variant: 'critical',
    expanded: true
  }
};

export const CustomPrompt = {
  args: {
    prompt: 'hacker@terminal:~$',
    variant: 'default',
    expanded: true
  }
};

export const Collapsed = {
  args: {
    prompt: 'user@portfolio:~$',
    variant: 'default',
    expanded: false
  }
};

export const Playground = {
  args: {
    prompt: 'user@portfolio:~$',
    variant: 'default',
    expanded: true
  }
};