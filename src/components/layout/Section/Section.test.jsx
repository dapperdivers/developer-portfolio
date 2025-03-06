import React from 'react';
import { render, screen } from '@testing-library/react';
import Section from '@layout/Section';

describe('Section Component', () => {
  test('renders children content', () => {
    render(
      <Section>
        <p>Section content</p>
      </Section>
    );
    expect(screen.getByText('Section content')).toBeInTheDocument();
  });

  test('renders title and subtitle', () => {
    render(
      <Section
        title="Section Title"
        subtitle="Section Subtitle"
      >
        <p>Section content</p>
      </Section>
    );
    expect(screen.getByText('Section Title')).toBeInTheDocument();
    expect(screen.getByText('Section Subtitle')).toBeInTheDocument();
    expect(screen.getByText('Section content')).toBeInTheDocument();
  });

  test('renders with icon', () => {
    render(
      <Section
        title="Education"
      >
        <p>Section content</p>
      </Section>
    );
    expect(screen.getByText('Education')).toBeInTheDocument();
    expect(screen.getByText('Section content')).toBeInTheDocument();
    // The Section component renders predefined icons based on title, not the icon prop
    expect(document.querySelector('.section-icon')).toBeInTheDocument();
  });

  test('applies id attribute', () => {
    render(
      <Section id="test-section">
        <p>Section content</p>
      </Section>
    );
    const section = screen.getByText('Section content').closest('section');
    expect(section).toHaveAttribute('id', 'test-section');
  });

  test('wraps content in container by default', () => {
    render(
      <Section>
        <p>Section content</p>
      </Section>
    );
    expect(screen.getByText('Section content').closest('.container')).toBeInTheDocument();
  });

  test('uses fluid container when fluid prop is true', () => {
    render(
      <Section fluid>
        <p>Section content</p>
      </Section>
    );
    expect(screen.getByText('Section content').closest('.container-fluid')).toBeInTheDocument();
  });

  test('does not wrap content in container when container prop is false', () => {
    render(
      <Section container={false}>
        <p>Section content</p>
      </Section>
    );
    expect(screen.getByText('Section content').closest('.container')).not.toBeInTheDocument();
  });

  test('applies background class when background prop is provided', () => {
    render(
      <Section background="primary">
        <p>Section content</p>
      </Section>
    );
    expect(screen.getByText('Section content').closest('section')).toHaveClass('bg-primary');
  });

  test('applies custom className', () => {
    render(
      <Section className="custom-section">
        <p>Section content</p>
      </Section>
    );
    expect(screen.getByText('Section content').closest('section')).toHaveClass('custom-section');
  });

  test('applies aria-label attribute when provided', () => {
    render(
      <Section ariaLabel="Descriptive Section Label">
        <p>Section content</p>
      </Section>
    );
    expect(screen.getByText('Section content').closest('section')).toHaveAttribute('aria-label', 'Descriptive Section Label');
  });

  test('applies role attribute with default "region"', () => {
    render(
      <Section>
        <p>Section content</p>
      </Section>
    );
    expect(screen.getByText('Section content').closest('section')).toHaveAttribute('role', 'region');
  });

  test('applies custom role attribute when provided', () => {
    render(
      <Section role="banner">
        <p>Section content</p>
      </Section>
    );
    expect(screen.getByText('Section content').closest('section')).toHaveAttribute('role', 'banner');
  });

  test('renders with motion section when animation prop is provided', () => {
    // Note: We mock framer-motion in setupTests.js, so this test is simplified
    render(
      <Section animation={{ initial: { opacity: 0 }, animate: { opacity: 1 } }}>
        <p>Animated Section</p>
      </Section>
    );
    // Since we mock motion.section to render as a regular section, we just need to check the content
    expect(screen.getByText('Animated Section')).toBeInTheDocument();
  });
});
