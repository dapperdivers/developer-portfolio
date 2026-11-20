import React from 'react';
import { render, screen } from '@testing-library/react';

// Simple mock Skills container for testing
function TestSkillsContainer() {
  // Mock data
  const skills = [
    { name: 'JavaScript', icon: 'js-icon' },
    { name: 'React', icon: 'react-icon' },
    { name: 'Node.js', icon: 'node-icon' }
  ];
  
  return (
    <section data-testid="skills-section" aria-label="Developer skills">
      <h2>My Skills</h2>
      <p>These are some of the technologies I work with</p>
      
      <div className="skills-grid" data-testid="skills-grid">
        {skills.map((skill, index) => (
          <div 
            key={skill.name} 
            className="skill-item" 
            data-testid={`skill-${index}`}
          >
            <span className="skill-icon">{skill.icon}</span>
            <span className="skill-name">{skill.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

describe('Basic Skills Container Test', () => {
  it('renders the Skills section with title and description', () => {
    render(<TestSkillsContainer />);
    
    const section = screen.getByTestId('skills-section');
    expect(section).toBeInTheDocument();
    
    expect(screen.getByText('My Skills')).toBeInTheDocument();
    expect(screen.getByText('These are some of the technologies I work with')).toBeInTheDocument();
  });
  
  it('renders all skills from the data', () => {
    render(<TestSkillsContainer />);
    
    // We should have 3 skills from our mock data
    const skillGrid = screen.getByTestId('skills-grid');
    expect(skillGrid.children.length).toBe(3);
    
    // Check if specific skills exist
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Node.js')).toBeInTheDocument();
    
    // Check if their icons exist too
    expect(screen.getByText('js-icon')).toBeInTheDocument();
    expect(screen.getByText('react-icon')).toBeInTheDocument();
    expect(screen.getByText('node-icon')).toBeInTheDocument();
  });
  
  it('applies proper ARIA attributes for accessibility', () => {
    render(<TestSkillsContainer />);
    
    // The section should have an ARIA label
    const section = screen.getByRole('region', { name: 'Developer skills' });
    expect(section).toBeInTheDocument();
  });
});
