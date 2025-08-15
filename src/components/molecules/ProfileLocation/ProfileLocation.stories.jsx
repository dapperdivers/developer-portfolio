import React from 'react';
import ProfileLocation from './ProfileLocation';

export default {
  title: 'molecules/ProfileLocation',
  component: ProfileLocation,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
ProfileLocation component is a terminal-style mapping interface wrapper that integrates MapComponent.

## Features
- **Security-themed terminal interface** with cybersecurity styling
- **Dynamic security status indicators** based on variant
- **Real-time status displays** and live indicators  
- **Map integration** through MapComponent for actual mapping functionality
- **Security metrics footer** showing protocol and encryption info
- **Responsive design** that adapts to different screen sizes
- **Animation support** with Framer Motion integration

## Architecture
- **Wrapper Pattern**: Acts as a container around MapComponent
- **MapComponent Integration**: Utilizes the full Leaflet-powered MapComponent
- **Enhanced UI**: Adds additional security-themed interface elements
- **Variant System**: Different security states (default, secure, breach, critical)

## Use Cases
- Geographic profile displays
- Security monitoring interfaces  
- Location-based dashboards
- Terminal-themed applications
`
      }
    }
  },
  argTypes: {
    location: {
      control: { type: 'text' },
      description: 'Location string to display on the map'
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'secure', 'breach', 'critical'],
      description: 'Security variant theme'
    },
    animate: {
      control: { type: 'boolean' },
      description: 'Whether to animate the component'
    },
    className: {
      control: { type: 'text' },
      description: 'Additional CSS classes'
    }
  }
};

/**
 * Default ProfileLocation with standard cybersecurity theme
 */
export const Default = {
  args: {
    location: "Warrior, AL",
    variant: 'default',
    animate: true
  }
};

/**
 * Secure variant with green security theme indicating high security level
 */
export const Secure = {
  args: {
    location: "San Francisco, CA",
    variant: 'secure',
    animate: true
  }
};

/**
 * Breach variant with orange/yellow theme indicating security breach
 */
export const Breach = {
  args: {
    location: "Washington, DC",
    variant: 'breach',
    animate: true
  }
};

/**
 * Critical variant with red theme indicating critical security alert
 */
export const Critical = {
  args: {
    location: "New York, NY",
    variant: 'critical',
    animate: true
  }
};

/**
 * Without animation for accessibility or performance
 */
export const NoAnimation = {
  args: {
    location: "Chicago, IL",
    variant: 'default',
    animate: false
  }
};

/**
 * Different locations showcase
 */
export const DifferentLocations = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h3 style={{ color: '#4fd1c5', marginBottom: '1rem' }}>West Coast - Secure</h3>
        <ProfileLocation location="Seattle, WA" variant="secure" />
      </div>
      
      <div>
        <h3 style={{ color: '#ffcc00', marginBottom: '1rem' }}>East Coast - Breach</h3>
        <ProfileLocation location="Boston, MA" variant="breach" />
      </div>
      
      <div>
        <h3 style={{ color: '#ff2d55', marginBottom: '1rem' }}>Central - Critical</h3>
        <ProfileLocation location="Denver, CO" variant="critical" />
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded'
  }
};

/**
 * Interactive playground with all controls
 */
export const Playground = {
  args: {
    location: "Los Angeles, CA",
    variant: 'default',
    animate: true,
    className: ''
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground to test all ProfileLocation variants and properties. Try changing the location, variant, and animation settings.'
      }
    }
  }
};

/**
 * All security variants in a grid layout
 */
export const AllVariants = {
  render: () => (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
      gap: '2rem',
      padding: '1rem'
    }}>
      <div>
        <h4 style={{ color: '#4fd1c5', marginBottom: '0.5rem' }}>Default</h4>
        <ProfileLocation location="Austin, TX" variant="default" />
      </div>
      
      <div>
        <h4 style={{ color: '#34c759', marginBottom: '0.5rem' }}>Secure</h4>
        <ProfileLocation location="San Francisco, CA" variant="secure" />
      </div>
      
      <div>
        <h4 style={{ color: '#ffcc00', marginBottom: '0.5rem' }}>Breach</h4>
        <ProfileLocation location="Washington, DC" variant="breach" />
      </div>
      
      <div>
        <h4 style={{ color: '#ff2d55', marginBottom: '0.5rem' }}>Critical</h4>
        <ProfileLocation location="Las Vegas, NV" variant="critical" />
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen'
  }
};

/**
 * Mobile responsive demonstration
 */
export const MobileView = {
  args: {
    location: "Miami, FL",
    variant: 'secure'
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      description: {
        story: 'ProfileLocation component optimized for mobile viewing with responsive typography and layout adjustments.'
      }
    }
  }
};

/**
 * Performance optimized version
 */
export const PerformanceOptimized = {
  args: {
    location: "Phoenix, AZ",
    variant: 'default',
    animate: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Performance-optimized version with animations disabled for better performance on lower-end devices.'
      }
    }
  }
};