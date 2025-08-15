import Timeline from './Timeline';
import TimelineConnector from '@atoms/TimelineConnector';

export default {
  title: 'molecules/Timeline',
  component: Timeline,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Advanced cybersecurity-themed timeline molecule that combines TimelineConnector and TimelineItem atoms. Features multiple layouts including floating cards, traditional timeline, and the new hybrid timeline-cyberpunk layout that combines timeline structure with enhanced cyberpunk effects.'
      }
    }
  },
  argTypes: {
    items: {
      control: 'object',
      description: 'Array of timeline items with security themes'
    },
    layout: {
      control: { type: 'select' },
      options: ['floating', 'traditional', 'timeline-cyberpunk'],
      description: 'Layout type for the timeline display'
    },
    renderItem: {
      control: false,
      description: 'Custom function to render each timeline item'
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes'
    }
  },
  args: {
    layout: 'timeline-cyberpunk',
    className: '',
    items: [
      {
        id: 1,
        title: 'Security Certification Earned',
        description: 'Completed advanced cybersecurity certification program',
        date: '2024-08-01',
        isActive: true
      },
      {
        id: 2,
        title: 'Vulnerability Assessment',
        description: 'Conducted comprehensive security audit of enterprise systems',
        date: '2024-07-15',
        isActive: false
      },
      {
        id: 3,
        title: 'Incident Response',
        description: 'Successfully mitigated critical security breach attempt',
        date: '2024-06-30',
        isActive: true
      }
    ]
  }
};

const Template = (args) => (
  <div className="w-full max-w-6xl mx-auto bg-gray-900 p-8 rounded-lg border border-gray-700 min-h-screen">
    <Timeline {...args} />
  </div>
);

export const Default = Template.bind({});

// NEW: Timeline-Cyberpunk layout showcase
export const TimelineCyberpunk = Template.bind({});
TimelineCyberpunk.args = {
  layout: 'timeline-cyberpunk',
  items: [
    {
      id: 1,
      title: '🔒 Senior Security Engineer',
      description: 'Leading cybersecurity initiatives for enterprise clients. Specializing in threat detection and incident response with advanced AI-driven security platforms.',
      date: '2024 - Present',
      isActive: true,
      variant: 'secure'
    },
    {
      id: 2,
      title: '🛡️ Security Analyst II',
      description: 'Advanced threat hunting and security operations. Developed custom SIEM detection rules and automated incident response workflows.',
      date: '2022 - 2024',
      isActive: false,
      variant: 'default'
    },
    {
      id: 3,
      title: '⚡ Junior Security Analyst',
      description: 'Entry-level security monitoring and incident triage. Gained expertise in security tools, frameworks, and compliance requirements.',
      date: '2020 - 2022',
      isActive: true,
      variant: 'secure'
    },
    {
      id: 4,
      title: '🔧 IT Support Specialist',
      description: 'Technical support and system administration. First exposure to security protocols, compliance frameworks, and enterprise infrastructure.',
      date: '2019 - 2020',
      isActive: false,
      variant: 'default'
    }
  ]
};

export const FloatingLayout = Template.bind({});
FloatingLayout.args = {
  layout: 'floating',
  items: [
    {
      id: 1,
      title: '🔒 System Hardening Complete',
      description: 'Implemented advanced security measures across all endpoints. Multi-factor authentication deployed.',
      date: '2024-08-14 14:30 UTC',
      isActive: true,
      variant: 'secure'
    },
    {
      id: 2,
      title: '⚠️ Suspicious Activity Detected',
      description: 'Anomalous network traffic patterns identified. Automated containment protocols activated.',
      date: '2024-08-14 12:15 UTC',
      isActive: true,
      variant: 'critical'
    },
    {
      id: 3,
      title: '🚨 Breach Attempt Blocked',
      description: 'Attempted unauthorized access from external IP. Firewall rules updated, threat neutralized.',
      date: '2024-08-14 09:45 UTC',
      isActive: true,
      variant: 'breach'
    }
  ]
};

