import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import Navigation from './Navigation';
import { vi } from 'vitest';
import { renderWithProviders } from '@/tests/unit/setup';

// Mock the hooks
const mockUseNavigation = vi.fn(() => ({
  isVisible: true,
  greetings: { name: 'Test User' }
}));

vi.mock('@hooks/useNavigation', () => ({
  default: () => mockUseNavigation()
}));

vi.mock('@context/AnimationContext', () => ({
  useAnimation: () => ({
    animationEnabled: true,
    slideUpVariants: {
      hidden: { y: -20, opacity: 0 },
      visible: { y: 0, opacity: 1 }
    }
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
    header: ({ children, animate, initial, variants, ...props }) => (
      <header 
        data-testid="motion-header" 
        data-animate={JSON.stringify(animate)}
        data-initial={JSON.stringify(initial)}
        data-variants={JSON.stringify(variants)}
        {...props}
      >
        {children}
      </header>
    ),
    button: ({ children, whileHover, whileTap, ...props }) => (
      <button 
        data-testid="motion-button"
        data-while-hover={JSON.stringify(whileHover)}
        data-while-tap={JSON.stringify(whileTap)}
        {...props}
      >
        {children}
      </button>
    ),
    div: ({ children, ...props }) => (
      <div data-testid="motion-div" {...props}>
        {children}
      </div>
    ),
    a: ({ children, whileHover, whileTap, ...props }) => (
      <a 
        data-testid="motion-link"
        data-while-hover={JSON.stringify(whileHover)}
        data-while-tap={JSON.stringify(whileTap)}
        {...props}
      >
        {children}
      </a>
    )
  },
  AnimatePresence: ({ children }) => children
}));

describe('Navigation Component', () => {
  beforeEach(() => {
    mockUseNavigation.mockImplementation(() => ({
      isVisible: true,
      greetings: { name: 'Test User' }
    }));
  });

  afterEach(() => {
    mockUseNavigation.mockReset();
  });

  it('renders correctly with default props', () => {
    renderWithProviders(<Navigation />);
    expect(screen.getByTestId('header-name-mock')).toBeInTheDocument();
    expect(screen.getByTestId('social-links-mock')).toBeInTheDocument();
  });

  it('applies correct animation when visible', () => {
    mockUseNavigation.mockImplementation(() => ({
      isVisible: true,
      greetings: { name: 'Test User' }
    }));

    renderWithProviders(<Navigation />);
    const header = screen.getByTestId('motion-header');
    const animateValue = JSON.parse(header.dataset.animate);
    const initialValue = JSON.parse(header.dataset.initial);
    const variants = JSON.parse(header.dataset.variants);

    expect(initialValue).toBe('hidden');
    expect(animateValue).toBe('visible');
    expect(variants).toEqual({
      hidden: { y: -20, opacity: 0 },
      visible: { y: 0, opacity: 1 }
    });
  });

  it('hides when isVisible is false', () => {
    mockUseNavigation.mockImplementation(() => ({
      isVisible: false,
      greetings: { name: 'Test User' }
    }));

    renderWithProviders(<Navigation />);
    const header = screen.getByTestId('motion-header');
    const animateValue = JSON.parse(header.dataset.animate);
    expect(animateValue).toBe('hidden');
  });

  it('handles escape key press when menu is open', () => {
    mockUseNavigation.mockImplementation(() => ({
      isVisible: true,
      greetings: { name: 'Test User' },
      isMenuOpen: true,
      setIsMenuOpen: vi.fn()
    }));

    renderWithProviders(<Navigation />);
    
    // Simulate escape key press
    fireEvent.keyDown(document, { key: 'Escape' });
    
    // Menu should be closed (no menu items visible)
    expect(screen.queryByText('Home')).not.toBeInTheDocument();
  });

  it('applies hover and tap animations to buttons', () => {
    renderWithProviders(<Navigation />);
    
    const button = screen.getByTestId('motion-button');
    const whileHover = JSON.parse(button.dataset.whileHover);
    const whileTap = JSON.parse(button.dataset.whileTap);

    expect(whileHover).toEqual({ scale: 1.05 });
    expect(whileTap).toEqual({ scale: 0.95 });
  });
});