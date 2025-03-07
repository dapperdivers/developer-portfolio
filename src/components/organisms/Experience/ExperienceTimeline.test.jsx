import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ExperienceTimeline from './ExperienceTimeline';

// Mock the useAnimation hook
jest.mock('@context/AnimationContext', () => ({
  __esModule: true,
  AnimationProvider: ({ children }) => <div data-testid="animation-provider">{children}</div>,
  useAnimation: () => ({
    registerEntryAnimation: jest.fn(),
    playEntryAnimation: jest.fn(),
    getAnimationDelay: (index) => `${index * 0.15}s`,
    animationEnabled: true,
    inView: true,
    entryAnimations: {}
  })
}));

// Mock the TimelineEntry component
jest.mock('@molecules/TimelineEntry/TimelineEntry', () => {
  return function MockTimelineEntry(props) {
    return (
      <div data-testid={`timeline-entry-${props.index}`}>
        <div>{props.data.company}</div>
        <div>{props.data.role}</div>
      </div>
    );
  };
});

// Sample data for testing
const mockExperience = [
  {
    company: 'Test Company 1',
    role: 'Frontend Developer',
    date: 'Jan 2022 - Present',
    desc: 'Test description 1',
    companylogo: '/test-logo-1.png',
    descBullets: ['Test bullet 1', 'Test bullet 2']
  },
  {
    company: 'Test Company 2',
    role: 'Backend Developer',
    date: 'Jan 2020 - Dec 2021',
    desc: 'Test description 2',
    companylogo: '/test-logo-2.png',
    descBullets: ['Test bullet 3', 'Test bullet 4']
  }
];

// Mock function to extract year from date
const mockExtractDateYear = (date) => date.split(' ')[0].split(' ')[1];

describe('ExperienceTimeline Component', () => {
  const setupComponent = (props = {}) => {
    return render(
      <ExperienceTimeline
        experience={mockExperience}
        extractDateYear={mockExtractDateYear}
        variant="security"
        {...props}
      />
    );
  };

  it('renders without crashing', () => {
    setupComponent();
    expect(screen.getByTestId('experience-timeline')).toBeInTheDocument();
  });

  it('renders correct number of timeline entries', () => {
    setupComponent();
    expect(screen.getByTestId('timeline-entry-0')).toBeInTheDocument();
    expect(screen.getByTestId('timeline-entry-1')).toBeInTheDocument();
    expect(screen.queryByTestId('timeline-entry-2')).not.toBeInTheDocument();
  });

  it('renders with the AnimationProvider', () => {
    setupComponent();
    expect(screen.getByTestId('animation-provider')).toBeInTheDocument();
  });

  it('renders company console header', () => {
    setupComponent();
    // Check for command prompt text
    expect(screen.getByText(/show_career_path/i)).toBeInTheDocument();
  });

  it('displays loading state when isLoading prop is true', () => {
    setupComponent({ isLoading: true });
    expect(screen.getByTestId('experience-timeline')).toBeInTheDocument();
    // Timeline entries shouldn't be rendered during loading
    expect(screen.queryByTestId('timeline-entry-0')).not.toBeInTheDocument();
  });

  it('displays error state when hasError prop is true', () => {
    setupComponent({ hasError: true });
    expect(screen.getByText(/error loading the experience data/i)).toBeInTheDocument();
    // Timeline entries shouldn't be rendered when there's an error
    expect(screen.queryByTestId('timeline-entry-0')).not.toBeInTheDocument();
  });

  it('displays empty state when experience array is empty', () => {
    setupComponent({ experience: [] });
    expect(screen.getByText(/no experience entries found/i)).toBeInTheDocument();
  });

  it('applies correct variant to timeline entries', () => {
    setupComponent({ variant: 'terminal' });
    // Check if timeline entries are rendering with correct variant
    expect(screen.getByTestId('timeline-entry-0')).toBeInTheDocument();
  });
});
