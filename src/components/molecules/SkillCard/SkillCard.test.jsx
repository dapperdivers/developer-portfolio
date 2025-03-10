import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import SkillCard from './SkillCard';
import { vi } from 'vitest';
import { renderWithProviders } from '@/tests/unit/setup';

// Mock the Skill component
vi.mock('@atoms/Skill', () => ({
  default: ({ skill }) => (
    <div data-testid="mock-skill">{skill.skillName}</div>
  )
}));

// Mock the Card component
vi.mock('@atoms/Card', () => ({
  default: ({ children, animation, ...props }) => (
    <div 
      data-testid="mock-card" 
      data-animation={JSON.stringify(animation)} 
      {...props}
    >
      {children}
    </div>
  )
}));

describe('SkillCard Integration Tests', () => {
  const mockSkill = {
    skillName: 'React',
    iconName: 'react',
    description: 'Frontend development with React',
    securityDomain: 'Web Security',
    level: 5
  };

  it('renders skill information correctly', () => {
    renderWithProviders(<SkillCard skill={mockSkill} index={0} />);

    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Frontend development with React')).toBeInTheDocument();
  });

  it('applies correct animation based on index', () => {
    renderWithProviders(<SkillCard skill={mockSkill} index={2} />);

    const card = screen.getByTestId('mock-card');
    const animation = JSON.parse(card.dataset.animation);

    expect(animation).toEqual({
      variants: expect.any(Object), // We don't need to test the exact variant object
      initial: 'hidden',
      whileInView: 'visible',
      viewport: { once: true },
      transition: {
        delay: 0.2
      }
    });
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    renderWithProviders(<SkillCard skill={mockSkill} index={0} onClick={handleClick} />);

    const card = screen.getByTestId('mock-card');
    fireEvent.click(card);
    expect(handleClick).toHaveBeenCalledWith(mockSkill);
  });

  it('handles keyboard events', () => {
    const handleClick = vi.fn();
    renderWithProviders(<SkillCard skill={mockSkill} index={0} onClick={handleClick} />);

    const card = screen.getByTestId('mock-card');
    fireEvent.keyDown(card, { key: 'Enter' });
    expect(handleClick).toHaveBeenCalledWith(mockSkill);

    fireEvent.keyDown(card, { key: ' ' });
    expect(handleClick).toHaveBeenCalledTimes(2);
  });

  it('disables animations when animation context is disabled', () => {
    renderWithProviders(<SkillCard skill={mockSkill} index={0} />, { animationEnabled: false });
    
    const card = screen.getByTestId('mock-card');
    const animation = JSON.parse(card.dataset.animation);
    expect(animation).toEqual({
      variants: expect.any(Object), // We don't need to test the exact variant object
      initial: 'visible',
      whileInView: 'visible',
      viewport: { once: true },
      transition: {
        delay: 0
      }
    });
  });

  it('has correct accessibility attributes', () => {
    renderWithProviders(<SkillCard skill={mockSkill} index={0} />);

    const card = screen.getByTestId('mock-card');
    expect(card).toHaveAttribute('role', 'button');
    expect(card).toHaveAttribute('tabIndex', '0');
    expect(card).toHaveAttribute('aria-label', `View details for ${mockSkill.skillName}`);
    expect(card).toHaveAttribute('aria-haspopup', 'dialog');
  });
});