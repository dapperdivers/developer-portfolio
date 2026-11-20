import React from 'react';
import { motion, Variants } from 'framer-motion';
import { FaGithub, FaLinkedin, FaAddressCard } from 'react-icons/fa';
import { downloadFile } from '@utils/download';
import { useMotionEnabled } from '@utils/motion';
import type { ProfileLinks } from '@/types/portfolio';
import './SocialLinks.css';


export interface SocialLinksProps {
  /** Additional CSS classes */
  className?: string;
  /** Whether to animate the component */
  animated?: boolean;
  /** Profile URLs and the vCard to download; an icon shows only if its link is given */
  links?: Partial<ProfileLinks>;
}

/**
 * Row of icon links: GitHub, LinkedIn and a downloadable contact card.
 * Each icon shows only if its link is given. A props-only building block.
 *
 * @component
 */
const SocialLinks = ({ className = '', animated = true, links = {} }: SocialLinksProps) => {
    const socialLinks = links;
    const shouldAnimate = useMotionEnabled(animated);

    const downloadContactCard = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        if (!links.contactCard) return;
        // Save under the file's own name, e.g. "Derek_Mackley.vcf"
        downloadFile(links.contactCard, links.contactCard.split('/').pop());
    };

    // Animation variants
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants: Variants = {
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
    const hoverVariants: Variants = {
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

export default SocialLinks;
