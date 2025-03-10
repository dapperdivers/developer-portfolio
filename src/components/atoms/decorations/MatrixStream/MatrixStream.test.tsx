import React from 'react';
import {  act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import MatrixStream from './MatrixStream';
import { renderWithProviders } from '@/tests/unit/setup';

// Mock the canvas context
const mockContext = {
  fillStyle: '',
  font: '',
  fillText: vi.fn(),
  fillRect: vi.fn(),
  clearRect: vi.fn(),
  textAlign: ''
};

// Mock canvas getContext
HTMLCanvasElement.prototype.getContext = vi.fn().mockReturnValue(mockContext);

// Mock requestAnimationFrame
global.requestAnimationFrame = vi.fn(() => 1);

// Mock cancelAnimationFrame
global.cancelAnimationFrame = vi.fn();

describe('MatrixStream Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockContext.fillStyle = '';
    mockContext.font = '';
    mockContext.textAlign = '';
  });

  it('renders without crashing', () => {
    const { container } = renderWithProviders(<MatrixStream />);
    expect(container.querySelector('.matrix-stream-container')).toBeInTheDocument();
    expect(container.querySelector('.matrix-stream-canvas')).toBeInTheDocument();
  });
  
  it('applies custom className', () => {
    const { container } = renderWithProviders(<MatrixStream className="custom-class" />);
    const element = container.querySelector('.matrix-stream-container');
    expect(element).toHaveClass('custom-class');
  });
  
  it('applies background class when isBackground is true', () => {
    const { container } = renderWithProviders(<MatrixStream isBackground />);
    const element = container.querySelector('.matrix-stream-container');
    expect(element).toHaveClass('matrix-stream-background');
  });

  it('initializes canvas with correct settings', async () => {
    const props = {
      color: '#00FF00',
      fontSize: 24,
      width: 100,
      height: 300
    };

    renderWithProviders(<MatrixStream {...props} />);
    
    // Wait for useEffect and first animation frame
    await act(async () => {
      // Get the draw function that was passed to requestAnimationFrame
      const drawFn = (global.requestAnimationFrame as ReturnType<typeof vi.fn>).mock.calls[0][0];
      // Execute the draw function to trigger the canvas updates
      drawFn();
    });
    
    // Check that canvas was initialized
    expect(HTMLCanvasElement.prototype.getContext).toHaveBeenCalledWith('2d');
    
    // Verify canvas context was configured
    expect(mockContext.fillRect).toHaveBeenCalledWith(0, 0, props.width, props.height);
    expect(mockContext.font).toBe('24px monospace');
    expect(mockContext.textAlign).toBe('center');
    expect(mockContext.fillStyle).toBe(props.color);

    // Verify animation frame was requested
    expect(requestAnimationFrame).toHaveBeenCalled();
  });
  
  it('respects animation settings', () => {
    const { container } = renderWithProviders(
      <MatrixStream />,
      { animationEnabled: false }
    );
    
    const element = container.querySelector('.matrix-stream-container');
    expect(element).toHaveAttribute('data-motion');
    
    const motionProps = JSON.parse(element?.getAttribute('data-motion') || '{}');
    expect(motionProps.animate.opacity).toBe(1);
    expect(motionProps.initial.opacity).toBe(0);
  });
});
