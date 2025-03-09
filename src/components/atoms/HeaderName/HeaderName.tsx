import React from 'react';
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
  return (
    <h2 
      className={`text-xl font-bold text-cyan-400 cyber-text-animation ${className}`.trim()}
      data-content={name}
      aria-label={name}
    >
      {name}
      <span className="cursor" aria-hidden="true"></span>
      <div className="scanline" aria-hidden="true"></div>
    </h2>
  );
};

export default HeaderName;
