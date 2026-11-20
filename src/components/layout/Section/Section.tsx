import React from 'react';
import { motion, HTMLMotionProps, MotionProps } from 'framer-motion';
import { FaGraduationCap, FaBriefcase, FaCode, FaStar, FaHandshake, FaShieldAlt } from 'react-icons/fa';
import '@assets/css/tailwind.css';
import './Section.css';
import { useAnimation, MotionVariants } from '@context/AnimationContext';

export interface SectionProps extends HTMLMotionProps<'section'> {
  /** The section content */
  children: React.ReactNode;
  /** The section ID for navigation */
  id?: string;
  /** The section title */
  title?: string;
  /** The section subtitle */
  subtitle?: string;
  /** Iconify icon name for the section */
  icon?: string;
  /** Additional CSS classes */
  className?: string;
  /** Whether to wrap content in a container */
  container?: boolean;
  /** Whether the container should be fluid (full-width) */
  fluid?: boolean;
  /** Animation properties for Framer Motion */
  animation?: MotionProps;
  /** Aria label for accessibility */
  ariaLabel?: string;
  /** ARIA role for the section */
  role?: string;
}

/**
 * Section component for layout structuring and consistent section styling.
 *
 * @component
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
  animation,
  ariaLabel,
  role = 'region',
  ...rest
}: SectionProps) => {
  const { animationEnabled, slideUpVariants, fadeInVariants } = useAnimation();
  
  // Base classes - removed background styling to let global background show through
  const sectionClasses = [
    'section',
    'text-white',
    className
  ].filter(Boolean).join(' ');

  // Container classes
  const containerClasses = `container${fluid ? '-fluid' : ''}`;


  // Section header with appropriate icon based on section title
  const sectionHeader = (title || subtitle) && (
    <motion.div 
      className="section-header p-6 mb-8 relative"
      variants={fadeInVariants}
    >
      
      {/* Map section titles to appropriate React icons */}
      <motion.div 
        className="flex flex-col items-center justify-center relative"
        variants={slideUpVariants}
      >
        {title === "Education" && <FaGraduationCap className="section-icon" />}
        {title === "Experience" && <FaBriefcase className="section-icon" />}
        {title === "Projects" && <FaCode className="section-icon" />}
        {title === "Skills" && <FaCode className="section-icon" />}
        {title === "Feedbacks" && <FaStar className="section-icon" />}
        {title === "Contact" && <FaHandshake className="section-icon" />}
        {title === "Security" && <FaShieldAlt className="section-icon" />}
        
        {title && <h2 className="section-title text-2xl md:text-3xl font-bold mb-2 relative inline-block">
          <span className="relative z-10">{title}</span>
          <span className="absolute bottom-0 left-0 h-1 bg-linear-to-r/srgb from-cyan-500 to-transparent w-full opacity-70"></span>
        </h2>}
        {subtitle && <div className="section-subtitle text-gray-100 max-w-2xl text-center">{subtitle}</div>}
      </motion.div>
    </motion.div>
  );

  // Motion content wrapper
  const contentWrapper = (content: React.ReactNode) => (
    <motion.div 
      variants={slideUpVariants}
      className="relative z-10 pt-2"
    >
      {content}
    </motion.div>
  );

  // Content with optional container
  const content = container ? (
    <div className={`${containerClasses} py-16`}>
      {sectionHeader}
      <motion.div 
        className="section-content p-8 relative"
        variants={fadeInVariants}
      >
        
        {/* Actual content */}
        {contentWrapper(children)}
      </motion.div>
    </div>
  ) : (
    <>
      {sectionHeader && (
        <div className={containerClasses}>
          {sectionHeader}
        </div>
      )}
      <motion.div 
        className="section-content p-8 relative"
        variants={fadeInVariants}
      >
        
        {/* Actual content */}
        {contentWrapper(children)}
      </motion.div>
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

  // Only use animations if they're enabled
  const motionProps: MotionProps = animationEnabled ? {
    initial: "hidden",
    animate: "visible",
    variants: MotionVariants.container,
  } : {};

  // Handle animation with Framer Motion
  if (animation) {
    return (
      <motion.section 
        {...commonProps} 
        {...motionProps}
        {...animation}
      >
        {content}
      </motion.section>
    );
  }

  // Regular section with default animation
  return (
    <motion.section 
      {...commonProps}
      {...motionProps}
    >
      {content}
    </motion.section>
  );
};

export default Section;
