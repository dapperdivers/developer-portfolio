import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SocialLinks from '@molecules/SocialLinks';
import { vi } from 'vitest';

// Create mock functions for hooks
const mockUseCallbackHandlers = vi.fn();

// Mock the useCallbackHandlers hook
vi.mock('@/hooks/useCallbackHandlers', () => ({
  default: () => mockUseCallbackHandlers()
}));

// Mock the socialLinks and contact data
vi.mock('@/portfolio', () => ({
  socialLinks: {
    github: 'https://github.com/DapperDivers',
    linkedin: 'https://www.linkedin.com/in/dmackley/'
  },
  contact: {
    vcfLink: '/contact/Derek_Mackley.vcf'
  }
}));

// Mock the react-icons
vi.mock('react-icons/fa', () => ({
  FaGithub: () => <svg data-testid="github-icon" />,
  FaLinkedin: () => <svg data-testid="linkedin-icon" />,
  FaAddressCard: () => <svg data-testid="address-card-icon" />
}));

describe('SocialLinks Component', () => {
  const mockHandlers = {
    handleDownload: vi.fn()
  };

  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
    mockUseCallbackHandlers.mockReturnValue(mockHandlers);
  });

  it('renders social links correctly', () => {
    render(<SocialLinks />);
    
    // Check that the GitHub link is rendered
    const githubLink = screen.getByLabelText('GitHub Profile');
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('href', 'https://github.com/DapperDivers');
    
    // Check that the LinkedIn link is rendered
    const linkedinLink = screen.getByLabelText('LinkedIn Profile');
    expect(linkedinLink).toBeInTheDocument();
    expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/dmackley/');
    
    // Check that the Contact Card link is rendered
    const contactCardLink = screen.getByLabelText('Download Contact Card');
    expect(contactCardLink).toBeInTheDocument();
    expect(contactCardLink).toHaveAttribute('href', '/contact/Derek_Mackley.vcf');
  });

  it('calls handleDownload when Contact Card link is clicked', () => {
    render(<SocialLinks />);
    
    // Find and click the Contact Card link
    const contactCardLink = screen.getByLabelText('Download Contact Card');
    fireEvent.click(contactCardLink);
    
    // Check that the handleDownload function was called with correct parameters
    expect(mockHandlers.handleDownload).toHaveBeenCalledTimes(1);
    expect(mockHandlers.handleDownload).toHaveBeenCalledWith('/contact/Derek_Mackley.vcf', 'Derek_Mackley.vcf');
  });
  
  it('accepts and applies additional className prop', () => {
    render(<SocialLinks className="custom-class" />);
    
    // Check that the container includes the custom class
    const container = screen.getByLabelText('GitHub Profile').closest('div');
    expect(container).toHaveClass('custom-class');
  });
});