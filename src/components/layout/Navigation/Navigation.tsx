import React, { memo } from 'react';
import { motion } from 'framer-motion';
import useNavigation from '@hooks/useNavigation';
import HeaderName from '@/components/atoms/HeaderName';
import SocialLinks from '@/components/molecules/SocialLinks';
import SiteLinks from '@/components/molecules/SiteLinks';
import { profileLinks, siteLinks } from '@/portfolio';
import { useAnimation } from '@context/AnimationContext';

const headerLinks = siteLinks.filter((link) => !link.external);

/**
 * Navigation component for the site header.
 * Displays HeaderName, links to the docs, Storybook and blog, and SocialLinks.
 *
 * @component
 * @returns {React.ReactElement} Navigation component
 */
const Navigation = () => {
  // Use custom hook for navigation behavior and data
  const {
    isVisible,
    isScrolled,
    greetings
  } = useNavigation();

  // Get animation context
  const { animationEnabled } = useAnimation();

  return (
    <motion.header
      // Transparent over the hero; once the page scrolls the header gets a
      // backdrop so it stays readable (blurred on wide screens; a nearly solid fill on phones, where re-blurring the scrolling page behind a fixed header is costly) on top of section content.
      className={`fixed top-0 left-0 right-0 z-50 pt-2 pb-1 sm:pt-4 sm:pb-2 transition-colors duration-300 ${
        isScrolled ? 'bg-gray-900/95 shadow-lg md:bg-gray-900/85 md:backdrop-blur-md' : 'bg-transparent'
      }`}
      role="banner"
      initial={{ y: -100 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <nav
        className="container mx-auto px-4 sm:px-6 py-1 sm:py-2"
        role="navigation"
        id="navbar-main"
        aria-label="Main navigation"
      >
        <div className="flex flex-wrap items-center justify-between">
          {/* HeaderName - no longer clickable */}
          <div className="px-0 sm:px-2">
            <HeaderName
              name={greetings.name}
              className=""
              animated={animationEnabled}
              logoSrc="/apple-touch-icon.png"
            />
          </div>

          {/* On phones the links take their own centred row under the name */}
          <div className="flex w-full items-center justify-center gap-4 sm:w-auto sm:justify-end sm:px-2">
            {/* Docs, Storybook and blog. The source link stays in the footer. */}
            <SiteLinks links={headerLinks} label="Docs, components and blog" />
            {/* Social Links - Hidden on mobile, visible on lg screens */}
            <div className="hidden lg:flex items-center">
              <SocialLinks animated={animationEnabled} links={profileLinks} />
            </div>
          </div>
        </div>

      </nav>
    </motion.header>
  );
};

export default memo(Navigation);
