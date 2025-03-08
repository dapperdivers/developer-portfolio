import React from 'react';
import ConsoleHeader from './ConsoleHeader';

const meta = {
  title: 'Atoms/ConsoleHeader',
  component: ConsoleHeader,
  tags: ['autodocs'],
  argTypes: {
    prompt: {
      control: 'text',
      description: 'Command prompt text',
    },
    command: {
      control: 'text',
      description: 'Command text',
    },
    showCursor: {
      control: 'boolean',
      description: 'Whether to show the blinking cursor',
    },
    variant: {
      control: 'select',
      options: ['terminal', 'security', 'hacker'],
      description: 'Visual variant',
    },
    shadow: {
      control: 'boolean',
      description: 'Whether to show a shadow',
    },
  },
};

export default meta;

// Default console header
export const Default = {
  args: {
    prompt: 'user@portfolio:~$',
    command: 'ls -la',
    showCursor: true,
  }
};

// Security variant
export const SecurityVariant = {
  args: {
    prompt: 'security@system:~$',
    command: 'scan --security-level high',
    variant: 'security',
    showCursor: true,
  }
};

// Hacker variant
export const HackerVariant = {
  args: {
    prompt: 'h4ck3r@system:~#',
    command: 'crack --target system',
    variant: 'hacker',
    showCursor: true,
  }
};

// Without cursor
export const NoCursor = {
  args: {
    prompt: 'user@portfolio:~$',
    command: 'npm start',
    showCursor: false,
  }
};

// With long command
export const LongCommand = {
  args: {
    prompt: 'user@portfolio:~$',
    command: 'docker-compose up -d --build --force-recreate --remove-orphans',
    showCursor: true,
  }
};
