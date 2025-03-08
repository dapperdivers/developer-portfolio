import React from 'react';
import GithubProfileCard from './GithubProfileCard';
import { within, userEvent, expect } from '@storybook/test';
import { mockGithubProfile, withPortfolioContext } from '@stories-utils';

export default {
  title: 'Molecules/GithubProfileCard',
  component: GithubProfileCard,
  tags: ['autodocs'],
  decorators: [withPortfolioContext],
  argTypes: {
    prof: {
      control: 'object',
      description: 'GitHub profile data object'
    },
    error: {
      control: 'text',
      description: 'Error message to display when profile loading fails'
    },
    onRetry: {
      action: 'retried',
      description: 'Callback function when retry button is clicked'
    }
  },
  parameters: {
    docs: {
      description: {
        component: 'A component that displays GitHub profile information with a card layout. Supports loading, error, and success states. Integrates with SocialLinks component for providing contact options.',
      },
    },
    a11y: {
      config: {
        rules: [
          { id: 'button-name', enabled: true },
          { id: 'image-alt', enabled: true }
        ],
      },
    },
  },
};


// Template for the component
const Template = (args) => <GithubProfileCard {...args} />;

// Default story with profile data
export const WithProfile = {
  args: {
  prof: mockGithubProfile
}
};
WithProfile.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);
  
  await step('Initial render check', () => {
    expect(canvas.getByAltText(`${mockGithubProfile.name || 'Profile'} avatar`)).toBeInTheDocument();
    expect(canvas.getByText('Reach Out to Me!')).toBeInTheDocument();
    expect(canvas.getByText(mockGithubProfile.bio)).toBeInTheDocument();
    expect(canvas.getByText(mockGithubProfile.location)).toBeInTheDocument();
  });
};

/**
 * The loading state is shown when no profile data is provided.
 * This occurs when the GitHub API request is still pending or
 * when no profile data is available.
 */
export const Loading = {
  args: {
  prof: null
}
};
Loading.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);
  
  await step('Loading state check', () => {
    expect(canvas.getByText('GitHub Profile Unavailable')).toBeInTheDocument();
    expect(canvas.getByText('Unable to load GitHub profile data. Please try again later.')).toBeInTheDocument();
  });
};

/**
 * The error state displays when there's an issue fetching profile data.
 * It provides a retry button for the user to attempt to fetch the data again.
 */
export const Error = {
  args: {
  prof: null,
  error: 'Failed to fetch GitHub profile. Rate limit exceeded.',
  onRetry: () => console.log('Retry clicked')
}
};
Error.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);
  
  await step('Error state check', () => {
    expect(canvas.getByText('GitHub Profile Unavailable')).toBeInTheDocument();
    expect(canvas.getByText('Failed to fetch GitHub profile. Rate limit exceeded.')).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /retry/i })).toBeInTheDocument();
  });
  
  await step('Retry button interaction', async () => {
    await userEvent.click(canvas.getByRole('button', { name: /retry/i }));
    // In a real test, we would verify that onRetry was called
  });
};

/**
 * ## Component Usage
 * 
 * ```jsx
 * import GithubProfileCard from './GithubProfileCard';
 * 
 * function MyComponent() {
 *   const [profile, setProfile] = useState(null);
 *   const [error, setError] = useState(null);
 *   
 *   const fetchProfile = async () => {
 *     try {
 *       const data = await fetch('https://api.github.com/users/username');
 *       setProfile(await data.json());
 *       setError(null);
 *     } catch (err) {
 *       setError('Failed to fetch profile');
 *     }
 *   };
 *   
 *   return <GithubProfileCard prof={profile} error={error} onRetry={fetchProfile} />;
 * }
 * ```
 * 
 * ## Properties
 * 
 * | Name | Type | Default | Description |
 * |------|------|---------|-------------|
 * | prof | object | null | GitHub profile data object with avatar_url, name, bio, location fields |
 * | error | string | null | Error message to display when profile loading fails |
 * | onRetry | function | undefined | Callback function when retry button is clicked |
 * 
 * ## Accessibility
 * 
 * This component follows these accessibility best practices:
 * - Uses semantic HTML elements for structure
 * - Provides meaningful alt text for the profile image
 * - Ensures proper color contrast for text elements
 * - Includes proper ARIA roles for interactive elements
 * - Has accessible name for the retry button
 * 
 * ## Edge Cases
 * 
 * The following stories demonstrate edge cases and special scenarios.
 */

// Profile with minimal data
export const MinimalProfile = {
  args: {
  prof: {
    avatar_url: "https://via.placeholder.com/150",
    name: "Minimal Profile"
    // No bio or location
  }
}
};

// Responsive behavior example - mobile view
export const Mobile = {
  args: {
  prof: mockGithubProfile
}
};
Mobile.parameters = {
  viewport: {
    defaultViewport: 'mobile1',
  },
};