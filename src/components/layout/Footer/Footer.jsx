import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { FaHeart } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useAnimation } from '@context//AnimationContext';
import SocialLinks from '@molecules/SocialLinks';
import useFooter from '@hooks/useFooter';
import useCallbackHandlers from '@/hooks/useCallbackHandlers';
import './Footer.css';

/**
 * Footer component with essential information and links in a concise format.
 * Enhanced with framer-motion animations.
 * 
 * @component
 * @returns {React.ReactElement} Footer component
 */
const Footer = () => {
  const { currentYear, greetings } = useFooter();
  const { handleDownload } = useCallbackHandlers();
  const { animationEnabled } = useAnimation();
  
  // Animation variants for footer elements
  const footerVariants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 10 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3
      }
    }
  };
  
  const linkHoverVariants = {
    hover: { 
      scale: 1.05, 
      color: "var(--color-white)",
      transition: { duration: 0.2 }
    }
  };
  
  const heartVariants = {
    pulse: {
      scale: [1, 1.1, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };
  
  const downloadContactCard = (e) => {
    e.preventDefault();
    handleDownload('/contact/Derek_Mackley.vcf', 'Derek_Mackley.vcf');
  };
  
  return (
    <motion.footer 
      className="text-gray-200 py-6 backdrop-blur-sm bg-black/40 border-t border-gray-800 shadow-lg" 
      role="contentinfo"
      data-testid="footer"
      initial={animationEnabled ? "hidden" : false}
      animate={animationEnabled ? "visible" : false}
      variants={footerVariants}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between">
          {/* Copyright and Made with */}
          <motion.div 
            className="w-full md:w-auto mb-3 md:mb-0 text-center md:text-left"
            variants={itemVariants}
          >
            <span className="text-sm md:mr-6">
              © {currentYear} {greetings.name}
            </span>
            <span className="text-sm hidden md:inline-block">
              Made with {' '}
              <motion.span 
                variants={heartVariants}
                animate={animationEnabled ? "pulse" : false}
              >
                <FaHeart className="text-primary-400 inline-block mx-1" aria-hidden="true" />
              </motion.span>
              {' '} using React
            </span>
          </motion.div>
          
          {/* Essential Links */}
          <motion.div 
            className="w-full md:w-auto mb-3 md:mb-0 text-center md:text-right"
            variants={itemVariants}
          >
            <AnimatePresence>
              {["Home", "Experience", "Projects", "Contact", "Resume", "Contact Card"].map((item, index) => {
                const href = item === "Home" ? "#main-content" :
                       item === "Resume" ? "/files/Cybersecurity_2025.pdf" :
                       item === "Contact Card" ? "/contact/Derek_Mackley.vcf" :
                       `#${item.toLowerCase()}`;
                
                const handleClick = item === "Contact Card" ? downloadContactCard : undefined;
                
                return (
                  <motion.a 
                    key={item}
                    href={href} 
                    className="text-gray-400 hover:text-white text-sm mx-2"
                    onClick={handleClick}
                    whileHover={animationEnabled ? linkHoverVariants.hover : false}
                    variants={itemVariants}
                    custom={index}
                  >
                    {item}
                  </motion.a>
                );
              })}
            </AnimatePresence>
          </motion.div>
          
          {/* Social Links */}
          <motion.div 
            className="w-full md:w-auto text-center md:text-right"
            variants={itemVariants}
          >
            <SocialLinks className="justify-center md:justify-end" />
            <motion.span 
              className="text-sm md:hidden block mt-3"
              variants={itemVariants}
            >
              Made with {' '}
              <motion.span 
                variants={heartVariants}
                animate={animationEnabled ? "pulse" : false}
              >
                <FaHeart className="text-primary-400 inline-block mx-1" aria-hidden="true" />
              </motion.span>
              {' '} using React
            </motion.span>
          </motion.div>
        </div>
      </div>
    </motion.footer>
  );
};

Footer.propTypes = {
  /* No props for this component as it uses context */
};

// Apply memoization for performance optimization
export default memo(Footer);
