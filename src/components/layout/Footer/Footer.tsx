import React, { memo } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useAnimation } from '@context/AnimationContext';
import useClusterStatus from '@hooks/useClusterStatus';
import { clusterHealth, healthLabel } from '@molecules/ClusterStatus/clusterSummary';
import useFooter from '@hooks/useFooter';
import useCallbackHandlers from '@/hooks/useCallbackHandlers';
import './Footer.css';

interface ClusterLine {
  text: string;
  live: boolean;
}

// "Served from a Talos cluster in my garage · 11 nodes · 266 pods · all systems up".
// Without live data only the fixed part is shown.
const buildClusterLine = ({ status, data }: ReturnType<typeof useClusterStatus>): ClusterLine => {
  const parts = ['Served from a Talos cluster in my garage'];
  if (status !== 'ok' || !data) return { text: parts[0], live: false };
  const nodes = data.badges.cluster_node_count?.value;
  const pods = data.badges.cluster_pod_count?.value;
  const health = healthLabel(clusterHealth(data));
  if (nodes) parts.push(`${nodes} nodes`);
  if (pods) parts.push(`${pods} pods`);
  if (health) parts.push(health);
  return { text: parts.join(' · '), live: true };
};

/**
 * Footer component with essential information and links in a concise format.
 * Enhanced with framer-motion animations.
 *
 * @component
 * @returns {React.ReactElement} Footer component
 */
const Footer = () => {
  const { currentYear, greetings } = useFooter();
  const { handleDownload } = useCallbackHandlers();
  const { animationEnabled } = useAnimation();
  const cluster = useClusterStatus();
  const clusterLine = buildClusterLine(cluster);

  // Animation variants for footer elements
  const footerVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 10
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  const linkHoverVariants = {
    hover: {
      scale: 1.05,
      color: "var(--color-white)",
      transition: { duration: 0.2 }
    }
  } satisfies Variants;

  const downloadContactCard = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    handleDownload('/contact/Derek_Mackley.vcf', 'Derek_Mackley.vcf');
  };

  return (
    <motion.footer
      className="text-gray-200 py-6 border-t border-gray-800"
      role="contentinfo"
      data-testid="footer"
      initial={animationEnabled ? "hidden" : false}
      animate={animationEnabled ? "visible" : false}
      variants={footerVariants}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between">
          {/* Copyright */}
          <motion.div
            className="w-full md:w-auto mb-3 md:mb-0 text-center md:text-left"
            variants={itemVariants}
          >
            <span className="text-sm md:mr-6">
              © {currentYear} {greetings.name}
            </span>
          </motion.div>

          {/* Essential Links */}
          <motion.div
            className="w-full md:w-auto mb-3 md:mb-0 text-center md:text-right"
            variants={itemVariants}
          >
            <AnimatePresence>
              {["Home", "Experience", "Projects", "Contact", "Resume", "Contact Card"].map((item, index) => {
                const href = item === "Home" ? "#main-content" :
                       item === "Resume" ? (greetings.resumeLink || "/files/Cybersecurity_2025.pdf") :
                       item === "Contact Card" ? "/contact/Derek_Mackley.vcf" :
                       `#${item.toLowerCase()}`;

                const handleClick = item === "Contact Card" ? downloadContactCard : undefined;

                return (
                  <motion.a
                    key={item}
                    href={href}
                    className="text-gray-400 hover:text-white text-sm mx-2 my-1 inline-block whitespace-nowrap"
                    onClick={handleClick}
                    whileHover={animationEnabled ? linkHoverVariants.hover : undefined}
                    variants={itemVariants}
                    custom={index}
                  >
                    {item}
                  </motion.a>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {/* Where the site runs, with live numbers */}
          <motion.div className="w-full text-center md:text-right mt-1" variants={itemVariants}>
            <a
              href="https://github.com/dapperdivers/dapper-cluster"
              className="footer-cluster-line text-sm text-gray-400 hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="footer-cluster-line"
            >
              <span className={`footer-cluster-dot${clusterLine.live ? ' footer-cluster-dot--live' : ''}`} aria-hidden="true" />
              {clusterLine.text}
            </a>
          </motion.div>
        </div>
      </div>
    </motion.footer>
  );
};

// Apply memoization for performance optimization
export default memo(Footer);
