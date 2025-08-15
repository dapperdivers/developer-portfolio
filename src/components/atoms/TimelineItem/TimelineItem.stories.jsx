import TimelineItem from './TimelineItem';

export default {
  title: 'atoms/TimelineItem',
  component: TimelineItem,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Advanced cybersecurity-themed timeline item with security variants, scanning animations, network grid overlays, and interactive status indicators. Perfect for displaying security events, threat timelines, and system monitoring data.'
      }
    }
  },
  argTypes: {
    isLeft: {
      control: 'boolean',
      description: 'Whether content should align to the left'
    },
    isActive: {
      control: 'boolean', 
      description: 'Whether this item is active/highlighted with enhanced security effects'
    },
    variant: {
      control: 'select',
      options: ['default', 'secure', 'breach', 'critical'],
      description: 'Security status variant affecting colors, borders, and indicators'
    },
    isScanning: {
      control: 'boolean',
      description: 'Whether to show security scanning line animation'
    },
    hasGlow: {
      control: 'boolean',
      description: 'Whether to show glowing border and shadow effects'
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes'
    },
    children: {
      control: 'text',
      description: 'Content to display inside the timeline item'
    }
  },
  args: {
    isLeft: false,
    isActive: false,
    variant: 'default',
    isScanning: false,
    hasGlow: false,
    className: '',
    children: 'Timeline content goes here'
  }
};

const Template = (args) => (
  <div className="w-full max-w-3xl mx-auto bg-gray-900 p-8 rounded-lg border border-gray-700">
    <TimelineItem {...args}>
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
        <div className="flex items-center gap-3 mb-3">
          <div className={`w-3 h-3 rounded-full ${
            args.variant === 'secure' ? 'bg-green-400' :
            args.variant === 'breach' ? 'bg-red-400' :
            args.variant === 'critical' ? 'bg-yellow-400' :
            'bg-theme-cyan'
          }`} />
          <h3 className="text-white font-semibold">Security Event</h3>
        </div>
        <p className="text-gray-300 text-sm mb-3">
          {typeof args.children === 'string' ? args.children : 'This is sample timeline content with security-related information.'}
        </p>
        <div className="flex gap-2 mb-2">
          <span className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">EVENT</span>
          <span className={`px-2 py-1 text-xs rounded ${
            args.variant === 'secure' ? 'bg-green-900 text-green-200' :
            args.variant === 'breach' ? 'bg-red-900 text-red-200' :
            args.variant === 'critical' ? 'bg-yellow-900 text-yellow-200' :
            'bg-cyan-900 text-cyan-200'
          }`}>
            {args.variant.toUpperCase()}
          </span>
        </div>
        <span className="text-xs text-gray-500">2024-08-14 12:34:56 UTC</span>
      </div>
    </TimelineItem>
  </div>
);

export const Default = Template.bind({});

export const DefaultActive = Template.bind({});
DefaultActive.args = {
  isActive: true,
  hasGlow: true
};

export const SecureEvent = Template.bind({});
SecureEvent.args = {
  variant: 'secure',
  isActive: true,
  hasGlow: true,
  children: 'Security validation passed - all systems secure'
};

export const BreachDetected = Template.bind({});
BreachDetected.args = {
  variant: 'breach',
  isActive: true,
  hasGlow: true,
  isScanning: true,
  children: 'ALERT: Unauthorized access attempt detected'
};

export const CriticalThreat = Template.bind({});
CriticalThreat.args = {
  variant: 'critical',
  isActive: true,
  hasGlow: true,
  isScanning: true,
  children: 'CRITICAL: System vulnerability requires immediate attention'
};

export const LeftAligned = Template.bind({});
LeftAligned.args = {
  isLeft: true,
  variant: 'secure',
  isActive: true,
  children: 'Left-aligned security event with full effects'
};

