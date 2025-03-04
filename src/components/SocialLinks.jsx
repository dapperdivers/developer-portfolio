import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { socialLinks } from "../portfolio";
import './SocialLinks.css';

/**
 * Social Links component for displaying social media links
 * 
 * @component
 * @returns {React.ReactElement} SocialLinks component
 */
const SocialLinks = () => {
    return (
        <div className="social-links">
            {socialLinks.github && (
                <a
                    className="social-link-button"
                    href={socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub Profile"
                >
                    <FaGithub className="social-icon" />
                </a>
            )}
            
            {socialLinks.linkedin && (
                <a
                    className="social-link-button"
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn Profile"
                >
                    <FaLinkedin className="social-icon" />
                </a>
            )}
            
            {/* Additional social links can be added here */}
        </div>
    );
};

export default SocialLinks;
