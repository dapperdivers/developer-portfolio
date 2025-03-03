import React, { memo } from 'react';
import {
  NavbarBrand,
  Navbar,
  NavLink,
  Container,
} from "reactstrap";
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import useNavigation from '../hooks/useNavigation';
import './Navigation.css';

/**
 * Navigation component for the site header.
 * Handles scroll behavior, social links, and branding.
 * 
 * @component
 * @returns {React.ReactElement} Navigation component
 */
const Navigation = () => {
  // Use custom hook for navigation behavior and data
  const { 
    isScrolled, 
    isVisible, 
    greetings, 
    socialLinks 
  } = useNavigation();

  return (
    <header 
      className={`header-global ${isScrolled ? 'scrolled' : ''} ${isVisible ? '' : 'header-hidden'}`}
      role="banner"
    >
      <Navbar
        className="navbar-main navbar-transparent navbar-light"
        expand="lg"
        id="navbar-main"
        role="navigation"
        aria-label="Main navigation"
      >
        <Container className="d-flex align-items-center">
          <NavbarBrand>
            <h2 className="text-white" id="nav-title">{greetings.name}</h2>
          </NavbarBrand>
          
          <div className="social-links">
            {socialLinks.github && (
              <NavLink
                className="nav-link-icon"
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
              >
                <FaGithub aria-hidden="true" />
              </NavLink>
            )}
            
            {socialLinks.linkedin && (
              <NavLink
                className="nav-link-icon"
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
              >
                <FaLinkedin aria-hidden="true" />
              </NavLink>
            )}
          </div>
        </Container>
      </Navbar>
    </header>
  );
};

// Apply memoization for performance optimization
export default memo(Navigation);
