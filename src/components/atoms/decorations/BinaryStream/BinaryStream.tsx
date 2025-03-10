import React, { memo, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useAnimation } from '@context/AnimationContext';
import './BinaryStream.css';

export interface BinaryStreamProps {
  /** Text color for the binary stream (default: #0F0) */
  color?: string;
  /** Font size for the characters (default: 20) */
  fontSize?: number;
  /** Speed of the character changes (1-10, default: 1) */
  speed?: number;
  /** Speed of downward movement (0.1-5, default: 0.3) */
  moveSpeed?: number;
  /** Width of the stream in pixels (default: 30) */
  width?: number;
  /** Height of the stream in pixels (default: 200) */
  height?: number;
  /** Additional CSS class names */
  className?: string;
  /** Whether to render as a background (default: false) */
  isBackground?: boolean;
  [key: string]: any;
}

const BinaryStream = (props: BinaryStreamProps) => {
  const {
    color = '#0F0',
    fontSize = 20,
    speed = 1,
    moveSpeed = 0.3,
    width = 30,
    height = 200,
    className = '',
    isBackground = false,
    ...rest
  } = props;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { animationEnabled, prefersReducedMotion } = useAnimation();

  useEffect(() => {
    if (!canvasRef.current || !animationEnabled || prefersReducedMotion) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = width;
    canvas.height = height;

    // Binary characters
    const chars = ['0', '1'];

    // Create single drop
    let y = Math.random() * -height;

    // Animation loop
    const draw = () => {
      if (!ctx) return;
      
      // Semi-transparent black background for trail effect
      ctx.fillStyle = `rgba(0, 0, 0, ${0.1 + (1 - speed/10) * 0.1})`;
      ctx.fillRect(0, 0, width, height);

      // Set text properties
      ctx.fillStyle = color;
      ctx.font = `${fontSize}px monospace`;
      ctx.textAlign = 'center';

      // Draw characters in the column
      const x = width / 2;
      const charSpacing = fontSize * 1.2; // Space between characters
      let currentY = y;

      // Draw multiple characters in the column
      while (currentY < height + fontSize) {
        // Adjusted probability for character changes based on speed
        if (Math.random() > (1 - speed/20)) { // This makes character changes much rarer at low speeds
          const char = chars[Math.floor(Math.random() * chars.length)];
          // Add glow effect for binary characters
          ctx.shadowColor = color;
          ctx.shadowBlur = 5;
          ctx.fillText(char, x, currentY);
          ctx.shadowBlur = 0;
        }
        currentY += charSpacing;
      }

      // Move the stream down (much slower movement)
      y += moveSpeed * 0.5;

      // Reset position when the stream is fully off screen
      if (y > height + fontSize) {
        y = -fontSize;
      }

      requestAnimationFrame(draw);
    };

    const animationFrame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [animationEnabled, prefersReducedMotion, color, fontSize, speed, moveSpeed, width, height]);

  return (
    <motion.div 
      className={`binary-stream-container ${className} ${isBackground ? 'binary-stream-background' : ''}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
      {...rest}
    >
      <canvas ref={canvasRef} className="binary-stream-canvas" />
    </motion.div>
  );
};

// Apply memoization for performance optimization
export default memo(BinaryStream);