import React, { useState } from 'react';
import TerminalControls from './TerminalControls';

export default {
  title: 'Atoms/TerminalControls',
  component: TerminalControls,
  parameters: {
    componentSubtitle: 'Window control buttons for terminal and console UI components',
    docs: {
      description: {
        component: 'TerminalControls provides window control buttons (close, minimize, maximize) styled to match different operating systems. It supports both decorative and interactive modes.'
      }
    }
  },
  argTypes: {
    variant: {
      control: { type: 'select', options: ['macos', 'windows', 'linux'] },
      description: 'Visual style variant based on operating system',
      table: {
        type: { summary: 'macos | windows | linux' },
        defaultValue: { summary: 'macos' }
      }
    },
    interactive: {
      control: 'boolean',
      description: 'Whether the controls are clickable',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false }
      }
    },
    onCloseClick: {
      action: 'close clicked',
      description: 'Callback when close button is clicked',
      table: {
        type: { summary: 'function' }
      }
    },
    onMinimizeClick: {
      action: 'minimize clicked',
      description: 'Callback when minimize button is clicked',
      table: {
        type: { summary: 'function' }
      }
    },
    onMaximizeClick: {
      action: 'maximize clicked',
      description: 'Callback when maximize button is clicked',
      table: {
        type: { summary: 'function' }
      }
    },
    className: {
      control: 'text',
      description: 'Additional CSS class names',
      table: {
        type: { summary: 'string' }
      }
    }
  }
};

// Container for consistent display
const ControlsContainer = ({ children, style = {} }) => (
  <div style={{ 
    padding: '15px', 
    background: '#1a1a2e', 
    borderRadius: '6px',
    ...style 
  }}>
    {children}
  </div>
);

// Default decorative controls
export const Default = () => (
  <ControlsContainer>
    <TerminalControls />
  </ControlsContainer>
);

// Operating system variants
export const OsVariants = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
    <div>
      <h4 style={{ color: '#fff', marginBottom: '10px' }}>macOS Style</h4>
      <ControlsContainer>
        <TerminalControls variant="macos" />
      </ControlsContainer>
    </div>
    
    <div>
      <h4 style={{ color: '#fff', marginBottom: '10px' }}>Windows Style</h4>
      <ControlsContainer>
        <TerminalControls variant="windows" />
      </ControlsContainer>
    </div>
    
    <div>
      <h4 style={{ color: '#fff', marginBottom: '10px' }}>Linux Style</h4>
      <ControlsContainer>
        <TerminalControls variant="linux" />
      </ControlsContainer>
    </div>
  </div>
);

// Interactive controls with state
export const Interactive = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        style={{
          padding: '8px 16px',
          background: '#64ffda',
          color: '#1a1a2e',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Reopen Window
      </button>
    );
  }

  return (
    <div>
      <ControlsContainer
        style={{
          transform: isMinimized ? 'scale(0.8)' : 'none',
          width: isMaximized ? '100%' : '400px',
          transition: 'all 0.3s ease'
        }}
      >
        <TerminalControls
          variant="macos"
          interactive
          onCloseClick={() => setIsOpen(false)}
          onMinimizeClick={() => setIsMinimized(!isMinimized)}
          onMaximizeClick={() => setIsMaximized(!isMaximized)}
        />
        <div style={{ 
          marginTop: '15px', 
          color: '#fff',
          fontFamily: 'monospace'
        }}>
          Window State:
          <ul style={{ marginTop: '5px', marginLeft: '20px' }}>
            <li>Maximized: {isMaximized ? 'Yes' : 'No'}</li>
            <li>Minimized: {isMinimized ? 'Yes' : 'No'}</li>
          </ul>
        </div>
      </ControlsContainer>
    </div>
  );
};

// Terminal window example
export const InTerminalWindow = () => (
  <div style={{ 
    width: '500px',
    border: '1px solid #333',
    borderRadius: '6px',
    overflow: 'hidden'
  }}>
    <div style={{ 
      background: '#1a1a2e',
      borderBottom: '1px solid #333',
      padding: '10px 15px',
      display: 'flex',
      alignItems: 'center'
    }}>
      <TerminalControls variant="macos" />
      <div style={{ 
        marginLeft: '20px',
        color: '#eee',
        fontFamily: 'monospace',
        fontSize: '14px'
      }}>
        ~ bash
      </div>
    </div>
    <div style={{ 
      background: '#121212',
      padding: '15px',
      color: '#eee',
      fontFamily: 'monospace',
      fontSize: '14px',
      minHeight: '150px'
    }}>
      <div>$ echo "Hello, World!"</div>
      <div style={{ color: '#64ffda', marginTop: '5px' }}>Hello, World!</div>
      <div style={{ 
        display: 'flex',
        alignItems: 'center',
        marginTop: '10px'
      }}>
        <span>$ </span>
        <span style={{ 
          width: '8px',
          height: '16px',
          background: '#64ffda',
          marginLeft: '4px',
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
      marginBottom: '30px',
      border: '1px solid #333',
      borderRadius: '6px',
      overflow: 'hidden'
    }}>
      <h4 style={{ color: '#fff', padding: '10px 15px', margin: 0 }}>Desktop View</h4>
      <div style={{ 
        background: '#1a1a2e',
        padding: '12px 15px',
        display: 'flex',
        alignItems: 'center'
      }}>
        <TerminalControls variant="macos" />
        <div style={{ 
          marginLeft: '20px',
          color: '#eee',
          fontFamily: 'monospace'
        }}>
          terminal
        </div>
      </div>
    </div>

    <div style={{ 
      maxWidth: '300px',
      border: '1px solid #333',
      borderRadius: '6px',
      overflow: 'hidden'
    }}>
      <h4 style={{ color: '#fff', padding: '8px 12px', margin: 0 }}>Mobile View</h4>
      <div style={{ 
        background: '#1a1a2e',
        padding: '8px 12px',
        display: 'flex',
        alignItems: 'center'
      }}>
        <TerminalControls variant="macos" />
        <div style={{ 
          marginLeft: '12px',
          color: '#eee',
          fontFamily: 'monospace',
          fontSize: '12px'
        }}>
          terminal
        </div>
      </div>
    </div>
  </div>
);

// Theme variations
export const ThemeVariations = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
    <div>
      <h4 style={{ color: '#fff', marginBottom: '10px' }}>Dark Theme</h4>
      <ControlsContainer>
        <TerminalControls variant="macos" />
      </ControlsContainer>
    </div>
    
    <div>
      <h4 style={{ color: '#fff', marginBottom: '10px' }}>Light Theme</h4>
      <ControlsContainer style={{ background: '#f0f0f0' }}>
        <TerminalControls variant="macos" />
      </ControlsContainer>
    </div>
    
    <div>
      <h4 style={{ color: '#fff', marginBottom: '10px' }}>Custom Theme</h4>
      <ControlsContainer style={{ 
        background: 'linear-gradient(45deg, #1a1a2e, #16213e)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
      }}>
        <TerminalControls variant="macos" />
      </ControlsContainer>
    </div>
  </div>
);
