import React from "react";
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useAnimation } from '@context/AnimationContext';
import ResponsiveImage from '@atoms/ResponsiveImage';
import './FeedbackAuthor.css';

/**
 * Component for displaying author information in feedback cards.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.name - Author's name
 * @param {string} props.role - Author's role or designation
 * @param {string} props.avatar - URL to author's avatar image
 * @param {string} [props.className] - Additional CSS classes
 * @param {boolean} [props.animated=true] - Whether to animate the component
 * @returns {React.ReactElement} FeedbackAuthor component
 */
const FeedbackAuthor = ({ name, role, avatar, className = "", animated = true }) => {
  const { animationEnabled, fadeInVariants } = useAnimation();
  
  // Only use animations if both props are enabled
  const shouldAnimate = animated && animationEnabled;
  
  // Animation variants for staggered animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
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

FeedbackAuthor.propTypes = {
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  className: PropTypes.string,
  animated: PropTypes.bool
};

export default FeedbackAuthor;
