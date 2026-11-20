import React from 'react';
import { motion, Variants } from 'framer-motion';
import './Loading.css';
import { useMotionEnabled } from '@utils/motion';

export interface LoadingProps {
  /** Visual variant */
  variant?: '' | 'security' | 'terminal';
  /** Loading animation type */
  type?: 'spinner' | 'pulse' | 'dots';
  /** Size of the loading indicator */
  size?: 'sm' | 'md' | 'lg';
  /** Additional CSS classes */
  className?: string;
  /** Whether the indicator animates; when off it is shown static */
  animated?: boolean;
}

/**
 * Loading component with security-themed variants
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} [props.variant=''] - Visual variant ('', 'security', 'terminal')
 * @param {string} [props.type='spinner'] - Loading animation type ('spinner', 'pulse', 'dots')
 * @param {string} [props.size='md'] - Size of the loading indicator (sm, md, lg)
 * @param {string} [props.className=''] - Additional CSS classes
 * @param {boolean} [props.animated=true] - Whether the indicator animates; when off it is shown static
 * @returns {React.ReactElement} Loading component
 */
const Loading = ({ 
    variant = '', 
    type = 'spinner', 
    size = 'md',
    className = '',
    animated = true
}: LoadingProps) => {
    const motionOn = useMotionEnabled(animated);
    
    // Size classes
    const sizeMap = {
        sm: 'loading-sm',
        md: '',
        lg: 'loading-lg'
    };
    
    const sizeClass = sizeMap[size] || '';
    
    // Base classes
    const containerClasses = [
        'loading-container',
        variant ? `loading-${variant}` : '',
        className
    ].filter(Boolean).join(' ');
    
    const loadingClasses = [
        `loading-${type}`,
        sizeClass
    ].filter(Boolean).join(' ');
    
    // Animation variants based on loading type
    const spinnerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            rotate: 360,
            transition: {
                rotate: {
                    repeat: Infinity,
                    ease: "linear",
                    duration: 1
                }
            }
        }
    };
    
    const pulseVariants: Variants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { 
            opacity: [0.2, 1, 0.2],
            scale: [0.8, 1, 0.8],
            transition: {
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut"
            }
        }
    };
    
    const dotsVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };
    
    const dotVariant: Variants = {
        hidden: { opacity: 0, y: 0 },
        visible: { 
            opacity: [0, 1, 0],
            y: [0, -10, 0],
            transition: {
                repeat: Infinity,
                duration: 0.8
            }
        }
    };
    
    // Select the appropriate variant based on type
    const getAnimationVariant = () => {
        switch(type) {
            case 'spinner': return spinnerVariants;
            case 'pulse': return pulseVariants;
            case 'dots': return dotsVariants;
            default: return spinnerVariants;
        }
    };
    
    // Container animation
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { duration: 0.3 }
        }
    };
    
    // Render dots differently since they need child elements
    const renderDots = () => (
        <motion.div 
            className={loadingClasses}
            variants={dotsVariants}
        >
            {[1, 2, 3].map(i => (
                <motion.span 
                    key={i} 
                    className="loading-dot"
                    variants={dotVariant}
                />
            ))}
        </motion.div>
    );
    
    // Render loading element based on type
    const renderLoadingElement = () => {
        if (type === 'dots') {
            return renderDots();
        }
        
        return (
            <motion.div 
                className={loadingClasses}
                variants={getAnimationVariant()}
            />
        );
    };
    
    return (
        <motion.div 
            className={containerClasses}
            role="status"
            aria-live="polite"
            aria-busy="true"
            initial={motionOn ? "hidden" : "visible"}
            animate="visible"
            variants={containerVariants}
        >
            {renderLoadingElement()}
            <span className="visually-hidden">Content is loading...</span>
        </motion.div>
    );
};

export default Loading;
