import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { FaHeart, FaChevronUp } from 'react-icons/fa';
import Button from '@atoms/Button';
import SocialLinks from './SocialLinks';
import useFooter from '@hooks/useFooter';

/**
 * Footer component with contact information, quick links, and copyright.
 * 
 * @component
 * @returns {React.ReactElement} Footer component
 */
const Footer = () => {
  const { currentYear, scrollToTop, greetings } = useFooter();
  
  return (
    <footer 
      className="bg-gray-900 text-gray-300 py-12" 
      role="contentinfo"
      data-testid="footer"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap -mx-4 items-center justify-between">
          <div className="w-full px-4 lg:w-5/12 mb-8 lg:mb-0">
            <h4 className="font-heading font-bold text-2xl mb-4 text-white">
              {greetings.name}
            </h4>
            <p className="text-gray-400 mb-6 text-sm md:text-base">
              Full Stack Developer and Security Expert with extensive experience building 
              secure web applications and APIs.
            </p>
            <SocialLinks />
          </div>
          
          <div className="w-full px-4 lg:w-3/12 md:w-6/12 mb-8 md:mb-0">
            <h5 className="font-semibold text-lg tracking-wide mb-4 text-primary-400">
              Quick Links
            </h5>
            <ul className="space-y-2">
              <li>
                <a 
                  href="#main-content" 
                  className="text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block"
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="#experience" 
                  className="text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block"
                >
                  Experience
                </a>
              </li>
              <li>
                <a 
                  href="#projects" 
                  className="text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block"
                >
                  Projects
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  className="text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          
          <div className="w-full px-4 lg:w-3/12 md:w-6/12">
            <h5 className="font-semibold text-lg tracking-wide mb-4 text-primary-400">
              Contact
            </h5>
            <ul className="space-y-2">
              <li>
                <a 
                  href="mailto:contact@derekmackley.com" 
                  className="text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block"
                >
                  contact@derekmackley.com
                </a>
              </li>
              <li>
                <a 
                  href="/files/Derek_Mackley_Resume_2025.pdf" 
                  className="text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block"
                >
                  Download Resume
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <hr className="border-gray-800 my-8 opacity-30" />
        
        <div className="flex flex-wrap -mx-4 items-center">
          <div className="w-full px-4 md:w-6/12 text-center md:text-left mb-4 md:mb-0">
            <p className="text-sm">
              © {currentYear} {greetings.name}. All rights reserved.
            </p>
          </div>
          <div className="w-full px-4 md:w-6/12 text-center md:text-right">
            <p className="text-sm">
              Made with <FaHeart className="text-primary-400 inline-block mx-1 animate-pulse" aria-hidden="true" /> using React
            </p>
          </div>
        </div>
        
        <Button 
          onClick={scrollToTop} 
          className="fixed bottom-6 right-6 bg-primary-600 hover:bg-primary-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-opacity-50"
          aria-label="Back to top"
        >
          <FaChevronUp aria-hidden="true" className="h-4 w-4" />
        </Button>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  /* No props for this component as it uses context */
};

// Apply memoization for performance optimization
export default memo(Footer);