export const TraditionalLayout = Template.bind({});
TraditionalLayout.args = {
  layout: 'traditional',
  items: [
    {
      id: 1,
      title: 'Security Certification Earned',
      description: 'Completed advanced cybersecurity certification program',
      date: '2024-08-01',
      isActive: true
    },
    {
      id: 2,
      title: 'Vulnerability Assessment',
      description: 'Conducted comprehensive security audit of enterprise systems',
      date: '2024-07-15',
      isActive: false
    },
    {
      id: 3,
      title: 'Incident Response',
      description: 'Successfully mitigated critical security breach attempt',
      date: '2024-06-30',
      isActive: false
    }
  ]
};

export const SecurityTimeline = Template.bind({});
SecurityTimeline.args = {
  layout: 'timeline-cyberpunk',
  items: [
    {
      id: 1,
      title: '🔒 System Hardening Complete',
      description: 'Implemented advanced security measures across all endpoints. Multi-factor authentication deployed.',
      date: '2024-08-14 14:30 UTC',
      isActive: true,
      variant: 'secure'
    },
    {
      id: 2,
      title: '⚠️ Suspicious Activity Detected',
      description: 'Anomalous network traffic patterns identified. Automated containment protocols activated.',
      date: '2024-08-14 12:15 UTC',
      isActive: true,
      variant: 'critical'
    },
    {
      id: 3,
      title: '🚨 Breach Attempt Blocked',
      description: 'Attempted unauthorized access from external IP. Firewall rules updated, threat neutralized.',
      date: '2024-08-14 09:45 UTC',
      isActive: true,
      variant: 'breach'
    },
    {
      id: 4,
      title: '✅ Security Scan Passed',
      description: 'Weekly automated security assessment completed. All systems verified secure.',
      date: '2024-08-13 18:00 UTC',
      isActive: false,
      variant: 'secure'
    },
    {
      id: 5,
      title: '🔧 Infrastructure Update',
      description: 'Critical security patches applied across infrastructure. Zero-day vulnerabilities addressed.',
      date: '2024-08-12 22:30 UTC',
      isActive: false,
      variant: 'default'
    }
  ]
};

export const CareerTimeline = Template.bind({});
CareerTimeline.args = {
  layout: 'timeline-cyberpunk',
  items: [
    {
      id: 1,
      title: 'Senior Security Engineer',
      description: 'Leading cybersecurity initiatives for enterprise clients. Specializing in threat detection and incident response.',
      date: '2024 - Present',
      isActive: true
    },
    {
      id: 2,
      title: 'Security Analyst II',
      description: 'Advanced threat hunting and security operations. Developed custom SIEM detection rules.',
      date: '2022 - 2024',
      isActive: false
    },
    {
      id: 3,
      title: 'Junior Security Analyst',
      description: 'Entry-level security monitoring and incident triage. Gained expertise in security tools and frameworks.',
      date: '2020 - 2022',
      isActive: false
    },
    {
      id: 4,
      title: 'IT Support Specialist',
      description: 'Technical support and system administration. First exposure to security protocols and compliance.',
      date: '2019 - 2020',
      isActive: false
    }
  ]
};

export const IncidentResponse = Template.bind({});
IncidentResponse.args = {
  layout: 'timeline-cyberpunk',
  items: [
    {
      id: 1,
      title: 'INCIDENT DETECTED',
      description: 'Automated monitoring systems triggered high-priority alert for potential data exfiltration attempt.',
      date: '09:15:32 UTC',
      isActive: true,
      variant: 'breach'
    },
    {
      id: 2,
      title: 'RESPONSE TEAM ACTIVATED',
      description: 'Security team assembled. Initial containment measures deployed. Affected systems isolated.',
      date: '09:18:45 UTC',
      isActive: true,
      variant: 'critical'
    },
    {
      id: 3,
      title: 'THREAT ANALYSIS',
      description: 'Forensic analysis initiated. Attack vector identified as compromised user credentials via phishing.',
      date: '09:35:12 UTC',
      isActive: true,
      variant: 'critical'
    },
    {
      id: 4,
      title: 'CONTAINMENT SUCCESS',
      description: 'Malicious activity stopped. No data compromise detected. Affected accounts secured and reset.',
      date: '10:42:08 UTC',
      isActive: true,
      variant: 'secure'
    },
    {
      id: 5,
      title: 'SYSTEM RECOVERY',
      description: 'All systems restored to normal operation. Additional monitoring implemented for 48 hours.',
      date: '11:15:23 UTC',
      isActive: false,
      variant: 'secure'
    }
  ]
};

