import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Experience from '@organisms/Experience';

// Import the modules we want to mock
import useExperience from '@hooks/useExperience';
import useMemoValues from '@hooks/useMemoValues';
import useTimelineView from '@hooks/useTimelineView';
import { usePortfolio } from '@context/PortfolioContext';
import ExperienceCard from '@molecules/ExperienceCard';
import Section from '@layout/Section';
import SkeletonCard from '@molecules/SkeletonCard';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';

// Mock the hooks and components
jest.mock('../../hooks/useExperience');
jest.mock('../../hooks/useMemoValues');
jest.mock('../../hooks/useTimelineView');
jest.mock('../../context/PortfolioContext', () => ({
  usePortfolio: jest.fn()
}));

jest.mock('../../components/ExperienceCard', () => {
  const ExperienceCardMock = ({ data }) => (
    <div data-testid="experience-card-mock">
      <h3>{data.company}</h3>
      <p>{data.role}</p>
    </div>
  );
  return ExperienceCardMock;
});

jest.mock('../../components/layout/Section', () => {
  const SectionMock = ({ children, title, subtitle, className }) => (
    <section data-testid="section-mock" className={className}>
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
      {children}
    </section>
  );
  return SectionMock;
});

jest.mock('../../components/SkeletonCard', () => {
  const SkeletonCardMock = ({ type }) => (
    <div data-testid={`skeleton-${type}-mock`}></div>
  );
  return SkeletonCardMock;
});

jest.mock('framer-motion', () => {
  // Filter out motion-specific props before passing to DOM elements
  const filterMotionProps = (props) => {
    const {
      initial, animate, exit, transition, whileHover, whileTap, whileFocus, whileInView,
      variants, viewport, drag, dragConstraints, dragElastic, dragMomentum,
      onDragStart, onDrag, onDragEnd, layout, layoutId, ...filteredProps
    } = props;
    return filteredProps;
  };
  
  return {
    motion: {
      div: ({ children, ...props }) => (
        <div data-testid="motion-div-mock" {...filterMotionProps(props)}>{children}</div>
      ),
      span: ({ children, ...props }) => (
        <span data-testid="motion-span-mock" {...filterMotionProps(props)}>{children}</span>
      )
    }
  };
});

jest.mock('@iconify/react', () => ({
  Icon: ({ icon }) => <span data-testid={`icon-${icon}`}></span>
}));

// Configure default mock implementations
const mockExperienceData = [
  {
    company: 'Test Company 1',
    role: 'Senior Developer',
    date: '2022 - Present',
    desc: 'Leading development efforts',
    companylogo: '/test-logo1.png',
    descBullets: ['Led team of 5', 'Deployed to production']
  },
  {
    company: 'Test Company 2',
    role: 'Developer',
    date: '2020 - 2022',
    desc: 'Contributed to key projects',
    companylogo: '/test-logo2.png',
    descBullets: ['Built frontend', 'Improved performance']
  }
];

// Set up default mock implementations
beforeEach(() => {
  // Reset all mocks
  jest.clearAllMocks();
  
  // Configure the hook mocks
  useExperience.mockReturnValue(mockExperienceData);
  
  useMemoValues.mockReturnValue({
    sectionAnimation: {
      initial: { opacity: 0 },
      whileInView: { opacity: 1 },
      viewport: { once: true },
      transition: { duration: 0.5 }
    }
  });
  
  // Create a mock ref function that doesn't use React.ref directly
  const mockRefCallback = jest.fn();
  
  useTimelineView.mockReturnValue({
    viewType: 'timeline',
    toggleView: jest.fn(),
    setView: jest.fn(),
    getAnimationDelay: jest.fn(() => '0.1s'),
    entryRef: jest.fn(() => mockRefCallback), // Return the mockRefCallback
    extractDateYear: jest.fn((date) => date.split(' ')[0])
  });
  
  usePortfolio.mockReturnValue({
    experienceSection: {
      title: 'Work Experience',
      subtitle: 'My professional journey',
      viewType: 'timeline',
      display: true
    },
    settings: {
      loadingDelay: 0
    }
  });
  
  // Component mocks are now defined at the top with jest.mock
});

