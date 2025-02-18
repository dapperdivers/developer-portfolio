import React from "react";
import { greetings } from "../portfolio";
import code from '../assets/lottie/coding.json';
import { motion, AnimatePresence } from "framer-motion";
import { Button, Container, Row, Col } from "reactstrap";
import { FaFileAlt } from 'react-icons/fa';
import GreetingLottie from "../components/DisplayLottie";
import SocialLinks from "../components/SocialLinks";

const Greetings = () => {
  return ( 
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.5,
          ease: "easeOut"
        }}
        exit={{ opacity: 0, y: -20 }}
      >
        <main role="main">
          <div className="position-relative">
            <section 
              id="greetings"
              className="section section-lg section-shaped pb-250"
              aria-label="Introduction"
            >
              <div className="shape shape-style-1 bg-gradient-info">
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
              <Container className="py-lg-md d-flex">
                <div className="col px-0">
                  <Row>
                    <Col lg="6">
                      <h1 className="display-3 text-white" tabIndex="0">
                        {greetings.title}
                      </h1>
                      <p className="lead text-white" tabIndex="0">
                        {greetings.description}
                      </p>
                      <SocialLinks />
                      <div className="btn-wrapper my-4">
                        <Button
                          className="btn-white btn-icon mb-3 mb-sm-0 ml-1"
                          color="default"
                          href={greetings.resumeLink}
                        >
                          <span className="btn-inner--icon me-2">
                            <FaFileAlt aria-hidden="true" />
                          </span>
                          <span className="btn-inner--text">See My Resume</span>
                        </Button>
                      </div>
                    </Col>
                    <Col lg="6">
                      <GreetingLottie animationData={code}/>
                    </Col>
                  </Row>
                </div>
              </Container>
              {/* SVG separator */}
              <div className="separator separator-bottom separator-skew">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                  version="1.1"
                  viewBox="0 0 2560 100"
                  x="0"
                  y="0"
                >
                  <polygon
                    className="fill-white"
                    points="2560 0 2560 100 0 100"
                  />
                </svg>
              </div>
            </section>
            {/* 1st Hero Variation */}
          </div>
        </main>
      </motion.div>
    </AnimatePresence>
   );
}
 
export default Greetings;
