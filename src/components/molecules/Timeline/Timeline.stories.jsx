import React from 'react';
import Timeline from './Timeline';

// Mock experience data for stories
const mockExperiences = [
  {
    role: "Staff Product Security Engineer",
    company: "Mastery Logistics Systems",
    companylogo: "https://ui-avatars.com/api/?name=MLS&background=3563E9&color=fff&bold=true",
    date: "July 2023 – Present",
    url: "https://www.masterylogistics.com",
    desc: "Leading the technical direction of a newly formed product security team, creating and implementing comprehensive vulnerability management programs for the organization.",
    descBullets: [
      "Developed organization-wide vulnerability aggregation system combining open-source and commercial security tools",
      "Built Power BI dashboards for security metrics and vulnerability visualization to improve visibility of security posture",
      "Created security automation with GitHub Actions to check PRs for secrets, vulnerable packages, and outdated base images"
    ]
  },
  {
    role: "Senior Software Engineering Manager",
    company: "Mastery Logistics Systems",
    companylogo: "https://ui-avatars.com/api/?name=MLS&background=3563E9&color=fff&bold=true",
    date: "May 2022 – July 2023",
    url: "https://www.masterylogistics.com",
    desc: "Managed a team of 8 engineers across multiple product development initiatives, focusing on scalability and security improvements.",
    descBullets: [
      "Led team through major architecture redesign improving system performance by 40%",
      "Implemented DevSecOps practices reducing security vulnerabilities by 60%",
      "Established coding standards and review processes enhancing code quality"
    ]
  },
  {
    role: "Lead Software Engineer",
    company: "TechCorp Solutions",
    companylogo: "https://ui-avatars.com/api/?name=TC&background=22c55e&color=fff&bold=true",
    date: "January 2020 – May 2022",
    url: "https://www.techcorp.com",
    desc: "Led development of cloud-native applications with focus on security and scalability for enterprise clients.",
    descBullets: [
      "Architected microservices infrastructure serving 1M+ daily active users",
      "Implemented zero-trust security model reducing security incidents by 80%",
      "Mentored junior developers and established team best practices"
    ]
  }
];

export default {
  title: 'molecules/Timeline',
  component: Timeline,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `Enhanced Timeline component with cyberpunk visual effects and easter eggs. Features include:

**Easter Eggs & Secrets:**
- Konami Code (↑↑↓↓←→←→BA) - Activates Matrix Mode
- Ctrl+Shift+D - Developer Mode with glitch effects
- Alt+H - Hacker Mode with enhanced animations
- Triple-click cards - Screen shake effect
- Quintuple-click cards - Reality.exe has stopped working
- Time-based effects (different at night, lunch, work hours)
- Mouse trail effects in special modes

**Visual Enhancements:**
- Matrix-style falling characters
- Glitch animations and overlays
- Holographic effects
- Pulse rings and breathing animations
- Enhanced data streams and particles
- Sound effects using Web Audio API
- Achievement system with notifications
- Radar sweep and scan line effects`
      }
    }
  },
  argTypes: {
    experiences: {
      description: 'Array of experience objects to display',
      control: { type: 'object' }
    },
    expandedCards: {
      description: 'Set of indices for expanded cards',
      control: { type: 'object' }
    },
    onCardToggle: {
      description: 'Function called when a card is toggled',
      action: 'cardToggled'
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'secure', 'breach', 'critical'],
      description: 'Visual variant for cybersecurity theming'
    },
    className: {
      control: { type: 'text' },
      description: 'Additional CSS classes'
    }
  }
};

// Template wrapper for consistent styling
const Template = (args) => (
  <div className="w-full max-w-6xl mx-auto bg-gray-900 p-8 rounded-lg border border-gray-700 min-h-screen">
    <Timeline {...args} />
  </div>
);

