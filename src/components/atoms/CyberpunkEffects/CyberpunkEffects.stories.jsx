import CyberpunkEffects from './CyberpunkEffects';

export default {
  title: 'atoms/CyberpunkEffects',
  component: CyberpunkEffects,
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
    isHovered: {
      control: 'boolean'
    },
    showGlow: {
      control: 'boolean'
    },
    showCorners: {
      control: 'boolean'
    },
    showScanLines: {
      control: 'boolean'
    },
    showDataStream: {
      control: 'boolean'
    }
  },
  decorators: [
    (Story) => (
      <div style={{ 
        position: 'relative',
        width: '400px', 
        height: '300px', 
        background: 'linear-gradient(135deg, rgba(10, 25, 47, 0.95), rgba(10, 25, 47, 0.9))',
        border: '1px solid rgba(100, 255, 218, 0.3)',
        borderRadius: '16px',
        padding: '2rem'
      }}>
        <div style={{ color: '#64ffda', marginBottom: '1rem' }}>
          Sample Content Container
        </div>
        <div style={{ color: 'rgba(241, 245, 249, 0.8)' }}>
          This container shows how cyberpunk effects overlay content.
        </div>
        <Story />
      </div>
    ),
  ],
};

export const Default = {
  args: {
    variant: 'default',
    expanded: true,
    isHovered: false,
    showGlow: true,
    showCorners: true,
    showScanLines: true,
    showDataStream: true
  }
};

export const Secure = {
  args: {
    variant: 'secure',
    expanded: true,
    isHovered: false,
    showGlow: true,
    showCorners: true,
    showScanLines: true,
    showDataStream: true
  }
};

export const Breach = {
  args: {
    variant: 'breach',
    expanded: true,
    isHovered: false,
    showGlow: true,
    showCorners: true,
    showScanLines: true,
    showDataStream: true
  }
};

export const Critical = {
  args: {
    variant: 'critical',
    expanded: true,
    isHovered: false,
    showGlow: true,
    showCorners: true,
    showScanLines: true,
    showDataStream: true
  }
};

export const Hovered = {
  args: {
    variant: 'default',
    expanded: false,
    isHovered: true,
    showGlow: true,
    showCorners: true,
    showScanLines: false,
    showDataStream: false
  }
};

export const OnlyGlow = {
  args: {
    variant: 'default',
    expanded: true,
    isHovered: false,
    showGlow: true,
    showCorners: false,
    showScanLines: false,
    showDataStream: false
  }
};

export const OnlyCorners = {
  args: {
    variant: 'default',
    expanded: true,
    isHovered: false,
    showGlow: false,
    showCorners: true,
    showScanLines: false,
    showDataStream: false
  }
};

export const OnlyScanLines = {
  args: {
    variant: 'default',
    expanded: true,
    isHovered: false,
    showGlow: false,
    showCorners: false,
    showScanLines: true,
    showDataStream: false
  }
};

export const OnlyDataStream = {
  args: {
    variant: 'default',
    expanded: true,
    isHovered: false,
    showGlow: false,
    showCorners: false,
    showScanLines: false,
    showDataStream: true
  }
};

export const Collapsed = {
  args: {
    variant: 'default',
    expanded: false,
    isHovered: false,
    showGlow: true,
    showCorners: true,
    showScanLines: true,
    showDataStream: true
  }
};

export const Playground = {
  args: {
    variant: 'default',
    expanded: true,
    isHovered: false,
    showGlow: true,
    showCorners: true,
    showScanLines: true,
    showDataStream: true
  }
};