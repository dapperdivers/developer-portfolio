import React from 'react';
import { motion, HTMLMotionProps, MotionProps } from 'framer-motion';
import '@assets/css/tailwind.css';
import './Section.css';
import { useAnimation } from '@context/AnimationContext';
import { slideUpVariants, fadeInVariants } from '@utils/motion';

// Staggers the section's children as they appear
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export interface SectionProps extends HTMLMotionProps<'section'> {
  /** The section content */
  children: React.ReactNode;
  /** The section ID for navigation */
  id?: string;
  /** The section title */
  title?: string;
  /** The section subtitle */
  subtitle?: string;
  /** Path-style label above the title, e.g. "~/experience". Defaults to `~/<id>`; pass "" to hide. */
  kicker?: string;
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
  kicker,
  className = '',
  container = true,
  fluid = false,
  animation,
  ariaLabel,
  role = 'region',
  ...rest
}: SectionProps) => {
  const { animationEnabled } = useAnimation();
  
  // Base classes - removed background styling to let global background show through
  const sectionClasses = [
    'section',
    'text-white',
    className
  ].filter(Boolean).join(' ');

  // Container classes
  const containerClasses = `container${fluid ? '-fluid' : ''}`;


  // One header for every section: path kicker, title, optional subtitle
  const kickerText = kicker ?? (id ? `~/${id}` : '');
  const sectionHeader = (title || subtitle) && (
    <motion.div
      className="section-header"
      variants={fadeInVariants}
    >
      <motion.div variants={slideUpVariants}>
        {kickerText && (
          <p className="section-kicker" aria-hidden="true">{kickerText}</p>
        )}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}
      </motion.div>
    </motion.div>
  );

  // Motion content wrapper
  const contentWrapper = (content: React.ReactNode) => (
    <motion.div 
      variants={slideUpVariants}
      className="relative z-10"
    >
      {content}
    </motion.div>
  );

  // Content with optional container
  const content = container ? (
    <div className={containerClasses}>
      {sectionHeader}
      <motion.div 
        className="section-content"
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
        className="section-content"
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
    variants: containerVariants,
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