// Enhanced template with instructions
const EnhancedTemplate = (args) => (
  <div className="w-full max-w-6xl mx-auto bg-gray-900 p-8 rounded-lg border border-gray-700 min-h-screen">
    <div className="mb-6 p-4 bg-gray-800 rounded border border-gray-600">
      <h3 className="text-theme-cyan font-bold mb-2">🎮 Easter Eggs & Controls</h3>
      <div className="text-sm text-gray-300 space-y-1">
        <p><kbd className="bg-gray-700 px-2 py-1 rounded">Konami Code</kbd> (↑↑↓↓←→←→BA) - Matrix Mode</p>
        <p><kbd className="bg-gray-700 px-2 py-1 rounded">Ctrl+Shift+D</kbd> - Developer Mode</p>
        <p><kbd className="bg-gray-700 px-2 py-1 rounded">Alt+H</kbd> - Hacker Mode</p>
        <p><kbd className="bg-gray-700 px-2 py-1 rounded">Triple-click</kbd> cards for screen shake</p>
        <p><kbd className="bg-gray-700 px-2 py-1 rounded">5x click</kbd> cards to break reality</p>
      </div>
    </div>
    <Timeline {...args} />
  </div>
);

// Default story
export const Default = Template.bind({});
Default.args = {
  experiences: mockExperiences,
  expandedCards: new Set([0]),
  variant: 'default'
};

// Secure variant
export const Secure = Template.bind({});
Secure.args = {
  experiences: mockExperiences,
  expandedCards: new Set([0, 1]),
  variant: 'secure'
};
Secure.parameters = {
  docs: {
    description: {
      story: 'Timeline with secure variant styling, showing green cybersecurity theming with enhanced particle effects.'
    }
  }
};

// Breach variant
export const Breach = Template.bind({});
Breach.args = {
  experiences: mockExperiences,
  expandedCards: new Set([1, 2]),
  variant: 'breach'
};
Breach.parameters = {
  docs: {
    description: {
      story: 'Timeline with breach variant styling, showing red alert theming with intensified animations and faster pulse effects.'
    }
  }
};

// Critical variant
export const Critical = Template.bind({});
Critical.args = {
  experiences: mockExperiences,
  expandedCards: new Set([0, 1, 2]),
  variant: 'critical'
};
Critical.parameters = {
  docs: {
    description: {
      story: 'Timeline with critical variant styling, showing yellow warning theming with enhanced radar and security scan effects.'
    }
  }
};

// Enhanced interactive playground with easter eggs
export const EasterEggPlayground = {
  args: {
    experiences: mockExperiences,
    expandedCards: new Set([0]),
    variant: 'default'
  },
  parameters: {
    docs: {
      description: {
        story: `Interactive timeline showcasing all easter eggs and special effects. 

**Try these:**
- Use the Konami Code (↑↑↓↓←→←→BA) to activate Matrix Mode
- Press Ctrl+Shift+D for Developer Mode with glitch effects
- Press Alt+H for Hacker Mode with enhanced animations
- Triple-click any card for screen shake
- Click any card 5 times to break reality
- Move your mouse around in special modes for trail effects
- Notice different effects based on time of day

**Achievement System:**
- Konami Master (complete Konami code)
- Developer Mode (activate developer mode)
- Hacker Mode (activate hacker mode)  
- Triple Clicker (triple-click a card)
- Reality Breaker (quintuple-click a card)

**Visual Effects:**
- Matrix rain animation
- Glitch overlays and distortions
- Holographic card effects
- Enhanced particle systems
- Pulse rings and breathing animations
- Radar sweeps and scan lines
- Sound effects on interactions`
      }
    }
  },
  render: (args) => {
    const [expandedCards, setExpandedCards] = React.useState(new Set([0]));
    
    const handleCardToggle = (index) => {
      setExpandedCards(prev => {
        const newSet = new Set(prev);
        if (newSet.has(index)) {
          newSet.delete(index);
        } else {
          newSet.add(index);
        }
        return newSet;
      });
    };

    return <EnhancedTemplate {...args} expandedCards={expandedCards} onCardToggle={handleCardToggle} />;
  }
};

