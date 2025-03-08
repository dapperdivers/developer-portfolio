import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { FaHeart } from 'react-icons/fa';
import SocialLinks from '@molecules/SocialLinks';
import useFooter from '@hooks/useFooter';
import './Footer.css';

/**
 * Footer component with essential information and links in a concise format.
 * 
 * @component
 * @returns {React.ReactElement} Footer component
 */
const Footer = () => {
  const { currentYear, greetings } = useFooter();
  
  return (
    <footer 
      className="bg-gray-900 text-gray-300 py-6" 
      role="contentinfo"
      data-testid="footer"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between">
          {/* Copyright and Made with */}
          <div className="w-full md:w-auto mb-3 md:mb-0 text-center md:text-left">
            <span className="text-sm md:mr-6">
              © {currentYear} {greetings.name}
            </span>
            <span className="text-sm hidden md:inline-block">
              Made with <FaHeart className="text-primary-400 inline-block mx-1 animate-pulse" aria-hidden="true" /> using React
            </span>
          </div>
          
          {/* Essential Links */}
          <div className="w-full md:w-auto mb-3 md:mb-0 text-center md:text-right">
            <a 
              href="#main-content" 
              className="text-gray-400 hover:text-white transition-colors duration-200 text-sm mx-2"
            >
              Home
            </a>
            <a 
              href="#experience" 
              className="text-gray-400 hover:text-white transition-colors duration-200 text-sm mx-2"
            >
              Experience
            </a>
            <a 
              href="#projects" 
              className="text-gray-400 hover:text-white transition-colors duration-200 text-sm mx-2"
            >
              Projects
            </a>
            <a 
              href="#contact" 
              className="text-gray-400 hover:text-white transition-colors duration-200 text-sm mx-2"
            >
              Contact
            </a>
            <a 
              href="/files/Derek_Mackley_Resume_2025.pdf" 
              className="text-gray-400 hover:text-white transition-colors duration-200 text-sm mx-2"
            >
              Resume
            </a>
          </div>
          
          {/* Social Links */}
          <div className="w-full md:w-auto text-center md:text-right">
            <SocialLinks className="justify-center md:justify-end" />
            <span className="text-sm md:hidden block mt-3">
              Made with <FaHeart className="text-primary-400 inline-block mx-1 animate-pulse" aria-hidden="true" /> using React
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  /* No props for this component as it uses context */
};

// Apply memoization for performance optimization
export default memo(Footer);
