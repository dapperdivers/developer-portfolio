import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import ScrollDown from './ScrollDown';

describe('ScrollDown Component', () => {
  beforeEach(() => {
    // Reset any mocks before each test
    vi.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<ScrollDown />);
    // Check for the default label
    expect(screen.getByText('>>_NEXT')).toBeInTheDocument();
  });
  
  it('applies custom className', () => {
    const { container } = render(<ScrollDown className="custom-class" />);
    const element = container.firstChild;
    expect(element).toHaveClass('custom-class');
    expect(element).toHaveClass('scroll-down-container');
  });
  
  it('renders custom label', () => {
    const customLabel = 'Custom Label';
    render(<ScrollDown label={customLabel} />);
    expect(screen.getByText(customLabel)).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = vi.fn();
    render(<ScrollDown onClick={handleClick} />);
    
    // Find the button and click it
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  
  // Add more tests as needed
});
