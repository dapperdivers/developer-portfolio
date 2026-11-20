import React from "react";
import { motion, Variants } from 'framer-motion';
import { useMotionEnabled, fadeInVariants } from '@utils/motion';
import ResponsiveImage from '@atoms/ResponsiveImage';
import './FeedbackAuthor.css';

export interface FeedbackAuthorProps {
  /** Author's name */
  name: string;
  /** Author's role or designation */
  role: string;
  /** URL to author's avatar image; without one an initials badge is drawn */
  avatar?: string;
  /** Additional CSS classes */
  className?: string;
  /** Whether to animate the component */
  animated?: boolean;
}

/** First letter of the first and last word of a name, e.g. "Scott Latsa" -> "SL". */
export const authorInitials = (name: string): string => {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return '?';
  const first = words[0][0];
  const last = words.length > 1 ? words[words.length - 1][0] : '';
  return `${first}${last}`.toUpperCase();
};

/**
 * Component for displaying author information in feedback cards.
 *
 * @component
 */
const FeedbackAuthor = ({ name, role, avatar, className = "", animated = true }: FeedbackAuthorProps) => {
  // Animate only when the prop is on and reduced motion is not requested
  const shouldAnimate = useMotionEnabled(animated);

  // Animation variants for staggered animation
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 5 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div
      className={`author-container ${className}`.trim()}
      initial={shouldAnimate ? "hidden" : "visible"}
      animate="visible"
      variants={shouldAnimate ? containerVariants : {}}
    >
      <motion.div
        className="author-image-container"
        variants={shouldAnimate ? itemVariants : {}}
      >
        {avatar ? (
          <ResponsiveImage
            src={avatar}
            alt={`${name}`}
            className="author-image"
            lazy={true}
          />
        ) : (
          <span className="author-initials" aria-hidden="true">{authorInitials(name)}</span>
        )}
      </motion.div>

      <motion.div
        className="author-info"
        variants={shouldAnimate ? fadeInVariants : {}}
      >
        <motion.h5
          className="author-name"
          tabIndex={0}
          variants={shouldAnimate ? itemVariants : {}}
        >
          {name}
        </motion.h5>
        <motion.p
          className="author-role"
          tabIndex={0}
          variants={shouldAnimate ? itemVariants : {}}
        >
          {role}
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default FeedbackAuthor;
