import React from 'react';
import SecurityBadge from './SecurityBadge';

export default {
  title: 'Atoms/SecurityBadge',
  component: SecurityBadge,
  parameters: {
    componentSubtitle: 'Display security verification badges for timeline entries and secure content',
  },
  argTypes: {
    verified: { control: 'boolean' },
    variant: {
      control: { type: 'select', options: ['security', 'terminal'] },
    },
    securityId: { control: 'text' },
    className: { control: 'text' },
  },
};

// Default template
const Template = (args) => <SecurityBadge {...args} />;

// Default verification badge
export const Default = Template.bind({});
Default.args = {
  verified: false,
  variant: 'security',
  securityId: 'SEC-7F8A2D9B',
};

// Verified state
export const Verified = Template.bind({});
Verified.args = {
  verified: true,
  variant: 'security',
  securityId: 'SEC-7F8A2D9B',
};

// Variant examples
export const Variants = () => (
  <div style={{ display: 'flex', gap: '50px', marginTop: '10px' }}>
    <div style={{ position: 'relative', width: '200px', height: '80px', border: '1px solid #444', borderRadius: '4px' }}>
      <SecurityBadge 
        verified={true} 
        variant="security" 
        securityId="SEC-EF7D1A3B"
      />
      <div style={{ padding: '20px', textAlign: 'center' }}>Security Variant</div>
    </div>
    
    <div style={{ position: 'relative', width: '200px', height: '80px', border: '1px solid #444', borderRadius: '4px' }}>
      <SecurityBadge 
        verified={true} 
        variant="terminal" 
        securityId="SEC-8A4F1E2C"
      />
      <div style={{ padding: '20px', textAlign: 'center' }}>Terminal Variant</div>
    </div>
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
    <div style={{ position: 'relative', width: '300px', height: '100px', border: '1px solid #444', borderRadius: '4px' }}>
      <SecurityBadge 
        verified={isVerified} 
        variant="security" 
        securityId="SEC-9D7B2A1C"
      />
      <div style={{ padding: '20px', textAlign: 'center' }}>
        {isVerified ? 'Content is verified!' : 'Content is being verified...'}
      </div>
      <button 
        onClick={() => setIsVerified(!isVerified)}
        style={{ position: 'absolute', bottom: '10px', right: '10px', padding: '5px 10px' }}
      >
        Toggle
      </button>
    </div>
  );
};

// With animation
export const WithAnimation = Template.bind({});
WithAnimation.args = {
  verified: true,
  variant: 'security',
  securityId: 'SEC-3B9F1D4A',
  animation: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: [1, 1.1, 1] },
    transition: { duration: 0.5, times: [0, 0.5, 1] }
  }
};

// With custom styling
export const CustomStyling = () => (
  <SecurityBadge 
    verified={true}
    securityId="SEC-CUSTOM"
    style={{ 
      backgroundColor: '#1a1a2e',
      color: '#e94560',
      border: '2px solid #e94560',
      boxShadow: '0 0 10px rgba(233, 69, 96, 0.5)',
      fontWeight: 'bold'
    }} 
  />
);
