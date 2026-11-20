import React from 'react';
import { render, screen } from '@testing-library/react';
import GithubProfileCard from './GithubProfileCard';

// Mock the child components
vi.mock('@atoms/ProfileAvatar', () => ({
  __esModule: true,
  default: ({ src, alt }) => (
    <div data-testid="profile-avatar" data-src={src} data-alt={alt}>
      ProfileAvatar
    </div>
  ),
}));

vi.mock('@molecules/ProfileHeader', () => ({
  __esModule: true,
  default: ({ title, subtitle }) => (
    <div data-testid="profile-header" data-title={title} data-subtitle={subtitle}>
      ProfileHeader
    </div>
  ),
}));

vi.mock('@molecules/ProfileLocation', () => ({
  __esModule: true,
  default: ({ location }) => (
    <div data-testid="profile-location" data-location={location}>
      ProfileLocation
    </div>
  ),
}));

vi.mock('@molecules/ProfileContent', () => ({
  __esModule: true,
  default: ({ email }) => (
    <div data-testid="profile-content" data-email={email}>
      ProfileContent
    </div>
  ),
}));

const siteData = {
  greetings: {
    name: 'John Doe',
    title: 'Hi, I am',
    subTitle: 'Security Engineer',
    description: 'I am a security professional with expertise in secure architecture.'
  },
  securityFacts: ['Security fact 1', 'Security fact 2'],
  githubUserName: 'octocat'
};

describe('GithubProfileCard', () => {
  const mockProfile = {
    avatar_url: 'https://example.com/avatar.jpg',
    name: 'John Doe',
    location: 'San Francisco, CA'
  };

  const renderCard = (props) => render(<GithubProfileCard {...siteData} {...props} />);

  test('renders profile data when provided', () => {
    renderCard({ prof: mockProfile });
    
    expect(screen.getByTestId('profile-avatar')).toBeInTheDocument();
    expect(screen.getByTestId('profile-header')).toBeInTheDocument();
    expect(screen.getByTestId('profile-location')).toBeInTheDocument();
    expect(screen.getByTestId('profile-content')).toBeInTheDocument();
    expect(screen.getByTestId('profile-avatar')).toHaveAttribute('data-src', 'https://example.com/avatar.jpg');
    expect(screen.queryByTestId('profile-error')).not.toBeInTheDocument();
  });

  test('API failed: card still renders with fallback avatar', () => {
    renderCard({ prof: null });

    expect(screen.getByTestId('profile-avatar')).toHaveAttribute('data-src', 'https://github.com/octocat.png');
    expect(screen.getByTestId('profile-header')).toBeInTheDocument();
    expect(screen.getByTestId('profile-content')).toBeInTheDocument();
    expect(screen.queryByTestId('profile-error')).not.toBeInTheDocument();
  });

  test('renders full card with fallback avatar when profile is empty', () => {
    renderCard({ prof: {} });

    expect(screen.getByTestId('profile-avatar')).toHaveAttribute('data-src', 'https://github.com/octocat.png');
    expect(screen.getByTestId('profile-content')).toBeInTheDocument();
    expect(screen.queryByTestId('profile-error')).not.toBeInTheDocument();
  });

  test('does not render location when location is not provided', () => {
    const profileWithoutLocation = {
      ...mockProfile,
      location: null
    };
    
    renderCard({ prof: profileWithoutLocation });
    
    expect(screen.queryByTestId('profile-location')).not.toBeInTheDocument();
  });

  test('renders with no site data and no provider', () => {
    render(<GithubProfileCard />);

    expect(screen.getByTestId('profile-avatar')).not.toHaveAttribute('data-src');
    expect(screen.getByTestId('profile-content')).toBeInTheDocument();
    expect(screen.queryByTestId('profile-location')).not.toBeInTheDocument();
  });
});
