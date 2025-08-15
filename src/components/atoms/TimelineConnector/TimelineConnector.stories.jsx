import TimelineConnector from './TimelineConnector';

export default {
  title: 'atoms/TimelineConnector',
  component: TimelineConnector,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Advanced cybersecurity-themed timeline connector with multiple variants, animations, and security status indicators. Features data flow animations, scanning effects, and network connection visualizations.'
      }
    }
  },
  argTypes: {
    isFirst: {
      control: 'boolean',
      description: 'Whether this is the first item (no line above)'
    },
    isLast: {
      control: 'boolean',
      description: 'Whether this is the last item (no line below)'
    },
    isActive: {
      control: 'boolean',
      description: 'Whether this connector is active/highlighted with enhanced effects'
    },
    variant: {
      control: 'select',
      options: ['default', 'secure', 'breach', 'critical'],
      description: 'Security status variant affecting colors and indicators'
    },
    pulsing: {
      control: 'boolean',
      description: 'Whether to show security scanning pulse effects'
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes'
    }
  },
  args: {
    isFirst: false,
    isLast: false,
    isActive: false,
    variant: 'default',
    pulsing: false,
    className: ''
  }
};

const Template = (args) => (
  <div className="w-full max-w-lg mx-auto bg-gray-900 p-8 rounded-lg border border-gray-700">
    <div className="flex justify-center">
      <TimelineConnector {...args} />
    </div>
  </div>
);

export const Default = Template.bind({});

export const DefaultActive = Template.bind({});
DefaultActive.args = {
  isActive: true
};

export const SecureConnector = Template.bind({});
SecureConnector.args = {
  variant: 'secure',
  isActive: true
};

export const BreachConnector = Template.bind({});
BreachConnector.args = {
  variant: 'breach',
  isActive: true
};

export const CriticalConnector = Template.bind({});
CriticalConnector.args = {
  variant: 'critical',
  isActive: true
};

export const ScanningConnector = Template.bind({});
ScanningConnector.args = {
  isActive: true,
  pulsing: true,
  variant: 'secure'
};

export const FirstConnector = Template.bind({});
FirstConnector.args = {
  isFirst: true,
  isActive: true,
  variant: 'secure'
};

export const LastConnector = Template.bind({});
LastConnector.args = {
  isLast: true,
  isActive: true,
  variant: 'breach'
};

export const SingleItem = Template.bind({});
SingleItem.args = {
  isFirst: true,
  isLast: true,
  isActive: true,
  variant: 'critical',
  pulsing: true
};

const SecurityTimelineTemplate = (args) => (
  <div className="w-full max-w-2xl mx-auto bg-gray-900 p-8 rounded-lg border border-gray-700">
    <div className="space-y-4">
      <h3 className="text-theme-cyan text-center mb-6 font-bold">🔒 Security Timeline</h3>
      <div className="flex justify-center">
        <div className="flex flex-col space-y-1">
          <TimelineConnector isFirst={true} variant="secure" isActive={true} pulsing={false} />
          <TimelineConnector variant="secure" isActive={false} />
          <TimelineConnector variant="critical" isActive={true} pulsing={true} />
          <TimelineConnector variant="breach" isActive={true} />
          <TimelineConnector isLast={true} variant="secure" isActive={false} />
        </div>
      </div>
    </div>
  </div>
);

export const SecurityTimeline = SecurityTimelineTemplate.bind({});
SecurityTimeline.parameters = {
  docs: {
    description: {
      story: 'Complete security timeline showing different threat levels and security states with various connectors.'
    }
  }
};

const NetworkStatusTemplate = (args) => (
  <div className="w-full max-w-3xl mx-auto bg-gray-900 p-8 rounded-lg border border-gray-700">
    <div className="space-y-6">
      <h3 className="text-theme-cyan text-center mb-6 font-bold">🌐 Network Status Monitor</h3>
      <div className="grid grid-cols-4 gap-8">
        <div className="text-center">
          <TimelineConnector variant="secure" isActive={true} pulsing={false} isFirst={true} isLast={true} />
          <div className="text-green-400 text-xs mt-2">Secure</div>
        </div>
        <div className="text-center">
          <TimelineConnector variant="critical" isActive={true} pulsing={true} isFirst={true} isLast={true} />
          <div className="text-yellow-400 text-xs mt-2">Warning</div>
        </div>
        <div className="text-center">
          <TimelineConnector variant="breach" isActive={true} pulsing={false} isFirst={true} isLast={true} />
          <div className="text-red-400 text-xs mt-2">Breach</div>
        </div>
        <div className="text-center">
          <TimelineConnector variant="default" isActive={true} pulsing={true} isFirst={true} isLast={true} />
          <div className="text-theme-cyan text-xs mt-2">Scanning</div>
        </div>
      </div>
    </div>
  </div>
);

export const NetworkStatus = NetworkStatusTemplate.bind({});
NetworkStatus.parameters = {
  docs: {
    description: {
      story: 'Network security status indicators showing different security states and active monitoring.'
    }
  }
};

const DataFlowTemplate = (args) => (
  <div className="w-full max-w-lg mx-auto bg-gray-900 p-8 rounded-lg border border-gray-700">
    <div className="space-y-4">
      <h3 className="text-theme-cyan text-center mb-6 font-bold">💾 Data Flow</h3>
      <div className="flex justify-center">
        <div className="flex flex-col">
          <TimelineConnector isFirst={true} variant="default" isActive={true} pulsing={false} />
          <TimelineConnector variant="secure" isActive={true} pulsing={true} />
          <TimelineConnector variant="default" isActive={true} pulsing={false} />
          <TimelineConnector variant="secure" isActive={true} pulsing={true} />
          <TimelineConnector isLast={true} variant="default" isActive={true} pulsing={false} />
        </div>
      </div>
      <p className="text-gray-400 text-xs text-center">Active data transmission with security checks</p>
    </div>
  </div>
);

export const DataFlow = DataFlowTemplate.bind({});
DataFlow.parameters = {
  docs: {
    description: {
      story: 'Data flow visualization with alternating security checks and transmission states.'
    }
  }
};

export const Playground = Template.bind({});
Playground.args = {
  isFirst: false,
  isLast: false,
  isActive: true,
  variant: 'default',
  pulsing: false,
  className: ''
};