import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import { FaHeart, FaChevronUp } from 'react-icons/fa';
import Button from './ui/Button';
import SocialLinks from './SocialLinks';
import useFooter from '../hooks/useFooter';
import '../assets/css/footer.css';

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
      <Container>
        <Row className="align-items-center justify-content-between">
          <Col lg={5} className="mb-4 mb-lg-0">
            <h4 className="footer-title">{greetings.name}</h4>
            <p className="footer-description">
              Full Stack Developer and Security Expert with extensive experience building 
              secure web applications and APIs.
            </p>
            <SocialLinks />
          </Col>
          
          <Col lg={3} md={6} className="mb-4 mb-md-0">
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
          </Col>
          
          <Col lg={3} md={6}>
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
          </Col>
        </Row>
        
        <hr className="footer-divider" />
        
        <Row className="align-items-center">
          <Col md={6} className="text-center text-md-start mb-3 mb-md-0">
            <p className="footer-copyright">
              © {currentYear} {greetings.name}. All rights reserved.
            </p>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <p className="footer-credit">
              Made with <FaHeart className="footer-icon" aria-hidden="true" /> using React
            </p>
          </Col>
        </Row>
        
        <Button 
          onClick={scrollToTop} 
          className="back-to-top-button"
          aria-label="Back to top"
        >
          <FaChevronUp aria-hidden="true" />
        </Button>
      </Container>
    </footer>
  );
};

// Apply memoization for performance optimization
export default memo(Footer);
