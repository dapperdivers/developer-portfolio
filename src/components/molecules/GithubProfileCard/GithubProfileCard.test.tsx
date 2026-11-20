import { render, screen } from '@testing-library/react';
import GithubProfileCard from './GithubProfileCard';
import type { GithubProfile, GithubProfileCardProps } from './GithubProfileCard';
import type { ProfileAvatarProps } from '@atoms/ProfileAvatar';
import type { ProfileHeaderProps } from '@molecules/ProfileHeader';
import type { ProfileLocationProps } from '@molecules/ProfileLocation/ProfileLocation';
import type { ProfileContentProps } from '@molecules/ProfileContent';

// Mock the child components
vi.mock('@atoms/ProfileAvatar', () => ({
  __esModule: true,
  default: ({ src, alt }: ProfileAvatarProps) => (
    <div data-testid="profile-avatar" data-src={src} data-alt={alt}>
      ProfileAvatar
    </div>
  ),
}));

vi.mock('@molecules/ProfileHeader', () => ({
  __esModule: true,
  default: ({ title, subtitle }: ProfileHeaderProps) => (
    <div data-testid="profile-header" data-title={title} data-subtitle={subtitle}>
      ProfileHeader
    </div>
  ),
}));

vi.mock('@molecules/ProfileLocation', () => ({
  __esModule: true,
  default: ({ location }: ProfileLocationProps) => (
    <div data-testid="profile-location" data-location={location}>
      ProfileLocation
    </div>
  ),
}));

vi.mock('@molecules/ProfileContent', () => ({
  __esModule: true,
  default: ({ email }: ProfileContentProps) => (
    <div data-testid="profile-content" data-email={email}>
      ProfileContent
    </div>
  ),
}));

const siteData: GithubProfileCardProps = {
  greetings: {
    name: 'John Doe',
    title: 'Hi, I am',
    jobTitle: 'Security Engineer',
    description: 'I am a security professional with expertise in secure architecture.'
  },
  securityFacts: ['Security fact 1', 'Security fact 2'],
  githubUserName: 'octocat'
};

describe('GithubProfileCard', () => {
  const mockProfile: GithubProfile = {
    avatar_url: 'https://example.com/avatar.jpg',
    name: 'John Doe',
    location: 'San Francisco, CA'
  };

  const renderCard = (props: GithubProfileCardProps) => render(<GithubProfileCard {...siteData} {...props} />);

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
