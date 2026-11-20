import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import NetworkBackground from './NetworkBackground';

describe('NetworkBackground Component', () => {
  it('renders without a provider around it', () => {
    const { container } = render(<NetworkBackground />);
    expect(container.querySelector('.fixed')).toBeInTheDocument();
  });

  it('renders a fixed full-screen container holding the canvas', () => {
    const { container } = render(<NetworkBackground />);
    const motionElement = container.querySelector('.fixed');

    expect(motionElement).toHaveClass('fixed');
    expect(motionElement).toHaveClass('inset-0');
    expect(motionElement?.querySelector('canvas')).toBeInTheDocument();
  });

  it('applies a custom className', () => {
    const { container } = render(<NetworkBackground className="custom-network" />);
    expect(container.querySelector('.fixed')).toHaveClass('custom-network');
  });

  it('renders with animation switched off and does not pass animated to the DOM', () => {
    const { container } = render(<NetworkBackground animated={false} />);
    const element = container.querySelector('.fixed');

    expect(element).toBeInTheDocument();
    expect(element).not.toHaveAttribute('animated');
    expect(element?.querySelector('canvas')).toBeInTheDocument();
  });
});
