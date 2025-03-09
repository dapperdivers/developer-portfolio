import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { vi } from 'vitest';
import HeaderName from './HeaderName';

describe('HeaderName Component', () => {
  const defaultName = 'John Doe';

  beforeEach(() => {
    // Reset any mocks before each test
    vi.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<HeaderName name={defaultName} />);
    expect(screen.getByText(defaultName)).toBeInTheDocument();
  });
  
  it('applies custom className', () => {
    const customClass = 'custom-class';
    const { container } = render(<HeaderName name={defaultName} className={customClass} />);
    const element = container.firstChild;
    expect(element).toHaveClass(customClass);
    expect(element).toHaveClass('cyber-text-animation');
  });
  
  it('renders with correct aria-label', () => {
    render(<HeaderName name={defaultName} />);
    expect(screen.getByLabelText(defaultName)).toBeInTheDocument();
  });

  it('includes a blinking cursor element', () => {
    const { container } = render(<HeaderName name={defaultName} />);
    const cursor = container.querySelector('.cursor');
    expect(cursor).toBeInTheDocument();
    expect(cursor).toHaveAttribute('aria-hidden', 'true');
  });

  it('includes a scanline element', () => {
    const { container } = render(<HeaderName name={defaultName} />);
    const scanline = container.querySelector('.scanline');
    expect(scanline).toBeInTheDocument();
    expect(scanline).toHaveAttribute('aria-hidden', 'true');
  });

  it('has correct base styles', () => {
    const { container } = render(<HeaderName name={defaultName} />);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('text-xl', 'font-bold', 'text-cyan-400');
  });

  it('uses the Agustina font', () => {
    const { container } = render(<HeaderName name={defaultName} />);
    const element = container.firstChild as HTMLElement;
    const styles = window.getComputedStyle(element);
    expect(styles.fontFamily).toContain('Agustina');
  });
});
