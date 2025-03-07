import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '@atoms/Button';

describe('Button Component', () => {
  test('renders button with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  test('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('renders with different variants', () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>);
    expect(screen.getByText('Primary')).toHaveClass('btn-primary');

    rerender(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByText('Secondary')).toHaveClass('btn-secondary');

    rerender(<Button variant="danger">Danger</Button>);
    expect(screen.getByText('Danger')).toHaveClass('btn-danger');
  });

  test('renders with different sizes', () => {
    const { rerender } = render(<Button size="sm">Small</Button>);
    expect(screen.getByText('Small')).toHaveClass('btn-sm');

    rerender(<Button size="lg">Large</Button>);
    expect(screen.getByText('Large')).toHaveClass('btn-lg');
  });

  test('renders as anchor when href is provided', () => {
    render(<Button href="https://example.com">Link</Button>);
    const linkButton = screen.getByText('Link');
    expect(linkButton.tagName).toBe('A');
    expect(linkButton).toHaveAttribute('href', 'https://example.com');
  });

  test('renders with icon', () => {
    render(<Button icon="mdi:home">Home</Button>);
    const button = screen.getByText('Home');
    expect(button).toContainElement(document.querySelector('[data-icon="mdi:home"]'));
  });

  test('disables button when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByText('Disabled')).toBeDisabled();
    expect(screen.getByText('Disabled')).toHaveClass('disabled');
  });

  test('applies custom className', () => {
    render(<Button className="custom-class">Custom</Button>);
    expect(screen.getByText('Custom')).toHaveClass('custom-class');
  });

  test('applies aria-label attribute when provided', () => {
    render(<Button ariaLabel="Descriptive label">Button</Button>);
    expect(screen.getByText('Button')).toHaveAttribute('aria-label', 'Descriptive label');
  });
});
