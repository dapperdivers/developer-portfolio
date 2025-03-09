import React from 'react';
import PropTypes from 'prop-types';
import { FaMapMarkerAlt, FaShieldAlt, FaLock, FaTerminal, FaRocket } from 'react-icons/fa';
import { motion } from "framer-motion";
import SocialLinks from '@molecules/SocialLinks';
import Button from '@atoms/Button';
import MapComponent from '../MapComponent';
import { greetings, securityFacts } from '@/portfolio';
import { useAnimation } from "@context/AnimationContext";
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
    
    return (
      <div className="shadow-lg rounded-lg py-10 overflow-hidden backdrop-blur-sm bg-black/30 border border-gray-800" data-testid="github-profile-card">
        {/* Security-themed background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
          <div className="security-grid"></div>
          <div className="security-circles"></div>
        </div>
        
        <div className="container mx-auto px-4 relative" style={{ zIndex: 2 }}>
          {!hasProfile || error ? (
            // Fallback UI when GitHub API fails
            <motion.div 
              className="py-12 px-6 text-center max-w-2xl mx-auto"
              variants={fadeInVariants}
              initial={animationEnabled ? "hidden" : "visible"}
              animate="visible"
            >
              <div className="w-16 h-16 bg-primary-600/30 rounded-full mx-auto flex items-center justify-center mb-6">
                <FaMapMarkerAlt size={32} className="text-primary-300" />
              </div>
              <h3 className="text-2xl font-bold mb-4">GitHub Profile Unavailable</h3>
              <p className="text-primary-100 mb-8 text-lg">
                {error || "Unable to load GitHub profile data. Please try again later."}
              </p>
              {onRetry && (
                <Button 
                  className="px-6 py-2 bg-white text-primary-700 hover:bg-primary-50 font-semibold rounded-md transition-colors duration-200" 
                  onClick={onRetry}
                  variant="primary"
                >
                  Retry
                </Button>
              )}
            </motion.div>
          ) : (
            <motion.div 
              initial={animationEnabled ? "hidden" : "visible"}
              animate="visible"
              variants={containerVariants}
            >
              <div className="flex flex-wrap -mx-4">
                {/* Profile image - Top section */}
                <div className="w-full px-4 mb-6 text-center">
                  <motion.div variants={itemVariants}>
                    <div className="profile-image-container inline-block">
                      <img 
                        src={prof.avatar_url} 
                        alt={`${prof.name || 'Profile'} avatar`}
                        className="profile-image"
                        loading="lazy"
                      />
                      <div className="security-clearance">
                        <FaLock className="lock-icon" />
                        <span>{greetings.title.includes("Hi") ? greetings.name : "Security Clearance: Top Level"}</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
                
                {/* Security Headquarters Header - Before map */}
                <div className="w-full px-4 text-center mb-4">
                  <div className="flex items-center justify-center mb-3">
                    <div className="security-badge">
                      <FaShieldAlt className="text-primary-400 mr-2" />
                      <span>{greetings.subTitle || "Staff Security Engineer"}</span>
                    </div>
                  </div>
                  
                  <h2 className="text-3xl font-bold mb-2 text-white">
                    <span className="text-cyan-400">Security</span> Headquarters
                  </h2>
                </div>
                
                {/* Map component */}
                <div className="w-full px-4 mb-8">
                  {prof.location && (
                    <MapComponent location={prof.location} />
                  )}
                </div>
                
                {/* Bottom section with description and contact */}
                <div className="w-full px-4 lg:w-6/12 lg:mx-auto">
                  <motion.div 
                    className="contact-content" 
                    variants={itemVariants}
                  >
                    <p className="text-xl text-primary-100 mb-6 text-center">
                      {greetings.description ? (
                        <>
                          {greetings.description.split('.')[0]}.<br />
                          Need to discuss secure architecture? My inbox is always open!
                        </>
                      ) : (
                        <>
                          Have a security concern? Want to discuss secure architecture?
                          <br />
                          Or just want to talk tech? My inbox is secure and always open!
                        </>
                      )}
                    </p>
                    
                    {/* Security fact callout */}
                    <motion.div 
                      className="security-fact-box mb-6"
                      variants={itemVariants}
                    >
                      <FaTerminal className="security-fact-icon" />
                      <p>{randomFact}</p>
                    </motion.div>
                    
                    {/* Social links and contact button */}
                    <motion.div 
                      className="flex flex-wrap items-center justify-center mt-8"
                      variants={itemVariants}
                    >
                      <SocialLinks className="mr-4" />
                      
                      <a 
                        href={`mailto:contact@${greetings.name.replace(/\s+/g, '').toLowerCase()}.com`}
                        className="contact-button mt-4 sm:mt-0"
                      >
                        <span>Contact Me</span>
                        <FaRocket className="ml-2" />
                      </a>
                    </motion.div>
                  </motion.div>
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
