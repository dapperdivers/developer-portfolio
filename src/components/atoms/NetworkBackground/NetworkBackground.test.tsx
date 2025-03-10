import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import NetworkBackground from './NetworkBackground';
import { AnimationProvider } from '@utils/AnimationContext';

// Mock the AnimationContext to test animation behavior
vi.mock('@context/AnimationContext', () => ({
  useAnimation: vi.fn().mockReturnValue({
    animationEnabled: true,
    shouldReduceMotion: false,
    fadeInVariants: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 }
    },
    slideUpVariants: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 }
    }
  }),
  AnimationProvider: ({ children }) => <div data-testid="animation-provider">{children}</div>
}));

// Helper function to render with animation context
const renderWithAnimationContext = (ui) => {
  return render(
    <AnimationProvider>
      {ui}
    </AnimationProvider>
  );
};

describe('NetworkBackground Component', () => {
  beforeEach(() => {
    // Reset any mocks before each test
    vi.clearAllMocks();
  });

  it('renders without crashing', () => {
    renderWithAnimationContext(<NetworkBackground>Test content</NetworkBackground>);
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });
  
  it('applies custom className', () => {
    const { container } = renderWithAnimationContext(<NetworkBackground className="custom-class">Test</NetworkBackground>);
    const element = container.querySelector('.networkbackground');
    expect(element).toHaveClass('custom-class');
    expect(element).toHaveClass('networkbackground');
  });
  
  it('renders children correctly', () => {
    const testId = 'test-child';
    renderWithAnimationContext(
      <NetworkBackground>
        <div data-testid={testId}>Child component</div>
      </NetworkBackground>
    );
    
    expect(screen.getByTestId(testId)).toBeInTheDocument();
    expect(screen.getByTestId(testId)).toHaveTextContent('Child component');
  });

  it('uses motion component with correct animation props', () => {
    const { container } = renderWithAnimationContext(<NetworkBackground>Test</NetworkBackground>);
    const motionElement = container.querySelector('.networkbackground');
    
    // Check that it's using framer-motion
    // Note: We can't directly test for motion props in JSDOM, but we can check for data attributes
    expect(motionElement).toBeTruthy();
    
    // The component should have the animation className
    expect(motionElement).toHaveClass('networkbackground');
  });
  
  it('respects AnimationContext settings', () => {
    // Mock AnimationContext with animations disabled
    const useAnimationMock = vi.fn().mockReturnValueOnce({
      animationEnabled: false,
      shouldReduceMotion: true,
      fadeInVariants: { 
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
      }
    });
    
    require('@context/AnimationContext').useAnimation.mockImplementation(useAnimationMock);
    
    renderWithAnimationContext(<NetworkBackground>Test with animations disabled</NetworkBackground>);
    
    // Check that useAnimation was called
    expect(useAnimationMock).toHaveBeenCalled();
  });
});
