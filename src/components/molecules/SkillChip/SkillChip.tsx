import React, { memo } from 'react';
import { Icon } from '@iconify/react';
import { useMotionEnabled } from '@utils/motion';
import './SkillChip.css';

export interface SkillChipProps {
  /** Skill name shown on the chip */
  name: string;
  /** Iconify icon name */
  iconName?: string;
  /** Whether the chip's detail is open */
  selected?: boolean;
  /** Id of the element the chip reveals, for aria-controls */
  controlsId?: string;
  /** Called when the chip is activated */
  onClick?: () => void;
  /** Additional CSS class names */
  className?: string;
  /** Whether to animate the hover and selection transitions */
  animated?: boolean;
}

/**
 * A compact, keyboard-operable skill tag: icon plus name. It is a toggle button
 * that reveals the skill's longer description elsewhere.
 */
const SkillChip = ({
  name,
  iconName,
  selected = false,
  controlsId,
  onClick,
  className = '',
  animated = true,
}: SkillChipProps) => {
  const motionOn = useMotionEnabled(animated);
  const classes = [
    'skill-chip',
    selected ? 'skill-chip--selected' : '',
    motionOn ? 'skill-chip--animated' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      type="button"
      className={classes}
      aria-expanded={selected}
      aria-controls={controlsId}
      onClick={onClick}
    >
      {iconName && <Icon icon={iconName} className="skill-chip__icon" aria-hidden="true" />}
      <span className="skill-chip__name">{name}</span>
    </button>
  );
};

export default memo(SkillChip);
