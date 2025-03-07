import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import TimelineEntry from './TimelineEntry';
import { AnimationProvider } from '@context/AnimationContext';

// Mock the hooks
jest.mock('@hooks/useTimelineAnimation', () => ({
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
    expect(screen.getByText('Frontend Developer @ Test Company')).toBeInTheDocument();
    expect(screen.getByText('Working on amazing projects')).toBeInTheDocument();
  });

  it('renders the correct company and role information', () => {
    setupComponent();
    expect(screen.getByText('Frontend Developer @ Test Company')).toBeInTheDocument();
  });

  it('displays the correct year from the date using extractDateYear', () => {
    setupComponent();
    expect(screen.getByLabelText(/Work period/)).toHaveTextContent('2022');
  });

  it('renders security badge with correct ID', () => {
    setupComponent();
    const securityElement = screen.getByText('SEC-TEST123');
    expect(securityElement).toBeInTheDocument();
  });

  it('renders tech badges based on role keywords', () => {
    setupComponent({
      data: {
        ...mockData,
        role: 'Frontend React Developer'
      }
    });
    
    expect(screen.getByText('React')).toBeInTheDocument();
  });

  it('applies the correct variant to child components', () => {
    setupComponent({ variant: 'terminal' });
    
    // Check if terminal classes are applied to components
    const terminalElements = document.querySelectorAll('[data-variant="terminal"]');
    expect(terminalElements.length).toBeGreaterThan(0);
  });

  it('renders description bullets correctly', () => {
    setupComponent();
    
    expect(screen.getByText('Built responsive UI')).toBeInTheDocument();
    expect(screen.getByText('Implemented new features')).toBeInTheDocument();
  });

  it('handles entries with no description bullets', () => {
    setupComponent({
      data: {
        ...mockData,
        descBullets: undefined
      }
    });
    
    // No errors should occur when descBullets is undefined
    expect(screen.getByText('Working on amazing projects')).toBeInTheDocument();
  });

  it('uses the correct accessibility attributes', () => {
    setupComponent();
    
    const timelineNode = screen.getByLabelText(/Timeline node for Test Company experience/i);
    expect(timelineNode).toBeInTheDocument();
    
    const dateBubble = screen.getByLabelText(/Work period/i);
    expect(dateBubble).toBeInTheDocument();
  });
});
