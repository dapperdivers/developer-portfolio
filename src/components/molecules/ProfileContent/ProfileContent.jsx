import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import SecurityFact from '@atoms/SecurityFact';
import ContactButton from '@atoms/ContactButton';
import SocialLinks from '@molecules/SocialLinks';
import { useAnimation } from '@context/AnimationContext';
import './ProfileContent.css';

/**
 * ProfileContent component for displaying profile description, security fact, and contact information.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.description - Profile description text
 * @param {string} props.securityFact - Security fact to display
 * @param {string} props.email - Email address for contact button
 * @param {boolean} [props.animate=true] - Whether to animate the component
 * @returns {React.ReactElement} ProfileContent component
 */
const ProfileContent = ({ 
  description, 
  securityFact, 
  email,
  animate = true
}) => {
  const { animationEnabled, itemVariants } = useAnimation();
  
  // Only use animations if both props are enabled
  const shouldAnimate = animate && animationEnabled;

  return (
    <div className="profile-content">
      <motion.p 
        className="profile-content__description"
        variants={shouldAnimate ? itemVariants : undefined}
      >
        {description}
      </motion.p>
      
      {securityFact && (
        <motion.div 
          className="profile-content__fact-container"
          variants={shouldAnimate ? itemVariants : undefined}
        >
          <SecurityFact 
            text={securityFact} 
            animate={shouldAnimate}
          />
        </motion.div>
      )}
      
      <motion.div 
        className="profile-content__contact"
        variants={shouldAnimate ? itemVariants : undefined}
      >
        <SocialLinks 
          className="profile-content__social" 
          animated={shouldAnimate}
        />
        
        <ContactButton 
          email={email} 
          animate={shouldAnimate}
          className="profile-content__contact-button"
        />
      </motion.div>
    </div>
  );
};

ProfileContent.propTypes = {
  /** Profile description text */
  description: PropTypes.string.isRequired,
  /** Security fact to display */
  securityFact: PropTypes.string,
  /** Email address for contact button */
  email: PropTypes.string.isRequired,
  /** Whether to animate the component */
  animate: PropTypes.bool
};

export default ProfileContent;