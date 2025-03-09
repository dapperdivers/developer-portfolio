import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import Background from './Background';

// Mock the AnimationContext
vi.mock('@context//AnimationContext', () => ({
  useAnimation: () => ({
    animationEnabled: true,
    registerEntryAnimation: vi.fn(),
    playEntryAnimation: vi.fn(),
  }),
}));

describe('Background Component', () => {
  beforeEach(() => {
    // Reset any mocks before each test
    vi.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<Background>Test content</Background>);
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });
  
  it('applies custom className', () => {
    const { container } = render(<Background className="custom-class">Test</Background>);
    const element = container.firstChild;
    expect(element).toHaveClass('custom-class');
    expect(element).toHaveClass('background');
  });
  
  it('renders children correctly', () => {
    const testId = 'test-child';
    render(
      <Background>
        <div data-testid={testId}>Child component</div>
      </Background>
    );
    
    expect(screen.getByTestId(testId)).toBeInTheDocument();
    expect(screen.getByTestId(testId)).toHaveTextContent('Child component');
  });
  
  // Add more tests as needed
});
