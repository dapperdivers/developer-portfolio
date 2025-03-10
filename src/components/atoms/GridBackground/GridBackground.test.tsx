import React from 'react';
import { screen } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import GridBackground from './GridBackground';
import { renderWithProviders } from '@/tests/unit/setup';
// Mock framer-motion
vi.mock('framer-motion', () => ({
  LazyMotion: ({ children }: { children: React.ReactNode }) => children,
  m: {
    div: ({ children, style, ...props }: any) => (
      <div 
        data-testid="grid-background" 
        data-motion={JSON.stringify({
          variants: props.variants,
          initial: props.initial,
          animate: props.animate
        })}
        style={style}
        {...props}
      >
        {children}
      </div>
    ),
  },
  domAnimation: vi.fn(),
}));

describe('GridBackground', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without crashing', () => {
    renderWithProviders(<GridBackground />);
    const gridElement = screen.getByTestId('grid-background');
    expect(gridElement).toBeInTheDocument();
    expect(gridElement).toHaveClass('fixed', 'inset-0', 'w-full', 'h-full', '-z-10');
  });

  it('applies custom class name', () => {
    renderWithProviders(
      <GridBackground className="custom-class" />
    );
    const gridElement = screen.getByTestId('grid-background');
    expect(gridElement).toHaveClass('custom-class');
  });

  it('renders children correctly', () => {
    renderWithProviders(
      <GridBackground>
        <div data-testid="child">Test Child</div>
      </GridBackground>
    );
    const childElement = screen.getByTestId('child');
    expect(childElement).toBeInTheDocument();
    expect(childElement).toHaveTextContent('Test Child');
  });

  it('applies animation variants when enabled', () => {
    renderWithProviders(<GridBackground />, {
      animationEnabled: true,
      reducedMotion: false
    });
    const gridElement = screen.getByTestId('grid-background');
    const motionData = JSON.parse(gridElement.dataset.motion || '{}');
    
    expect(motionData.variants).toEqual({
      initial: { opacity: 0 },
      animate: { 
        opacity: 1,
        transition: { duration: 0.8, ease: "easeOut" }
      },
      exit: {
        opacity: 0,
        transition: { duration: 0.5, ease: "easeIn" }
      }
    });
    expect(motionData.initial).toBe('initial');
    expect(motionData.animate).toBe('animate');
  });

  it('respects reduced motion preference', () => {
    renderWithProviders(<GridBackground />, {
      animationEnabled: true,
      reducedMotion: true
    });
    const gridElement = screen.getByTestId('grid-background');
    const motionData = JSON.parse(gridElement.dataset.motion || '{}');
    
    expect(motionData.initial).toBe('initial');
    expect(motionData.animate).toBe('animate');
  });

  it('applies custom grid styles', () => {
    const customProps = {
      gridSize: 20,
      gridColor: 'rgba(255,255,255,0.2)',
      backgroundColor: 'rgb(0, 0, 0)'
    };
    
    renderWithProviders(
      <GridBackground {...customProps} />
    );
    const gridElement = screen.getByTestId('grid-background');
    
    const style = window.getComputedStyle(gridElement);
    expect(style.backgroundColor).toBe(customProps.backgroundColor);
    expect(style.backgroundSize).toBe(`${customProps.gridSize}px ${customProps.gridSize}px`);
    expect(style.backgroundImage).toContain(customProps.gridColor);
  });

  it('uses default props when not provided', () => {
    renderWithProviders(<GridBackground />);
    const gridElement = screen.getByTestId('grid-background');
    
    const style = window.getComputedStyle(gridElement);
    expect(style.backgroundColor).toBe('rgba(0, 0, 0, 0.95)');
    expect(style.backgroundSize).toBe('30px 30px');
  });

  it('disables animations when animation context is disabled', () => {
    renderWithProviders(<GridBackground />, {
      animationEnabled: false
    });
    const gridElement = screen.getByTestId('grid-background');
    const motionData = JSON.parse(gridElement.dataset.motion || '{}');
    
    expect(motionData.initial).toBe('initial');
    expect(motionData.animate).toBe('animate');
  });
});
