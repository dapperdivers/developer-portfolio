import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Experience from '../Experience';

// Mock the hooks used in Experience
jest.mock('../../hooks/useExperience', () => ({
  __esModule: true,
  default: jest.fn(() => [
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
  ])
}));

jest.mock('../../hooks/useMemoValues', () => ({
  __esModule: true,
  default: () => ({
    sectionAnimation: {
      initial: { opacity: 0 },
      whileInView: { opacity: 1 },
      viewport: { once: true },
      transition: { duration: 0.5 }
    }
  })
}));

jest.mock('../../hooks/useTimelineView', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    viewType: 'timeline',
    toggleView: jest.fn(),
    setView: jest.fn(),
    getAnimationDelay: jest.fn(() => '0.1s'),
    entryRef: jest.fn(() => jest.fn()),
    extractDateYear: jest.fn((date) => date.split(' ')[0])
  }))
}));

jest.mock('../../context/PortfolioContext', () => ({
  __esModule: true,
  usePortfolio: jest.fn(() => ({
    experienceSection: {
      title: 'Work Experience',
      subtitle: 'My professional journey',
      viewType: 'timeline'
    },
    settings: {
      loadingDelay: 0
    }
  }))
}));

// Mock the ExperienceCard component
jest.mock('../../components/ExperienceCard', () => ({
  __esModule: true,
  default: ({ data }) => (
    <div data-testid="experience-card-mock">
      <h3>{data.company}</h3>
      <p>{data.role}</p>
    </div>
  )
}));

// Mock the Section component
jest.mock('../../components/layout/Section', () => ({
  __esModule: true,
  default: ({ children, title, subtitle, className }) => (
    <section data-testid="section-mock" className={className}>
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
      {children}
    </section>
  )
}));

// Mock the SkeletonCard component
jest.mock('../../components/SkeletonCard', () => ({
  __esModule: true,
  default: ({ type }) => (
    <div data-testid={`skeleton-${type}-mock`}></div>
  )
}));

// Mock framer-motion and iconify for simplicity
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => (
      <div data-testid="motion-div-mock" {...props}>{children}</div>
    )
  }
}));

jest.mock('@iconify/react', () => ({
  Icon: ({ icon }) => <span data-testid={`icon-${icon}`}></span>
}));

describe('Experience Container', () => {
  beforeEach(() => {
    // Reset mock implementations before each test
    jest.clearAllMocks();
  });

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
    
    // Check if both experience cards are rendered
    expect(screen.getByText('Test Company 1')).toBeInTheDocument();
    expect(screen.getByText('Test Company 2')).toBeInTheDocument();
  });

  it('renders the grid view with correct number of cards', () => {
    // Override the useTimelineView mock for this test
    require('../../hooks/useTimelineView').default.mockImplementationOnce(() => ({
      viewType: 'grid',
      toggleView: jest.fn(),
      setView: jest.fn(),
      getAnimationDelay: jest.fn(() => '0.1s'),
      entryRef: jest.fn(() => jest.fn()),
      extractDateYear: jest.fn((date) => date.split(' ')[0])
    }));
    
    render(<Experience />);
    
    // Section should have grid layout class
    const section = screen.getByTestId('section-mock');
    expect(section).toHaveClass('layout-grid');
    
    // Check if both experience cards are rendered in the grid
    expect(screen.getByText('Test Company 1')).toBeInTheDocument();
    expect(screen.getByText('Test Company 2')).toBeInTheDocument();
  });

  it('renders view toggle controls', () => {
    const setViewMock = jest.fn();
    require('../../hooks/useTimelineView').default.mockImplementationOnce(() => ({
      viewType: 'timeline',
      toggleView: jest.fn(),
      setView: setViewMock,
      getAnimationDelay: jest.fn(() => '0.1s'),
      entryRef: jest.fn(() => jest.fn()),
      extractDateYear: jest.fn((date) => date.split(' ')[0])
    }));
    
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
    require('../../hooks/useExperience').default.mockImplementationOnce(() => null);
    
    render(<Experience />);
    
    // Should render skeleton cards
    const skeletonCards = screen.getAllByTestId('skeleton-experience-mock');
    expect(skeletonCards.length).toBe(3); // Default skeleton count is 3
  });

  it('renders empty state when there is no experience data', () => {
    // Override the useExperience mock for this test
    require('../../hooks/useExperience').default.mockImplementationOnce(() => []);
    
    render(<Experience />);
    
    // Should render empty state message
    expect(screen.getByText('No work experience is currently available.')).toBeInTheDocument();
  });

  it('does not render section when display is set to false', () => {
    // Override the usePortfolio mock for this test
    require('../../context/PortfolioContext').usePortfolio.mockImplementationOnce(() => ({
      experienceSection: {
        display: false
      }
    }));
    
    const { container } = render(<Experience />);
    
    // Container should be empty
    expect(container.firstChild).toBeNull();
  });
});