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
  /** URL to author's avatar image */
  avatar: string;
  /** Additional CSS classes */
  className?: string;
  /** Whether to animate the component */
  animated?: boolean;
}

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
      className={`flex items-center author-container ${className}`}
      initial={shouldAnimate ? "hidden" : "visible"}
      animate="visible"
      variants={shouldAnimate ? containerVariants : {}}
    >
      <motion.div 
        className="author-image-container w-10 h-10 mr-3 overflow-hidden"
        variants={shouldAnimate ? itemVariants : {}}
      >
        <ResponsiveImage 
          src={avatar} 
          alt={`${name}`} 
          className="rounded-full border border-primary object-cover author-image w-10 h-10"
          lazy={true}
        />
      </motion.div>
      
      <motion.div 
        className="author-info"
        variants={shouldAnimate ? fadeInVariants : {}}
      >
        <motion.h5 
          className="font-bold text-primary text-base mb-0.5 author-name" 
          tabIndex={0}
          variants={shouldAnimate ? itemVariants : {}}
        >
          {name}
        </motion.h5>
        <motion.p 
          className="text-text-muted text-xs author-role" 
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
