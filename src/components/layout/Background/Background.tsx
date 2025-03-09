import React, { memo, useEffect } from 'react';
import './Background.css';
import MatrixBackground from '../../atoms/MatrixBackground';
import BinaryStream from '../../atoms/BinaryStream';
import { useAnimation } from '../../../context/AnimationContext';

/**
 * Background layout component
 * Creates a cyberpunk-themed background for the entire site
 * 
 * @component
 * @param {Object} props - Component props
 * @returns {React.ReactElement} Background component
 */
export interface BackgroundProps {
  /** Layout content */
  children: React.ReactNode;
  /** Additional CSS class names */
  className?: string;
  /** Enable/disable the matrix effect */
  enableMatrix?: boolean;
  /** Enable/disable the binary streams */
  enableBinaryStreams?: boolean;
  /** Enable/disable the circuit grid overlay */
  enableCircuitGrid?: boolean;
  /** Enable/disable the scanline effect */
  enableScanlines?: boolean;
  /** Enable/disable the glitch effect */
  enableGlitch?: boolean;
  /** Enable/disable the color pulse effect */
  enableColorPulse?: boolean;
  /** Enable/disable the noise texture */
  enableNoise?: boolean;
  /** Matrix character count */
  matrixCharCount?: number;
  [key: string]: any;
}

const Background = (props: BackgroundProps) => {
  const { 
    children, 
    className = '', 
    enableMatrix = true,
    enableBinaryStreams = true,
    enableCircuitGrid = true,
    enableScanlines = true,
    enableGlitch = true,
    enableColorPulse = true,
    enableNoise = true,
    matrixCharCount = 100,
    ...rest 
  } = props;

  // Get animation context
  const { 
    animationEnabled, 
    registerEntryAnimation, 
    playEntryAnimation,
    inView 
  } = useAnimation();

  // Register background effects with animation system
  useEffect(() => {
    const effectIds = [
      'background-matrix',
      'background-binary',
      'background-circuit',
      'background-scanlines',
      'background-glitch',
      'background-color-pulse',
      'background-noise'
    ];

    // Register each effect
    effectIds.forEach(id => registerEntryAnimation(id));

    // Play animations when in view
    if (inView && animationEnabled) {
      effectIds.forEach((id, index) => {
        playEntryAnimation(id, index * 0.1);
      });
    }
  }, [registerEntryAnimation, playEntryAnimation, inView, animationEnabled]);
  
  // Only show effects if animations are enabled
  const shouldShowEffects = animationEnabled;
  
  return (
    <div 
      className={`background ${className}`} 
      {...rest}
    >
      <div className="background__effects">
        {shouldShowEffects && enableMatrix && (
          <MatrixBackground characterCount={matrixCharCount} randomPositioning={true} />
        )}
        
        {shouldShowEffects && enableBinaryStreams && (
          <>
            <BinaryStream position="left" count={30} baseDelay={0.1} />
            <BinaryStream position="right" count={30} baseDelay={0.15} />
            <BinaryStream position="top" count={50} baseDelay={0.2} />
            <BinaryStream position="bottom" count={50} baseDelay={0.25} />
          </>
        )}
        
        {shouldShowEffects && enableCircuitGrid && (
          <div className="background__circuit-grid"></div>
        )}
        
        {shouldShowEffects && enableScanlines && (
          <div className="background__scanlines"></div>
        )}
        
        {shouldShowEffects && enableGlitch && (
          <div className="background__glitch"></div>
        )}
        
        {shouldShowEffects && enableColorPulse && (
          <div className="background__color-pulse"></div>
        )}
        
        {shouldShowEffects && enableNoise && (
          <div className="background__noise"></div>
        )}
      </div>
      
      <div className="background__content">
        {children}
      </div>
    </div>
  );
};

// Apply memoization for performance optimization
export default memo(Background);
