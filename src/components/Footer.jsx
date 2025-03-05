import React, { memo } from 'react';

import { FaHeart, FaChevronUp } from 'react-icons/fa';
import Button from './ui/Button';
import SocialLinks from './SocialLinks';
import useFooter from '../hooks/useFooter';
import '../assets/css/tailwind.css';

/**
 * Footer component with contact information, quick links, and copyright.
 * 
 * @component
 * @returns {React.ReactElement} Footer component
 */
const Footer = () => {
  const { currentYear, scrollToTop, greetings } = useFooter();
  
  return (
    <footer className="footer" role="contentinfo">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap -mx-4 items-center justify-between">
          <div className="w-full px-4 lg:w-5/12 mb-4 lg:mb-0">
            <h4 className="footer-title">{greetings.name}</h4>
            <p className="footer-description">
              Full Stack Developer and Security Expert with extensive experience building 
              secure web applications and APIs.
            </p>
            <SocialLinks />
          </div>
          
          <div className="w-full px-4 lg:w-3/12 md:w-6/12 mb-4 md:mb-0">
            <h5 className="footer-heading">Quick Links</h5>
            <ul className="footer-links">
              <li>
                <a href="#main-content" className="footer-link">
                  Home
                </a>
              </li>
              <li>
                <a href="#experience" className="footer-link">
                  Experience
                </a>
              </li>
              <li>
                <a href="#projects" className="footer-link">
                  Projects
                </a>
              </li>
              <li>
                <a href="#contact" className="footer-link">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          
          <div className="w-full px-4 lg:w-3/12 md:w-6/12">
            <h5 className="footer-heading">Contact</h5>
            <ul className="footer-links">
              <li>
                <a 
                  href="mailto:contact@derekmackley.com" 
                  className="footer-link"
                >
                  contact@derekmackley.com
                </a>
              </li>
              <li>
                <a 
                  href="/files/Derek_Mackley_Resume_2025.pdf" 
                  className="footer-link"
                >
                  Download Resume
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <hr className="footer-divider" />
        
        <div className="flex flex-wrap -mx-4 items-center">
          <div className="w-full px-4 md:w-6/12 text-center md:text-left mb-3 md:mb-0">
            <p className="footer-copyright">
              © {currentYear} {greetings.name}. All rights reserved.
            </p>
          </div>
          <div className="w-full px-4 md:w-6/12 text-center md:text-right">
            <p className="footer-credit">
              Made with <FaHeart className="footer-icon" aria-hidden="true" /> using React
            </p>
          </div>
        </div>
        
        <Button 
          onClick={scrollToTop} 
          className="back-to-top-button"
          aria-label="Back to top"
        >
          <FaChevronUp aria-hidden="true" />
        </Button>
      </div>
    </footer>
  );
};

// Apply memoization for performance optimization
export default memo(Footer);
