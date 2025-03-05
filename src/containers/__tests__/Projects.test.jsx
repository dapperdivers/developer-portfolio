import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Projects from '../Projects';

// Mock required hooks and components
jest.mock('../../hooks/useProjects', () => ({
  __esModule: true,
  default: jest.fn(() => [
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
  ])
}));

jest.mock('../../hooks/useMemoValues', () => ({
  __esModule: true,
  default: () => ({
    topProjects: [
      {
        name: 'Top Project 1',
        desc: 'Top rated project',
        image: '/top1.jpg',
        github: 'https://github.com/user/top1',
        stack: ['React', 'GraphQL']
      }
    ]
  })
}));

jest.mock('../../context/PortfolioContext', () => ({
  __esModule: true,
  usePortfolio: jest.fn(() => ({
    projectsSection: {
      title: 'My Projects',
      subtitle: 'Things I\'ve built',
      showTopProjectsOnly: false
    },
    settings: {
      loadingDelay: 0
    }
  }))
}));

// Mock ProjectsCard component
jest.mock('../../components/ProjectsCard', () => ({
  __esModule: true,
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

// Mock Section component
jest.mock('../../components/layout/Section', () => ({
  __esModule: true,
  default: ({ children, title, subtitle, id, className }) => (
    <section data-testid="section-mock" id={id} className={className}>
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
      <div>{children}</div>
    </section>
  )
}));

// Mock SkeletonCard component
jest.mock('../../components/SkeletonCard', () => ({
  __esModule: true,
  default: ({ type }) => (
    <div data-testid={`skeleton-${type}-mock`}></div>
  )
}));

describe('Projects Container Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

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
    require('../../context/PortfolioContext').usePortfolio.mockImplementationOnce(() => ({
      projectsSection: {
        title: 'My Projects',
        subtitle: 'Things I\'ve built',
        showTopProjectsOnly: true
      },
      settings: {
        loadingDelay: 0
      }
    }));
    
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
    require('../../hooks/useProjects').default.mockImplementationOnce(() => null);
    
    render(<Projects />);
    
    // Should show skeleton loaders
    const skeletonCards = screen.getAllByTestId('skeleton-project-mock');
    expect(skeletonCards).toHaveLength(3); // Default is 3 skeleton cards
    
    // Check section title still shows
    expect(screen.getByText('My Projects')).toBeInTheDocument();
  });

  it('displays empty state when no projects are available', () => {
    // Override the useProjects mock to return empty array
    require('../../hooks/useProjects').default.mockImplementationOnce(() => []);
    
    render(<Projects />);
    
    // Should show empty state message
    expect(screen.getByText('No projects are currently available.')).toBeInTheDocument();
  });

  it('does not render section when display is set to false', () => {
    // Override the usePortfolio mock for this test
    require('../../context/PortfolioContext').usePortfolio.mockImplementationOnce(() => ({
      projectsSection: {
        display: false
      }
    }));
    
    const { container } = render(<Projects />);
    
    // Container should be empty
    expect(container.firstChild).toBeNull();
  });

  it('simulates loading delay and renders final content', async () => {
    // Mock a loading delay
    require('../../context/PortfolioContext').usePortfolio.mockImplementationOnce(() => ({
      projectsSection: {
        title: 'My Projects',
        subtitle: 'Things I\'ve built'
      },
      settings: {
        loadingDelay: 500 // 500ms delay
      }
    }));
    
    // Mock a delayed loading
    let resolveLoading;
    const loadingPromise = new Promise(resolve => {
      resolveLoading = resolve;
    });
    
    // Start with null (loading)
    require('../../hooks/useProjects').default.mockImplementationOnce(() => null);
    
    // After delay, return projects
    setTimeout(() => {
      require('../../hooks/useProjects').default.mockImplementationOnce(() => [
        {
          name: 'Project 1',
          desc: 'A cool project',
          stack: ['React']
        }
      ]);
      resolveLoading();
    }, 600);
    
    render(<Projects />);
    
    // Initially showing skeleton
    expect(screen.getAllByTestId('skeleton-project-mock')).toHaveLength(3);
    
    // Wait for the loading to complete
    await act(async () => {
      await loadingPromise;
    });
    
    // After loading completes, should show actual content
    await waitFor(() => {
      expect(screen.getByText('Project 1')).toBeInTheDocument();
    });
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