// Matrix mode demonstration
export const MatrixMode = {
  args: {
    experiences: mockExperiences,
    expandedCards: new Set([0, 1]),
    variant: 'default'
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstration of Matrix Mode effects with falling green characters, enhanced particles, and cyberpunk aesthetics. This mode is normally activated with the Konami Code.'
      }
    }
  },
  render: (args) => {
    // Pre-activate matrix mode for demonstration
    const [expandedCards, setExpandedCards] = React.useState(new Set([0, 1]));
    
    const handleCardToggle = (index) => {
      setExpandedCards(prev => {
        const newSet = new Set(prev);
        if (newSet.has(index)) {
          newSet.delete(index);
        } else {
          newSet.add(index);
        }
        return newSet;
      });
    };

    return (
      <div className="w-full max-w-6xl mx-auto bg-gray-900 p-8 rounded-lg border border-gray-700 min-h-screen timeline--matrix">
        <div className="mb-4 p-3 bg-green-900/30 border border-green-400/30 rounded text-green-400 font-mono text-sm">
          ⚡ MATRIX MODE ACTIVATED - Enhanced cyberpunk effects enabled
        </div>
        <Timeline {...args} expandedCards={expandedCards} onCardToggle={handleCardToggle} className="timeline--matrix" />
      </div>
    );
  }
};

// Hacker mode demonstration
export const HackerMode = {
  args: {
    experiences: mockExperiences,
    expandedCards: new Set([1, 2]),
    variant: 'breach'
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstration of Hacker Mode with enhanced animations, 3D effects, rotating elements, and cybersecurity scan effects. This mode is normally activated with Alt+H.'
      }
    }
  },
  render: (args) => {
    const [expandedCards, setExpandedCards] = React.useState(new Set([1, 2]));
    
    const handleCardToggle = (index) => {
      setExpandedCards(prev => {
        const newSet = new Set(prev);
        if (newSet.has(index)) {
          newSet.delete(index);
        } else {
          newSet.add(index);
        }
        return newSet;
      });
    };

    return (
      <div className="w-full max-w-6xl mx-auto bg-gray-900 p-8 rounded-lg border border-gray-700 min-h-screen timeline--hack">
        <div className="mb-4 p-3 bg-red-900/30 border border-red-400/30 rounded text-red-400 font-mono text-sm">
          🔴 HACKER MODE ACTIVATED - Enhanced security protocols engaged
        </div>
        <Timeline {...args} expandedCards={expandedCards} onCardToggle={handleCardToggle} className="timeline--hack" />
      </div>
    );
  }
};

// Glitch mode demonstration
export const GlitchMode = {
  args: {
    experiences: mockExperiences,
    expandedCards: new Set([0, 2]),
    variant: 'critical'
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstration of Developer/Glitch Mode with visual distortions, color shifts, and glitch overlays. This mode is normally activated with Ctrl+Shift+D.'
      }
    }
  },
  render: (args) => {
    const [expandedCards, setExpandedCards] = React.useState(new Set([0, 2]));
    
    const handleCardToggle = (index) => {
      setExpandedCards(prev => {
        const newSet = new Set(prev);
        if (newSet.has(index)) {
          newSet.delete(index);
        } else {
          newSet.add(index);
        }
        return newSet;
      });
    };

    return (
      <div className="w-full max-w-6xl mx-auto bg-gray-900 p-8 rounded-lg border border-gray-700 min-h-screen timeline--glitch">
        <div className="mb-4 p-3 bg-yellow-900/30 border border-yellow-400/30 rounded text-yellow-400 font-mono text-sm">
          ⚠️ DEVELOPER MODE ACTIVATED - System diagnostics enabled
        </div>
        <Timeline {...args} expandedCards={expandedCards} onCardToggle={handleCardToggle} className="timeline--glitch" />
      </div>
    );
  }
};

