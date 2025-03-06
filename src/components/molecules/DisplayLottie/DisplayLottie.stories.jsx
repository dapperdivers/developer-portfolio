import React from 'react';
import DisplayLottie from './DisplayLottie';
import { within, userEvent, expect } from '@storybook/test';

// Import lottie animation files from the structured animations directory
import codingAnimation from '@assets/animations/lottie/dev-coding.json';
import webdevAnimation from '@assets/animations/lottie/dev-webdev.json';
import buildAnimation from '@assets/animations/lottie/dev-building.json';

export default {
  title: 'Molecules/DisplayLottie',
  component: DisplayLottie,
  tags: ['autodocs'],
  argTypes: {
    animationData: { 
      control: 'object',
      description: 'Lottie animation data object' 
    },
    ariaLabel: { 
      control: 'text',
      description: 'Accessible description of the animation',
      defaultValue: 'Animation illustrating coding and development'
    },
    loop: { 
      control: 'boolean',
      description: 'Whether the animation should loop',
      defaultValue: true
    },
    size: { 
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Animation size',
      defaultValue: 'medium'
    },
    quality: { 
      control: { type: 'range', min: 0.5, max: 1, step: 0.1 },
      description: 'Animation quality (0.5 to 1)',
      defaultValue: 1
    },
    shouldOptimize: { 
      control: 'boolean',
      description: 'Whether to apply performance optimizations',
      defaultValue: true
    }
  },
  parameters: {
    docs: {
      description: {
        component: 'A component for displaying Lottie animations with accessibility controls and performance optimizations. This component provides play/pause controls, respects user preferences for reduced motion, and optimizes the animation rendering based on device capabilities.',
      },
    },
    a11y: {
      config: {
        rules: [
          { id: 'button-name', reviewOnFail: true },
          { id: 'aria-valid-attr-value', reviewOnFail: true },
          { id: 'color-contrast', reviewOnFail: true }
        ],
      },
    },
    chromatic: { pauseAnimationAtEnd: true },
  },
};


// Basic template for the component
const Template = (args) => (
  <div style={{ maxWidth: '600px', margin: '0 auto' }}>
    <DisplayLottie {...args} />
  </div>
);

// Default story - Coding animation with standard settings
export const CodingAnimation = {
  args: {
  animationData: codingAnimation,
  ariaLabel: "Animation showing a developer coding on a computer",
  loop: true,
  size: "medium",
  quality: 1,
  shouldOptimize: true
}
};
CodingAnimation.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);
  
  await step('Initial render check', () => {
    // Check that the animation container is rendered
    const container = canvas.getByRole('img');
    expect(container).toBeInTheDocument();
    expect(container).toHaveAttribute('aria-label', "Animation showing a developer coding on a computer");
    
    // Check that the play/pause button exists
    const playPauseButton = canvas.getByRole('button');
    expect(playPauseButton).toBeInTheDocument();
  });
  
  await step('Interaction test - pause animation', async () => {
    // Click the play/pause button to pause the animation
    const playPauseButton = canvas.getByRole('button');
    await userEvent.click(playPauseButton);
    
    // After clicking, the animation should be paused
    expect(playPauseButton).toHaveAttribute('aria-pressed', 'false');
    
    // Status text should indicate the animation is paused
    const statusText = canvas.getByText('Animation is paused');
    expect(statusText).toBeInTheDocument();
  });
  
  await step('Interaction test - resume animation', async () => {
    // Click the play/pause button again to resume the animation
    const playPauseButton = canvas.getByRole('button');
    await userEvent.click(playPauseButton);
    
    // After clicking, the animation should be playing again
    expect(playPauseButton).toHaveAttribute('aria-pressed', 'true');
    
    // Status text should indicate the animation is playing
    const statusText = canvas.getByText('Animation is playing');
    expect(statusText).toBeInTheDocument();
  });
};

// Web development animation with different settings
export const WebDevAnimation = {
  args: {
  animationData: webdevAnimation,
  ariaLabel: "Animation illustrating web development tools and technologies",
  loop: true,
  size: "medium",
  quality: 1,
  shouldOptimize: true
}
};
WebDevAnimation.parameters = {
  docs: {
    description: {
      story: 'Displays a web development themed animation with standard settings.'
    }
  }
};

