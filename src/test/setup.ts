import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import { vi } from 'vitest';
import { AnimationContext } from '@utils/AnimationContext';
import { slideUpVariants, fadeInVariants, scaleVariants, getAnimationDelay } from '@utils/animations';

// Define types for motion components
type MotionProps = {
  children?: React.ReactNode;
  [key: string]: any;
};

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: React.forwardRef<HTMLDivElement, MotionProps>(({ children, ...props }, ref) => (
      React.createElement('div', {
        ref,
        'data-motion': JSON.stringify(props),
        ...props,
        children
      })
    )),
    article: React.forwardRef<HTMLElement, MotionProps>(({ children, ...props }, ref) => (
      React.createElement('article', {
        ref,
        'data-motion': JSON.stringify(props),
        ...props,
        children
      })
    )),
    button: React.forwardRef<HTMLButtonElement, MotionProps>(({ children, ...props }, ref) => (
      React.createElement('button', {
        ref,
        'data-motion': JSON.stringify(props),
        ...props,
        children
      })
    ))
  },
  useAnimation: () => ({
    start: vi.fn(),
    set: vi.fn()
  }),
  useInView: () => [vi.fn(), true],
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children
}));

// Global test utilities
interface RenderWithAnimationOptions {
  animationEnabled?: boolean;
}

export const renderWithAnimation = (
  ui: React.ReactElement,
  { animationEnabled = true }: RenderWithAnimationOptions = {}
): ReturnType<typeof render> => {
  const contextValue = {
    enabled: animationEnabled,
    reducedMotion: false,
    quality: 'high' as const,
    batchSize: 5,
    throttleMs: 16,
    setAnimationSettings: vi.fn(),
    shouldAnimate: () => animationEnabled,
    getOptimizedVariants: (variants: any) => variants,
    fadeInVariants,
    scaleVariants,
    slideUpVariants,
    getAnimationDelay
  };

  return render(
    React.createElement(AnimationContext.Provider, { value: contextValue }, ui)
  );
};

// Global test data
export interface MockSkill {
  skillName: string;
  iconName: string;
  description: string;
  securityDomain: string;
  level: number;
}

export interface MockProject {
  title: string;
  description: string;
  image: string;
  links: {
    github: string;
    live: string;
  };
  technologies: string[];
}

export interface MockExperience {
  role: string;
  company: string;
  date: string;
  desc: string;
  descBullets: string[];
  companylogo: string;
}

export const mockSkillData: MockSkill = {
  skillName: 'Test Skill',
  iconName: 'test-icon',
  description: 'Test description',
  securityDomain: 'Test Domain',
  level: 5
};

export const mockProjectData: MockProject = {
  title: 'Test Project',
  description: 'Test project description',
  image: '/test-image.jpg',
  links: {
    github: 'https://github.com/test',
    live: 'https://test.com'
  },
  technologies: ['React', 'Node.js']
};

export const mockExperienceData: MockExperience = {
  role: 'Test Role',
  company: 'Test Company',
  date: '2023 - Present',
  desc: 'Test description',
  descBullets: ['Test bullet 1', 'Test bullet 2'],
  companylogo: '/test-logo.png'
};