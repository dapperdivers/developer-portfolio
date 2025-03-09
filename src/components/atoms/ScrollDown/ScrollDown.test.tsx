import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import ScrollDown from './ScrollDown';

describe('ScrollDown Component', () => {
  beforeEach(() => {
    // Reset any mocks before each test
    vi.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<ScrollDown>Test content</ScrollDown>);
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });
  
  it('applies custom className', () => {
    const { container } = render(<ScrollDown className="custom-class">Test</ScrollDown>);
    const element = container.firstChild;
    expect(element).toHaveClass('custom-class');
    expect(element).toHaveClass('scrolldown');
  });
  
  it('renders children correctly', () => {
    const testId = 'test-child';
    render(
      <ScrollDown>
        <div data-testid={testId}>Child component</div>
      </ScrollDown>
    );
    
    expect(screen.getByTestId(testId)).toBeInTheDocument();
    expect(screen.getByTestId(testId)).toHaveTextContent('Child component');
  });
  
  // Add more tests as needed
});
