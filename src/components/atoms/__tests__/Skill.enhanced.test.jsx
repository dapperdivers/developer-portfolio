import React from 'react';
import { render, screen } from '@testing-library/react';
import Skill from '@atoms/Skill';

// The mock implementations are now in the __mocks__ folder

describe('Enhanced Skill Component Tests', () => {
  const mockSkill = {
    skillName: 'JavaScript',
    iconName: 'logos:javascript'
  };

  it('renders skill with proper structure', () => {
    render(<Skill skill={mockSkill} index={2} />);
    
    // Icon should be present - using aria-label which contains the skill name
    const iconElement = screen.getByRole('img', { name: 'JavaScript' });
    expect(iconElement).toBeInTheDocument();
    
    // Skill name should be present
    const skillName = screen.getByText('JavaScript');
    expect(skillName).toBeInTheDocument();
  });
  
  it('uses proper size class based on size prop', () => {
    const { rerender } = render(<Skill skill={mockSkill} size="sm" />);
    
    // Get the wrapper element
    const wrapper = screen.getByText('JavaScript').closest('[data-testid="motion-div"]');
    expect(wrapper).toHaveClass('skill-icon-sm');
    
    // Re-render with a different size
    rerender(<Skill skill={mockSkill} size="lg" />);
    expect(wrapper).toHaveClass('skill-icon-lg');
  });
  
  it('renders non-animated version when animate is false', () => {
    render(<Skill skill={mockSkill} animate={false} />);
    
    // Should not use motion components when animate=false
    expect(screen.queryByTestId('motion-div')).not.toBeInTheDocument();
    
    // Still should render the skill
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
  });
  
  it('applies appropriate accessibility attributes', () => {
    render(<Skill skill={mockSkill} />);
    
    // Check for appropriate accessibility attributes
    // The aria-label contains the skill name, not the icon class
    const iconElement = screen.getByRole('img', { name: 'JavaScript' });
    expect(iconElement).toHaveAttribute('aria-label', 'JavaScript');
  });
  
  it('applies custom className when provided', () => {
    render(<Skill skill={mockSkill} className="custom-test-class" />);
    
    // Custom class should be applied to the wrapper
    const wrapper = screen.getByTestId('motion-div');
    expect(wrapper).toHaveClass('custom-test-class');
  });
});