import React from "react";
import { greetings } from "@/portfolio";
import { motion } from "framer-motion";
import { FaDownload, FaChevronDown } from 'react-icons/fa';
import Button from '@atoms/Button';
import SocialLinks from '@molecules/SocialLinks';
import useCallbackHandlers from '@/hooks/useCallbackHandlers';

const Greetings = () => {
  const { handleDownload } = useCallbackHandlers();
  
  const scrollToNextSection = () => {
    const nextSection = document.querySelector('.greetings-section').nextElementSibling;
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const downloadResume = (e) => {
    e.preventDefault();
    handleDownload('/files/Derek_Mackley_Resume_2025.pdf', 'Derek_Mackley_Resume_2025.pdf');
  };

  return (
    <section className="greetings-section min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center relative">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            {greetings.title}
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl mb-10 leading-relaxed text-gray-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {greetings.description}
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row justify-center items-center gap-8 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <Button
              variant="light"
              size="lg"
              href={greetings.resumeLink}
              ariaLabel="Download Resume"
              type="button"
              className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold shadow-xl px-8 py-4 rounded-xl text-xl transition-all duration-300 transform hover:scale-105"
              onClick={downloadResume}
            >
              <FaDownload className="mr-3 text-2xl" />
              Download Resume
            </Button>
            
            <div className="social-links-wrapper p-3 scale-110">
              <SocialLinks />
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div 
        className="absolute bottom-8 left-0 right-0 flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <button 
          onClick={scrollToNextSection}
          className="animate-bounce p-2 bg-transparent text-cyan-400 rounded-full hover:text-cyan-300 focus:outline-none transition-colors duration-300"
          aria-label="Scroll to next section"
        >
          <FaChevronDown className="text-3xl" />
        </button>
      </motion.div>
    </section>
  );
}
 
export default Greetings;
