import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaBriefcase, FaCode, FaStar, FaHandshake, FaShieldAlt } from 'react-icons/fa';
import '@assets/css/tailwind.css';
import './Section.css';

/**
 * Section component for layout structuring and consistent section styling.
 *
 * @component
 * @param {Object} props - The component props
 * @param {React.ReactNode} props.children - The section content
 * @param {string} [props.id] - The section ID for navigation
 * @param {string} [props.title] - The section title
 * @param {string} [props.subtitle] - The section subtitle
 * @param {string} [props.icon] - Iconify icon name for the section
 * @param {string} [props.className] - Additional CSS classes
 * @param {boolean} [props.container=true] - Whether to wrap content in a container
 * @param {boolean} [props.fluid=false] - Whether the container should be fluid (full-width)
 * @param {string} [props.background] - Background style (light, dark, primary, etc.)
 * @param {Object} [props.animation] - Animation properties for Framer Motion
 * @param {string} [props.ariaLabel] - Aria label for accessibility
 * @param {string} [props.role='region'] - ARIA role for the section
 * @returns {React.ReactElement} The Section component
 */
const Section = ({
  children,
  id,
  title,
  subtitle,
  icon,
  className = '',
  container = true,
  fluid = false,
  background,
  animation,
  ariaLabel,
  role = 'region',
  ...rest
}) => {
  // Base classes
  const defaultBg = 'bg-gray-900 text-white';
  const sectionClasses = [
    'section',
    background ? `bg-${background}` : defaultBg,
    className
  ].filter(Boolean).join(' ');

  // Container classes
  const containerClasses = `container${fluid ? '-fluid' : ''}`;

  // Section header with appropriate icon based on section title
  const sectionHeader = (title || subtitle) && (
    <div className="section-header">
      {/* Map section titles to appropriate React icons */}
      {title === "Education" && <FaGraduationCap className="section-icon" />}
      {title === "Experience" && <FaBriefcase className="section-icon" />}
      {title === "Projects" && <FaCode className="section-icon" />}
      {title === "Skills" && <FaCode className="section-icon" />}
      {title === "Feedbacks" && <FaStar className="section-icon" />}
      {title === "Contact" && <FaHandshake className="section-icon" />}
      {title === "Security" && <FaShieldAlt className="section-icon" />}
      
      {title && <h2 className="section-title text-2xl md:text-3xl font-bold mb-2">{title}</h2>}
      {subtitle && <div className="section-subtitle text-gray-100">{subtitle}</div>}
    </div>
  );

  // Content with optional container
  const content = container ? (
    <div className={containerClasses}>
      {sectionHeader}
      <div className="section-content">
        {children}
      </div>
    </div>
  ) : (
    <>
      {sectionHeader && (
        <div className={containerClasses}>
          {sectionHeader}
        </div>
      )}
      <div className="section-content">
        {children}
      </div>
    </>
  );

  // Common props
  const commonProps = {
    id,
    className: sectionClasses,
    'aria-label': ariaLabel || title,
    role,
    ...rest
  };

  // Handle animation with Framer Motion
  if (animation) {
    return (
      <motion.section {...commonProps} {...animation}>
        {content}
      </motion.section>
    );
  }

  // Regular section without animation
  return (
    <section {...commonProps}>
      {content}
    </section>
  );
};

Section.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  icon: PropTypes.string,
  className: PropTypes.string,
  container: PropTypes.bool,
  fluid: PropTypes.bool,
  background: PropTypes.oneOf(['light', 'dark', 'primary', 'secondary', 'gray']),
  animation: PropTypes.object,
  ariaLabel: PropTypes.string,
  role: PropTypes.string
};

export default Section;
