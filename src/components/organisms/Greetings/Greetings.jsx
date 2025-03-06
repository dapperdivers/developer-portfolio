import React from "react";
import { greetings } from "@/portfolio";
import { motion } from "framer-motion";
import { FaDownload } from 'react-icons/fa';
import Button from '@atoms/Button';
import SocialLinks from '@molecules/SocialLinks';

const Greetings = () => {
  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold mb-4 text-cyan-400">
            {greetings.title}
          </h1>
          
          <p className="text-lg mb-6 max-w-2xl mx-auto text-gray-300">
            {greetings.description}
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-6">
            <Button
              variant="light"
              size="lg"
              href={greetings.resumeLink}
              ariaLabel="Download Resume"
              type="button"
              className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold shadow-lg px-6 py-3 transition-colors duration-300"
            >
              <FaDownload className="mr-2 text-xl" />
              Download Resume
            </Button>
            
            <div className="social-links-wrapper p-2">
              <SocialLinks />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
 
export default Greetings;
