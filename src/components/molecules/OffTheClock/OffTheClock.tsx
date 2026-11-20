import React from 'react';
import { motion } from 'framer-motion';
import { useMotionEnabled, slideUpVariants } from '@utils/motion';
import type { Project } from '@/types/portfolio';
import './OffTheClock.css';

export interface OffTheClockProps {
  /** Personal projects to show */
  items: Pick<Project, 'name' | 'desc'>[];
  /** Strip heading */
  title?: string;
  /** Whether to animate the strip */
  animated?: boolean;
}

/**
 * A small, warm strip for hobbies and other non-work projects.
 * Lighter than a project card: a name and a sentence each.
 *
 * @component
 */
const OffTheClock = ({ items, title = 'Off the clock', animated = true }: OffTheClockProps) => {
  const motionOn = useMotionEnabled(animated);
  if (items.length === 0) return null;

  return (
    <motion.section
      className="off-the-clock"
      aria-label={title}
      variants={slideUpVariants}
      initial={motionOn ? 'hidden' : 'visible'}
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      <h3 className="off-the-clock__title">{title}</h3>
      <ul className="off-the-clock__list">
        {items.map((item) => (
          <li key={item.name} className="off-the-clock__item">
            <span className="off-the-clock__name">{item.name}</span>
            <span className="off-the-clock__desc">{item.desc}</span>
          </li>
        ))}
      </ul>
    </motion.section>
  );
};

export default OffTheClock;
