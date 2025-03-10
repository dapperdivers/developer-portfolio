import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Footer from '@layout/Footer';
import { vi } from 'vitest';

// Create mock functions for hooks
const mockUseFooter = vi.fn();
const mockUseCallbackHandlers = vi.fn();

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    footer: ({ children, ...props }) => <footer {...props}>{children}</footer>,
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    a: ({ children, ...props }) => <a {...props}>{children}</a>,
    span: ({ children, ...props }) => <span {...props}>{children}</span>
  },
  AnimatePresence: ({ children }) => <>{children}</>
}));

// Mock the useFooter hook
vi.mock('@hooks/useFooter', () => ({
  default: () => mockUseFooter()
}));

// Mock the useCallbackHandlers hook
vi.mock('@/hooks/useCallbackHandlers', () => ({
  default: () => mockUseCallbackHandlers()
}));

// Mock the SocialLinks component
vi.mock('@molecules/SocialLinks', () => ({
  default: () => <div data-testid="social-links">Social Links</div>
}));

// Mock the FaHeart and FaChevronUp icons
vi.mock('react-icons/fa', () => ({
  FaHeart: () => <svg data-testid="heart-icon" />,
  FaChevronUp: () => <svg data-testid="up-icon" />
}));

// Mock AnimationContext
vi.mock('@context/AnimationContext', () => ({
  useAnimation: () => ({
    animationEnabled: true
  })
}));

describe('Footer Component', () => {
  const mockFooterData = {
    currentYear: 2025,
    scrollToTop: vi.fn(),
    greetings: {
      name: 'Derek Mackley'
    }
  };
  
  const mockHandlersData = {
    handleDownload: vi.fn()
  };

  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
    mockUseFooter.mockReturnValue(mockFooterData);
    mockUseCallbackHandlers.mockReturnValue(mockHandlersData);
  });

  it('renders correctly with all required data', () => {
    render(<Footer />);
    
    // Check that the footer element is rendered
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    
    // Check for copyright text with year and name
    const footerText = screen.getByText(/© 2025/);
    expect(footerText).toBeInTheDocument();
    
    // Check that social links component is rendered
    expect(screen.getByTestId('social-links')).toBeInTheDocument();
    
    // Check for navigation links
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Experience')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
    expect(screen.getByText('Resume')).toBeInTheDocument();
    expect(screen.getByText('Contact Card')).toBeInTheDocument();
    
    // Check for "Made with" text (appears twice for responsive layout)
    const madeWithTexts = screen.getAllByText(/Made with/);
    expect(madeWithTexts.length).toBeGreaterThan(0);
    
    // Check for "using React" text
    const usingReactTexts = screen.getAllByText(/using React/);
    expect(usingReactTexts.length).toBeGreaterThan(0);
  });


  it('renders navigation links with correct hrefs', () => {
    render(<Footer />);
    
    // Check that all navigation links have correct hrefs
    expect(screen.getByText('Home').closest('a')).toHaveAttribute('href', '#main-content');
    expect(screen.getByText('Experience').closest('a')).toHaveAttribute('href', '#experience');
    expect(screen.getByText('Projects').closest('a')).toHaveAttribute('href', '#projects');
    expect(screen.getByText('Contact').closest('a')).toHaveAttribute('href', '#contact');
    expect(screen.getByText('Resume').closest('a')).toHaveAttribute('href', '/files/Derek_Mackley_Resume_2025.pdf');
    expect(screen.getByText('Contact Card').closest('a')).toHaveAttribute('href', '/contact/Derek_Mackley.vcf');
  });
  
  it('calls handleDownload when Contact Card link is clicked', () => {
    render(<Footer />);
    
    // Find and click the Contact Card link
    const contactCardLink = screen.getByText('Contact Card');
    fireEvent.click(contactCardLink);
    
    // Check that the handleDownload function was called with correct parameters
    expect(mockHandlersData.handleDownload).toHaveBeenCalledTimes(1);
    expect(mockHandlersData.handleDownload).toHaveBeenCalledWith('/contact/Derek_Mackley.vcf', 'Derek_Mackley.vcf');
  });
});