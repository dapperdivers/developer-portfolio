import React from 'react';
import TerminalControls from './TerminalControls';

export default {
  title: 'Atoms/TerminalControls',
  component: TerminalControls,
  parameters: {
    componentSubtitle: 'Window control buttons for terminal and console UI components',
  },
  argTypes: {
    variant: {
      control: { type: 'select', options: ['macos', 'windows', 'linux'] },
    },
    interactive: { control: 'boolean' },
    onCloseClick: { action: 'close clicked' },
    onMinimizeClick: { action: 'minimize clicked' },
    onMaximizeClick: { action: 'maximize clicked' },
    className: { control: 'text' },
  },
};

// Default template
const Template = (args) => <TerminalControls {...args} />;

// Default macOS style controls
export const Default = Template.bind({});
Default.args = {
  variant: 'macos',
  interactive: false,
};

// All operating system variants
export const OsVariants = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <TerminalControls variant="macos" />
      <span>macOS variant</span>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <TerminalControls variant="windows" />
      <span>Windows variant</span>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <TerminalControls variant="linux" />
      <span>Linux variant</span>
    </div>
  </div>
);

// Interactive controls
export const Interactive = Template.bind({});
Interactive.args = {
  variant: 'macos',
  interactive: true,
  onCloseClick: () => alert('Close clicked'),
  onMinimizeClick: () => alert('Minimize clicked'),
  onMaximizeClick: () => alert('Maximize clicked'),
};

// In context example
export const InContext = () => (
  <div style={{ 
    width: '400px', 
    border: '1px solid #444', 
    borderRadius: '6px', 
    overflow: 'hidden' 
  }}>
    <div style={{ 
      display: 'flex', 
      padding: '10px', 
      background: '#1a1a2e', 
      borderBottom: '1px solid #333' 
    }}>
      <TerminalControls variant="macos" />
      <div style={{ 
        marginLeft: '20px', 
        color: '#eee', 
        fontFamily: 'monospace', 
        fontSize: '14px' 
      }}>
        Terminal - bash
      </div>
    </div>
    <div style={{ 
      padding: '15px', 
      background: '#121212', 
      color: '#eee', 
      fontFamily: 'monospace', 
      fontSize: '14px',
      minHeight: '100px'
    }}>
      <div>$ echo &quot;Hello, World!&quot;</div>
      <div>Hello, World!</div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span>$ </span>
        <span style={{ 
          width: '8px', 
          height: '16px', 
          background: '#eee', 
          display: 'inline-block',
          marginLeft: '2px',
          animation: 'blink 1s infinite'
        }}></span>
      </div>
    </div>
  </div>
);

// Responsive example
export const Responsive = () => (
  <div>
    <div style={{ 
      width: '400px', 
      border: '1px solid #444', 
      borderRadius: '6px', 
      overflow: 'hidden',
      marginBottom: '20px'
    }}>
      <div style={{ 
        display: 'flex', 
        padding: '10px', 
        background: '#1a1a2e', 
        borderBottom: '1px solid #333' 
      }}>
        <TerminalControls variant="macos" />
        <div style={{ 
          marginLeft: '20px', 
          color: '#eee', 
          fontFamily: 'monospace', 
          fontSize: '14px' 
        }}>
          Desktop Size
        </div>
      </div>
    </div>
    
    <div style={{ 
      width: '250px', 
      border: '1px solid #444', 
      borderRadius: '6px', 
      overflow: 'hidden' 
    }}>
      <div style={{ 
        display: 'flex', 
        padding: '8px', 
        background: '#1a1a2e', 
        borderBottom: '1px solid #333' 
      }}>
        <TerminalControls variant="macos" />
        <div style={{ 
          marginLeft: '10px', 
          color: '#eee', 
          fontFamily: 'monospace', 
          fontSize: '12px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}>
          Mobile Size
        </div>
      </div>
    </div>
  </div>
);
