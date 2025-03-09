import React, { memo, useEffect, useRef, useMemo, useState } from 'react';
import './Background.css';
import MatrixBackground from '../../atoms/MatrixBackground';
import BinaryStream from '../../atoms/BinaryStream';
import { useAnimation } from '../../../context/AnimationContext';
// No longer need any debugging imports since we're using the centralized approach

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

/**
 * Detect low-powered devices to reduce effects
 * Uses heuristics to determine if we should disable certain effects
 */
const detectLowPowerDevice = () => {
  // Check for mobile/tablet devices which typically have less GPU power
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  // Check number of logical processors
  const cpuCores = navigator.hardwareConcurrency || 4;
  
  // Check device memory (only available in Chrome)
  const lowMemory = (navigator as any).deviceMemory !== undefined && (navigator as any).deviceMemory < 4;
  
  // Return true if device is likely low-powered
  return isMobile || cpuCores <= 2 || lowMemory;
};

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
  
  // Simplified performance values - no longer tied to debug system
  const optimizedMatrixCount = matrixCharCount;
  const optimizedBinaryCount = enableBinaryStreams ? 30 : 0;

  // State for device detection
  const [isLowPowerDevice] = useState(() => detectLowPowerDevice());
  
  // Create memoized static background elements
  const staticEffects = useMemo(() => ({
    circuit: enableCircuitGrid && <div className="background__circuit-grid effect-layer"></div>,
    scanlines: enableScanlines && <div className="background__scanlines effect-layer"></div>,
    glitch: enableGlitch && <div className="background__glitch effect-layer"></div>,
    colorPulse: enableColorPulse && <div className="background__color-pulse effect-layer"></div>,
    noise: enableNoise && <div className="background__noise effect-layer"></div>
  }), [enableCircuitGrid, enableScanlines, enableGlitch, enableColorPulse, enableNoise]);
  
  // Get animation context and settings
  const { animationEnabled, registerEntryAnimation, playEntryAnimation } = useAnimation();
  
  // Ref to track whether animations have been played
  const animationsPlayedRef = useRef(false);
  
  // Use ref to detect if component is in view for animations
  const backgroundRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  
  // Set up intersection observer to check if background is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      {
        threshold: 0.1
      }
    );
    
    if (backgroundRef.current) {
      observer.observe(backgroundRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  // Register and play animations when in view
  useEffect(() => {
    // Names of all effect elements that should animate in
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
  
  // Add low-performance-mode class when detected
  const backgroundClass = `background ${className} ${isLowPowerDevice ? 'low-performance-mode' : ''} ${!shouldShowEffects ? 'background-disabled' : ''}`;
  
  return (
    <div 
      className={backgroundClass} 
      ref={backgroundRef}
      {...rest}
    >
      {/* Only render effects if enabled */}
      {shouldShowEffects && (
        <div className="background__effects hardware-accelerated">
          {shouldShowEffects && enableMatrix && (
            <div className="effect-layer hardware-accelerated">
              <MatrixBackground 
                characterCount={optimizedMatrixCount} 
                randomPositioning={true} 
              />
            </div>
          )}
          
          {shouldShowEffects && enableBinaryStreams && (
            <div className="effect-layer hardware-accelerated">
              <BinaryStream position="left" count={optimizedBinaryCount} baseDelay={0.1} />
              <BinaryStream position="right" count={optimizedBinaryCount} baseDelay={0.15} />
              <BinaryStream position="top" count={Math.floor(optimizedBinaryCount * 1.5)} baseDelay={0.2} />
              <BinaryStream position="bottom" count={Math.floor(optimizedBinaryCount * 1.5)} baseDelay={0.25} />
            </div>
          )}
          
          {shouldShowEffects && staticEffects.circuit}
          {shouldShowEffects && staticEffects.scanlines}
          {shouldShowEffects && staticEffects.glitch}
          {shouldShowEffects && staticEffects.colorPulse}
          {shouldShowEffects && staticEffects.noise}
        </div>
      )}
      
      <div className="background__content">
        {children}
      </div>
    </div>
  );
};

// Apply memoization for performance optimization
// Debugging is now applied centrally in App.jsx
export default memo(Background);
