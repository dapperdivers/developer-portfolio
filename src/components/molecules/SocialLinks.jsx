import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { socialLinks } from "../../portfolio";


/**
 * Social Links component for displaying social media links
 * 
 * @component
 * @returns {React.ReactElement} SocialLinks component
 */
const SocialLinks = () => {
    return (
        <div className="flex items-center flex-wrap gap-3">
            {socialLinks.github && (
                <a
                    className="flex items-center justify-center w-11 h-11 rounded-full bg-white/95 text-primary border-none transition-all duration-200 ease-in-out no-underline shadow-sm hover:bg-white hover:text-primary-dark hover:translate-y-[-3px] hover:shadow-md focus:outline-none focus:shadow focus:ring-2 focus:ring-primary/50"
                    href={socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub Profile"
                >
                    <FaGithub className="w-6 h-6" />
                </a>
            )}
            
            {socialLinks.linkedin && (
                <a
                    className="flex items-center justify-center w-11 h-11 rounded-full bg-white/95 text-primary border-none transition-all duration-200 ease-in-out no-underline shadow-sm hover:bg-white hover:text-primary-dark hover:translate-y-[-3px] hover:shadow-md focus:outline-none focus:shadow focus:ring-2 focus:ring-primary/50"
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn Profile"
                >
                    <FaLinkedin className="w-6 h-6" />
                </a>
            )}
            
            {/* Additional social links can be added here */}
        </div>
    );
};

export default SocialLinks;
