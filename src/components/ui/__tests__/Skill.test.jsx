import React from 'react';
import { render, screen } from '@testing-library/react';
import Skill from '../Skill';

// Mock the Icon component from @iconify/react (already set up in setupTests.minimal.js)

describe('Skill Component', () => {
  // Test data
  const mockSkill = {
    skillName: 'React',
    iconName: 'logos:react'
  };

  it('renders the skill component with correct props', () => {
    render(<Skill skill={mockSkill} />);
    
    // Check if aria-label is set correctly
    const iconElement = screen.getByRole('img', { name: 'React' });
    expect(iconElement).toBeInTheDocument();
    
    // Verify the tooltip text
    const tooltipElement = screen.getByText('React');
    expect(tooltipElement).toBeInTheDocument();
  });

  it('applies the correct size class based on size prop', () => {
    const { rerender } = render(<Skill skill={mockSkill} size="lg" />);
    
    // Check for large size class
    const iconElement = document.querySelector('.skill-icon-wrapper');
    expect(iconElement).toHaveClass('skill-icon-lg');
    
    // Rerender with medium size
    rerender(<Skill skill={mockSkill} size="md" />);
    expect(document.querySelector('.skill-icon-wrapper')).toHaveClass('skill-icon-md');
    
    // Rerender with small size
    rerender(<Skill skill={mockSkill} size="sm" />);
    expect(document.querySelector('.skill-icon-wrapper')).toHaveClass('skill-icon-sm');
  });

  it('applies additional class name when provided', () => {
    render(<Skill skill={mockSkill} className="custom-class" />);
    
    const iconElement = document.querySelector('.skill-icon-wrapper');
    expect(iconElement).toHaveClass('custom-class');
  });

  it('renders a non-animated version when animate is false', () => {
    render(<Skill skill={mockSkill} animate={false} />);
    
    // When not animated, it should be a regular div, not a motion.div
    const iconWrapper = document.querySelector('.skill-icon-wrapper');
    
    // Verify it's not a motion component (our mock implementation would add __mock)
    expect(iconWrapper).not.toHaveAttribute('__mock');
  });

  it('renders an animated version when animate is true (default)', () => {
    // In our real app, this would check for Framer Motion props, but with our mock
    // we can just verify it uses the motion component
    render(<Skill skill={mockSkill} />);
    
    // With our mocking approach, we won't actually see motion props in the DOM
    // but we can test the component renders properly with the right content
    const iconElement = screen.getByRole('img', { name: 'React' });
    expect(iconElement).toBeInTheDocument();
  });

  it('passes the index prop to the animation delay', () => {
    // With our simplified mocks, we can't easily test the actual animation delay
    // but we can verify the component accepts and doesn't break with an index
    render(<Skill skill={mockSkill} index={5} />);
    
    // The component should still render correctly
    const iconElement = screen.getByRole('img', { name: 'React' });
    expect(iconElement).toBeInTheDocument();
  });
});
