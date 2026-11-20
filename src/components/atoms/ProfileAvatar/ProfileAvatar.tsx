import React, { useState, useEffect } from 'react';
import { FaLock, FaUserSecret } from 'react-icons/fa';
import { motion, Variants } from 'framer-motion';
import './ProfileAvatar.css';

export interface ProfileAvatarProps {
  /** Image source URL; a missing or failing image shows an icon placeholder */
  src?: string;
  /** Image alt text */
  alt: string;
  /** Security clearance text */
  clearanceText?: string;
  /** Framer motion animation variants */
  variants?: Variants;
  /** Whether to animate the component */
  animate?: boolean;
}

/**
 * ProfileAvatar component for displaying user profile image with security clearance overlay.
 * 
 * @component
 */
const ProfileAvatar = ({ 
  src, 
  alt, 
  clearanceText = "Security Clearance: Top Level", 
  variants,
  animate = true
}: ProfileAvatarProps) => {
  const [failed, setFailed] = useState(false);

  // Try again when the source changes (e.g. the API avatar replaces the fallback)
  useEffect(() => {
    setFailed(false);
  }, [src]);

  return (
    <motion.div 
      className="profile-avatar__container"
      variants={animate ? variants : undefined}
    >
      {src && !failed ? (
        <img 
          src={src} 
          alt={alt}
          className="profile-avatar__image"
          loading="lazy"
          onError={() => setFailed(true)}
        />
      ) : (
        <div 
          className="profile-avatar__image profile-avatar__placeholder"
          role="img"
          aria-label={alt}
        >
          <FaUserSecret />
        </div>
      )}
      <div className="profile-avatar__clearance">
        <FaLock className="profile-avatar__lock-icon" />
        <span>{clearanceText}</span>
      </div>
    </motion.div>
  );
};

export default ProfileAvatar;