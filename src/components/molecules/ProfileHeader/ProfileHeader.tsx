import React from 'react';
import { motion } from 'framer-motion';
import SecurityBadge from '@atoms/SecurityBadge';
import { slideUpVariants as itemVariants, useMotionEnabled } from '@utils/motion';
import './ProfileHeader.css';

export interface ProfileHeaderProps {
  /** Header title */
  title: string;
  /** Subtitle for the security badge */
  subtitle: string;
  /** Text to highlight in the title */
  highlightText?: string;
  /** Whether to animate the component */
  animate?: boolean;
}

/**
 * ProfileHeader component for displaying a security-themed header with badge and title.
 * 
 * @component
 */
const ProfileHeader = ({ 
  title, 
  subtitle, 
  highlightText = 'Security',
  animate = true
}: ProfileHeaderProps) => {
  const shouldAnimate = useMotionEnabled(animate);

  return (
    <div className="profile-header">
      <motion.div 
        className="profile-header__badge-container"
        variants={shouldAnimate ? itemVariants : undefined}
      >
        <SecurityBadge 
          text={subtitle} 
          animate={shouldAnimate}
        />
      </motion.div>
      
      <motion.h2 
        className="profile-header__title"
        variants={shouldAnimate ? itemVariants : undefined}
      >
        <span className="profile-header__highlight">{highlightText}</span> {title}
      </motion.h2>
    </div>
  );
};

export default ProfileHeader;