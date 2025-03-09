import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useAnimation } from '@context/AnimationContext';
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
 * @param {boolean} [props.animated=true] - Whether to animate the component
 * @returns {React.ReactElement} SocialLinks component
 */
const SocialLinks = ({ className = '', animated = true }) => {
    const { handleDownload } = useCallbackHandlers();
    const { animationEnabled } = useAnimation();
    
    // Only use animations if both props are enabled
    const shouldAnimate = animated && animationEnabled;
    
    const downloadContactCard = (e) => {
        e.preventDefault();
        handleDownload(contact.vcfLink, 'Derek_Mackley.vcf');
    };
    
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
            }
        }
    };
    
    const itemVariants = {
        hidden: { opacity: 0, y: 10, scale: 0.8 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { 
                type: "spring", 
                stiffness: 300, 
                damping: 15 
            }
        }
    };
    
    // Hover animation for social links
    const hoverVariants = {
        hover: {
            y: -5,
            scale: 1.1,
            backgroundColor: 'var(--color-gray-700)',
            color: 'var(--color-primary)',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            transition: { duration: 0.2 }
        },
        tap: {
            scale: 0.95,
            transition: { duration: 0.1 }
        }
    };
    
    return (
        <motion.div 
            className={`flex items-center flex-wrap gap-3 ${className}`}
            initial={shouldAnimate ? "hidden" : "visible"}
            animate="visible"
            variants={shouldAnimate ? containerVariants : {}}
        >
            {socialLinks.github && (
                <motion.a
                    className="social-link"
                    href={socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub Profile"
                    variants={shouldAnimate ? itemVariants : {}}
                    whileHover={shouldAnimate ? "hover" : {}}
                    whileTap={shouldAnimate ? "tap" : {}}
                >
                    <FaGithub className="w-6 h-6" />
                </motion.a>
            )}
            
            {socialLinks.linkedin && (
                <motion.a
                    className="social-link"
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn Profile"
                    variants={shouldAnimate ? itemVariants : {}}
                    whileHover={shouldAnimate ? "hover" : {}}
                    whileTap={shouldAnimate ? "tap" : {}}
                >
                    <FaLinkedin className="w-6 h-6" />
                </motion.a>
            )}
            
            {contact.vcfLink && (
                <motion.a
                    className="social-link"
                    href={contact.vcfLink}
                    onClick={downloadContactCard}
                    aria-label="Download Contact Card"
                    variants={shouldAnimate ? itemVariants : {}}
                    whileHover={shouldAnimate ? "hover" : {}}
                    whileTap={shouldAnimate ? "tap" : {}}
                >
                    <FaAddressCard className="w-6 h-6" />
                </motion.a>
            )}
        </motion.div>
    );
};

SocialLinks.propTypes = {
    /** Additional CSS classes */
    className: PropTypes.string,
    /** Whether to animate the component */
    animated: PropTypes.bool
};

export default SocialLinks;
