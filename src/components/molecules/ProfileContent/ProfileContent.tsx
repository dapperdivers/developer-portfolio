import React from 'react';
import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import SecurityFact from '@atoms/SecurityFact';
import ContactButton from '@atoms/ContactButton';
import SocialLinks from '@molecules/SocialLinks';
import { slideUpVariants, useMotionEnabled } from '@utils/motion';
import type { ProfileLinks } from '@/types/portfolio';
import './ProfileContent.css';

export interface ProfileContentProps {
  /** Profile description text */
  description: ReactNode;
  /** Security fact to display */
  securityFact?: string;
  /** Email address for contact button */
  email: string;
  /** Passed to SocialLinks: github, linkedin and contactCard URLs */
  links?: Partial<ProfileLinks>;
  /** Whether to animate the component */
  animate?: boolean;
}

/**
 * ProfileContent component for displaying profile description, security fact, and contact information.
 *
 * @component
 */
const ProfileContent = ({
  description,
  securityFact,
  email,
  links = {},
  animate = true
}: ProfileContentProps) => {
  const shouldAnimate = useMotionEnabled(animate);

  return (
    <div className="profile-content">
      <motion.p
        className="profile-content__description"
        variants={shouldAnimate ? slideUpVariants : undefined}
        initial={shouldAnimate ? "hidden" : "visible"}
        animate={shouldAnimate ? "visible" : "visible"}
        viewport={{ once: true }}
      >
        {description}
      </motion.p>

      {securityFact && (
        <motion.div
          className="profile-content__fact-container"
          variants={shouldAnimate ? slideUpVariants : undefined}
          initial={shouldAnimate ? "hidden" : "visible"}
          animate={shouldAnimate ? "visible" : "visible"}
          viewport={{ once: true }}
        >
          <SecurityFact
            text={securityFact}
            animate={shouldAnimate}
          />
        </motion.div>
      )}

      <motion.div
        className="profile-content__contact"
        variants={shouldAnimate ? slideUpVariants : undefined}
        initial={shouldAnimate ? "hidden" : "visible"}
        animate={shouldAnimate ? "visible" : "visible"}
        viewport={{ once: true }}
      >
        <SocialLinks
          className="profile-content__social"
          links={links}
          animated={shouldAnimate}
        />

        <ContactButton
          email={email}
          animate={shouldAnimate}
          className="profile-content__contact-button"
        />
      </motion.div>
    </div>
  );
};

export default ProfileContent;