// Build animation in a smaller size
export const SmallAnimation = {
  args: {
  animationData: buildAnimation,
  ariaLabel: "Animation showing the build process",
  loop: true,
  size: "small",
  quality: 1,
  shouldOptimize: true
}
};
SmallAnimation.parameters = {
  docs: {
    description: {
      story: 'Shows how the animation appears when set to a small size.'
    }
  }
};

// Animation with reduced quality for performance testing
export const LowQualityAnimation = {
  args: {
  animationData: codingAnimation,
  ariaLabel: "Low quality animation for performance testing",
  loop: true,
  size: "medium",
  quality: 0.5,
  shouldOptimize: true
}
};
LowQualityAnimation.parameters = {
  docs: {
    description: {
      story: 'Demonstrates the animation with reduced quality settings for lower-power devices.'
    }
  }
};

// Animation in a large size
export const LargeAnimation = {
  args: {
  animationData: webdevAnimation,
  ariaLabel: "Large animation of web development",
  loop: true,
  size: "large",
  quality: 1,
  shouldOptimize: true
}
};
LargeAnimation.parameters = {
  docs: {
    description: {
      story: 'Shows how the animation appears when set to a large size.'
    }
  }
};

// Non-looping animation
export const SinglePlayAnimation = {
  args: {
  animationData: buildAnimation,
  ariaLabel: "One-time animation of build process",
  loop: false,
  size: "medium",
  quality: 1,
  shouldOptimize: true
}
};
SinglePlayAnimation.parameters = {
  docs: {
    description: {
      story: 'Demonstrates a non-looping animation that plays only once.'
    }
  }
};

/**
 * ## Component Usage
 * 
 * ```jsx
 * import DisplayLottie from './DisplayLottie';
 * import animationData from '@assets/animations/lottie/dev-coding.json';
 * 
 * function HeroSection() {
 *   return (
 *     <div className="hero-section">
 *       <h1>Welcome to My Portfolio</h1>
 *       <DisplayLottie 
 *         animationData={animationData}
 *         ariaLabel="Developer coding on a computer"
 *         size="large"
 *         quality={0.8}
 *       />
 *     </div>
 *   );
 * }
 * ```
 * 
 * ## Properties
 * 
 * | Name | Type | Default | Description |
 * |------|------|---------|-------------|
 * | animationData | Object | required | Lottie animation data object |
 * | ariaLabel | string | "Animation illustrating coding and development" | Accessible description |
 * | loop | boolean | true | Whether the animation should loop |
 * | size | string | "medium" | Animation size (small, medium, large) |
 * | quality | number | 1 | Animation quality from 0.5 to 1 |
 * | shouldOptimize | boolean | true | Whether to apply performance optimizations |
 * 
 * ## Accessibility Features
 * 
 * This component implements several accessibility features:
 * 
 * - **ARIA Role & Label**: The container has a role of "img" and an aria-label describing the animation
 * - **Play/Pause Control**: Users can control animation playback with a clearly labeled button
 * - **Status Announcements**: Animation state changes are announced to screen readers via aria-live
 * - **Reduced Motion Support**: Respects user's prefers-reduced-motion setting
 * - **Keyboard Navigation**: All controls are fully keyboard accessible
 * - **Screen Reader Text**: Hidden text provides description for screen reader users
 * 
 * ## Performance Considerations
 * 
 * The component includes several performance optimizations:
 * 
 * - **Battery Awareness**: Reduces animation quality on low-battery devices
 * - **Memory Detection**: Scales down complexity on low-memory devices
 * - **Quality Control**: Adjustable quality parameter for performance tuning
 * - **Layer Optimization**: Can selectively render only essential animation layers
 * - **Frame Rate Control**: Reduces frame rate on lower-powered devices
 * 
 * ## Implementation Notes
 * 
 * - Uses the lottie-react library to render animations
 * - Handles its own loading state with a fallback Loading component
 * - Implements performance monitoring and responsive optimization
 * - Controls are hidden by default and shown on hover/focus
 */

// Mobile view for responsive testing
export const MobileView = {
  args: {
  animationData: codingAnimation,
  ariaLabel: "Animation showing a developer coding on a computer",
  size: "small",
  quality: 0.7,
  shouldOptimize: true
}
};
MobileView.parameters = {
  viewport: {
    defaultViewport: 'mobile1',
  },
  docs: {
    description: {
      story: 'Shows how the animation component appears on mobile devices.'
    }
  }
};
