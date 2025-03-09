import React, { memo } from 'react';
import './Background.css';
import MatrixBackground from '../../atoms/MatrixBackground';
import BinaryStream from '../../atoms/BinaryStream';

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
  
  return (
    <div 
      className={`background ${className}`} 
      {...rest}
    >
      <div className="background__effects">
        {enableMatrix && (
          <MatrixBackground characterCount={matrixCharCount} randomPositioning={true} />
        )}
        
        {enableBinaryStreams && (
          <>
            <BinaryStream position="left" count={30} baseDelay={0.1} />
            <BinaryStream position="right" count={30} baseDelay={0.15} />
            <BinaryStream position="top" count={50} baseDelay={0.2} />
            <BinaryStream position="bottom" count={50} baseDelay={0.25} />
          </>
        )}
        
        {enableCircuitGrid && (
          <div className="background__circuit-grid"></div>
        )}
        
        {enableScanlines && (
          <div className="background__scanlines"></div>
        )}
        
        {enableGlitch && (
          <div className="background__glitch"></div>
        )}
        
        {enableColorPulse && (
          <div className="background__color-pulse"></div>
        )}
        
        {enableNoise && (
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
