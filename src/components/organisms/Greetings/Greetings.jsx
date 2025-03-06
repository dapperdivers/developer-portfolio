import React, { useEffect, useState } from "react";
import { greetings } from "@/portfolio";
import { motion, AnimatePresence } from "framer-motion";
import { FaDownload } from 'react-icons/fa';
import Button from '@atoms/Button';
import DisplayLottie from '@molecules/DisplayLottie';
import SocialLinks from '@molecules/SocialLinks';

// Import hero section styles


const Greetings = () => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    // Dynamically fetch the Lottie animation data
    fetch('/lottie/coding.json')
      .then(response => response.json())
      .then(data => {
        setAnimationData(data);
      })
      .catch(error => {
        console.error('Error loading animation:', error);
      });
  }, []);
  return ( 
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.8,
          ease: "easeOut",
          staggerChildren: 0.1
        }}
        exit={{ opacity: 0, y: -20 }}
      >
        <main role="main">
          <div className="relative">
            <section 
              id="greetings"
              className="relative py-20 overflow-hidden pb-64 hero-section"
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
              <div className="container mx-auto px-4 py-12 flex">
                <div className="w-full px-0">
                  <div className="flex flex-wrap -mx-4 ">
                    <div className="w-full px-4 lg:w-6/12 ">
                      <h1 className="display-3 text-white" tabIndex="0">
                        {greetings.title}
                      </h1>
                      <p className="lead text-white" tabIndex="0">
                        {greetings.description}
                      </p>
                      <div className="hero-action-container">
                        <Button
                          className="resume-download-btn"
                          variant="light"
                          size="lg"
                          href={greetings.resumeLink}
                          ariaLabel="Download my resume"
                        >
                          <span className="btn-icon-left">
                            <FaDownload aria-hidden="true" />
                          </span>
                          Download Resume
                        </Button>
                        <SocialLinks />
                      </div>
                    </div>
                    <div className="w-full px-4 lg:w-6/12 ">
                      <div className="lottie-container">
                        {animationData && <DisplayLottie animationData={animationData}/>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
