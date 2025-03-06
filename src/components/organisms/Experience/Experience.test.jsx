import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Experience from '@organisms/Experience';
import { vi } from 'vitest';

// Create mock functions
const mockUseExperience = vi.fn();
const mockUseMemoValues = vi.fn();
const mockUseTimelineView = vi.fn();
const mockUsePortfolio = vi.fn();
const mockRefCallback = vi.fn();

// Mock the hooks and components
vi.mock('@hooks/useExperience', () => ({
  default: () => mockUseExperience()
}));

vi.mock('@hooks/useMemoValues', () => ({
  default: () => mockUseMemoValues()
}));

vi.mock('@hooks/useTimelineView', () => ({
  default: () => mockUseTimelineView()
}));

vi.mock('@context/PortfolioContext', () => ({
  usePortfolio: () => mockUsePortfolio()
}));

vi.mock('@molecules/ExperienceCard', () => ({
  default: ({ data }) => (
    <div data-testid="experience-card-mock">
      <h3>{data.company}</h3>
      <p>{data.role}</p>
    </div>
  )
}));

vi.mock('@layout/Section', () => ({
  default: ({ children, title, subtitle, className }) => (
    <section data-testid="section-mock" className={className}>
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
      {children}
    </section>
  )
}));

vi.mock('@molecules/SkeletonCard', () => ({
  default: ({ type }) => (
    <div data-testid={`skeleton-${type}-mock`}></div>
  )
}));

// Filter out motion-specific props before passing to DOM elements
const filterMotionProps = (props) => {
  const {
    initial, animate, exit, transition, whileHover, whileTap, whileFocus, whileInView,
    variants, viewport, drag, dragConstraints, dragElastic, dragMomentum,
    onDragStart, onDrag, onDragEnd, layout, layoutId, ...filteredProps
  } = props;
  return filteredProps;
};

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => (
      <div data-testid="motion-div-mock" {...filterMotionProps(props)}>{children}</div>
    ),
    span: ({ children, ...props }) => (
      <span data-testid="motion-span-mock" {...filterMotionProps(props)}>{children}</span>
    )
  }
}));

vi.mock('@iconify/react', () => ({
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
  vi.clearAllMocks();
  
  // Configure the hook mocks
  mockUseExperience.mockReturnValue(mockExperienceData);
  
  mockUseMemoValues.mockReturnValue({
    sectionAnimation: {
      initial: { opacity: 0 },
      whileInView: { opacity: 1 },
      viewport: { once: true },
      transition: { duration: 0.5 }
    }
  });
  
  mockUseTimelineView.mockReturnValue({
    viewType: 'timeline',
    toggleView: vi.fn(),
    setView: vi.fn(),
    getAnimationDelay: vi.fn(() => '0.1s'),
    entryRef: vi.fn(() => mockRefCallback), // Return the mockRefCallback
    extractDateYear: vi.fn((date) => date.split(' ')[0])
  });
  
  mockUsePortfolio.mockReturnValue({
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
    mockUseTimelineView.mockReturnValueOnce({
      viewType: 'grid',
      toggleView: vi.fn(),
      setView: vi.fn(),
      getAnimationDelay: vi.fn(() => '0.1s'),
      entryRef: vi.fn(() => vi.fn()),
      extractDateYear: vi.fn((date) => date.split(' ')[0])
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
    const setViewMock = vi.fn();
    mockUseTimelineView.mockReturnValueOnce({
      viewType: 'timeline',
      toggleView: vi.fn(),
      setView: setViewMock,
      getAnimationDelay: vi.fn(() => '0.1s'),
      entryRef: vi.fn(() => vi.fn()),
      extractDateYear: vi.fn((date) => date.split(' ')[0])
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
    mockUseExperience.mockReturnValueOnce(null);
    
    render(<Experience />);
    
    // Should render skeleton cards
    const skeletonCards = screen.getAllByTestId('skeleton-experience');
    expect(skeletonCards.length).toBe(3); // Default skeleton count is 3
  });

  it('renders empty state when there is no experience data', () => {
    // Override the useExperience mock for this test
    mockUseExperience.mockReturnValueOnce([]);
    
    render(<Experience />);
    
    // Should render empty state message
    expect(screen.getByText('No work experience is currently available.')).toBeInTheDocument();
  });

  it('does not render section when display is set to false', () => {
    // Override the usePortfolio mock for this test
    mockUsePortfolio.mockReturnValueOnce({
      experienceSection: {
        display: false
      }
    });
    
    const { container } = render(<Experience />);
    
    // Container should be empty
    expect(container.firstChild).toBeNull();
  });
});