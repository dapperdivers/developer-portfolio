import React from 'react';
import SecurityBadge from './SecurityBadge';

const meta = {
  title: 'Atoms/SecurityBadge',
  component: SecurityBadge,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: 'Display security verification badges for timeline entries and secure content',
    docs: {
      description: {
        component: 'A dynamic security badge component that displays verification status with animations and variants.',
      },
    },
  },
  argTypes: {
    verified: {
      control: 'boolean',
      description: 'Whether the badge is verified',
    },
    variant: {
      control: 'select',
      options: ['security', 'terminal'],
      description: 'Visual variant of the badge',
    },
    securityId: {
      control: 'text',
      description: 'Security verification ID',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
};

export default meta;

// Container for consistent positioning in stories
const BadgeContainer = ({ children }) => (
  <div style={{ 
    position: 'relative',
    width: '300px',
    height: '100px',
    border: '1px solid #444',
    borderRadius: '8px',
    padding: '20px',
    margin: '20px'
  }}>
    {children}
  </div>
);

// Default verification badge
export const Default = {
  args: {
    verified: false,
    variant: 'security',
    securityId: 'SEC-7F8A2D9B',
  }
};

// Verified state
export const Verified = {
  args: {
    verified: true,
    variant: 'security',
    securityId: 'SEC-7F8A2D9B',
  }
};

// Variant examples
export const Variants = () => (
  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
    <BadgeContainer>
      <SecurityBadge 
        verified={true} 
        variant="security" 
        securityId="SEC-EF7D1A3B"
      />
      <div style={{ marginTop: '30px' }}>Security Variant</div>
    </BadgeContainer>
    
    <BadgeContainer>
      <SecurityBadge 
        verified={true} 
        variant="terminal" 
        securityId="SEC-8A4F1E2C"
      />
      <div style={{ marginTop: '30px' }}>Terminal Variant</div>
    </BadgeContainer>
  </div>
);

// Verification process
export const VerificationProcess = () => {
  const [isVerified, setIsVerified] = React.useState(false);
  
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsVerified(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <BadgeContainer>
      <SecurityBadge 
        verified={isVerified} 
        variant="security" 
        securityId="SEC-9D7B2A1C"
      />
      <div style={{ marginTop: '30px' }}>
        {isVerified ? 'Content is verified!' : 'Content is being verified...'}
      </div>
      <button 
        onClick={() => setIsVerified(!isVerified)}
        style={{ 
          position: 'absolute',
          bottom: '10px',
          right: '10px',
          padding: '5px 10px',
          backgroundColor: '#2a2a2a',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Toggle Verification
      </button>
    </BadgeContainer>
  );
};

// With custom animation
export const WithAnimation = {
  args: {
    verified: true,
    variant: 'security',
    securityId: 'SEC-3B9F1D4A',
    animation: {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: [1, 1.1, 1] },
      transition: { duration: 0.5, times: [0, 0.5, 1] }
    }
  }
};

// Multiple badges example
export const MultipleBadges = () => (
  <div style={{ 
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px',
    padding: '20px'
  }}>
    <BadgeContainer>
      <SecurityBadge 
        verified={true}
        variant="security"
        securityId="SEC-001"
      />
      <div style={{ marginTop: '30px' }}>Primary Security Check</div>
    </BadgeContainer>
    
    <BadgeContainer>
      <SecurityBadge 
        verified={false}
        variant="terminal"
        securityId="SEC-002"
      />
      <div style={{ marginTop: '30px' }}>Secondary Verification</div>
    </BadgeContainer>
    
    <BadgeContainer>
      <SecurityBadge 
        verified={true}
        variant="security"
        securityId="SEC-003"
      />
      <div style={{ marginTop: '30px' }}>Final Approval</div>
    </BadgeContainer>
  </div>
);