// Empty state
export const Empty = Template.bind({});
Empty.args = {
  experiences: [],
  expandedCards: new Set(),
  variant: 'default'
};
Empty.parameters = {
  docs: {
    description: {
      story: 'Timeline component with no experiences to display, showing the empty state message.'
    }
  }
};

// Interactive playground
export const Interactive = {
  args: {
    experiences: mockExperiences,
    expandedCards: new Set([0]),
    variant: 'default'
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive timeline where you can toggle card expansion and change variants. Click cards to expand/collapse them and watch the enhanced animations.'
      }
    }
  },
  render: (args) => {
    const [expandedCards, setExpandedCards] = React.useState(new Set([0]));
    
    const handleCardToggle = (index) => {
      setExpandedCards(prev => {
        const newSet = new Set(prev);
        if (newSet.has(index)) {
          newSet.delete(index);
        } else {
          newSet.add(index);
        }
        return newSet;
      });
    };

    return <Template {...args} expandedCards={expandedCards} onCardToggle={handleCardToggle} />;
  }
};

// Single experience
export const SingleExperience = Template.bind({});
SingleExperience.args = {
  experiences: [mockExperiences[0]],
  expandedCards: new Set([0]),
  variant: 'default'
};
SingleExperience.parameters = {
  docs: {
    description: {
      story: 'Timeline with a single expanded experience entry, showing all enhanced visual effects for individual cards.'
    }
  }
};

// All collapsed
export const AllCollapsed = Template.bind({});
AllCollapsed.args = {
  experiences: mockExperiences,
  expandedCards: new Set(),
  variant: 'default'
};
AllCollapsed.parameters = {
  docs: {
    description: {
      story: 'Timeline with all experience cards in collapsed state, showing the enhanced timeline line with breathing effects and particle animations.'
    }
  }
};

// Performance test with many experiences
export const ManyExperiences = Template.bind({});
ManyExperiences.args = {
  experiences: Array.from({ length: 10 }, (_, i) => ({
    ...mockExperiences[i % 3],
    role: `${mockExperiences[i % 3].role} ${i + 1}`,
    company: `${mockExperiences[i % 3].company} ${i + 1}`,
    date: `202${3 - Math.floor(i / 3)} - 202${4 - Math.floor(i / 3)}`
  })),
  expandedCards: new Set([0, 3, 6]),
  variant: 'default'
};
ManyExperiences.parameters = {
  docs: {
    description: {
      story: 'Performance test with multiple experience entries to verify enhanced animation performance with optimized particle systems and effects.'
    }
  }
};

// Time-based effects demonstration
export const TimeBasedEffects = {
  args: {
    experiences: mockExperiences.slice(0, 2),
    expandedCards: new Set([0]),
    variant: 'default'
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstration of time-based visual effects. The component automatically applies different filters and animations based on the current time of day (night mode, work hours, lunch break).'
      }
    }
  },
  render: (args) => {
    const [timeMode, setTimeMode] = React.useState('work-hours');
    const [expandedCards, setExpandedCards] = React.useState(new Set([0]));
    
    const handleCardToggle = (index) => {
      setExpandedCards(prev => {
        const newSet = new Set(prev);
        if (newSet.has(index)) {
          newSet.delete(index);
        } else {
          newSet.add(index);
        }
        return newSet;
      });
    };

    return (
      <div className="w-full max-w-6xl mx-auto bg-gray-900 p-8 rounded-lg border border-gray-700 min-h-screen">
        <div className="mb-6 p-4 bg-gray-800 rounded border border-gray-600">
          <h3 className="text-theme-cyan font-bold mb-2">🕐 Time-Based Effects</h3>
          <div className="flex gap-2 mb-4">
            <button 
              onClick={() => setTimeMode('work-hours')}
              className={`px-3 py-1 rounded text-sm ${timeMode === 'work-hours' ? 'bg-theme-cyan text-gray-900' : 'bg-gray-700 text-gray-300'}`}
            >
              Work Hours (9-17)
            </button>
            <button 
              onClick={() => setTimeMode('lunch-break')}
              className={`px-3 py-1 rounded text-sm ${timeMode === 'lunch-break' ? 'bg-theme-cyan text-gray-900' : 'bg-gray-700 text-gray-300'}`}
            >
              Lunch Break (12-14)
            </button>
            <button 
              onClick={() => setTimeMode('night-mode')}
              className={`px-3 py-1 rounded text-sm ${timeMode === 'night-mode' ? 'bg-theme-cyan text-gray-900' : 'bg-gray-700 text-gray-300'}`}
            >
              Night Mode (22-06)
            </button>
          </div>
          <p className="text-sm text-gray-400">Different visual filters and effects are applied based on the time of day.</p>
        </div>
        <Timeline 
          {...args} 
          expandedCards={expandedCards} 
          onCardToggle={handleCardToggle}
          className={`timeline--${timeMode}`}
        />
      </div>
    );
  }
};

