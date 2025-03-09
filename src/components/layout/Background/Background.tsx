import React, { memo, useEffect, useRef, useMemo } from 'react';
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

  // Track if animations have already played
  const animationsPlayedRef = useRef(false);

  // Memoize static effects to prevent re-renders
  const staticEffects = useMemo(() => ({
    circuit: enableCircuitGrid && (
      <div className="background__circuit-grid effect-layer hardware-accelerated" />
    ),
    scanlines: enableScanlines && (
      <div className="background__scanlines effect-layer hardware-accelerated" />
    ),
    glitch: enableGlitch && (
      <div className="background__glitch effect-layer hardware-accelerated" />
    ),
    colorPulse: enableColorPulse && (
      <div className="background__color-pulse effect-layer hardware-accelerated" />
    ),
    noise: enableNoise && (
      <div className="background__noise effect-layer hardware-accelerated" />
    )
  }), [enableCircuitGrid, enableScanlines, enableGlitch, enableColorPulse, enableNoise]);

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

    // Play animations only once when first in view
    if (inView && animationEnabled && !animationsPlayedRef.current) {
      effectIds.forEach((id, index) => {
        playEntryAnimation(id, index * 0.1);
      });
      animationsPlayedRef.current = true;
    }
  }, [registerEntryAnimation, playEntryAnimation, inView, animationEnabled]);
  
  // Only show effects if animations are enabled
  const shouldShowEffects = animationEnabled;
  
  return (
    <div 
      className={`background ${className}`} 
      {...rest}
    >
      <div className="background__effects hardware-accelerated">
        {shouldShowEffects && enableMatrix && (
          <div className="effect-layer hardware-accelerated">
            <MatrixBackground characterCount={matrixCharCount} randomPositioning={true} />
          </div>
        )}
        
        {shouldShowEffects && enableBinaryStreams && (
          <div className="effect-layer hardware-accelerated">
            <BinaryStream position="left" count={30} baseDelay={0.1} />
            <BinaryStream position="right" count={30} baseDelay={0.15} />
            <BinaryStream position="top" count={50} baseDelay={0.2} />
            <BinaryStream position="bottom" count={50} baseDelay={0.25} />
          </div>
        )}
        
        {shouldShowEffects && staticEffects.circuit}
        {shouldShowEffects && staticEffects.scanlines}
        {shouldShowEffects && staticEffects.glitch}
        {shouldShowEffects && staticEffects.colorPulse}
        {shouldShowEffects && staticEffects.noise}
      </div>
      
      <div className="background__content">
        {children}
      </div>
    </div>
  );
};

// Apply memoization for performance optimization
export default memo(Background);
