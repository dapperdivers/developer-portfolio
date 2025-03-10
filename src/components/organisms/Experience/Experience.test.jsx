import React from 'react';
import { screen } from '@testing-library/react';
import Experience from '@organisms/Experience';
import { vi } from 'vitest';
import { renderWithProviders } from '@/tests/unit/setup';

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

// Mock the portfolio.js file
vi.mock('../../../portfolio', () => ({
  experience: []
}));

// Mock the ExperienceCard component
vi.mock('@molecules/ExperienceCard', () => ({
  default: ({ data, index, ...props }) => (
    <div 
      data-testid="experience-card-mock" 
      className="experience-card"
      {...props}
    >
      <div className="experience-card__content">
        {data.companylogo && (
          <div className="experience-card__logo-container">
            <img
              src={data.companylogo}
              alt={`${data.company} logo`}
              className="experience-card__logo"
            />
          </div>
        )}
        <div className="experience-card__details">
          <h3>{data.role}</h3>
          <h4>{data.company}</h4>
          <p className="date">{data.date}</p>
          <p className="description">{data.desc}</p>
          {data.descBullets && (
            <ul className="experience-card__bullets">
              {data.descBullets.map((bullet, i) => (
                <li key={i} className="experience-card__bullet-item">{bullet}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}));

vi.mock('@layout/Section', () => ({
  default: ({ children, ...props }) => (
    <section data-testid="section-mock" {...props}>
      <h2>{props.title}</h2>
      <p>{props.subtitle}</p>
      {children}
    </section>
  )
}));

vi.mock('@molecules/SkeletonCard', () => ({
  default: ({ type, index }) => (
    <div data-testid="skeleton-card" className="skeleton-experience">
      Loading experience {index + 1}...
    </div>
  )
}));

// Mock ConsoleHeader component
vi.mock('@atoms/ConsoleHeader/ConsoleHeader', () => ({
  default: ({ prompt, command, variant }) => (
    <div className={`console-header console-header--${variant}`}>
      <span className="command-prompt">{prompt}</span>
      <span className="command-text">{command}</span>
    </div>
  )
}));

vi.mock('@iconify/react', () => ({
  Icon: ({ icon }) => <span data-testid={`icon-${icon}`}></span>
}));

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, variants, initial, animate, ...props }) => (
      <div 
        data-testid="motion-div"
        data-variants={JSON.stringify(variants)}
        data-initial={JSON.stringify(initial)}
        data-animate={JSON.stringify(animate)}
        {...props}
      >
        {children}
      </div>
    ),
    p: ({ children, variants, initial, animate, ...props }) => (
      <p 
        data-testid="motion-p"
        data-variants={JSON.stringify(variants)}
        data-initial={JSON.stringify(initial)}
        data-animate={JSON.stringify(animate)}
        {...props}
      >
        {children}
      </p>
    )
  },
  AnimatePresence: ({ children }) => children,
  useInView: () => [null, true]
}));

// Configure default mock implementations
const mockExperienceData = [
  {
    role: 'Software Engineer',
    company: 'Test Company 1',
    date: '2022 - Present',
    desc: 'Working on exciting projects',
    descBullets: ['React', 'Node.js'],
    companylogo: '/test-logo-1.png'
  },
  {
    role: 'Frontend Developer',
    company: 'Test Company 2',
    date: '2020 - 2022',
    desc: 'Building user interfaces',
    descBullets: ['JavaScript', 'CSS'],
    companylogo: '/test-logo-2.png'
  }
];

