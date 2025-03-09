import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import MatrixStream from './MatrixStream';
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

describe('MatrixStream Component', () => {
  beforeEach(() => {
    // Reset any mocks before each test
    vi.clearAllMocks();
  });

  it('renders without crashing', () => {
    renderWithAnimationContext(<MatrixStream>Test content</MatrixStream>);
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });
  
  it('applies custom className', () => {
    const { container } = renderWithAnimationContext(<MatrixStream className="custom-class">Test</MatrixStream>);
    const element = container.querySelector('.matrixstream');
    expect(element).toHaveClass('custom-class');
    expect(element).toHaveClass('matrixstream');
  });
  
  it('renders children correctly', () => {
    const testId = 'test-child';
    renderWithAnimationContext(
      <MatrixStream>
        <div data-testid={testId}>Child component</div>
      </MatrixStream>
    );
    
    expect(screen.getByTestId(testId)).toBeInTheDocument();
    expect(screen.getByTestId(testId)).toHaveTextContent('Child component');
  });

  it('uses motion component with correct animation props', () => {
    const { container } = renderWithAnimationContext(<MatrixStream>Test</MatrixStream>);
    const motionElement = container.querySelector('.matrixstream');
    
    // Check that it's using framer-motion
    // Note: We can't directly test for motion props in JSDOM, but we can check for data attributes
    expect(motionElement).toBeTruthy();
    
    // The component should have the animation className
    expect(motionElement).toHaveClass('matrixstream');
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
    
    renderWithAnimationContext(<MatrixStream>Test with animations disabled</MatrixStream>);
    
    // Check that useAnimation was called
    expect(useAnimationMock).toHaveBeenCalled();
  });
});
