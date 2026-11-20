import React, { useMemo } from 'react';
import { AnimationContext, useAnimation } from '@context/AnimationContext';
import ScrollToTop from './ScrollToTop';

const meta = {
  title: 'Atoms/ScrollToTop',
  component: ScrollToTop,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A floating button that appears when scrolling down and allows users to quickly return to the top of the page.',
      },
    },
  },
};

export default meta;

// Create a container with scrollable content
const ScrollContainer = ({ children }) => (
  <div style={{ height: '200vh', padding: '20px' }}>
    <div style={{ position: 'sticky', top: 0, backgroundColor: '#fff', padding: '10px', marginBottom: '20px' }}>
      Scroll down to see the button appear
    </div>
    {children}
    <div style={{ marginTop: '20px' }}>
      {Array(20).fill().map((_, i) => (
        <p key={i} style={{ marginBottom: '20px' }}>
          Scroll content {i + 1}
        </p>
      ))}
    </div>
  </div>
);

// Default story
export const Default = () => (
  <ScrollContainer>
    <ScrollToTop />
  </ScrollContainer>
);

const playbookSections = [
  { title: 'Preparation', body: 'Keep an asset inventory, an on-call rota and tested backups. Agree severity levels and escalation paths before they are needed.' },
  { title: 'Detection', body: 'Correlate endpoint, identity and network telemetry. Tune alerts so that every page is actionable and has an owner.' },
  { title: 'Triage', body: 'Confirm the alert is real, scope the affected hosts and accounts, and assign a severity that drives the response clock.' },
  { title: 'Containment', body: 'Isolate affected hosts, revoke active sessions and rotate exposed credentials. Preserve volatile evidence before rebooting anything.' },
  { title: 'Eradication', body: 'Remove persistence mechanisms, patch the entry point and rebuild compromised systems from a known-good image.' },
  { title: 'Recovery', body: 'Restore services in stages, watching for reinfection. Validate data integrity against backups before reopening access.' },
  { title: 'Communication', body: 'Give stakeholders regular, factual updates. Record decisions and timings as they happen, not from memory afterwards.' },
  { title: 'Forensics', body: 'Build a timeline from logs, disk images and memory captures. Keep a chain of custody for anything that may be needed later.' },
  { title: 'Post-Incident Review', body: 'Run a blameless review within a week. Turn each finding into a tracked action with an owner and a due date.' },
  { title: 'Hardening', body: 'Feed lessons back into detection rules, access policies and runbooks, then rehearse the scenario in a tabletop exercise.' },
];

// With custom content around it
export const WithContent = () => (
  <ScrollContainer>
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h1>Incident Response Playbook</h1>
      <p>A long-form page, as the ScrollToTop button would sit beside it on the site.</p>
      {playbookSections.map(({ title, body }) => (
        <div key={title} style={{ marginBottom: '40px' }}>
          <h2>{title}</h2>
          <p>{body}</p>
        </div>
      ))}
    </div>
    <ScrollToTop />
  </ScrollContainer>
);

// In a dark theme context
export const DarkTheme = () => (
  <div style={{ 
    backgroundColor: '#1a1a1a', 
    color: '#fff',
    minHeight: '200vh',
    padding: '20px'
  }}>
    <div style={{ position: 'sticky', top: 0, backgroundColor: '#1a1a1a', padding: '10px', marginBottom: '20px' }}>
      Dark theme example
    </div>
    {Array(20).fill().map((_, i) => (
      <p key={i} style={{ marginBottom: '20px' }}>
        Dark theme content {i + 1}
      </p>
    ))}
    <ScrollToTop />
  </div>
);

// Overrides the animation context the way a reduced-motion preference does
const ReducedMotionProvider = ({ children }) => {
  const animation = useAnimation();
  const value = useMemo(
    () => ({ ...animation, animationEnabled: false, prefersReducedMotion: true }),
    [animation]
  );
  return <AnimationContext.Provider value={value}>{children}</AnimationContext.Provider>;
};

// With reduced motion: the button appears and reacts without animation
export const ReducedMotion = () => (
  <ReducedMotionProvider>
  <div style={{ 
    minHeight: '200vh',
    padding: '20px'
  }}>
    <div style={{ position: 'sticky', top: 0, backgroundColor: '#fff', padding: '10px', marginBottom: '20px' }}>
      Reduced motion: scroll down, the button appears without the slide-in
    </div>
    <p style={{ marginBottom: '20px' }}>
      Animations are switched off through the animation context, as they are when the visitor prefers reduced motion. Hover and tap effects are disabled too.
    </p>
    {Array(20).fill().map((_, i) => (
      <p key={i} style={{ marginBottom: '20px' }}>
        Content section {i + 1}
      </p>
    ))}
    <ScrollToTop />
  </div>
  </ReducedMotionProvider>
); 