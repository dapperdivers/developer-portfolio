import React from 'react';
import PropTypes from 'prop-types';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { socialLinks } from "@/portfolio";
import './SocialLinks.css';


/**
 * Social Links component for displaying social media links
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.className - Additional CSS classes
 * @returns {React.ReactElement} SocialLinks component
 */
const SocialLinks = ({ className = '' }) => {
    return (
        <div className={`flex items-center flex-wrap gap-3 ${className}`}>
            {socialLinks.github && (
                <a
                    className="social-link"
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
                    className="social-link"
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

SocialLinks.propTypes = {
    /** Additional CSS classes */
    className: PropTypes.string
};

export default SocialLinks;
