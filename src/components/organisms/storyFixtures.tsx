/**
 * Shared helpers for organism stories: the real site data from src/portfolio.ts
 * and decorators that put it, or a variation of it, in context.
 * Used by stories only.
 */
import React from 'react';
import type { Decorator } from '@storybook/react-vite';
import PortfolioContext from '@context/PortfolioContext';
import { AnimationContext } from '@context/AnimationContext';
import {
  greetings,
  openSource,
  contact,
  socialLinks,
  skillsSection,
  SkillBars,
  educationInfo,
  experience,
  projects,
  feedbacks,
} from '@/portfolio';
import type { PortfolioData } from '@/types/portfolio';

/** The site's real data, as the PortfolioProvider supplies it. */
export const siteData: PortfolioData = {
  greetings,
  openSource,
  contact,
  socialLinks,
  skillsSection,
  skillBars: SkillBars,
  educationInfo,
  experience,
  projects,
  feedbacks,
};

/** Decorator that provides the site data, with any sections replaced. */
export const withSiteData = (overrides: Partial<PortfolioData> = {}): Decorator => {
  const value: PortfolioData = { ...siteData, ...overrides };
  const Provide: Decorator = (Story) => (
    <PortfolioContext.Provider value={value}>
      <Story />
    </PortfolioContext.Provider>
  );
  return Provide;
};

/**
 * Decorator that turns entrance animations off, so a section that reveals
 * itself on scroll is already in place in the canvas and in docs.
 */
export const withSettledMotion: Decorator = (Story) => (
  <AnimationContext.Provider value={{ animationEnabled: false, prefersReducedMotion: false }}>
    <Story />
  </AnimationContext.Provider>
);
