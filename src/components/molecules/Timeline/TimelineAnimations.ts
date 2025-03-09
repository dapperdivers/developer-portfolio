import { Variants } from 'framer-motion';

/**
 * Animation variants for the Timeline component
 * These replace the CSS animations previously defined in the CSS files
 */

// Main timeline container animations
export const timelineVariants: Variants = {
  hidden: { 
    opacity: 0,
  },
  visible: { 
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
      when: "beforeChildren"
    }
  }
};

// Timeline item animations
export const timelineItemVariants: Variants = {
  hidden: { 
    opacity: 0,
    y: 20
  },
  visible: { 
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

// Timeline mainline animations
export const mainlineVariants: Variants = {
  hidden: { 
    scaleY: 0,
    opacity: 0.3
  },
  visible: { 
    scaleY: 1,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

// Data flow animation that replaces CSS animations
export const dataFlowVariants: Variants = {
  hidden: { 
    opacity: 0,
    backgroundPosition: "0px 0px"
  },
  visible: { 
    opacity: 0.8,
    backgroundPosition: ["0px 0px", "0px 100px"],
    transition: {
      backgroundPosition: {
        repeat: Infinity,
        duration: 2,
        ease: "linear"
      },
      opacity: {
        duration: 0.5
      }
    }
  }
};

// Security data flow animations
export const securityDataFlowVariants: Variants = {
  hidden: { 
    opacity: 0,
    backgroundPosition: "0px 0px"
  },
  visible: { 
    opacity: 0.9,
    backgroundPosition: ["0px 0px", "0px 100px"],
    transition: {
      backgroundPosition: {
        repeat: Infinity,
        duration: 2.5,
        ease: "linear"
      },
      opacity: {
        duration: 0.7
      }
    }
  }
};

// Field pulse animation
export const fieldPulseVariants: Variants = {
  hidden: { 
    opacity: 0.5,
    width: "9px",
    left: "-3px"
  },
  visible: { 
    opacity: [0.5, 0.8, 0.5],
    width: ["9px", "13px", "9px"],
    left: ["-3px", "-5px", "-3px"],
    transition: {
      repeat: Infinity,
      duration: 2,
      ease: "easeInOut"
    }
  }
};

// Security field pulse animation
export const securityFieldPulseVariants: Variants = {
  hidden: { 
    opacity: 0.7,
    width: "12px",
    left: "-4px"
  },
  visible: { 
    opacity: [0.7, 0.9, 0.7],
    width: ["12px", "18px", "12px"],
    left: ["-4px", "-7px", "-4px"],
    transition: {
      repeat: Infinity,
      duration: 2.5,
      ease: "easeInOut"
    }
  }
};

// Data packet animation
export const dataPacketVariants: Variants = {
  hidden: { 
    opacity: 0,
    y: -10
  },
  visible: (custom) => ({ 
    opacity: [0, 1, 0],
    y: [-10, 0, 10],
    transition: {
      repeat: Infinity,
      repeatDelay: custom.delay || 0,
      duration: custom.duration || 2,
      ease: "linear",
      delay: custom.initialDelay || 0
    }
  })
};

// Security packet animation
export const securityPacketVariants: Variants = {
  hidden: { 
    opacity: 0,
    y: -15
  },
  visible: (custom) => ({ 
    opacity: [0, 1, 0],
    y: [-15, 0, 15],
    boxShadow: ["0 0 5px rgba(0, 255, 140, 0.5)", "0 0 15px rgba(0, 255, 140, 0.8)", "0 0 5px rgba(0, 255, 140, 0.5)"],
    transition: {
      repeat: Infinity,
      repeatDelay: custom.delay || 0,
      duration: custom.duration || 2.5,
      ease: "easeInOut",
      delay: custom.initialDelay || 0
    }
  })
};

// Neural connector animation
export const neuralConnectorVariants: Variants = {
  hidden: { 
    opacity: 0,
    scale: 0.8
  },
  visible: { 
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

// Neural point appear animation
export const neuralPointVariants: Variants = {
  hidden: { 
    opacity: 0,
    scale: 0
  },
  visible: { 
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: "backOut"
    }
  }
};

// Security neural point animation
export const securityNeuralPointVariants: Variants = {
  hidden: { 
    opacity: 0,
    scale: 0
  },
  visible: { 
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "backOut"
    }
  }
};

// Security pulse ring animation
export const securityPulseRingVariants: Variants = {
  hidden: { 
    opacity: 0,
    scale: 0.5
  },
  visible: { 
    opacity: [0.7, 0.3, 0],
    scale: [0.5, 1.2, 1.5],
    transition: {
      repeat: Infinity,
      duration: 2,
      ease: "easeOut"
    }
  }
};

// Security core pulse animation
export const securityCorePulseVariants: Variants = {
  hidden: { 
    opacity: 0.7,
    boxShadow: "0 0 5px rgba(0, 255, 140, 0.5)"
  },
  visible: { 
    opacity: [0.7, 1, 0.7],
    boxShadow: [
      "0 0 5px rgba(0, 255, 140, 0.5)",
      "0 0 15px rgba(0, 255, 140, 0.8)",
      "0 0 5px rgba(0, 255, 140, 0.5)"
    ],
    transition: {
      repeat: Infinity,
      duration: 2,
      ease: "easeInOut"
    }
  }
};

// Shield pulse animation
export const shieldPulseVariants: Variants = {
  hidden: { 
    opacity: 0.7,
    boxShadow: "0 0 8px rgba(0, 180, 220, 0.5)"
  },
  visible: { 
    opacity: [0.7, 0.9, 0.7],
    boxShadow: [
      "0 0 8px rgba(0, 180, 220, 0.5)",
      "0 0 20px rgba(0, 180, 220, 0.8)",
      "0 0 8px rgba(0, 180, 220, 0.5)"
    ],
    transition: {
      repeat: Infinity,
      duration: 2.5,
      ease: "easeInOut"
    }
  }
};

// Shield scan animation
export const shieldScanVariants: Variants = {
  hidden: { 
    opacity: 0,
    top: "0%"
  },
  visible: { 
    opacity: [0, 0.8, 0],
    top: ["0%", "100%", "100%"],
    transition: {
      repeat: Infinity,
      repeatDelay: 1,
      duration: 2,
      ease: "easeInOut"
    }
  }
};

// Export all animations as a namespace
export const TimelineAnimations = {
  timeline: timelineVariants,
  item: timelineItemVariants,
  mainline: mainlineVariants,
  dataFlow: dataFlowVariants,
  securityDataFlow: securityDataFlowVariants,
  fieldPulse: fieldPulseVariants,
  securityFieldPulse: securityFieldPulseVariants,
  dataPacket: dataPacketVariants,
  securityPacket: securityPacketVariants,
  neuralConnector: neuralConnectorVariants,
  neuralPoint: neuralPointVariants,
  securityNeuralPoint: securityNeuralPointVariants,
  securityPulseRing: securityPulseRingVariants,
  securityCorePulse: securityCorePulseVariants,
  shieldPulse: shieldPulseVariants,
  shieldScan: shieldScanVariants
};