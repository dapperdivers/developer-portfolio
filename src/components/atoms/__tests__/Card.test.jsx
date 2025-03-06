import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from '@atoms/Card';

describe('Card Component', () => {
  test('renders children content', () => {
    render(
      <Card>
        <p>Card content</p>
      </Card>
    );
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  test('renders header content', () => {
    render(
      <Card header={<h3>Card Header</h3>}>
        <p>Card content</p>
      </Card>
    );
    expect(screen.getByText('Card Header')).toBeInTheDocument();
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  test('renders footer content', () => {
    render(
      <Card
        footer={<button>Card Footer Button</button>}
      >
        <p>Card content</p>
      </Card>
    );
    expect(screen.getByText('Card Footer Button')).toBeInTheDocument();
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  test('renders title and subtitle', () => {
    render(
      <Card
        title="Card Title"
        subtitle="Card Subtitle"
      >
        <p>Card content</p>
      </Card>
    );
    expect(screen.getByText('Card Title')).toBeInTheDocument();
    expect(screen.getByText('Card Subtitle')).toBeInTheDocument();
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  test('applies hoverable class when hoverable prop is true', () => {
    render(<Card hoverable>Hoverable Card</Card>);
    expect(screen.getByText('Hoverable Card').closest('.card')).toHaveClass('card-hoverable');
  });

  test('applies bordered class by default and removes it when bordered prop is false', () => {
    const { rerender } = render(<Card>Bordered Card</Card>);
    expect(screen.getByText('Bordered Card').closest('.card')).toHaveClass('card-bordered');

    rerender(<Card bordered={false}>Non-Bordered Card</Card>);
    expect(screen.getByText('Non-Bordered Card').closest('.card')).not.toHaveClass('card-bordered');
  });

  test('applies shadow class when shadow prop is true', () => {
    render(<Card shadow>Card with Shadow</Card>);
    expect(screen.getByText('Card with Shadow').closest('.card')).toHaveClass('card-shadow');
  });

  test('applies custom className', () => {
    render(<Card className="custom-card">Custom Card</Card>);
    expect(screen.getByText('Custom Card').closest('.card')).toHaveClass('custom-card');
  });

  test('applies aria-label attribute when provided', () => {
    render(<Card ariaLabel="Descriptive Card Label">Accessible Card</Card>);
    expect(screen.getByText('Accessible Card').closest('.card')).toHaveAttribute('aria-label', 'Descriptive Card Label');
  });

  test('renders with motion div when animation prop is provided', () => {
    // Note: We mock framer-motion in setupTests.js, so this test is simplified
    render(<Card animation={{ initial: { opacity: 0 }, animate: { opacity: 1 } }}>Animated Card</Card>);
    // Since we mock motion.div to render as a regular div, we just need to check the content
    expect(screen.getByText('Animated Card')).toBeInTheDocument();
  });
});