// New Easter Egg Behavior (3+ clicks to activate, resets on terminal commands)
export const EasterEggBehavior = {
  args: {
    experiences: mockExperiences.slice(0, 2),
    expandedCards: new Set([0]),
    variant: 'default'
  },
  parameters: {
    docs: {
      description: {
        story: `Demonstrates the new easter egg behavior system:

**Requirements:**
- Must click cards at least 3 times before any easter egg activates
- Easter eggs reset back to default after final achievement (3 total)
- Any terminal command resets easter eggs back to pre-activation state

**Easter Egg Progression:**
1. **3 clicks** - Screen shake effect + "AUTHORIZATION REQUIRED"
2. **5 clicks** - Matrix Mode + Reality.exe error
3. **7 clicks** - System Override + auto-reset after 3 achievements

**Terminal Command Reset:**
- Simulated by clicking the "Reset Easter Eggs" button
- In real usage, any terminal command in Experience component triggers reset`
      }
    }
  },
  render: (args) => {
    const [expandedCards, setExpandedCards] = React.useState(new Set([0]));
    const [terminalCommandTrigger, setTerminalCommandTrigger] = React.useState(0);
    const [clickCounts, setClickCounts] = React.useState({});
    
    const handleCardToggle = (index) => {
      setExpandedCards(prev => {
        const newSet = new Set(prev);
        if (newSet.has(index)) {
          newSet.delete(index);
        } else {
          newSet.add(index);
        }
        return newSet;
      });
      
      // Track click counts for display
      setClickCounts(prev => ({
        ...prev,
        [index]: (prev[index] || 0) + 1
      }));
    };

    const resetEasterEggs = () => {
      setTerminalCommandTrigger(prev => prev + 1);
      setClickCounts({});
    };

    return (
      <div className="w-full max-w-6xl mx-auto bg-gray-900 p-8 rounded-lg border border-gray-700 min-h-screen">
        <div className="mb-6 p-4 bg-gray-800 rounded border border-gray-600">
          <h3 className="text-theme-cyan font-bold mb-2">🎮 Easter Egg Behavior Testing</h3>
          
          {/* Click counter display */}
          <div className="mb-4 p-3 bg-gray-700 rounded">
            <h4 className="text-white font-semibold mb-2">Click Counts:</h4>
            {[0, 1].map(index => (
              <div key={index} className="text-sm text-gray-300">
                Card {index + 1}: {clickCounts[index] || 0} clicks
                {clickCounts[index] >= 3 && <span className="text-green-400 ml-2">✓ Easter eggs activated</span>}
                {clickCounts[index] >= 5 && <span className="text-yellow-400 ml-2">✓ Matrix mode</span>}
                {clickCounts[index] >= 7 && <span className="text-red-400 ml-2">✓ System override</span>}
              </div>
            ))}
          </div>
          
          <div className="space-y-2 text-sm text-gray-300">
            <p><strong>Requirements:</strong></p>
            <p>• Must click cards 3+ times before easter eggs activate</p>
            <p>• Progression: 3 clicks = screen shake, 5 = matrix, 7 = override + reset</p>
            <p>• Terminal commands reset all easter eggs to default state</p>
          </div>
          
          <button 
            onClick={resetEasterEggs}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500 font-semibold"
          >
            🔧 Simulate Terminal Command (Reset Easter Eggs)
          </button>
        </div>
        
        <Timeline 
          {...args} 
          expandedCards={expandedCards} 
          onCardToggle={handleCardToggle}
          onTerminalCommand={terminalCommandTrigger}
        />
      </div>
    );
  }
};

