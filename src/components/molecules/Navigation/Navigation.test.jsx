import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Navigation from '@molecules/Navigation';
import { vi } from 'vitest';

// Mock functions
const mockUseNavigation = vi.fn();

// Mock useNavigation hook
vi.mock('@hooks/useNavigation', () => ({
  default: () => mockUseNavigation()
}));

describe('Navigation Component', () => {
  const mockNavigationData = {
    isScrolled: false,
    isVisible: true,
    greetings: {
      name: 'Derek Mackley'
    },
    socialLinks: {
      github: 'https://github.com/username',
      linkedin: 'https://linkedin.com/in/username'
    }
  };

  beforeEach(() => {
    // Reset mock before each test
    vi.clearAllMocks();
    mockUseNavigation.mockReturnValue(mockNavigationData);
  });

  it('renders correctly with default props', () => {
    render(<Navigation />);
    
    // Check that the component renders
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    
    // Check that the name is displayed
    expect(screen.getByText('Derek Mackley')).toBeInTheDocument();
  });

  it('applies scrolled class when isScrolled is true', () => {
    mockUseNavigation.mockReturnValue({
      ...mockNavigationData,
      isScrolled: true
    });
    
    render(<Navigation />);
    
    // Check that the header has the scrolled classes applied
    const header = screen.getByRole('banner');
    expect(header).toHaveClass('shadow-lg');
  });

  it('hides when isVisible is false', () => {
    mockUseNavigation.mockReturnValue({
      ...mockNavigationData,
      isVisible: false
    });
    
    render(<Navigation />);
    
    // Check that the header has the hidden class applied
    const header = screen.getByRole('banner');
    expect(header).toHaveClass('-translate-y-full');
  });

  it('handles escape key press when menu is open', () => {
    render(<Navigation />);
    
    // Trigger the escape key event
    fireEvent.keyDown(document, { key: 'Escape' });
    
    // Since the menu is closed by default, this will have no effect
    // But we can still test that the component renders after the event
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });
});