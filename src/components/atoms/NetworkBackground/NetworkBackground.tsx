import React, { memo, useRef, useEffect } from 'react';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import { useAnimation } from '@context/AnimationContext';
import './NetworkBackground.css';

interface Node {
  x: number;
  y: number;
  connections: number[];
  pulseOffset: number;
  size: number;
  isHub: boolean;
}

interface Connection {
  from: number;
  to: number;
  progress: number;
  speed: number;
  active: boolean;
}

/**
 * NetworkBackground atomic component with framer-motion animation support
 * 
 * @component
 * @param {Object} props - Component props
 * @returns {React.ReactElement} NetworkBackground component
 */
interface NetworkBackgroundProps {
  /** Additional CSS class names */
  className?: string;
  /** Grid size for node placement (default: 30) */
  gridSize?: number;
  /** Node and connection color (default: cyan) */
  nodeColor?: string;
  /** Network activity intensity (0-1, default: 0.5) */
  networkIntensity?: number;
  [key: string]: any;
}

const NetworkBackground = (props: NetworkBackgroundProps) => {
  const { 
    className = '',
    gridSize = 30,
    nodeColor = '#00f5d4',
    networkIntensity = 0.5,
    ...rest 
  } = props;

  const { animationEnabled, prefersReducedMotion } = useAnimation();
  const shouldAnimate = animationEnabled && !prefersReducedMotion;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const connectionsRef = useRef<Connection[]>([]);
  const rafRef = useRef<number>(0);

  // Convert hex/rgb color to rgba with opacity
  const withOpacity = (color: string, opacity: number) => {
    if (color.startsWith('#')) {
      const r = parseInt(color.slice(1, 3), 16);
      const g = parseInt(color.slice(3, 5), 16);
      const b = parseInt(color.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
    if (color.startsWith('rgb(')) {
      return color.replace('rgb(', 'rgba(').replace(')', `, ${opacity})`);
    }
    if (color.startsWith('rgba(')) {
      return color.replace(/[\d.]+\)$/g, `${opacity})`);
    }
    return color;
  };

  // Initialize network nodes
  const initializeNetwork = (width: number, height: number) => {
    const nodes: Node[] = [];
    const gridW = Math.floor(width / gridSize);
    const gridH = Math.floor(height / gridSize);
    
    // Create nodes at grid intersections with lower density
    for (let y = 0; y < gridH; y += 3) {
      for (let x = 0; x < gridW; x += 3) {
        if (Math.random() < 0.4) { // 40% chance to create a node
          const isHub = Math.random() < 0.2; // 20% chance to be a hub
          nodes.push({
            x: x * gridSize,
            y: y * gridSize,
            connections: [],
            pulseOffset: Math.random() * Math.PI * 2,
            size: isHub ? 1.5 + Math.random() * 0.5 : 0.8 + Math.random() * 0.4,
            isHub
          });
        }
      }
    }

    // Create connections between nodes, favoring hub connections
    const connections: Connection[] = [];
    nodes.forEach((node, i) => {
      const maxConnections = node.isHub ? 5 : 2; // Hubs can have more connections
      let connectionCount = 0;
      
      nodes.slice(i + 1).forEach((otherNode, j) => {
        if (connectionCount >= maxConnections) return;
        
        const dx = node.x - otherNode.x;
        const dy = node.y - otherNode.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = (node.isHub || otherNode.isHub) ? gridSize * 6 : gridSize * 4;
        
        if (distance < maxDistance && Math.random() < 0.6) {
          node.connections.push(i + j + 1);
          otherNode.connections.push(i);
          connections.push({
            from: i,
            to: i + j + 1,
            progress: Math.random(),
            speed: 0.1 + Math.random() * 0.2, // Slower speed for subtlety
            active: node.isHub || otherNode.isHub ? Math.random() < 0.4 : Math.random() < 0.2
          });
          connectionCount++;
        }
      });
    });

    nodesRef.current = nodes;
    connectionsRef.current = connections;
  };

  // Animate network
  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const nodes = nodesRef.current;
    const connections = connectionsRef.current;
    const time = Date.now() / 1000;

    // Draw connections
    ctx.lineWidth = 1;
    connections.forEach(conn => {
      if (!conn.active) return;
      const fromNode = nodes[conn.from];
      const toNode = nodes[conn.to];

      // Update progress more slowly
      conn.progress += conn.speed * 0.008 * networkIntensity;
      if (conn.progress > 1) {
        conn.progress = 0;
        conn.active = fromNode.isHub || toNode.isHub ? 
          Math.random() < 0.4 : Math.random() < 0.2;
      }

      // Draw connection line with more subtle gradient
      const gradient = ctx.createLinearGradient(
        fromNode.x, fromNode.y,
        toNode.x, toNode.y
      );
      gradient.addColorStop(0, withOpacity(nodeColor, 0.05));
      gradient.addColorStop(conn.progress, withOpacity(nodeColor, 0.3));
      gradient.addColorStop(Math.min(1, conn.progress + 0.05), withOpacity(nodeColor, 0.05));
      gradient.addColorStop(1, withOpacity(nodeColor, 0.05));

      ctx.strokeStyle = gradient;
      ctx.beginPath();
      ctx.moveTo(fromNode.x, fromNode.y);
      ctx.lineTo(toNode.x, toNode.y);
      ctx.stroke();
    });

    // Draw nodes with more subtle glow
    nodes.forEach(node => {
      const pulse = 0.5 + Math.sin(time * (node.isHub ? 1.5 : 1) + node.pulseOffset) * 0.5;
      const size = node.size * (1 + pulse * 0.3 * networkIntensity);
      
      // Outer glow
      if (node.isHub) {
        ctx.fillStyle = withOpacity(nodeColor, 0.03);
        ctx.beginPath();
        ctx.arc(node.x, node.y, size * 6, 0, Math.PI * 2);
        ctx.fill();
      }

      // Middle glow
      ctx.fillStyle = withOpacity(nodeColor, node.isHub ? 0.15 : 0.1);
      ctx.beginPath();
      ctx.arc(node.x, node.y, size * 2, 0, Math.PI * 2);
      ctx.fill();

      // Core
      ctx.fillStyle = withOpacity(nodeColor, node.isHub ? 0.8 : 0.5);
      ctx.beginPath();
      ctx.arc(node.x, node.y, size, 0, Math.PI * 2);
      ctx.fill();
    });

    rafRef.current = requestAnimationFrame(animate);
  };

  // Handle canvas resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initializeNetwork(canvas.width, canvas.height);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [gridSize]);

  // Handle animation
  useEffect(() => {
    if (shouldAnimate) {
      animate();
    }
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [shouldAnimate, networkIntensity, nodeColor]);

  return (
    <LazyMotion features={domAnimation}>
      <m.div 
        className={`
          fixed inset-0 w-full h-full -z-10 overflow-hidden
          pointer-events-none
          ${className}
        `}
        initial={shouldAnimate ? { opacity: 0 } : { opacity: 1 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        {...rest}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
        />
      </m.div>
    </LazyMotion>
  );
};

// Apply memoization for performance optimization
export default memo(NetworkBackground);
