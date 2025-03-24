import React from 'react';
import PropTypes from 'prop-types';
import { motion } from "framer-motion";
import { greetings, securityFacts } from '@/portfolio';
import { useAnimation } from "@context/AnimationContext";
import ProfileAvatar from '@atoms/ProfileAvatar';
import ProfileHeader from '@molecules/ProfileHeader';
import ProfileLocation from '@molecules/ProfileLocation';
import ProfileContent from '@molecules/ProfileContent';
import ProfileError from '@molecules/ProfileError';
import './GithubProfileCard.css';

/**
 * GitHub profile card component for displaying user information from GitHub API.
 * Enhanced with map visualization and security-themed decorative elements.
 * Uses framer-motion and the AnimationContext for animations.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.prof - GitHub profile data
 * @param {string} props.error - Error message if API call failed
 * @param {Function} props.onRetry - Callback function to retry API call
 * @returns {React.ReactElement} GithubProfileCard component
 */
const GithubProfileCard = ({ prof, error, onRetry }) => {
  // Check if profile data exists
  const hasProfile = prof && Object.keys(prof).length > 0;
  
  // Get animation context values
  const { 
    animationEnabled, 
    animationStaggerDelay, 
    fadeInVariants, 
    slideUpVariants 
  } = useAnimation();
  
  // Custom animation variants with staggered children for profile card elements
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: animationStaggerDelay,
        delayChildren: 0.2
      }
    }
  };
  
  // Customized slide up variant for card items with spring physics
  const itemVariants = {
    hidden: { ...slideUpVariants.hidden },
    visible: { 
      ...slideUpVariants.visible,
      transition: { 
        ...slideUpVariants.visible.transition,
        type: "spring", 
        damping: 12 
      }
    }
  };
  
  // Pick a random security fact from the portfolio
  const randomFact = securityFacts[Math.floor(Math.random() * securityFacts.length)];
  
  // Generate email address from name
  const emailAddress = `contact@${greetings.name.replace(/\s+/g, '').toLowerCase()}.com`;
  
  // Format description for display
  const formatDescription = () => {
    if (greetings.description) {
      return (
        <>
          {greetings.description.split('.')[0]}.<br />
          Need to discuss secure architecture? My inbox is always open!
        </>
      );
    }
    
    return (
      <>
        Have a security concern? Want to discuss secure architecture?
        <br />
        Or just want to talk tech? My inbox is secure and always open!
      </>
    );
  };

  return (
    <div className="github-profile-card" data-testid="github-profile-card">
      {/* Security-themed background elements */}
      <div className="github-profile-card__background">
        <div className="security-grid"></div>
        <div className="security-circles"></div>
      </div>
      
      <div className="github-profile-card__content">
        {!hasProfile || error ? (
          // Fallback UI when GitHub API fails
          <ProfileError 
            message={error} 
            onRetry={onRetry}
            animate={animationEnabled}
          />
        ) : (
          <motion.div 
            initial={animationEnabled ? "hidden" : "visible"}
            animate="visible"
            variants={containerVariants}
          >
            <div className="github-profile-card__layout">
              {/* Profile image - Top section */}
              <div className="github-profile-card__avatar-section">
                <ProfileAvatar 
                  src={prof.avatar_url} 
                  alt={`${prof.name || 'Profile'} avatar`}
                  clearanceText={greetings.title.includes("Hi") ? greetings.name : "Security Clearance: Top Level"}
                  variants={itemVariants}
                  animate={animationEnabled}
                />
              </div>
              
              {/* Security Headquarters Header - Before map */}
              <div className="github-profile-card__header-section">
                <ProfileHeader 
                  title="Headquarters"
                  subtitle={greetings.subTitle || "Staff Security Engineer"}
                  highlightText="Security"
                  animate={animationEnabled}
                />
              </div>
              
              {/* Map component */}
              <div className="github-profile-card__map-section">
                {prof.location && (
                  <ProfileLocation 
                    location={prof.location}
                    animate={animationEnabled}
                  />
                )}
              </div>
              
              {/* Bottom section with description and contact */}
              <div className="github-profile-card__content-section">
                <ProfileContent 
                  description={formatDescription()}
                  securityFact={randomFact}
                  email={emailAddress}
                  animate={animationEnabled}
                />
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

GithubProfileCard.propTypes = {
  prof: PropTypes.object,
  error: PropTypes.string,
  onRetry: PropTypes.func
};

export default GithubProfileCard;
