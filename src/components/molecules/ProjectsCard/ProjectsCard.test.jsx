import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProjectsCard from '@molecules/ProjectsCard';
import { vi } from 'vitest';

// Mock the Card component
vi.mock('@atoms/Card', () => ({
  default: ({ children, className, animation, hoverable, shadow }) => (
    <div 
      data-testid="card-mock" 
      className={className}
      data-animation={JSON.stringify(animation)}
      data-hoverable={hoverable}
      data-shadow={shadow}
    >
      {children}
    </div>
  )
}));

// Mock the Button component
vi.mock('@atoms/Button', () => ({
  default: ({ children, className, href, variant, size, icon, ariaLabel, target, rel, onClick }) => (
    <button
      data-testid={`button-${variant}`}
      className={className}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {icon && <span data-testid={`icon-${icon}`}></span>}
      {children}
      <span className="mock-props" data-href={href} data-target={target} data-rel={rel}></span>
    </button>
  )
}));

// Mock the ResponsiveImage component
vi.mock('@atoms/ResponsiveImage', () => ({
  default: ({ src, alt, className, lazy, width, height, sizes }) => (
    <img
      data-testid="responsive-image-mock"
      src={src}
      alt={alt}
      className={className}
      data-lazy={lazy}
      data-width={width}
      data-height={height}
      data-sizes={sizes}
    />
  )
}));

// Mock the useIntersectionObserver hook
vi.mock('@hooks/useIntersectionObserver', () => ({
  default: () => [vi.fn(), true] // [ref, isInView]
}));

