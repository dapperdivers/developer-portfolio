import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Navigation from './Navigation';
import { vi } from 'vitest';

// Mock the hooks
vi.mock('@hooks/useNavigation', () => ({
  default: () => ({
    isVisible: true,
    greetings: { name: 'Test User' }
  })
}));

vi.mock('@context/AnimationContext', () => ({
  useAnimation: () => ({
    animationEnabled: true
  })
}));

// Mock the components
vi.mock('@/components/atoms/HeaderName', () => ({
  default: ({ name }) => <div data-testid="header-name-mock">{name}</div>
}));

vi.mock('@/components/molecules/SocialLinks', () => ({
  default: () => <div data-testid="social-links-mock">Social Links</div>
}));

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    header: ({ children, animate, ...props }) => (
      <header data-testid="motion-header" data-animate={JSON.stringify(animate)} {...props}>
        {children}
      </header>
    ),
    button: ({ children, ...props }) => (
      <button data-testid="motion-button" {...props}>
        {children}
      </button>
    ),
    div: ({ children, ...props }) => (
      <div data-testid="motion-div" {...props}>
        {children}
      </div>
    ),
    a: ({ children, ...props }) => (
      <a data-testid="motion-link" {...props}>
        {children}
      </a>
    )
  },
  AnimatePresence: ({ children }) => children
}));

describe('Navigation Component', () => {
  it('renders correctly with default props', () => {
    render(<Navigation />);
    expect(screen.getByTestId('header-name-mock')).toBeInTheDocument();
    expect(screen.getByTestId('social-links-mock')).toBeInTheDocument();
  });

  it('applies correct animation when isScrolled is true', () => {
    // Mock useNavigation to return isVisible as true
    vi.mocked(require('@hooks/useNavigation').default).mockImplementation(() => ({
      isVisible: true,
      greetings: { name: 'Test User' }
    }));

    render(<Navigation />);
    const header = screen.getByTestId('motion-header');
    const animateValue = JSON.parse(header.dataset.animate);
    expect(animateValue.y).toBe(0); // When visible, y should be 0
  });

  it('hides when isVisible is false', () => {
    // Mock useNavigation to return isVisible as false
    vi.mocked(require('@hooks/useNavigation').default).mockImplementation(() => ({
      isVisible: false,
      greetings: { name: 'Test User' }
    }));

    render(<Navigation />);
    const header = screen.getByTestId('motion-header');
    const animateValue = JSON.parse(header.dataset.animate);
    expect(animateValue.y).toBe(-100); // When not visible, y should be -100
  });

  it('handles escape key press when menu is open', () => {
    render(<Navigation />);
    
    // Open the menu
    const menuButton = screen.getByTestId('motion-button');
    fireEvent.click(menuButton);
    
    // Simulate escape key press
    fireEvent.keyDown(document, { key: 'Escape' });
    
    // Menu should be closed (no menu items visible)
    expect(screen.queryByText('Home')).not.toBeInTheDocument();
  });
});