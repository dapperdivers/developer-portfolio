import React from 'react';
import Progress from './Progress';

export default {
  title: 'Atoms/Progress',
  component: Progress,
  parameters: {
    componentSubtitle: 'Progress indicators with security-themed variants and animations',
    docs: {
      description: {
        component: 'A versatile progress bar component that supports different themes, sizes, and animations. Features security-themed variants and terminal-style options for consistent design language across the application.'
      }
    }
  },
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100 },
      description: 'Current progress value (0-100)',
      table: {
        type: { summary: 'number | string' },
        defaultValue: { summary: 0 }
      }
    },
    max: {
      control: { type: 'number', min: 1 },
      description: 'Maximum progress value',
      table: {
        type: { summary: 'number | string' },
        defaultValue: { summary: 100 }
      }
    },
    color: {
      control: { 
        type: 'select', 
        options: ['primary', 'info', 'success', 'warning', 'danger', 'critical', 'high', 'medium', 'low'] 
      },
      description: 'Color variant of the progress bar',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' }
      }
    },
    variant: {
      control: { type: 'select', options: ['', 'security', 'terminal'] },
      description: 'Visual style variant',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' }
      }
    },
    size: {
      control: { type: 'select', options: ['', 'thin', 'thick'] },
      description: 'Size variant of the progress bar',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' }
      }
    },
    striped: {
      control: 'boolean',
      description: 'Whether to show striped pattern',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false }
      }
    },
    animated: {
      control: 'boolean',
      description: 'Whether to animate the stripes',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false }
      }
    }
  }
};

// Container for consistent display
const ProgressContainer = ({ children, style = {} }) => (
  <div style={{ 
    padding: '20px',
    background: 'var(--color-background, #0a192f)',
    borderRadius: '8px',
    maxWidth: '600px',
    ...style
  }}>
    {children}
  </div>
);

// Default progress bar
export const Default = () => (
  <ProgressContainer>
    <Progress value={60} />
  </ProgressContainer>
);

// Color variants
export const Colors = () => (
  <ProgressContainer>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <h4 style={{ color: '#fff', marginBottom: '0.5rem' }}>Standard Colors</h4>
        <Progress value={80} color="primary" />
        <div style={{ height: '0.5rem' }} />
        <Progress value={70} color="info" />
        <div style={{ height: '0.5rem' }} />
        <Progress value={90} color="success" />
        <div style={{ height: '0.5rem' }} />
        <Progress value={30} color="warning" />
        <div style={{ height: '0.5rem' }} />
        <Progress value={50} color="danger" />
      </div>
      
      <div style={{ marginTop: '1rem' }}>
        <h4 style={{ color: '#fff', marginBottom: '0.5rem' }}>Security Levels</h4>
        <Progress value={95} color="critical" variant="security" />
        <div style={{ height: '0.5rem' }} />
        <Progress value={75} color="high" variant="security" />
        <div style={{ height: '0.5rem' }} />
        <Progress value={50} color="medium" variant="security" />
        <div style={{ height: '0.5rem' }} />
        <Progress value={25} color="low" variant="security" />
      </div>
    </div>
  </ProgressContainer>
);

// Visual variants
export const Variants = () => (
  <ProgressContainer>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h4 style={{ color: '#fff', marginBottom: '0.5rem' }}>Default</h4>
        <Progress value={75} color="primary" />
      </div>
      
      <div>
        <h4 style={{ color: '#fff', marginBottom: '0.5rem' }}>Security</h4>
        <Progress value={75} color="high" variant="security" />
      </div>
      
      <div>
        <h4 style={{ color: '#fff', marginBottom: '0.5rem' }}>Terminal</h4>
        <Progress value={75} color="primary" variant="terminal" />
      </div>
    </div>
  </ProgressContainer>
);

// Size variations
export const Sizes = () => (
  <ProgressContainer>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h4 style={{ color: '#fff', marginBottom: '0.5rem' }}>Thin</h4>
        <Progress value={60} size="thin" variant="security" />
      </div>
      
      <div>
        <h4 style={{ color: '#fff', marginBottom: '0.5rem' }}>Default</h4>
        <Progress value={60} variant="security" />
      </div>
      
      <div>
        <h4 style={{ color: '#fff', marginBottom: '0.5rem' }}>Thick</h4>
        <Progress value={60} size="thick" variant="security" />
      </div>
    </div>
  </ProgressContainer>
);

