import React from 'react';
import PropTypes from 'prop-types';
import { motion } from "framer-motion";
import { slideUpVariants, STAGGER_DELAY, useMotionEnabled } from '@utils/motion';
import ProfileAvatar from '@atoms/ProfileAvatar';
import ProfileHeader from '@molecules/ProfileHeader';
import ProfileLocation from '@molecules/ProfileLocation';
import ProfileContent from '@molecules/ProfileContent';
import './GithubProfileCard.css';

/**
 * GitHub profile card component for displaying contact information from the site data.
 * The GitHub API result only enhances the avatar; if it is missing the card still
 * renders in full with the public github.com avatar URL.
 * Enhanced with map visualization and security-themed decorative elements.
 * A props-only building block: the parent passes the site data in.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Object} [props.prof] - GitHub profile data (optional enhancement)
 * @param {Object} [props.greetings] - Site owner details: name, title, jobTitle, description, emailAddress, location
 * @param {string[]} [props.securityFacts] - Facts to pick one from at random
 * @param {string} [props.githubUserName] - GitHub user name, used for the fallback avatar
 * @param {boolean} [props.animated=true] - Play the entrance animation
 * @returns {React.ReactElement} GithubProfileCard component
 */
const GithubProfileCard = ({ prof, greetings = {}, securityFacts = [], githubUserName, links = {}, animated = true }) => {
  const animationEnabled = useMotionEnabled(animated);

  // Custom animation variants with staggered children for profile card elements
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: STAGGER_DELAY,
        delayChildren: 0.2
      }
    }
  };

  // Customized slide up variant for card items with spring physics
  const itemVariants = {
    hidden: { ...slideUpVariants.hidden },
    visible: {
      ...slideUpVariants.visible,
      transition: {
        ...slideUpVariants.visible.transition,
        type: "spring",
        damping: 12
      }
    }
  };

  // Pick a random security fact from the portfolio
  const randomFact = securityFacts[Math.floor(Math.random() * securityFacts.length)];

  // Contact address and location come from the site data; the GitHub profile
  // location is only a fallback so the map does not depend on the API.
  const emailAddress = greetings.emailAddress;
  const location = greetings.location || prof?.location;

  // Avatar from the API when available, else the public avatar URL that needs no API call
  const avatarSrc = prof?.avatar_url || (githubUserName ? `https://github.com/${githubUserName}.png` : undefined);

  // Format description for display
  const formatDescription = () => {
    if (greetings.description) {
      return (
        <>
          {greetings.description.split('.')[0]}.<br />
          Need to discuss secure architecture? My inbox is always open!
        </>
      );
    }

    return (
      <>
        Have a security concern? Want to discuss secure architecture?
        <br />
        Or just want to talk tech? My inbox is secure and always open!
      </>
    );
  };

  return (
    <div className="github-profile-card" data-testid="github-profile-card">
      {/* Security-themed background elements */}
      <div className="github-profile-card__background">
        <div className="security-grid"></div>
        <div className="security-circles"></div>
      </div>

      <div className="github-profile-card__content">
        <motion.div
          initial={animationEnabled ? "hidden" : "visible"}
          animate="visible"
          variants={containerVariants}
        >
          <div className="github-profile-card__layout">
            {/* Profile image - Top section */}
            <div className="github-profile-card__avatar-section">
              <ProfileAvatar
                src={avatarSrc}
                alt={`${prof?.name || greetings.name || 'Profile'} avatar`}
                clearanceText={greetings.title?.includes("Hi") ? greetings.name : "Security Clearance: Top Level"}
                variants={itemVariants}
                animate={animationEnabled}
              />
            </div>

            {/* Security Headquarters Header - Before map */}
            <div className="github-profile-card__header-section">
              <ProfileHeader
                title="Headquarters"
                subtitle={greetings.jobTitle || "Security Engineer"}
                highlightText="Security"
                animate={animationEnabled}
              />
            </div>

            {/* Map component */}
            <div className="github-profile-card__map-section">
              {location && (
                <ProfileLocation
                  location={location}
                  animate={animationEnabled}
                />
              )}
            </div>

            {/* Bottom section with description and contact */}
            <div className="github-profile-card__content-section">
              <ProfileContent
                description={formatDescription()}
                securityFact={randomFact}
                email={emailAddress}
                links={links}
                animate={animationEnabled}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

GithubProfileCard.propTypes = {
  prof: PropTypes.object,
  greetings: PropTypes.shape({
    name: PropTypes.string,
    title: PropTypes.string,
    jobTitle: PropTypes.string,
    description: PropTypes.string,
    emailAddress: PropTypes.string,
    location: PropTypes.string
  }),
  securityFacts: PropTypes.arrayOf(PropTypes.string),
  githubUserName: PropTypes.string,
  /** Passed to SocialLinks: github, linkedin and contactCard URLs */
  links: PropTypes.object,
  animated: PropTypes.bool
};

export default GithubProfileCard;
