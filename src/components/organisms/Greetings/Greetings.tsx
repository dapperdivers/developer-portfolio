import React, { useCallback, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useGreetings } from '@context/PortfolioContext';
import Button from '@atoms/Button';
import SocialLinks from '@molecules/SocialLinks';
import { profileLinks } from '@/portfolio';
import ScrollDown from '@atoms/ScrollDown';
import TerminalWindow from '@molecules/TerminalWindow';
import type { TerminalWindowLine } from '@molecules/TerminalWindow';
import useCallbackHandlers from '@/hooks/useCallbackHandlers';
import useClusterStatus from '@hooks/useClusterStatus';
import { useAnimation } from '@context/AnimationContext';
import { slideUpVariants, useMotionEnabled } from '@utils/motion';
import { runCommand } from './commands';
import type { CommandEffect } from './commands';
import './Greetings.css';

const RESUME_PATH = '/resume/Cybersecurity_2025.pdf';
const RESUME_NAME = 'Cybersecurity_2025.pdf';
const SUGGESTIONS = ['help', 'ls', 'neofetch', 'cat resume'];
const MAX_LINES = 80;

// Second line of the opening story; the first comes from the greeting data
const HOME_LAB_LINE =
  'This site runs on a Kubernetes cluster in my garage, increasingly operated by agents.';

/** First sentence of the greeting description. */
const firstSentence = (text: string): string => {
  const match = text.match(/^.*?[.!?](?=\s|$)/);
  return (match ? match[0] : text).trim();
};

const Greetings = () => {
  const greetings = useGreetings();
  const { handleDownload } = useCallbackHandlers();
  const { animationEnabled } = useAnimation();
  const motionOn = useMotionEnabled(animationEnabled);
  const jobTitle = greetings.jobTitle ?? 'Principal Security Engineer';
  const location = greetings.location ?? '';
  const { data: cluster } = useClusterStatus();
  const clusterRef = useRef(cluster);
  clusterRef.current = cluster;
  const counter = useRef(0);
  const loadedAt = useRef(Date.now());
  const nextId = () => `line-${counter.current++}`;

  const [lines, setLines] = useState<TerminalWindowLine[]>(() => [
    { id: 'boot-0', kind: 'input', text: 'whoami' },
    { id: 'boot-1', kind: 'output', text: [jobTitle, location].filter(Boolean).join(', ') },
    { id: 'boot-2', kind: 'input', text: 'cat story.txt' },
    { id: 'boot-3', kind: 'output', text: firstSentence(greetings.description) },
    { id: 'boot-4', kind: 'output', text: HOME_LAB_LINE },
    { id: 'boot-5', kind: 'muted', text: 'Type help to look around, or use the buttons below.' },
  ]);

  const scrollToNextSection = () => {
    const nextSection = document.querySelector('#greetings')?.nextElementSibling;
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: motionOn ? 'smooth' : 'auto' });
    }
  };

  const downloadResume = useCallback(async (e?: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e?.preventDefault();
    await handleDownload(RESUME_PATH, RESUME_NAME);
  }, [handleDownload]);

  const applyEffect = useCallback((effect: CommandEffect) => {
    if (effect.type === 'download') {
      void downloadResume();
    } else if (effect.type === 'scroll') {
      const target = effect.section === 'top' ? document.body : document.getElementById(effect.section);
      target?.scrollIntoView({ behavior: motionOn ? 'smooth' : 'auto', block: 'start' });
    }
  }, [downloadResume, motionOn]);

  const onCommand = useCallback((raw: string) => {
    const result = runCommand(raw, {
      name: greetings.name,
      jobTitle,
      location,
      uptimeSeconds: Math.round((Date.now() - loadedAt.current) / 1000),
      cluster: clusterRef.current,
    });
    if (result.effect?.type === 'clear') {
      setLines([]);
      return;
    }
    setLines((prev) => [
      ...prev,
      { id: nextId(), kind: 'input' as const, text: raw },
      ...result.output.map((o) => ({ id: nextId(), kind: o.kind, text: o.text })),
    ].slice(-MAX_LINES));
    if (result.effect) applyEffect(result.effect);
  }, [greetings.name, jobTitle, location, applyEffect]);

  const heading = useMemo(() => (
    <h1 className="greetings__title" data-testid="greeting-heading">
      {greetings.title}
    </h1>
  ), [greetings.title]);

  return (
    <div id="greetings" className="greetings text-text">
      <div className="greetings__inner">
        <TerminalWindow
          lines={lines}
          onCommand={onCommand}
          animated={animationEnabled}
          header={heading}
          suggestions={SUGGESTIONS}
          title="guest@derekmackley.com: ~"
        />

        <div className="greetings__actions">
          <Button
            variant="primary"
            onClick={downloadResume}
            icon="fa:download"
            iconPosition="right"
            animated={animationEnabled}
          >
            Download Resume
          </Button>
          {/* The nav shows these from lg up; phones get them here */}
          <SocialLinks
            className="greetings__socials"
            links={profileLinks}
            size="large"
            animated={animationEnabled}
          />
        </div>
      </div>

      {/* Scroll down indicator using the ScrollDown atom component */}
      <motion.div
        className="greetings__scroll"
        variants={slideUpVariants}
        initial={animationEnabled ? 'hidden' : false}
        animate="visible"
        transition={{ delay: 1.2 }}
      >
        <ScrollDown onClick={scrollToNextSection} animated={animationEnabled} />
      </motion.div>
    </div>
  );
};

export default Greetings;