// Patterns and animations
export const Patterns = () => (
  <ProgressContainer>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h4 style={{ color: '#fff', marginBottom: '0.5rem' }}>Solid</h4>
        <Progress value={75} variant="security" color="high" />
      </div>
      
      <div>
        <h4 style={{ color: '#fff', marginBottom: '0.5rem' }}>Striped</h4>
        <Progress value={75} variant="security" color="high" striped />
      </div>
      
      <div>
        <h4 style={{ color: '#fff', marginBottom: '0.5rem' }}>Animated Stripes</h4>
        <Progress value={75} variant="security" color="high" striped animated />
      </div>
    </div>
  </ProgressContainer>
);

// Interactive demo
export const Interactive = () => {
  const [progress, setProgress] = React.useState(0);
  const [isRunning, setIsRunning] = React.useState(false);
  
  React.useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setIsRunning(false);
            return 100;
          }
          return prev + 1;
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isRunning]);
  
  return (
    <ProgressContainer>
      <div style={{ marginBottom: '1rem' }}>
        <Progress 
          value={progress} 
          variant="security" 
          color="high" 
          striped={progress < 100} 
          animated={progress < 100}
        />
      </div>
      
      <div style={{ display: 'flex', gap: '1rem' }}>
        <button
          onClick={() => {
            setProgress(0);
            setIsRunning(true);
          }}
          style={{
            padding: '8px 16px',
            background: 'var(--color-cyan, #64ffda)',
            color: 'var(--color-navy, #0a192f)',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Start
        </button>
        
        <button
          onClick={() => setIsRunning(false)}
          style={{
            padding: '8px 16px',
            background: 'transparent',
            color: 'var(--color-cyan, #64ffda)',
            border: '1px solid var(--color-cyan, #64ffda)',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Pause
        </button>
      </div>
      
      <div style={{ 
        marginTop: '1rem',
        padding: '1rem',
        background: 'rgba(100, 255, 218, 0.1)',
        border: '1px solid var(--color-cyan, #64ffda)',
        borderRadius: '4px',
        color: '#fff'
      }}>
        Progress: {progress}%
      </div>
    </ProgressContainer>
  );
};

// Loading states example
export const LoadingStates = () => (
  <ProgressContainer>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h4 style={{ color: '#fff', marginBottom: '0.5rem' }}>File Upload</h4>
        <Progress 
          value={85} 
          variant="security" 
          color="info" 
          striped 
          animated 
        />
        <div style={{ color: '#64ffda', marginTop: '0.5rem', fontSize: '0.875rem' }}>
          Uploading: 85/100 MB
        </div>
      </div>
      
      <div>
        <h4 style={{ color: '#fff', marginBottom: '0.5rem' }}>Security Scan</h4>
        <Progress 
          value={60} 
          variant="terminal" 
          color="high" 
          striped 
          animated 
        />
        <div style={{ color: '#64ffda', marginTop: '0.5rem', fontSize: '0.875rem' }}>
          Scanning system files...
        </div>
      </div>
      
      <div>
        <h4 style={{ color: '#fff', marginBottom: '0.5rem' }}>Download</h4>
        <Progress 
          value={100} 
          variant="security" 
          color="success" 
        />
        <div style={{ color: '#64ffda', marginTop: '0.5rem', fontSize: '0.875rem' }}>
          Download complete!
        </div>
      </div>
    </div>
  </ProgressContainer>
);

// Responsive example
export const Responsive = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
    <div>
      <h3 style={{ color: '#fff', marginBottom: '1rem' }}>Desktop View</h3>
      <ProgressContainer>
        <Progress 
          value={75} 
          variant="security" 
          color="high" 
          size="thick" 
          striped 
        />
      </ProgressContainer>
    </div>
    
    <div>
      <h3 style={{ color: '#fff', marginBottom: '1rem' }}>Mobile View</h3>
      <ProgressContainer style={{ maxWidth: '300px' }}>
        <Progress 
          value={75} 
          variant="security" 
          color="high" 
          size="thin" 
          striped 
        />
      </ProgressContainer>
    </div>
  </div>
); 