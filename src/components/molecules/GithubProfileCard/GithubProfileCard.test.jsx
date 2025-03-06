import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import GithubProfileCard from '@molecules/__tests__/GithubProfileCard';

// Mock the SocialLinks component
jest.mock('./SocialLinks', () => {
  return function MockSocialLinks() {
    return <div data-testid="social-links">Social Links</div>;
  };
});

// Mock the Button component
jest.mock('./ui/Button', () => {
  return function MockButton({ children, onClick, className }) {
    return (
      <button 
        onClick={onClick} 
        className={className}
        data-testid="mock-button"
      >
        {children}
      </button>
    );
  };
});

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => {
  return {
    motion: {
      div: ({ children, ...props }) => <div {...props}>{children}</div>
    }
  };
});

describe('GithubProfileCard Component', () => {
  const mockProfile = {
    login: 'testuser',
    avatar_url: 'https://example.com/avatar.jpg',
    html_url: 'https://github.com/testuser',
    name: 'Test User',
    bio: 'This is a test bio',
    location: 'Test Location',
    company: 'Test Company'
  };
  
  it('renders with profile data correctly', () => {
    render(<GithubProfileCard prof={mockProfile} />);
    
    // Check that the card renders
    expect(screen.getByTestId('github-profile-card')).toBeInTheDocument();
    
    // Check that profile information is displayed
    expect(screen.getByAltText('Test User avatar')).toBeInTheDocument();
    expect(screen.getByText('Reach Out to Me!')).toBeInTheDocument();
    expect(screen.getByText('This is a test bio')).toBeInTheDocument();
    expect(screen.getByText('Test Location')).toBeInTheDocument();
    
    // Check that social links component is rendered
    expect(screen.getByTestId('social-links')).toBeInTheDocument();
  });
  
  it('renders error state correctly', () => {
    const errorMessage = 'GitHub API rate limit exceeded';
    render(<GithubProfileCard prof={null} error={errorMessage} onRetry={jest.fn()} />);
    
    // Check that error message is displayed
    expect(screen.getByText('GitHub Profile Unavailable')).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    
    // Check that retry button is rendered
    expect(screen.getByTestId('mock-button')).toBeInTheDocument();
  });
  
  it('calls onRetry when retry button is clicked', () => {
    const mockRetry = jest.fn();
    render(<GithubProfileCard prof={null} error="Error message" onRetry={mockRetry} />);
    
    // Click the retry button
    fireEvent.click(screen.getByTestId('mock-button'));
    
    // Check that onRetry was called
    expect(mockRetry).toHaveBeenCalledTimes(1);
  });
  
  it('renders the default error message when no error is provided', () => {
    render(<GithubProfileCard prof={null} />);
    
    // Check that the default error message is displayed
    expect(screen.getByText('Unable to load GitHub profile data. Please try again later.')).toBeInTheDocument();
  });
  
  it('renders profile with minimal data correctly', () => {
    const minimalProfile = {
      avatar_url: 'https://example.com/avatar.jpg'
    };
    
    render(<GithubProfileCard prof={minimalProfile} />);
    
    // Check that the profile is rendered with avatar but without other fields
    expect(screen.getByAltText('Profile avatar')).toBeInTheDocument();
    expect(screen.queryByText('This is a test bio')).not.toBeInTheDocument();
    expect(screen.queryByText('Test Location')).not.toBeInTheDocument();
  });
});