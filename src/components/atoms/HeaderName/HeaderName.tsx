import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useAnimation as useAppAnimation } from '@context/AnimationContext';
import './HeaderName.css';

/**
 * HeaderName component - Displays a name with cyberpunk animation effects
 * 
 * @component
 * @example
 * ```tsx
 * <HeaderName name="John Doe" />
 * ```
 */
interface HeaderNameProps {
  /** The name to display with animation effects */
  name: string;
  /** Optional CSS class names to add to the component */
  className?: string;
}

const HeaderName: React.FC<HeaderNameProps> = ({ 
  name, 
  className = '' 
}: HeaderNameProps) => {
  const controls = useAnimation();
  const { animationEnabled } = useAppAnimation();

  return (
    <motion.div
      className={`relative cyber-text-animation ${className}`.trim()}
      initial={{ opacity: 1 }}
      whileHover={{ opacity: 1 }}
      onHoverStart={() => animationEnabled && controls.start('hover')}
      onHoverEnd={() => controls.start('initial')}
    >
      <h2 
        className="font-agustina text-4xl text-cyan-400 relative tracking-wide flex items-center"
        data-content={name}
        aria-label={name}
      >
        {name}
        <span className="cursor" aria-hidden="true" />
      </h2>
      
      <div className="scanline" aria-hidden="true" />
      
      <div className="glow-line" aria-hidden="true" />
    </motion.div>
  );
};

export default HeaderName;
