import React, { useState, useEffect } from 'react';
import { greetings, socialLinks } from "../portfolio";
import {
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import './Navigation.css'

const Navigation = () => {
    const [collapseClasses, setCollapseClasses] = useState("");
    const [isScrolled, setIsScrolled] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    
    const onExiting = () => setCollapseClasses("collapsing-out");
    const onExited = () => setCollapseClasses("");

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.scrollY;
            const greetingsSection = document.getElementById('greetings');
            const greetingsHeight = greetingsSection?.offsetHeight || 0;
            const buffer = 50; // Buffer zone for smoother transition
            
            // Update scroll state for visual effects
            setIsScrolled(currentScrollPos > 50);
            
            // Determine if we should show/hide based on scroll position and direction
            const isScrollingDown = currentScrollPos > prevScrollPos;
            const isPastGreetings = currentScrollPos > (greetingsHeight - buffer);
            
            setIsVisible(!isPastGreetings || !isScrollingDown);
            setPrevScrollPos(currentScrollPos);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [prevScrollPos]);

    return (
        <>
        <header className={`header-global ${isScrolled ? 'scrolled' : ''} ${isVisible ? '' : 'header-hidden'}`}>
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
                <NavLink
                  className="nav-link-icon"
                  href={socialLinks.github}
                  target="_blank"
                  aria-label="GitHub Profile"
                >
                  <FaGithub aria-hidden="true" />
                </NavLink>
                <NavLink
                  className="nav-link-icon"
                  href={socialLinks.linkedin}
                  target="_blank"
                  aria-label="LinkedIn Profile"
                >
                  <FaLinkedin aria-hidden="true" />
                </NavLink>
              </div>
            </Container>
          </Navbar>
        </header>
      </>
     );
}

export default Navigation;
