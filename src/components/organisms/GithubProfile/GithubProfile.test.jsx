import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

const { getMock } = vi.hoisted(() => ({ getMock: vi.fn() }));

vi.mock('axios', () => {
  const axios = {
    create: () => ({ get: getMock }),
    isCancel: () => false
  };
  return { __esModule: true, default: axios };
});

vi.mock('@context/AnimationContext', () => ({
  useAnimation: () => ({
    animationEnabled: false,
    animationStaggerDelay: 0,
    fadeInVariants: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
    slideUpVariants: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 }
    }
  })
}));

vi.mock('../../layout/Section', () => ({
  __esModule: true,
  default: ({ children }) => <section>{children}</section>
}));

vi.mock('@molecules/GithubProfileCard', () => ({
  __esModule: true,
  default: ({ prof }) => (
    <div data-testid="github-profile-card" data-avatar={prof?.avatar_url || ''} />
  )
}));

vi.mock('@/portfolio', () => ({
  greetings: { name: 'John Doe', title: 'Hi, I am' },
  securityFacts: ['Security fact 1'],
  openSource: { githubUserName: 'octocat' },
  profileLinks: { github: 'https://github.com/octocat' }
}));

import GithubProfile from './GithubProfile';

describe('GithubProfile', () => {
  beforeEach(() => {
    getMock.mockReset();
    localStorage.clear();
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('renders the card immediately, before the API answers', () => {
    getMock.mockReturnValue(new Promise(() => {}));
    render(<GithubProfile />);
    expect(screen.getByTestId('github-profile-card')).toBeInTheDocument();
  });

  test('API failed: card still renders with no profile data', async () => {
    getMock.mockRejectedValue({ response: { data: { message: 'API rate limit exceeded' } } });
    render(<GithubProfile />);

    await waitFor(() => expect(getMock).toHaveBeenCalled());
    const card = screen.getByTestId('github-profile-card');
    expect(card).toBeInTheDocument();
    expect(card).toHaveAttribute('data-avatar', '');
  });

  test('passes the API avatar to the card when the call succeeds', async () => {
    getMock.mockResolvedValue({ data: { avatar_url: 'https://example.com/a.png', login: 'octocat' } });
    render(<GithubProfile />);

    await waitFor(() =>
      expect(screen.getByTestId('github-profile-card')).toHaveAttribute('data-avatar', 'https://example.com/a.png')
    );
  });
});
