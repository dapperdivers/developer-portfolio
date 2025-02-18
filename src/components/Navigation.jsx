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
    
    const onExiting = () => setCollapseClasses("collapsing-out");
    const onExited = () => setCollapseClasses("");

    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.scrollY > 50;
            if (scrolled !== isScrolled) {
                setIsScrolled(scrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isScrolled]);

    return (
        <>
        <header className="header-global">
          <Navbar
            className={`navbar-main navbar-transparent navbar-light sticky-nav ${isScrolled ? 'scrolled' : ''}`}
            expand="lg"
            id="navbar-main"
            role="navigation"
            aria-label="Main navigation"
          >
            <Container>
              <NavbarBrand className="me-4">
                <h2 className="text-white" id="nav-title">{greetings.name}</h2>
              </NavbarBrand>
              <button 
                className="navbar-toggler shadow-none" 
                id="navbar_global"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon" />
              </button>
              <UncontrolledCollapse
                toggler="#navbar_global"
                navbar
                className={collapseClasses}
                onExiting={onExiting}
                onExited={onExited}
              >
                <div className="navbar-collapse-header">
                  <Row>
                    <Col className="collapse-brand" xs="6">
                      <a to="/">
                        <h3 className="text-black" id="nav-title">{greetings.name}</h3>
                      </a>
                    </Col>
                    <Col className="collapse-close" xs="6">
                      <button className="navbar-toggler" id="navbar_global">
                        <span />
                        <span />
                      </button>
                    </Col>
                  </Row>
                </div>
                <Nav className="align-items-lg-center ms-lg-auto" navbar>
                  <NavItem>
                    <NavLink
                      className="nav-link-icon d-flex align-items-center"
                      href={socialLinks.github}
                      target="_blank"
                    >
                      <FaGithub aria-hidden="true" />
                      <span className="nav-link-inner--text d-lg-none ms-2">
                        Github
                      </span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className="nav-link-icon"
                      href={socialLinks.linkedin}
                      target="_blank"
                    >
                    <FaLinkedin aria-hidden="true" />
                      <span className="nav-link-inner--text d-lg-none ms-2">
                        Linkedin
                      </span>
                    </NavLink>
                  </NavItem>
                </Nav>
              </UncontrolledCollapse>
            </Container>
          </Navbar>
        </header>
      </>
     );
}

export default Navigation;