const CustomRenderTemplate = (args) => {
  const customRenderItem = (item, index) => (
    <div className={`
      p-6 rounded-lg border-2 transition-all duration-300
      ${item.variant === 'secure' ? 'border-green-400/30 bg-green-900/10' :
        item.variant === 'breach' ? 'border-red-400/30 bg-red-900/10' :
        item.variant === 'critical' ? 'border-yellow-400/30 bg-yellow-900/10' :
        'border-theme-cyan/30 bg-cyan-900/10'
      }
    `}>
      <div className="flex items-start gap-4">
        <div className={`
          w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold
          ${item.variant === 'secure' ? 'bg-green-400 text-green-900' :
            item.variant === 'breach' ? 'bg-red-400 text-red-900' :
            item.variant === 'critical' ? 'bg-yellow-400 text-yellow-900' :
            'bg-theme-cyan text-cyan-900'
          }
        `}>
          {item.variant === 'secure' ? '✓' :
           item.variant === 'breach' ? '⚠' :
           item.variant === 'critical' ? '!' :
           '●'}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className={`
              font-bold text-lg
              ${item.variant === 'secure' ? 'text-green-400' :
                item.variant === 'breach' ? 'text-red-400' :
                item.variant === 'critical' ? 'text-yellow-400' :
                'text-theme-cyan'
              }
            `}>
              {item.title}
            </h3>
            <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">
              {item.date}
            </span>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed mb-3">
            {item.description}
          </p>
          <div className="flex gap-2">
            <span className={`
              px-2 py-1 text-xs rounded font-medium
              ${item.variant === 'secure' ? 'bg-green-900 text-green-200' :
                item.variant === 'breach' ? 'bg-red-900 text-red-200' :
                item.variant === 'critical' ? 'bg-yellow-900 text-yellow-200' :
                'bg-cyan-900 text-cyan-200'
              }
            `}>
              {item.variant?.toUpperCase() || 'EVENT'}
            </span>
            <span className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded font-medium">
              AUTO-LOGGED
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-6xl mx-auto bg-gray-900 p-8 rounded-lg border border-gray-700 min-h-screen">
      <Timeline {...args} renderItem={customRenderItem} />
    </div>
  );
};

export const CustomRendering = CustomRenderTemplate.bind({});
CustomRendering.args = {
  layout: 'timeline-cyberpunk',
  items: [
    {
      id: 1,
      title: 'Network Intrusion Detected',
      description: 'Advanced persistent threat identified attempting lateral movement through internal network segments.',
      date: '2024-08-14 15:42:18',
      variant: 'breach',
      isActive: true
    },
    {
      id: 2,
      title: 'Automated Response Triggered',
      description: 'Security orchestration platform executed containment protocols. Affected network segments isolated.',
      date: '2024-08-14 15:42:35',
      variant: 'critical',
      isActive: true
    },
    {
      id: 3,
      title: 'Threat Neutralized',
      description: 'Malicious activity eliminated. Network integrity restored. Additional monitoring deployed.',
      date: '2024-08-14 16:15:22',
      variant: 'secure',
      isActive: false
    }
  ]
};

export const MinimalTimeline = Template.bind({});
MinimalTimeline.args = {
  layout: 'floating',
  items: [
    {
      id: 1,
      title: 'System Alert',
      description: 'Routine security check completed',
      date: 'Today',
      isActive: true
    },
    {
      id: 2,
      title: 'Update Deployed',
      description: 'Security patches applied successfully',
      date: 'Yesterday',
      isActive: false
    }
  ]
};

export const Playground = Template.bind({});
Playground.args = {
  layout: 'timeline-cyberpunk',
  items: [
    {
      id: 1,
      title: 'Customize This Timeline',
      description: 'Use the controls panel to modify timeline properties and see changes in real-time.',
      date: 'Now',
      isActive: true
    }
  ]
};