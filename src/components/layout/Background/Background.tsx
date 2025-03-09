import React, { memo, useEffect, useRef, useState } from 'react';
import './Background.css';
import { useAnimation } from '@context/AnimationContext';

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
  [key: string]: any;
}

const Background = (props: BackgroundProps) => {
  const { 
    children, 
    className = '',
    enableCircuitGrid = true,
    enableScanlines = true,
    enableGlitch = false,
    enableColorPulse = true,
    enableNoise = false,
    ...rest 
  } = props;
  
  const backgroundRef = useRef<HTMLDivElement>(null);
  const [isLowPerformance, setIsLowPerformance] = useState(false);
  
  // Get animation context and settings
  const { animationEnabled } = useAnimation();
  
  // Performance monitoring
  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let lowFPSCount = 0;
    
    const checkPerformance = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        
        // If FPS is consistently low, reduce effects
        if (fps < 30) {
          lowFPSCount++;
          if (lowFPSCount >= 3) {
            setIsLowPerformance(true);
          }
        } else {
          lowFPSCount = Math.max(0, lowFPSCount - 1);
          if (lowFPSCount === 0) {
            setIsLowPerformance(false);
          }
        }
        
        frameCount = 0;
        lastTime = currentTime;
      }
      
      requestAnimationFrame(checkPerformance);
    };
    
    // Only run performance monitoring if effects are enabled
    if (animationEnabled) {
      requestAnimationFrame(checkPerformance);
    }
    
    return () => {
      // Cleanup will be handled by cancelAnimationFrame
    };
  }, [animationEnabled]);
  
  // Only show effects if animations are enabled and performance is good
  const shouldShowEffects = animationEnabled && !isLowPerformance;
  
  // Add performance classes
  const backgroundClass = `background ${className} ${
    isLowPerformance ? 'low-performance-mode' : ''
  } ${!shouldShowEffects ? 'background-disabled' : ''}`;

  return (
    <div 
      ref={backgroundRef}
      className={backgroundClass}
      {...rest}
    >
      {/* Only render effects if they should be shown */}
      {shouldShowEffects && (
        <>
          {enableCircuitGrid && <div className="circuit-grid" />}
          {enableScanlines && <div className="scanlines" />}
          {enableColorPulse && <div className="color-pulse" />}
          {enableGlitch && <div className="glitch" />}
          {enableNoise && <div className="noise" />}
        </>
      )}
      {children}
    </div>
  );
};

// Apply memoization for performance optimization
export default memo(Background);
