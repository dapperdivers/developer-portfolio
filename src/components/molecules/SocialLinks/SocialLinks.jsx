import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaAddressCard } from 'react-icons/fa';
import { downloadFile } from '@utils/download';
import { useMotionEnabled } from '@utils/motion';
import './SocialLinks.css';


/**
 * Row of icon links: GitHub, LinkedIn and a downloadable contact card.
 * Each icon shows only if its link is given. A props-only building block.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} [props.animated=true] - Whether to animate the component
 * @param {Object} [props.links] - `github` and `linkedin` profile URLs, and `contactCard`, the URL of a vCard to download
 * @returns {React.ReactElement} SocialLinks component
 */
const SocialLinks = ({ className = '', animated = true, links = {} }) => {
    const socialLinks = links;
    const shouldAnimate = useMotionEnabled(animated);

    const downloadContactCard = (e) => {
        e.preventDefault();
        // Save under the file's own name, e.g. "Derek_Mackley.vcf"
        downloadFile(links.contactCard, links.contactCard.split('/').pop());
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

            {links.contactCard && (
                <motion.a
                    className="social-link"
                    href={links.contactCard}
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
    animated: PropTypes.bool,
    /** Profile URLs and the vCard to download; an icon shows only if its link is given */
    links: PropTypes.shape({
        github: PropTypes.string,
        linkedin: PropTypes.string,
        contactCard: PropTypes.string
    })
};

export default SocialLinks;
