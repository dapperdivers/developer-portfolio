import React from 'react';
import { screen } from '@testing-library/react';
import ProjectsCard from './ProjectsCard';
import { vi } from 'vitest';
import { renderWithProviders } from '@/tests/unit/setup';

// Mock the Card component
vi.mock('@atoms/Card', () => ({
  default: ({ children, animation, ...props }) => (
    <div data-testid="mock-card" data-animation={JSON.stringify(animation)} {...props}>
      {children}
    </div>
  )
}));

// Mock the Button component
vi.mock('@atoms/Button', () => ({
  default: ({ children, ...props }) => (
    <button {...props}>{children}</button>
  )
}));

// Mock the ResponsiveImage component
vi.mock('@atoms/ResponsiveImage', () => ({
  default: ({ alt, src, ...props }) => (
    <img alt={alt} src={src} {...props} />
  )
}));

describe('ProjectsCard Integration Tests', () => {
  const mockProject = {
    name: 'Test Project',
    desc: 'A test project description',
    image: '/test-image.jpg',
    github: 'https://github.com/test',
    link: 'https://test.com',
    stack: ['React', 'Node.js']
  };

  it('renders project information correctly', () => {
    renderWithProviders(<ProjectsCard data={mockProject} index={0} />);

    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(screen.getByText('A test project description')).toBeInTheDocument();
    expect(screen.getByAltText('Test Project project screenshot')).toHaveAttribute('src', '/test-image.jpg');
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Node.js')).toBeInTheDocument();
  });

  it('applies correct animation based on index', () => {
    renderWithProviders(<ProjectsCard data={mockProject} index={2} />);

    const card = screen.getByTestId('mock-card');
    const animation = JSON.parse(card.dataset.animation);

    expect(animation).toEqual({
      variants: expect.any(Object), // We don't need to test the exact variant object
      initial: 'hidden',
      whileInView: 'visible',
      viewport: { once: true },
      transition: {
        delay: 0.2
      }
    });
  });

  it('handles missing project image gracefully', () => {
    const projectWithoutImage = { ...mockProject, image: undefined };
    renderWithProviders(<ProjectsCard data={projectWithoutImage} index={0} />);

    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('handles missing project links gracefully', () => {
    const projectWithoutLinks = { ...mockProject, github: undefined, link: undefined };
    renderWithProviders(<ProjectsCard data={projectWithoutLinks} index={0} />);

    expect(screen.queryByText('Code')).not.toBeInTheDocument();
    expect(screen.queryByText('Demo')).not.toBeInTheDocument();
  });

  it('has correct accessibility attributes', () => {
    renderWithProviders(<ProjectsCard data={mockProject} index={0} />);

    const card = screen.getByTestId('mock-card');
    expect(card).toHaveAttribute('role', 'article');
    expect(card).toHaveAttribute('aria-label', `Project: ${mockProject.name}`);
    expect(screen.getByRole('heading')).toHaveTextContent('Test Project');
    expect(screen.getByAltText('Test Project project screenshot')).toBeInTheDocument();
  });

  it('disables animations when animation context is disabled', () => {
    renderWithProviders(<ProjectsCard data={mockProject} index={0} />, { animationEnabled: false });
    
    const card = screen.getByTestId('mock-card');
    const animation = JSON.parse(card.dataset.animation);
    expect(animation).toEqual({
      variants: expect.any(Object), // We don't need to test the exact variant object
      initial: 'visible',
      whileInView: 'visible',
      viewport: { once: true },
      transition: {
        delay: 0
      }
    });
  });
});