// Set up default mock implementations
beforeEach(() => {
  // Reset all mocks
  vi.clearAllMocks();
  
  // Configure the hook mocks
  mockUseExperience.mockReturnValue({
    data: mockExperienceData,
    isLoading: false,
    error: null
  });
  
  mockUseMemoValues.mockReturnValue({
    sectionAnimation: {
      variants: expect.any(Object),
      initial: 'hidden',
      whileInView: 'visible',
      viewport: { once: true },
      transition: { delay: 0 }
    }
  });
  
  mockUseTimelineView.mockReturnValue({
    viewType: 'timeline',
    toggleView: vi.fn(),
    setView: vi.fn(),
    getAnimationDelay: vi.fn(() => '0.1s'),
    entryRef: vi.fn(() => mockRefCallback),
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
    renderWithProviders(<Experience />);
    
    expect(screen.getByTestId('section-mock')).toHaveTextContent('Work Experience');
    expect(screen.getByTestId('section-mock')).toHaveTextContent('My professional journey');
  });

  it('renders the timeline view with correct number of entries', () => {
    renderWithProviders(<Experience />);
    
    const experienceCards = screen.getAllByTestId('experience-card-mock');
    expect(experienceCards).toHaveLength(2);
    
    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
    expect(screen.getByText('Frontend Developer')).toBeInTheDocument();
  });

  it('does not render section when display is set to false', () => {
    mockUsePortfolio.mockReturnValue({
      experienceSection: {
        ...mockUsePortfolio().experienceSection,
        display: false
      },
      settings: { loadingDelay: 0 }
    });

    renderWithProviders(<Experience />);
    expect(screen.queryByTestId('section-mock')).not.toBeInTheDocument();
  });

  it('handles error state gracefully', () => {
    mockUseExperience.mockReturnValue({
      data: null,
      isLoading: false,
      error: new Error('Failed to load experience data')
    });

    renderWithProviders(<Experience />);
    expect(screen.getByText('Failed to load experience data')).toBeInTheDocument();
  });

  it('handles undefined section data gracefully', () => {
    mockUsePortfolio.mockReturnValue({
      experienceSection: undefined,
      settings: { loadingDelay: 0 }
    });

    renderWithProviders(<Experience />);
    expect(screen.queryByTestId('section-mock')).not.toBeInTheDocument();
  });

  it('displays loading skeletons when data is loading', () => {
    mockUseExperience.mockReturnValue({
      data: null,
      isLoading: true,
      error: null
    });

    renderWithProviders(<Experience />, { isLoading: true });
    const skeletons = screen.getAllByTestId('skeleton-card');
    expect(skeletons).toHaveLength(3);
    expect(screen.getByText('Loading experience 1...')).toBeInTheDocument();
  });

  it('applies correct animations when enabled', () => {
    renderWithProviders(<Experience />, { animationEnabled: true });
    
    const container = screen.getByTestId('motion-div');
    const initial = JSON.parse(container.dataset.initial);
    const animate = JSON.parse(container.dataset.animate);
    const variants = JSON.parse(container.dataset.variants);

    expect(initial).toBe('hidden');
    expect(animate).toBe('visible');
    expect(variants).toEqual(expect.objectContaining({
      hidden: expect.any(Object),
      visible: expect.any(Object)
    }));
  });

  it('disables animations when animation context is disabled', () => {
    renderWithProviders(<Experience />, { animationEnabled: false });
    
    const container = screen.getByTestId('motion-div');
    expect(container.dataset.initial).toBe('false');
    expect(container.dataset.animate).toBe('false');
  });
});

describe('Experience Integration Tests', () => {
  const mockExperience = [
    {
      title: 'Software Engineer',
      company: 'Test Company 1',
      date: '2022 - Present',
      description: 'Test description 1',
      technologies: ['React', 'Node.js']
    },
    {
      title: 'Frontend Developer',
      company: 'Test Company 2',
      date: '2020 - 2022',
      description: 'Test description 2',
      technologies: ['Vue', 'TypeScript']
    }
  ];

  it('displays loading skeletons when data is loading', () => {
    renderWithProviders(<Experience isLoading={true} />, { isLoading: true });

    const skeletonCards = screen.getAllByTestId('skeleton-card');
    expect(skeletonCards).toHaveLength(3); // Assuming we show 3 skeleton cards while loading
    skeletonCards.forEach(card => {
      expect(card).toHaveTextContent('Loading...');
    });

    // No actual experience cards should be rendered while loading
    expect(screen.queryByTestId('experience-card-mock')).not.toBeInTheDocument();
  });

  it('renders experience cards when data is available', () => {
    renderWithProviders(<Experience experience={mockExperience} isLoading={false} />);

    const experienceCards = screen.getAllByTestId('experience-card-mock');
    expect(experienceCards).toHaveLength(2);

    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
    expect(screen.getByText('Test Company 1')).toBeInTheDocument();
    expect(screen.getByText('Frontend Developer')).toBeInTheDocument();
    expect(screen.getByText('Test Company 2')).toBeInTheDocument();
  });

  it('handles empty experience data gracefully', () => {
    renderWithProviders(<Experience experience={[]} isLoading={false} />);

    expect(screen.queryByTestId('experience-card-mock')).not.toBeInTheDocument();
    expect(screen.queryByTestId('skeleton-card')).not.toBeInTheDocument();
  });

  it('handles undefined section data gracefully', () => {
    renderWithProviders(<Experience experience={undefined} isLoading={false} />);

    expect(screen.queryByTestId('experience-card-mock')).not.toBeInTheDocument();
    expect(screen.queryByTestId('skeleton-card')).not.toBeInTheDocument();
  });
});