import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from '../Footer';
import * as useFooterHook from '../../hooks/useFooter';

// Mock the useFooter hook
jest.mock('../../hooks/useFooter', () => ({
  __esModule: true,
  default: jest.fn()
}));

// Mock the SocialLinks component
jest.mock('../SocialLinks', () => {
  return function MockSocialLinks() {
    return <div data-testid="social-links">Social Links</div>;
  };
});

describe('Footer Component', () => {
  const mockFooterData = {
    currentYear: 2025,
    scrollToTop: jest.fn(),
    greetings: {
      name: 'Derek Mackley'
    },
    socialLinks: {
      github: 'https://github.com/username',
      linkedin: 'https://linkedin.com/in/username'
    }
  };

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
    useFooterHook.default.mockReturnValue(mockFooterData);
  });

  it('renders correctly with all required data', () => {
    render(<Footer />);
    
    // Check that the footer element is rendered
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    
    // Check that the name is displayed
    expect(screen.getByText('Derek Mackley')).toBeInTheDocument();
    
    // Check that the social links component is rendered
    expect(screen.getByTestId('social-links')).toBeInTheDocument();
    
    // Check that Quick Links section is rendered
    expect(screen.getByText('Quick Links')).toBeInTheDocument();
    
    // Check that Contact section is rendered with heading
    expect(screen.getByRole('heading', { name: 'Contact' })).toBeInTheDocument();
    
    // Check that copyright notice is rendered with current year
    expect(screen.getByText(/© 2025 Derek Mackley/)).toBeInTheDocument();
    
    // Check that the back to top button is rendered
    expect(screen.getByLabelText('Back to top')).toBeInTheDocument();
  });

  it('calls scrollToTop function when back to top button is clicked', () => {
    render(<Footer />);
    
    // Find and click the back to top button
    const backToTopButton = screen.getByLabelText('Back to top');
    fireEvent.click(backToTopButton);
    
    // Check that the scrollToTop function was called
    expect(mockFooterData.scrollToTop).toHaveBeenCalledTimes(1);
  });

  it('renders correct links in Quick Links section', () => {
    render(<Footer />);
    
    // Check that all quick links are rendered
    expect(screen.getByText('Home').closest('a')).toHaveAttribute('href', '#main-content');
    expect(screen.getByText('Experience').closest('a')).toHaveAttribute('href', '#experience');
    expect(screen.getByText('Projects').closest('a')).toHaveAttribute('href', '#projects');
    
    // For Contact in Quick Links, need to be more specific as there are multiple elements with this text
    const quickLinksSection = screen.getByText('Quick Links').closest('div');
    const contactLink = within(quickLinksSection).getByText('Contact');
    expect(contactLink.closest('a')).toHaveAttribute('href', '#contact');
  });

  it('renders correct links in Contact section', () => {
    render(<Footer />);
    
    // Check that the email link is rendered correctly
    expect(screen.getByText('contact@derekmackley.com').closest('a'))
      .toHaveAttribute('href', 'mailto:contact@derekmackley.com');
    
    // Check that the resume download link is rendered correctly
    expect(screen.getByText('Download Resume').closest('a'))
      .toHaveAttribute('href', '/files/Derek_Mackley_Resume_2025.pdf');
  });
});