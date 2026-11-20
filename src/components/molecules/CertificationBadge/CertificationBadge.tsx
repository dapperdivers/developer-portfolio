import React from "react";
import { motion } from "framer-motion";
import { useMotionEnabled, fadeInVariants } from '@utils/motion';
import './CertificationBadge.css';

export interface CertificationBadgeProps {
  /** Name of the certification */
  name: string;
  /** Organization that issued the certification */
  issuer?: string;
  /** Date of certification */
  date?: string;
  /** Credential ID if available */
  credentialId?: string;
  /** Deprecated and unused: the row no longer shows an icon */
  iconName?: string;
  /** Element to render: 'li' when the row sits in a CertificationList */
  as?: 'div' | 'li';
  /** Additional CSS classes */
  className?: string;
  /** Whether the row fades in */
  animated?: boolean;
}

/**
 * A single certification as one row of the ruled list: the name on the left;
 * issuer, date and ID in small mono on the right.
 *
 * @component
 */
const CertificationBadge = ({
  name,
  issuer,
  date,
  credentialId,
  as = 'div',
  className = "",
  animated = true
}: CertificationBadgeProps) => {
  const animationEnabled = useMotionEnabled(animated);
  const Row = as === 'li' ? motion.li : motion.div;

  return (
    <Row
      className={`certification-badge ${className}`}
      variants={fadeInVariants}
      initial={animationEnabled ? "hidden" : "visible"}
      animate="visible"
    >
      <div className="certification-name">{name}</div>
      <div className="certification-meta">
        {issuer && <span className="certification-issuer">{issuer}</span>}
        {date && <span className="certification-date">{date}</span>}
        {credentialId && <span className="certification-id">ID: {credentialId}</span>}
      </div>
    </Row>
  );
};

export default CertificationBadge;
