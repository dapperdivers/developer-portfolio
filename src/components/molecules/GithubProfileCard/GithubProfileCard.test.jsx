import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import GithubProfileCard from './GithubProfileCard';
import { AnimationProvider } from '@context/AnimationContext';

// Mock the child components
jest.mock('@atoms/ProfileAvatar', () => ({ src, alt }) => (
  <div data-testid="profile-avatar" data-src={src} data-alt={alt}>
    ProfileAvatar
  </div>
));

jest.mock('@molecules/ProfileHeader', () => ({ title, subtitle }) => (
  <div data-testid="profile-header" data-title={title} data-subtitle={subtitle}>
    ProfileHeader
  </div>
));

jest.mock('@molecules/ProfileLocation', () => ({ location }) => (
  <div data-testid="profile-location" data-location={location}>
    ProfileLocation
  </div>
));

jest.mock('@molecules/ProfileContent', () => ({ email }) => (
  <div data-testid="profile-content" data-email={email}>
    ProfileContent
  </div>
));

jest.mock('@molecules/ProfileError', () => ({ message, onRetry }) => (
  <div data-testid="profile-error" data-message={message} onClick={onRetry}>
    ProfileError
  </div>
));

// Mock the portfolio data
jest.mock('@/portfolio', () => ({
  greetings: {
    name: 'John Doe',
    title: 'Hi, I am',
    subTitle: 'Security Engineer',
    description: 'I am a security professional with expertise in secure architecture.'
  },
  securityFacts: ['Security fact 1', 'Security fact 2']
}));

describe('GithubProfileCard', () => {
  const mockProfile = {
    avatar_url: 'https://example.com/avatar.jpg',
    name: 'John Doe',
    location: 'San Francisco, CA'
  };

  const renderWithContext = (ui) => {
    return render(
      <AnimationProvider>
        {ui}
      </AnimationProvider>
    );
  };

  test('renders profile data when provided', () => {
    renderWithContext(<GithubProfileCard prof={mockProfile} />);
    
    expect(screen.getByTestId('profile-avatar')).toBeInTheDocument();
    expect(screen.getByTestId('profile-header')).toBeInTheDocument();
    expect(screen.getByTestId('profile-location')).toBeInTheDocument();
    expect(screen.getByTestId('profile-content')).toBeInTheDocument();
    expect(screen.queryByTestId('profile-error')).not.toBeInTheDocument();
  });

  test('renders error state when error is provided', () => {
    const errorMessage = 'API rate limit exceeded';
    const onRetry = jest.fn();
    
    renderWithContext(
      <GithubProfileCard 
        prof={null} 
        error={errorMessage} 
        onRetry={onRetry} 
      />
    );
    
    expect(screen.getByTestId('profile-error')).toBeInTheDocument();
    expect(screen.queryByTestId('profile-avatar')).not.toBeInTheDocument();
    
    // Test retry functionality
    fireEvent.click(screen.getByTestId('profile-error'));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  test('renders error state when profile is empty', () => {
    renderWithContext(<GithubProfileCard prof={{}} error={null} />);
    
    expect(screen.getByTestId('profile-error')).toBeInTheDocument();
    expect(screen.queryByTestId('profile-avatar')).not.toBeInTheDocument();
  });

  test('does not render location when location is not provided', () => {
    const profileWithoutLocation = {
      ...mockProfile,
      location: null
    };
    
    renderWithContext(<GithubProfileCard prof={profileWithoutLocation} />);
    
    expect(screen.queryByTestId('profile-location')).not.toBeInTheDocument();
  });
});