// Achievement showcase
export const AchievementShowcase = {
  args: {
    experiences: mockExperiences.slice(0, 2),
    expandedCards: new Set([0]),
    variant: 'default'
  },
  parameters: {
    docs: {
      description: {
        story: 'Showcase of the achievement system with sample notifications. In the real component, achievements are unlocked through various interactions and easter egg activations.'
      }
    }
  },
  render: (args) => {
    const [achievements, setAchievements] = React.useState(new Set());
    const [expandedCards, setExpandedCards] = React.useState(new Set([0]));
    
    const handleCardToggle = (index) => {
      setExpandedCards(prev => {
        const newSet = new Set(prev);
        if (newSet.has(index)) {
          newSet.delete(index);
        } else {
          newSet.add(index);
        }
        return newSet;
      });
    };

    const triggerAchievement = (achievement) => {
      setAchievements(prev => new Set([...prev, achievement]));
      setTimeout(() => {
        setAchievements(prev => {
          const newAchievements = new Set(prev);
          newAchievements.delete(achievement);
          return newAchievements;
        });
      }, 3000);
    };

    return (
      <div className="w-full max-w-6xl mx-auto bg-gray-900 p-8 rounded-lg border border-gray-700 min-h-screen">
        <div className="mb-6 p-4 bg-gray-800 rounded border border-gray-600">
          <h3 className="text-theme-cyan font-bold mb-2">🏆 Achievement System</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            <button 
              onClick={() => triggerAchievement('konami-master')}
              className="px-3 py-1 rounded text-sm bg-green-600 text-white hover:bg-green-500"
            >
              Konami Master
            </button>
            <button 
              onClick={() => triggerAchievement('developer-mode')}
              className="px-3 py-1 rounded text-sm bg-yellow-600 text-white hover:bg-yellow-500"
            >
              Developer Mode
            </button>
            <button 
              onClick={() => triggerAchievement('hacker-mode')}
              className="px-3 py-1 rounded text-sm bg-red-600 text-white hover:bg-red-500"
            >
              Hacker Mode
            </button>
            <button 
              onClick={() => triggerAchievement('triple-clicker')}
              className="px-3 py-1 rounded text-sm bg-purple-600 text-white hover:bg-purple-500"
            >
              Triple Clicker
            </button>
            <button 
              onClick={() => triggerAchievement('reality-breaker')}
              className="px-3 py-1 rounded text-sm bg-pink-600 text-white hover:bg-pink-500"
            >
              Reality Breaker
            </button>
          </div>
          <p className="text-sm text-gray-400">Click buttons to simulate achievement unlocks.</p>
        </div>
        
        {/* Achievement notifications */}
        {Array.from(achievements).map((achievement, index) => (
          <div
            key={achievement}
            className="fixed right-4 z-50 bg-green-500 text-white px-4 py-2 rounded-lg font-bold text-sm max-w-72 shadow-lg animate-in slide-in-from-right"
            style={{ top: `${100 + index * 60}px` }}
          >
            🏆 Achievement Unlocked: {achievement.replace('-', ' ').toUpperCase()}
          </div>
        ))}
        
        <Timeline 
          {...args} 
          expandedCards={expandedCards} 
          onCardToggle={handleCardToggle}
        />
      </div>
    );
  }
};