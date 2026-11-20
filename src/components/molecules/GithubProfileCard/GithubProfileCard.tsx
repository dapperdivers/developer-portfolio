import React from 'react';
import { motion, Variants } from "framer-motion";
import { slideUpVariants, STAGGER_DELAY, useMotionEnabled } from '@utils/motion';
import ProfileAvatar from '@atoms/ProfileAvatar';
import ProfileHeader from '@molecules/ProfileHeader';
import ProfileLocation from '@molecules/ProfileLocation';
import type { ClusterStatusResult } from '@/types/cluster';
import ProfileContent from '@molecules/ProfileContent';
import './GithubProfileCard.css';
import type { Greeting, ProfileLinks } from '@/types/portfolio';

/** The fields of a GitHub user API result that the card reads. */
export interface GithubProfile {
  name?: string | null;
  avatar_url?: string;
  location?: string | null;
}

export interface GithubProfileCardProps {
  /** GitHub profile data (optional enhancement) */
  prof?: GithubProfile | null;
  /** Site owner details: name, title, jobTitle, description, emailAddress, location */
  greetings?: Partial<Greeting>;
  /** GitHub user name, used for the fallback avatar */
  githubUserName?: string;
  /** Passed to SocialLinks: github, linkedin and contactCard URLs */
  links?: Partial<ProfileLinks>;
  /** Play the entrance animation */
  animated?: boolean;
  /** Live cluster telemetry, passed to the map */
  clusterStatus?: ClusterStatusResult;
}

/**
 * GitHub profile card component for displaying contact information from the site data.
 * The GitHub API result only enhances the avatar; if it is missing the card still
 * renders in full with the public github.com avatar URL.
 * Ends with a short call to action, the email button and the social links.
 * A props-only building block: the parent passes the site data in.
 *
 * @component
 */
const GithubProfileCard = ({ prof, greetings = {}, githubUserName, links = {}, animated = true, clusterStatus }: GithubProfileCardProps) => {
  const animationEnabled = useMotionEnabled(animated);

  // Custom animation variants with staggered children for profile card elements
  const containerVariants: Variants = {
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
  const itemVariants: Variants = {
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

  // Contact address and location come from the site data; the GitHub profile
  // location is only a fallback so the map does not depend on the API.
  const emailAddress = greetings.emailAddress;
  const location = greetings.location || prof?.location;

  // Avatar from the API when available, else the public avatar URL that needs no API call
  const avatarSrc = prof?.avatar_url || (githubUserName ? `https://github.com/${githubUserName}.png` : undefined);

  // Short call to action; the hero already tells the story
  const callToAction = (
    <>
      Product security. AI agent security. Homelabs that got out of hand.
      <br />
      If one of those is your problem, email me.
    </>
  );

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

            {/* Headquarters header, before the map */}
            <div className="github-profile-card__header-section">
              <ProfileHeader
                title="Headquarters"
                subtitle={greetings.jobTitle || "Security Engineer"}
                highlightText="Garage"
                animate={animationEnabled}
              />
            </div>

            {/* Map component */}
            <div className="github-profile-card__map-section">
              {location && (
                <ProfileLocation
                  location={location}
                  animate={animationEnabled}
                  clusterStatus={clusterStatus}
                />
              )}
            </div>

            {/* Bottom section with description and contact */}
            <div className="github-profile-card__content-section">
              <ProfileContent
                description={callToAction}
                email={emailAddress ?? ''}
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

export default GithubProfileCard;
