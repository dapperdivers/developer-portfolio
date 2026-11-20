import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SkillChip from './SkillChip';

describe('SkillChip', () => {
  test('renders a button with the name and calls onClick', () => {
    const onClick = vi.fn();
    render(<SkillChip name="Kubernetes" onClick={onClick} />);
    fireEvent.click(screen.getByRole('button', { name: 'Kubernetes' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('reflects selected state with aria-expanded', () => {
    render(<SkillChip name="Kubernetes" selected controlsId="d" />);
    const b = screen.getByRole('button');
    expect(b).toHaveAttribute('aria-expanded', 'true');
    expect(b).toHaveAttribute('aria-controls', 'd');
  });
});