describe('ProjectsCard Integration Tests', () => {
  const mockProjectData = {
    name: 'Test Project',
    desc: 'This is a test project description',
    image: '/test-image.jpg',
    github: 'https://github.com/user/test-project',
    link: 'https://test-project.com',
    stack: ['React', 'Node.js', 'MongoDB']
  };

  it('renders all project information correctly', () => {
    render(<ProjectsCard data={mockProjectData} index={0} />);
    
    // Check project title and description
    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(screen.getByText('This is a test project description')).toBeInTheDocument();
    
    // Check tech stack
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Node.js')).toBeInTheDocument();
    expect(screen.getByText('MongoDB')).toBeInTheDocument();
    
    // Check if buttons are rendered
    expect(screen.getByText('Code')).toBeInTheDocument();
    expect(screen.getByText('Demo')).toBeInTheDocument();
    
    // Check if image is rendered with correct props
    const image = screen.getByTestId('responsive-image-mock');
    expect(image).toHaveAttribute('src', '/test-image.jpg');
    expect(image).toHaveAttribute('alt', 'Test Project project screenshot');
    expect(image).toHaveAttribute('data-lazy', 'true');
  });

  it('properly sets up links for GitHub and demo', () => {
    render(<ProjectsCard data={mockProjectData} index={0} />);
    
    // Check GitHub button
    const githubButton = screen.getByText('Code').closest('button');
    expect(githubButton).toHaveAttribute('data-testid', 'button-light');
    expect(githubButton.querySelector('.mock-props')).toHaveAttribute('data-href', 'https://github.com/user/test-project');
    expect(githubButton.querySelector('.mock-props')).toHaveAttribute('data-target', '_blank');
    expect(githubButton.querySelector('.mock-props')).toHaveAttribute('data-rel', 'noopener noreferrer');
    
    // Check demo button
    const demoButton = screen.getByText('Demo').closest('button');
    expect(demoButton).toHaveAttribute('data-testid', 'button-primary');
    expect(demoButton.querySelector('.mock-props')).toHaveAttribute('data-href', 'https://test-project.com');
    expect(demoButton.querySelector('.mock-props')).toHaveAttribute('data-target', '_blank');
    expect(demoButton.querySelector('.mock-props')).toHaveAttribute('data-rel', 'noopener noreferrer');
  });

  it('renders without image when no image is provided', () => {
    const dataWithoutImage = {
      ...mockProjectData,
      image: undefined
    };
    
    render(<ProjectsCard data={dataWithoutImage} index={0} />);
    
    // Image container should not exist
    expect(screen.queryByTestId('responsive-image-mock')).not.toBeInTheDocument();
  });

  it('renders without GitHub link when no github url is provided', () => {
    const dataWithoutGithub = {
      ...mockProjectData,
      github: undefined
    };
    
    render(<ProjectsCard data={dataWithoutGithub} index={0} />);
    
    // GitHub button should not exist
    expect(screen.queryByText('Code')).not.toBeInTheDocument();
    
    // Demo button should still exist
    expect(screen.getByText('Demo')).toBeInTheDocument();
  });

  it('renders without demo link when no demo url is provided', () => {
    const dataWithoutDemo = {
      ...mockProjectData,
      link: undefined
    };
    
    render(<ProjectsCard data={dataWithoutDemo} index={0} />);
    
    // Demo button should not exist
    expect(screen.queryByText('Demo')).not.toBeInTheDocument();
    
    // GitHub button should still exist
    expect(screen.getByText('Code')).toBeInTheDocument();
  });

  it('renders without tech stack when no stack is provided', () => {
    const dataWithoutStack = {
      ...mockProjectData,
      stack: undefined
    };
    
    render(<ProjectsCard data={dataWithoutStack} index={0} />);
    
    // Tech stack should not exist
    expect(screen.queryByText('React')).not.toBeInTheDocument();
    expect(screen.queryByText('Node.js')).not.toBeInTheDocument();
    expect(screen.queryByText('MongoDB')).not.toBeInTheDocument();
  });

  it('passes correct animation properties based on index', () => {
    render(<ProjectsCard data={mockProjectData} index={2} />);
    
    const card = screen.getByTestId('card-mock');
    const animationData = JSON.parse(card.getAttribute('data-animation'));
    
    // Check that animation object is structured correctly
    expect(animationData).toHaveProperty('initial');
    expect(animationData).toHaveProperty('animate');
    expect(animationData).toHaveProperty('transition');
    
    // Check transition delay is affected by index
    expect(animationData.transition.delay).toBe(0.1 * (2 % 3));
  });

  it('applies correct accessibility attributes', () => {
    render(<ProjectsCard data={mockProjectData} index={0} />);
    
    // Check title is focusable
    const title = screen.getByText('Test Project');
    expect(title).toHaveAttribute('tabIndex', '0');
    
    // Check description is focusable
    const desc = screen.getByText('This is a test project description');
    expect(desc).toHaveAttribute('tabIndex', '0');
    
    // Check tech stack container has proper aria-label
    const techStack = screen.getByText('React').closest('.tech-stack');
    expect(techStack).toHaveAttribute('aria-label', 'Technologies used');
    
    // Check GitHub button has proper aria-label
    const githubButton = screen.getByText('Code').closest('button');
    expect(githubButton).toHaveAttribute('aria-label', 'View Test Project source code on GitHub');
    
    // Check demo button has proper aria-label
    const demoButton = screen.getByText('Demo').closest('button');
    expect(demoButton).toHaveAttribute('aria-label', 'View Test Project live demo');
  });

  it('renders consistently when re-rendered with same props', () => {
    const { rerender } = render(<ProjectsCard data={mockProjectData} index={0} />);
    
    // Check initial render
    expect(screen.getByText('Test Project')).toBeInTheDocument();
    
    // Re-render with same props
    rerender(<ProjectsCard data={mockProjectData} index={0} />);
    
    // Should still render correctly
    expect(screen.getByText('Test Project')).toBeInTheDocument();
  });

  it('updates correctly when props change', () => {
    const { rerender } = render(<ProjectsCard data={mockProjectData} index={0} />);
    
    // Check initial render
    expect(screen.getByText('Test Project')).toBeInTheDocument();
    
    // Updated project data
    const updatedData = {
      ...mockProjectData,
      name: 'Updated Project',
      desc: 'This is an updated description'
    };
    
    // Re-render with new props
    rerender(<ProjectsCard data={updatedData} index={0} />);
    
    // Should render updated content
    expect(screen.getByText('Updated Project')).toBeInTheDocument();
    expect(screen.getByText('This is an updated description')).toBeInTheDocument();
  });
});