import React from 'react';
import Button from '../../components/ui/Button';

import { fn } from '@storybook/test';

const meta = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark', 'link'],
      description: 'Button style variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Button size',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the button',
    },
    icon: {
      control: 'text',
      description: 'Iconify icon name (e.g. "mdi:home")',
    },
    iconPosition: {
      control: 'radio',
      options: ['left', 'right'],
      description: 'Position of the icon relative to text',
    },
    onClick: { 
      action: 'clicked',
      defaultValue: fn()
    },
  },
};

export default meta;

// Default button
export const Default = {
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
  }
};

// Primary button
export const Primary = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
  }
};

// Secondary button
export const Secondary = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
  }
};

// Success button
export const Success = {
  args: {
    children: 'Success Button',
    variant: 'success',
  }
};

// Danger button
export const Danger = {
  args: {
    children: 'Danger Button',
    variant: 'danger',
  }
};

// Warning button
export const Warning = {
  args: {
    children: 'Warning Button',
    variant: 'warning',
  }
};

// Info button
export const Info = {
  args: {
    children: 'Info Button',
    variant: 'info',
  }
};

// Light button
export const Light = {
  args: {
    children: 'Light Button',
    variant: 'light',
  }
};

// Dark button
export const Dark = {
  args: {
    children: 'Dark Button',
    variant: 'dark',
  }
};

// Link button
export const LinkButton = {
  args: {
    children: 'Link Button',
    variant: 'link',
  }
};

// Button sizes
export const Sizes = {
  render: () => (
    <div className="d-flex flex-column gap-2">
      <Button size="sm">Small Button</Button>
      <Button size="md">Medium Button</Button>
      <Button size="lg">Large Button</Button>
    </div>
  )
};

// Button with icon
export const WithIcon = {
  args: {
    children: 'Button with Icon',
    icon: 'mdi:home',
    iconPosition: 'left',
  }
};

// Icon only button
export const IconOnly = {
  args: {
    icon: 'mdi:github',
    ariaLabel: 'GitHub',
  }
};

// Disabled button
export const Disabled = {
  args: {
    children: 'Disabled Button',
    disabled: true,
  }
};

// Button as link
export const AsLink = {
  args: {
    children: 'Button as Link',
    href: 'https://example.com',
    target: '_blank',
    rel: 'noopener noreferrer',
  }
};
