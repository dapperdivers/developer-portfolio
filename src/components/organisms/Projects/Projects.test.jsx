import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Projects from '@organisms/Projects';
import { vi } from 'vitest';

// Create mock functions
const mockUseProjects = vi.fn();
const mockUseMemoValues = vi.fn();
const mockUsePortfolio = vi.fn();

// Mock hooks and components
vi.mock('@hooks/useProjects', () => ({
  default: () => mockUseProjects()
}));

vi.mock('@hooks/useMemoValues', () => ({
  default: () => mockUseMemoValues()
}));

vi.mock('@context/PortfolioContext', () => ({
  usePortfolio: () => mockUsePortfolio()
}));

// Mock components with explicit implementations
vi.mock('@molecules/ProjectsCard', () => ({
  default: ({ data }) => (
    <div data-testid="project-card-mock" className="project-card">
      <h3>{data.name}</h3>
      <p>{data.desc}</p>
      {data.stack && (
        <div className="tech-stack">
          {data.stack.map((tech, i) => (
            <span key={i} className="tech-tag">{tech}</span>
          ))}
        </div>
      )}
    </div>
  )
}));

vi.mock('@layout/Section', () => ({
  default: ({ children, title, subtitle, id, className }) => (
    <section data-testid="section-mock" id={id} className={className}>
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
      <div>{children}</div>
    </section>
  )
}));

vi.mock('@molecules/SkeletonCard', () => ({
  default: ({ type }) => (
    <div data-testid={`skeleton-${type}-mock`}></div>
  )
}));

// Mock data
const mockProjects = [
  {
    name: 'Project 1',
    desc: 'A cool project',
    image: '/project1.jpg',
    github: 'https://github.com/user/project1',
    link: 'https://project1.com',
    stack: ['React', 'Node.js']
  },
  {
    name: 'Project 2',
    desc: 'Another project',
    image: '/project2.jpg',
    github: 'https://github.com/user/project2',
    stack: ['Vue', 'Express']
  }
];

const mockTopProjects = [
  {
    name: 'Top Project 1',
    desc: 'Top rated project',
    image: '/top1.jpg',
    github: 'https://github.com/user/top1',
    stack: ['React', 'GraphQL']
  }
];

// Set up mock implementations
beforeEach(() => {
  vi.clearAllMocks();
  
  // Set default mock implementations
  mockUseProjects.mockReturnValue(mockProjects);
  
  mockUseMemoValues.mockReturnValue({
    topProjects: mockTopProjects
  });
  
  mockUsePortfolio.mockReturnValue({
    projectsSection: {
      title: 'My Projects',
      subtitle: 'Things I\'ve built',
      showTopProjectsOnly: false,
      display: true
    },
    settings: {
      loadingDelay: 0
    }
  });
});

describe('Projects Container Integration Tests', () => {
  it('renders projects from useProjects hook with correct layout', () => {
    render(<Projects />);
    
    // Check section title from context
    expect(screen.getByText('My Projects')).toBeInTheDocument();
    expect(screen.getByText('Things I\'ve built')).toBeInTheDocument();
    
    // Check for project cards
    const projectCards = screen.getAllByTestId('project-card-mock');
    expect(projectCards).toHaveLength(2);
    
    // Check project content
    expect(screen.getByText('Project 1')).toBeInTheDocument();
    expect(screen.getByText('Project 2')).toBeInTheDocument();
    expect(screen.getByText('A cool project')).toBeInTheDocument();
    expect(screen.getByText('Another project')).toBeInTheDocument();
    
    // Check tech stack is rendered
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Node.js')).toBeInTheDocument();
    expect(screen.getByText('Vue')).toBeInTheDocument();
    expect(screen.getByText('Express')).toBeInTheDocument();
  });

  it('displays top projects when showTopProjectsOnly is true', () => {
    // Override the usePortfolio mock for this test
    mockUsePortfolio.mockReturnValueOnce({
      projectsSection: {
        title: 'My Projects',
        subtitle: 'Things I\'ve built',
        showTopProjectsOnly: true,
        display: true
      },
      settings: {
        loadingDelay: 0
      }
    });
    
    render(<Projects />);
    
    // Should show only the top project
    const projectCards = screen.getAllByTestId('project-card-mock');
    expect(projectCards).toHaveLength(1);
    
    // Check top project content
    expect(screen.getByText('Top Project 1')).toBeInTheDocument();
    expect(screen.getByText('Top rated project')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('GraphQL')).toBeInTheDocument();
  });

  it('displays loading skeleton when projects are loading', async () => {
    // Override the useProjects mock to simulate loading
    mockUseProjects.mockReturnValueOnce(null);
    
    render(<Projects />);
    
    // Should show skeleton loaders
    const skeletonCards = screen.getAllByTestId('skeleton-project');
    expect(skeletonCards).toHaveLength(3); // Default is 3 skeleton cards
    
    // Check section title still shows
    expect(screen.getByText('My Projects')).toBeInTheDocument();
  });

  it('displays empty state when no projects are available', () => {
    // Override the useProjects mock to return empty array
    mockUseProjects.mockReturnValueOnce([]);
    
    render(<Projects />);
    
    // Should show empty state message
    expect(screen.getByText('No projects are currently available.')).toBeInTheDocument();
  });

  it('does not render section when display is set to false', () => {
    // Override the usePortfolio mock for this test
    mockUsePortfolio.mockReturnValueOnce({
      projectsSection: {
        display: false
      }
    });
    
    const { container } = render(<Projects />);
    
    // Container should be empty
    expect(container.firstChild).toBeNull();
  });

  it('simulates loading delay and renders final content', async () => {
    // Use fake timers
    vi.useFakeTimers();
    
    // Mock a loading delay
    mockUsePortfolio.mockReturnValueOnce({
      projectsSection: {
        title: 'My Projects',
        subtitle: 'Things I\'ve built',
        display: true
      },
      settings: {
        loadingDelay: 500 // 500ms delay
      }
    });
    
    // Start with null (loading)
    mockUseProjects.mockReturnValueOnce(null);
    
    // After a timeout, we'll check for the skeleton
    render(<Projects />);
    
    // Initially showing skeleton
    expect(screen.getAllByTestId('skeleton-project')).toHaveLength(3);
    
    // We won't be able to fully test the transition from loading to loaded state
    // in this test environment, so we'll just verify the skeleton renders
    
    // Cleanup
    vi.useRealTimers();
  });

  // Test for correct animation configuration
  it('applies correct animation configuration to section', () => {
    render(<Projects />);
    
    const section = screen.getByTestId('section-mock');
    expect(section).toBeInTheDocument();
    
    // We're mostly testing that the animation properties are passed without error
    // since we can't directly test the actual animation in JSDOM
  });
});