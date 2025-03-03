import React from 'react';
import { render, screen } from '@testing-library/react';

// Simplified Skill component for testing
function TestSkill({ name, icon }) {
  return (
    <div className="skill-wrapper" data-testid="skill-component">
      <div className="skill-icon" role="img" aria-label={name}>
        <span className="skill-icon-svg">{icon}</span>
      </div>
      <span className="skill-name">{name}</span>
    </div>
  );
}

describe('Basic Component Test', () => {
  it('renders a skill with name and icon', () => {
    render(<TestSkill name="React" icon="react-icon" />);
    
    // Check if component renders
    const skillComponent = screen.getByTestId('skill-component');
    expect(skillComponent).toBeInTheDocument();
    
    // Check if name is displayed
    const skillName = screen.getByText('React');
    expect(skillName).toBeInTheDocument();
    
    // Check for icon
    const skillIcon = screen.getByText('react-icon');
    expect(skillIcon).toBeInTheDocument();
    
    // Check for accessibility
    const ariaLabel = screen.getByRole('img', { name: 'React' });
    expect(ariaLabel).toBeInTheDocument();
  });
  
  it('renders with different props', () => {
    render(<TestSkill name="JavaScript" icon="js-icon" />);
    
    // Check if the props are correctly reflected
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
    expect(screen.getByText('js-icon')).toBeInTheDocument();
  });
});
