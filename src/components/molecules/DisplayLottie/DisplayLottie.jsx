import React, { Suspense, useState, useRef, useEffect, useMemo } from 'react';
import Lottie from 'lottie-react';
import { motion, AnimatePresence } from 'framer-motion';
import Loading from '@atoms/Loading';
import { FaPlay, FaPause } from 'react-icons/fa';
import { useAnimation, MotionVariants } from '@context/AnimationContext';
import './DisplayLottie.css';
// CSS is now properly organized in the design system


// The lottie-react package provides direct methods to control the animation
// without needing to use refs directly on the component

/**
 * A component for displaying Lottie animations with accessibility controls
 * and performance optimizations.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.animationData - Lottie animation data object
 * @param {string} [props.ariaLabel="Animation"] - Accessible description of the animation
 * @param {boolean} [props.loop=true] - Whether the animation should loop
 * @param {string} [props.size="medium"] - Animation size (small, medium, large)
 * @param {number} [props.quality=1] - Animation quality (0.5 to 1)
 * @param {boolean} [props.shouldOptimize=true] - Whether to apply performance optimizations
 * @returns {React.ReactElement} DisplayLottie component
 */
const DisplayLottie = ({ 
    animationData, 
    ariaLabel = "Animation illustrating coding and development",
    loop = true,
    size = "medium",
    quality = 1,
    shouldOptimize = true
}) => {
    const [isPlaying, setIsPlaying] = useState(true);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
    const [isLowPower, setIsLowPower] = useState(false);
    const [controlsVisible, setControlsVisible] = useState(false);
    const lottieRef = useRef(null);
    
    // Get animation context values
    const { animationEnabled, fadeInVariants, shouldReduceMotion } = useAnimation();
    
    // Define size constraints
    const sizeMap = useMemo(() => ({
        small: { maxWidth: "25rem", maxHeight: "25rem" },
        medium: { maxWidth: "45rem", maxHeight: "45rem" },
        large: { maxWidth: "55rem", maxHeight: "55rem" }
    }), []);
    
    // Optimize animation data if needed
    const optimizedAnimationData = useMemo(() => {
        if (!shouldOptimize || !animationData) return animationData;
        
        // Make a copy of the animation data to avoid mutating the original
        const optimized = JSON.parse(JSON.stringify(animationData));
        
        // Reduce quality if needed
        if (quality < 1 && quality > 0) {
            // Recursively reduce the precision of numerical values in the animation data
            const reduceQuality = (obj) => {
                if (!obj) return;
                
                if (Array.isArray(obj)) {
                    for (let i = 0; i < obj.length; i++) {
                        if (typeof obj[i] === 'number') {
                            obj[i] = Number(obj[i].toFixed(2));
                        } else if (typeof obj[i] === 'object') {
                            reduceQuality(obj[i]);
                        }
                    }
                } else if (typeof obj === 'object') {
                    for (const key in obj) {
                        if (typeof obj[key] === 'number') {
                            obj[key] = Number(obj[key].toFixed(2));
                        } else if (typeof obj[key] === 'object') {
                            reduceQuality(obj[key]);
                        }
                    }
                }
            };
            
            reduceQuality(optimized);
        }
        
        return optimized;
    }, [animationData, quality, shouldOptimize]);
    
    // Check device capabilities and user preferences
    useEffect(() => {
        // Check if user prefers reduced motion
        // Using the context's shouldReduceMotion instead of managing our own state
        setPrefersReducedMotion(shouldReduceMotion);
        
        // Check for battery status to detect low power mode
        if ('getBattery' in navigator) {
            navigator.getBattery().then(battery => {
                const checkBatteryStatus = () => {
                    setIsLowPower(battery.level <= 0.2 && !battery.charging);
                };
                
                battery.addEventListener('levelchange', checkBatteryStatus);
                battery.addEventListener('chargingchange', checkBatteryStatus);
                
                checkBatteryStatus();
                
                return () => {
                    battery.removeEventListener('levelchange', checkBatteryStatus);
                    battery.removeEventListener('chargingchange', checkBatteryStatus);
                };
            }).catch(() => {
                // Battery API not supported or permission denied
                setIsLowPower(false);
            });
        }
    }, [shouldReduceMotion]);
    
    // Toggle play/pause
    const togglePlay = () => {
        setIsPlaying(prev => !prev);
        
        if (lottieRef.current) {
            if (isPlaying) {
                lottieRef.current.pause();
            } else {
                lottieRef.current.play();
            }
        }
    };
    
    const handleHoverStart = () => {
        if (animationEnabled && !prefersReducedMotion) {
            setControlsVisible(true);
        }
    };
    
    const handleHoverEnd = () => {
        if (!prefersReducedMotion) {
            setControlsVisible(false);
        }
    };
    
    // Animation variants for the controls
    const controlsVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: {
                duration: 0.2,
                ease: "easeOut"
            }
        },
        exit: {
            opacity: 0,
            y: 10,
            transition: {
                duration: 0.2,
                ease: "easeIn"
            }
        }
    };
    
    // Button animation variants
    const buttonVariants = {
        initial: { scale: 1 },
        hover: { 
            scale: 1.1,
            backgroundColor: "var(--color-primary-dark)",
            transition: {
                duration: 0.2,
                ease: "easeOut"
            }
        },
        tap: { 
            scale: 0.95,
            transition: {
                duration: 0.1,
                ease: "easeOut"
            }
        }
    };
    
    // Determine if we should show animations
    const shouldShowAnimations = animationEnabled && !prefersReducedMotion && !isLowPower;
    
    return (
        <motion.div 
            className="lottie-container"
            style={sizeMap[size]}
            variants={fadeInVariants}
            initial="hidden"
            animate="visible"
            onHoverStart={handleHoverStart}
            onHoverEnd={handleHoverEnd}
            aria-label={ariaLabel}
        >
            <Suspense fallback={<Loading />}>
                <Lottie
                    lottieRef={lottieRef}
                    animationData={optimizedAnimationData}
                    loop={loop && shouldShowAnimations}
                    autoplay={shouldShowAnimations}
                    style={{
                        width: '100%',
                        height: '100%'
                    }}
                    aria-hidden="true"
                />
            </Suspense>
            
            <AnimatePresence>
                {(controlsVisible || prefersReducedMotion) && (
                    <motion.div
                        className="animation-controls"
                        variants={controlsVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <motion.button
                            className="animation-control-button"
                            onClick={togglePlay}
                            aria-label={isPlaying ? "Pause animation" : "Play animation"}
                            variants={buttonVariants}
                            initial="initial"
                            whileHover="hover"
                            whileTap="tap"
                        >
                            {isPlaying ? <FaPause /> : <FaPlay />}
                        </motion.button>
                        
                        <span className="animation-status">
                            {isPlaying ? "Animation playing" : "Animation paused"}
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>
            
            <span className="sr-only">
                {isPlaying ? `${ariaLabel} animation is playing` : `${ariaLabel} animation is paused`}
            </span>
        </motion.div>
    );
};

export default DisplayLottie;
