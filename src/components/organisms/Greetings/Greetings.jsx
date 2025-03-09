import React from "react";
import { greetings } from "@/portfolio";
import { motion } from "framer-motion";
import { FaDownload } from 'react-icons/fa';
import Button from '@atoms/Button';
import SocialLinks from '@molecules/SocialLinks';
import ScrollDown from '@atoms/ScrollDown';
import useCallbackHandlers from '@/hooks/useCallbackHandlers';
import './Greetings.css';

const Greetings = () => {
  const { handleDownload } = useCallbackHandlers();
  
  const scrollToNextSection = () => {
    const nextSection = document.querySelector('#greetings-section').nextElementSibling;
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const downloadResume = (e) => {
    e.preventDefault();
    handleDownload('/files/Derek_Mackley_Resume_2025.pdf', 'Derek_Mackley_Resume_2025.pdf');
  };

  return (
    <div id="greetings-section" className="min-h-screen text-text flex flex-col justify-center items-center relative">
      <div className="container mx-auto px-container-x py-8 md:py-section-y">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center backdrop-blur-sm bg-theme-navy/80 p-card rounded-lg border border-theme-cyan/30 shadow-lg relative overflow-hidden"
        >
          {/* Cyberpunk decorative elements - Hide on very small screens */}
          <div className="hidden sm:block absolute top-0 left-0 w-16 md:w-20 h-16 md:h-20 pointer-events-none opacity-60">
            <div className="absolute top-0 left-0 w-6 md:w-8 h-0.5 bg-theme-cyan"></div>
            <div className="absolute top-0 left-0 w-0.5 h-6 md:h-8 bg-theme-cyan"></div>
          </div>
          <div className="hidden sm:block absolute top-0 right-0 w-16 md:w-20 h-16 md:h-20 pointer-events-none opacity-60">
            <div className="absolute top-0 right-0 w-6 md:w-8 h-0.5 bg-theme-cyan"></div>
            <div className="absolute top-0 right-0 w-0.5 h-6 md:h-8 bg-theme-cyan"></div>
          </div>
          <div className="hidden sm:block absolute bottom-0 right-0 w-16 md:w-20 h-16 md:h-20 pointer-events-none opacity-60">
            <div className="absolute bottom-0 right-0 w-6 md:w-8 h-0.5 bg-theme-cyan"></div>
            <div className="absolute bottom-0 right-0 w-0.5 h-6 md:h-8 bg-theme-cyan"></div>
          </div>
          <div className="hidden sm:block absolute bottom-0 left-0 w-16 md:w-20 h-16 md:h-20 pointer-events-none opacity-60">
            <div className="absolute bottom-0 left-0 w-6 md:w-8 h-0.5 bg-theme-cyan"></div>
            <div className="absolute bottom-0 left-0 w-0.5 h-6 md:h-8 bg-theme-cyan"></div>
          </div>
          
          {/* Content with relative positioning for layering */}
          <div className="relative z-fixed">
            <h1 
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 md:mb-8 text-transparent bg-clip-text bg-gradient-to-r from-theme-cyan to-primary"
              data-testid="greeting-heading"
            >
              {greetings.title}
            </h1>
            
            <div className="space-y-3 md:space-y-4">
              <p className="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto leading-loose text-theme-offwhite opacity-90 px-2 sm:px-4" data-testid="title-text">
                {greetings.description}
              </p>
            </div>
            
            {/* Download resume button with cyberpunk styling */}
            <div className="pt-6 md:pt-8 mb-4 md:mb-6">
              <button
                onClick={downloadResume}
                className="group relative px-button-x py-button-y bg-transparent hover:bg-theme-cyan/20 text-theme-cyan transition-all duration-DEFAULT border border-theme-cyan/50 hover:shadow-focus focus:outline-none cyberpunk-button"
              >
                <span className="absolute top-0 left-0 w-2 sm:w-3 h-0.5 bg-theme-cyan transform -translate-y-1/2 group-hover:w-4 sm:group-hover:w-6 transition-all duration-DEFAULT"></span>
                <span className="absolute top-0 left-0 w-0.5 h-2 sm:h-3 bg-theme-cyan transform -translate-x-1/2 group-hover:h-4 sm:group-hover:h-6 transition-all duration-DEFAULT"></span>
                <span className="absolute bottom-0 right-0 w-2 sm:w-3 h-0.5 bg-theme-cyan transform translate-y-1/2 group-hover:w-4 sm:group-hover:w-6 transition-all duration-DEFAULT"></span>
                <span className="absolute bottom-0 right-0 w-0.5 h-2 sm:h-3 bg-theme-cyan transform translate-x-1/2 group-hover:h-4 sm:group-hover:h-6 transition-all duration-DEFAULT"></span>
                <span className="font-mono text-base sm:text-lg tracking-widest whitespace-nowrap">Download Resume</span>
              </button>
            </div>
            
            {/* Social Links */}
            <div className="flex justify-center mt-2 md:mt-4">
              <SocialLinks />
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll down indicator using the ScrollDown atom component */}
      <div className="absolute bottom-4 sm:bottom-8 md:bottom-10 left-1/2 transform -translate-x-1/2">
        <ScrollDown onClick={scrollToNextSection} />
      </div>
    </div>
  );
}
 
export default Greetings;
