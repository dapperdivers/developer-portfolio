import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import GithubProfile from '@organisms/GithubProfile';
import axios from 'axios';

// Mock dependencies
jest.mock('axios', () => ({
  create: jest.fn(() => ({
    get: jest.fn()
  })),
  isCancel: jest.fn(() => false)
}));

// Mock the openSource object from portfolio.js
jest.mock('../../portfolio', () => ({
  openSource: {
    githubUserName: 'testuser'
  }
}));

// Mock the Section component
jest.mock('../../components/layout/Section', () => {
  return function MockSection(props) {
    const { children, title, id, ...rest } = props;
    return (
      <div data-testid="github-profile-section" id={id} {...rest}>
        <h2>{title}</h2>
        <div data-testid="section-content">{children}</div>
      </div>
    );
  };
});

// Mock GithubProfileCard component
jest.mock('../../components/GithubProfileCard', () => {
  return function MockGithubProfileCard({ prof, error, onRetry }) {
    return (
      <div data-testid="github-profile-card">
        {prof && <div data-testid="profile-data">{prof.name}</div>}
        {error && <div data-testid="error-message">{error}</div>}
        {onRetry && (
          <button onClick={onRetry} data-testid="retry-button">
            Retry
          </button>
        )}
      </div>
    );
  };
});

// Mock Loading component
jest.mock('../../components/Loading', () => {
  return function MockLoading() {
    return <div data-testid="loading-indicator">Loading...</div>;
  };
});

// Mock localStorage
const mockLocalStorage = (() => {
  let store = {};
  return {
    getItem: jest.fn(key => store[key] || null),
    setItem: jest.fn((key, value) => { store[key] = value; }),
    clear: jest.fn(() => { store = {}; })
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage
});

// Mock framer-motion
jest.mock('framer-motion', () => {
  return {
    motion: {
      div: ({ children, ...props }) => <div {...props}>{children}</div>
    }
  };
});

describe('GithubProfile Container Component', () => {
  const mockProfile = {
    login: 'testuser',
    avatar_url: 'https://example.com/avatar.jpg',
    html_url: 'https://github.com/testuser',
    name: 'Test User',
    bio: 'This is a test bio',
    location: 'Test Location',
    company: 'Test Company'
  };

  beforeEach(() => {
    jest.clearAllMocks();
    window.localStorage.clear();
  });

  it('shows loading state initially', async () => {
    // Setup a delayed response
    const axiosMock = {
      get: jest.fn().mockImplementationOnce(() => new Promise(resolve => {
        setTimeout(() => resolve({ data: mockProfile }), 100);
      }))
    };
    
    axios.create.mockReturnValue(axiosMock);

    render(<GithubProfile />);
    
    // Check that loading indicator is shown
    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();
  });

  it('fetches and displays GitHub profile data', async () => {
    // Setup axios mock to actually return data
    const axiosMock = {
      get: jest.fn().mockResolvedValue({ data: mockProfile })
    };
    axios.create.mockReturnValue(axiosMock);
    
    render(<GithubProfile />);
    
    // Wait for data to be loaded
    await waitFor(() => {
      expect(screen.getByTestId('profile-data')).toBeInTheDocument();
    });
    
    // Check that the GitHub API was called with the correct path
    expect(axiosMock.get).toHaveBeenCalledWith('/users/testuser', expect.any(Object));
    
    // Check that data was cached in localStorage
    expect(window.localStorage.setItem).toHaveBeenCalled();
  });

  it('handles API errors correctly', async () => {
    // Setup error response properly
    const errorMessage = 'API rate limit exceeded';
    const axiosMock = {
      get: jest.fn().mockRejectedValue({
        response: { data: { message: errorMessage } }
      })
    };
    axios.create.mockReturnValue(axiosMock);
    
    render(<GithubProfile />);
    
    // Wait for error state
    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toBeInTheDocument();
    });
    
    // Check that error message is displayed (verify it contains the error text, not exact match)
    expect(screen.getByTestId('error-message').textContent).toContain(errorMessage);
  });

  it('uses cached data when available', async () => {
    // Set up cached data
    window.localStorage.setItem(
      'github-profile-testuser',
      JSON.stringify({
        data: mockProfile,
        timestamp: Date.now()
      })
    );
    
    // Create a mock that would fail if called
    const axiosMock = {
      get: jest.fn().mockRejectedValue(new Error('Should not be called'))
    };
    axios.create.mockReturnValue(axiosMock);
    
    render(<GithubProfile />);
    
    // Wait for data to be loaded
    await waitFor(() => {
      expect(screen.getByTestId('profile-data')).toBeInTheDocument();
    });
    
    // Check that the API was not called
    expect(axiosMock.get).not.toHaveBeenCalled();
  });

  it('retries API call when retry button is clicked', async () => {
    // Setup a mock that will be used for both calls
    const axiosMock = {
      get: jest.fn()
    };
    
    // First call fails, second succeeds
    axiosMock.get
      .mockRejectedValueOnce({
        response: { data: { message: 'Error' } }
      })
      .mockResolvedValueOnce({ data: mockProfile });
    
    axios.create.mockReturnValue(axiosMock);
    
    render(<GithubProfile />);
    
    // Wait for error state
    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toBeInTheDocument();
    });
    
    // Verify retry button and click it
    const retryButton = screen.getByTestId('retry-button');
    act(() => {
      retryButton.click();
    });
    
    // Wait for success state
    await waitFor(() => {
      expect(screen.getByTestId('profile-data')).toBeInTheDocument();
    });
    
    // Check that the API was called twice
    expect(axiosMock.get).toHaveBeenCalledTimes(2);
  });
});