describe('Experience Container', () => {
  it('renders the experience section with correct title and subtitle', () => {
    render(<Experience />);
    
    // Check if section title and subtitle are rendered
    expect(screen.getByText('Work Experience')).toBeInTheDocument();
    expect(screen.getByText('My professional journey')).toBeInTheDocument();
  });

  it('renders the timeline view with correct number of entries', () => {
    render(<Experience />);
    
    // Check if there are 2 experience cards in the timeline
    const timelineEntries = screen.getAllByTestId('motion-div-mock');
    expect(timelineEntries.length).toBe(2);
    
    // Check if both experience cards are rendered - using getAllByText for company names
    const company1Elements = screen.getAllByText('Test Company 1');
    const company2Elements = screen.getAllByText('Test Company 2');
    
    expect(company1Elements.length).toBeGreaterThan(0);
    expect(company2Elements.length).toBeGreaterThan(0);
  });

  it('renders the grid view with correct number of cards', () => {
    // Override the useTimelineView mock for this test
    useTimelineView.mockReturnValueOnce({
      viewType: 'grid',
      toggleView: jest.fn(),
      setView: jest.fn(),
      getAnimationDelay: jest.fn(() => '0.1s'),
      entryRef: jest.fn(() => jest.fn()),
      extractDateYear: jest.fn((date) => date.split(' ')[0])
    });
    
    render(<Experience />);
    
    // Section should have grid layout class
    const section = screen.getByTestId('section-mock');
    expect(section).toHaveClass('layout-grid');
    
    // Check if both experience cards are rendered - using getAllByText to handle duplicates
    const company1Elements = screen.getAllByText('Test Company 1');
    const company2Elements = screen.getAllByText('Test Company 2');
    
    expect(company1Elements.length).toBeGreaterThan(0);
    expect(company2Elements.length).toBeGreaterThan(0);
  });

  it('renders view toggle controls', () => {
    const setViewMock = jest.fn();
    useTimelineView.mockReturnValueOnce({
      viewType: 'timeline',
      toggleView: jest.fn(),
      setView: setViewMock,
      getAnimationDelay: jest.fn(() => '0.1s'),
      entryRef: jest.fn(() => jest.fn()),
      extractDateYear: jest.fn((date) => date.split(' ')[0])
    });
    
    render(<Experience />);
    
    // Find the timeline toggle button
    const timelineButton = screen.getByText('Timeline').closest('button');
    expect(timelineButton).toHaveClass('active');
    
    // Find the grid toggle button
    const gridButton = screen.getByText('Grid').closest('button');
    expect(gridButton).not.toHaveClass('active');
    
    // Click the grid button
    fireEvent.click(gridButton);
    
    // Should call setView with 'grid'
    expect(setViewMock).toHaveBeenCalledWith('grid');
  });

  it('renders loading skeleton when data is not ready', () => {
    // Override the useExperience mock for this test
    useExperience.mockReturnValueOnce(null);
    
    render(<Experience />);
    
    // Should render skeleton cards
    const skeletonCards = screen.getAllByTestId('skeleton-experience-mock');
    expect(skeletonCards.length).toBe(3); // Default skeleton count is 3
  });

  it('renders empty state when there is no experience data', () => {
    // Override the useExperience mock for this test
    useExperience.mockReturnValueOnce([]);
    
    render(<Experience />);
    
    // Should render empty state message
    expect(screen.getByText('No work experience is currently available.')).toBeInTheDocument();
  });

  it('does not render section when display is set to false', () => {
    // Override the usePortfolio mock for this test
    usePortfolio.mockReturnValueOnce({
      experienceSection: {
        display: false
      }
    });
    
    const { container } = render(<Experience />);
    
    // Container should be empty
    expect(container.firstChild).toBeNull();
  });
});