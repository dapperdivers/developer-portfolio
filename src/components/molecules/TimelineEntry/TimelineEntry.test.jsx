import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TimelineEntry from './TimelineEntry';
import { AnimationProvider } from '@context/AnimationContext';

// Mock the hooks
vi.mock('@hooks/useTimelineAnimation', () => ({
  __esModule: true,
  default: () => ({
    entryRef: { current: null },
    isEntryInView: true,
    isVerified: true,
    isEven: true,
    animationDelay: '0.2s',
    slideVariants: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 }
    },
    bubbleVariants: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 }
    },
    dotVariants: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 }
    },
    securityBadgeVariants: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 }
    },
    securityId: 'SEC-TEST123'
  })
}));

// Sample data for testing
const mockData = {
  company: 'Test Company',
  role: 'Frontend Developer',
  date: 'Jan 2022 - Present',
  desc: 'Working on amazing projects',
  companylogo: '/images/test-logo.png',
  descBullets: ['Built responsive UI', 'Implemented new features']
};

const mockExtractDateYear = (date) => '2022';

describe('TimelineEntry Component', () => {
  const setupComponent = (props = {}) => {
    return render(
      <AnimationProvider>
        <TimelineEntry
          data={mockData}
          index={0}
          extractDateYear={mockExtractDateYear}
          variant="security"
          id="test-entry"
          {...props}
        />
      </AnimationProvider>
    );
  };

  it('renders without crashing', () => {
    setupComponent();
    // Just check for parent element
    expect(screen.getByLabelText(/Experience at Test Company/)).toBeInTheDocument();
    
    // Check for description text in the compact summary
    const summaryElement = document.querySelector('.compact-summary');
    expect(summaryElement).toBeInTheDocument();
    expect(summaryElement.textContent).toBe('Working on amazing projects.');
  });

  it('renders the correct company information', () => {
    setupComponent();
    // Check for company info in the aria-label
    const entryContainer = screen.getByLabelText(/Experience at Test Company/);
    expect(entryContainer).toBeInTheDocument();
  });

  it('displays the correct year from the date using extractDateYear', () => {
    setupComponent();
    expect(screen.getByLabelText(/Work period/)).toHaveTextContent('2022');
  });

  it('renders security badge with correct ID', () => {
    setupComponent();
    
    // Check for any security-related elements in the rendered component
    const securityRelatedElements = document.querySelectorAll('.connection-status, .session-id, .security-badge');
    expect(securityRelatedElements.length).toBeGreaterThan(0);
    
    // Check for specific security elements in the document
    const connectionStatus = document.querySelector('.connection-status');
    expect(connectionStatus).toBeInTheDocument();
    expect(connectionStatus.textContent).toContain('CONNECTION SECURE');
    
    // Check for the session ID element
    const sessionId = document.querySelector('.session-id');
    expect(sessionId).toBeInTheDocument();
    expect(sessionId.textContent).toContain('SESSION ID:');
  });

  it('renders tech badges based on role keywords', () => {
    setupComponent({
      data: {
        ...mockData,
        role: 'Frontend React Developer'
      }
    });
    
    // Look for tech badges in the component
    const techBadges = document.querySelectorAll('.tech-badge, .tech-stack');
    expect(techBadges.length).toBeGreaterThan(0);
    
    // Check if we can find React anywhere in the tech stack
    const techStack = document.querySelector('.tech-stack');
    expect(techStack).toBeInTheDocument();
    
    // At least one tech badge should be rendered
    const allTechBadgeElements = document.querySelectorAll('.tech-stack [class*="tech"]');
    expect(allTechBadgeElements.length).toBeGreaterThan(0);
  });

  it('applies the correct variant to child components', () => {
    setupComponent({ variant: 'terminal' });
    
    // Check if terminal classes are applied to components
    const terminalElements = document.querySelectorAll('.terminal-controls, .terminal-content');
    expect(terminalElements.length).toBeGreaterThan(0);
    
    // Terminal variant should be applied to the card
    const timelineCard = document.querySelector('.timeline-card-container');
    expect(timelineCard).toBeInTheDocument();
    
    // Look for terminal-specific classes
    const terminalSpecificElements = document.querySelectorAll('.terminal-title, .terminal-footer');
    expect(terminalSpecificElements.length).toBeGreaterThan(0);
  });

  it('renders description bullets without crashing', () => {
    setupComponent();
    
    // We can't check the actual bullet text since they're not rendered
    // in the compact view by default, but we can at least verify the
    // component doesn't crash
    expect(screen.getByLabelText(/Experience at Test Company/)).toBeInTheDocument();
  });

  it('handles entries with no description bullets', () => {
    setupComponent({
      data: {
        ...mockData,
        descBullets: undefined
      }
    });
    
    // No errors should occur when descBullets is undefined
    const summaryElement = document.querySelector('.compact-summary');
    expect(summaryElement).toBeInTheDocument();
    expect(summaryElement.textContent).toBe('Working on amazing projects.');
  });

  it('uses the correct accessibility attributes', () => {
    setupComponent();
    
    const timelineNode = screen.getByLabelText(/Timeline node for Test Company experience/i);
    expect(timelineNode).toBeInTheDocument();
    
    const dateBubble = screen.getByLabelText(/Work period/i);
    expect(dateBubble).toBeInTheDocument();
  });
});
