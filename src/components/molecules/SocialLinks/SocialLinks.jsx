import React from 'react';
import PropTypes from 'prop-types';
import { FaGithub, FaLinkedin, FaAddressCard } from 'react-icons/fa';
import { socialLinks, contact } from "@/portfolio";
import useCallbackHandlers from '@/hooks/useCallbackHandlers';
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
    const { handleDownload } = useCallbackHandlers();
    
    const downloadContactCard = (e) => {
        e.preventDefault();
        handleDownload(contact.vcfLink, 'Derek_Mackley.vcf');
    };
    
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
            
            {contact.vcfLink && (
                <a
                    className="social-link"
                    href={contact.vcfLink}
                    onClick={downloadContactCard}
                    aria-label="Download Contact Card"
                >
                    <FaAddressCard className="w-6 h-6" />
                </a>
            )}
        </div>
    );
};

SocialLinks.propTypes = {
    /** Additional CSS classes */
    className: PropTypes.string
};

export default SocialLinks;
