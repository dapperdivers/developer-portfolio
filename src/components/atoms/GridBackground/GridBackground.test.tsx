import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import GridBackground from './GridBackground';
import { AnimationProvider } from '@context/AnimationContext';

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

describe('GridBackground Component', () => {
  beforeEach(() => {
    // Reset any mocks before each test
    vi.clearAllMocks();
  });

  it('renders without crashing', () => {
    renderWithAnimationContext(<GridBackground>Test content</GridBackground>);
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });
  
  it('applies custom className', () => {
    const { container } = renderWithAnimationContext(<GridBackground className="custom-class">Test</GridBackground>);
    const element = container.querySelector('.gridbackground');
    expect(element).toHaveClass('custom-class');
    expect(element).toHaveClass('gridbackground');
  });
  
  it('renders children correctly', () => {
    const testId = 'test-child';
    renderWithAnimationContext(
      <GridBackground>
        <div data-testid={testId}>Child component</div>
      </GridBackground>
    );
    
    expect(screen.getByTestId(testId)).toBeInTheDocument();
    expect(screen.getByTestId(testId)).toHaveTextContent('Child component');
  });

  it('uses motion component with correct animation props', () => {
    const { container } = renderWithAnimationContext(<GridBackground>Test</GridBackground>);
    const motionElement = container.querySelector('.gridbackground');
    
    // Check that it's using framer-motion
    // Note: We can't directly test for motion props in JSDOM, but we can check for data attributes
    expect(motionElement).toBeTruthy();
    
    // The component should have the animation className
    expect(motionElement).toHaveClass('gridbackground');
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
    
    renderWithAnimationContext(<GridBackground>Test with animations disabled</GridBackground>);
    
    // Check that useAnimation was called
    expect(useAnimationMock).toHaveBeenCalled();
  });
});