const SecurityDashboardTemplate = (args) => (
  <div className="w-full max-w-4xl mx-auto bg-gray-900 p-8 rounded-lg border border-gray-700">
    <div className="space-y-6">
      <h3 className="text-theme-cyan text-center mb-6 font-bold text-xl">🛡️ Security Event Timeline</h3>
      <div className="space-y-4">
        <TimelineItem variant="secure" isActive={true} hasGlow={true}>
          <div className="bg-gray-800 p-6 rounded-lg border border-green-400/20">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse" />
              <h4 className="text-green-400 font-semibold">Security Scan Complete</h4>
            </div>
            <p className="text-gray-300 text-sm mb-3">System integrity verified - no threats detected</p>
            <div className="flex gap-2 mb-2">
              <span className="px-2 py-1 bg-green-900 text-green-200 text-xs rounded">PASSED</span>
              <span className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">AUTO-SCAN</span>
            </div>
            <span className="text-xs text-gray-500">2024-08-14 14:30:15 UTC</span>
          </div>
        </TimelineItem>
        
        <TimelineItem variant="critical" isActive={true} hasGlow={true} isScanning={true} isLeft={true}>
          <div className="bg-gray-800 p-6 rounded-lg border border-yellow-400/20">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-4 h-4 bg-yellow-400 rounded-full animate-pulse" />
              <h4 className="text-yellow-400 font-semibold">Suspicious Activity Detected</h4>
            </div>
            <p className="text-gray-300 text-sm mb-3">Multiple failed login attempts from IP 192.168.1.100</p>
            <div className="flex gap-2 mb-2">
              <span className="px-2 py-1 bg-yellow-900 text-yellow-200 text-xs rounded">WARNING</span>
              <span className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">AUTH</span>
            </div>
            <span className="text-xs text-gray-500">2024-08-14 13:45:32 UTC</span>
          </div>
        </TimelineItem>
        
        <TimelineItem variant="breach" isActive={true} hasGlow={true} isScanning={true}>
          <div className="bg-gray-800 p-6 rounded-lg border border-red-400/20">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-4 h-4 bg-red-400 rounded-full animate-pulse" />
              <h4 className="text-red-400 font-semibold">Security Breach Attempt</h4>
            </div>
            <p className="text-gray-300 text-sm mb-3">Unauthorized access blocked - firewall rules updated</p>
            <div className="flex gap-2 mb-2">
              <span className="px-2 py-1 bg-red-900 text-red-200 text-xs rounded">BLOCKED</span>
              <span className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">FIREWALL</span>
            </div>
            <span className="text-xs text-gray-500">2024-08-14 12:15:08 UTC</span>
          </div>
        </TimelineItem>
      </div>
    </div>
  </div>
);

export const SecurityDashboard = SecurityDashboardTemplate.bind({});
SecurityDashboard.parameters = {
  docs: {
    description: {
      story: 'Complete security dashboard showing various timeline items with different security states, scanning animations, and glow effects.'
    }
  }
};

const NetworkMonitorTemplate = (args) => (
  <div className="w-full max-w-5xl mx-auto bg-gray-900 p-8 rounded-lg border border-gray-700">
    <div className="space-y-6">
      <h3 className="text-theme-cyan text-center mb-6 font-bold text-xl">🌐 Network Monitoring</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TimelineItem variant="default" isActive={true} hasGlow={true} isScanning={true}>
          <div className="bg-gray-800 p-4 rounded-lg border border-theme-cyan/20">
            <h4 className="text-theme-cyan font-semibold mb-2">Data Transfer</h4>
            <p className="text-gray-300 text-xs">Active connection monitoring...</p>
            <div className="mt-2">
              <div className="w-full bg-gray-700 rounded-full h-1">
                <div className="bg-theme-cyan h-1 rounded-full w-3/4"></div>
              </div>
            </div>
          </div>
        </TimelineItem>
        
        <TimelineItem variant="secure" isActive={true} hasGlow={true} isLeft={true}>
          <div className="bg-gray-800 p-4 rounded-lg border border-green-400/20">
            <h4 className="text-green-400 font-semibold mb-2">Encryption Status</h4>
            <p className="text-gray-300 text-xs">All connections secured</p>
            <div className="flex gap-1 mt-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            </div>
          </div>
        </TimelineItem>
      </div>
    </div>
  </div>
);

export const NetworkMonitor = NetworkMonitorTemplate.bind({});
NetworkMonitor.parameters = {
  docs: {
    description: {
      story: 'Network monitoring dashboard with active scanning and secure connection indicators.'
    }
  }
};

export const Playground = Template.bind({});
Playground.args = {
  isLeft: false,
  isActive: true,
  variant: 'default',
  isScanning: false,
  hasGlow: true,
  className: '',
  children: 'Customize this timeline item using the controls panel'
};