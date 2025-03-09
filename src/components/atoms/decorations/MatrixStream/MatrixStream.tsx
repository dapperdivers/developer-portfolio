import React, { memo, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useAnimation } from '@context/AnimationContext';
import './MatrixStream.css';

/**
 * MatrixStream atomic component with framer-motion animation support
 * 
 * @component
 * @param {Object} props - Component props
 * @returns {React.ReactElement} MatrixStream component
 */
interface MatrixStreamProps {
  /** Text color for the matrix rain (default: #0F0) */
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

const MatrixStream = (props: MatrixStreamProps) => {
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

    // Matrix rain characters
    const chars = '日ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ012345789:・.=*+-<>¦｜╌';
    const charArray = chars.split('');

    // Create single drop
    let y = Math.random() * -height;

    // Animation loop
    const draw = () => {
      if (!ctx) return;
      
      // Semi-transparent black background for trail effect
      // Adjusted for slower fade with lower speeds
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
          const char = charArray[Math.floor(Math.random() * charArray.length)];
          ctx.fillText(char, x, currentY);
        }
        currentY += charSpacing;
      }

      // Move the stream down (much slower movement)
      y += moveSpeed * 0.5; // Reduced base movement speed

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
      className={`matrix-stream-container ${className} ${isBackground ? 'matrix-stream-background' : ''}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
      {...rest}
    >
      <canvas ref={canvasRef} className="matrix-stream-canvas" />
    </motion.div>
  );
};

// Apply memoization for performance optimization
export default memo(MatrixStream);
