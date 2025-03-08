import React from 'react';
import CodeSnippet from './CodeSnippet';

const meta = {
  title: 'Atoms/CodeSnippet',
  component: CodeSnippet,
  tags: ['autodocs'],
  argTypes: {
    code: {
      control: 'text',
      description: 'Code content to display',
    },
    language: {
      control: 'select',
      options: ['javascript', 'typescript', ''],
      description: 'Programming language for syntax highlighting',
    },
    variant: {
      control: 'select',
      options: ['', 'security', 'terminal'],
      description: 'Visual variant',
    },
    theme: {
      control: 'radio',
      options: ['dark', 'light'],
      description: 'Color theme',
    },
    isDecorative: {
      control: 'boolean',
      description: 'Whether this is a decorative element',
    },
  },
};

export default meta;

// Default code snippet
export const Default = {
  args: {
    code: 'const greeting = "Hello, World!";\nconsole.log(greeting);',
    language: 'javascript',
    theme: 'dark',
  }
};

// Security variant
export const SecurityVariant = {
  args: {
    code: 'function encryptData(data) {\n  // Encryption logic here\n  return encrypted;\n}',
    language: 'javascript',
    variant: 'security',
    theme: 'dark',
  }
};

// Terminal variant
export const TerminalVariant = {
  args: {
    code: '$ npm install @security/module\n> Installing dependencies...',
    variant: 'terminal',
    theme: 'dark',
  }
};

// Light theme
export const LightTheme = {
  args: {
    code: 'import { security } from "@modules/core";\nexport default security;',
    language: 'javascript',
    theme: 'light',
  }
};

// Decorative element
export const Decorative = {
  args: {
    code: '01001100\n10101010\n01001100',
    isDecorative: true,
    variant: 'security',
    theme: 'dark',
  }
};
