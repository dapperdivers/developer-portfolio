import type { Meta, StoryFn } from '@storybook/react-vite';
import type { ReactNode } from 'react';
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
} satisfies Meta<typeof ScrollToTop>;

export default meta;

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

// Dark scrollable page with a sticky header, as the button sits on the site
const Header = ({ children }: { children: ReactNode }) => (
  <div style={{
    position: 'sticky',
    top: 0,
    background: 'var(--surface-card-raised)',
    borderBottom: '1px solid var(--surface-border)',
    color: 'var(--color-text)',
    fontFamily: 'var(--font-family-jetbrains)',
    fontSize: 'var(--font-size-sm)',
    padding: '0.75rem 1.25rem',
    marginBottom: '1.5rem',
    zIndex: 1,
  }}>
    {children}
  </div>
);

const Sections = () => (
  <div style={{ maxWidth: '38rem', margin: '0 auto' }}>
    <h1 style={{ marginTop: 0 }}>Incident Response Playbook</h1>
    {playbookSections.map(({ title, body }) => (
      <section key={title} style={{ marginBottom: '2.5rem' }}>
        <h2>{title}</h2>
        <p style={{ color: 'var(--color-text-muted)' }}>{body}</p>
      </section>
    ))}
  </div>
);

const ScrollContainer = ({ children }: { children: ReactNode }) => (
  <div style={{ minHeight: '200vh', background: 'var(--color-background)', color: 'var(--color-text)' }}>
    <Header>Scroll down past 300px and the button appears</Header>
    <div style={{ padding: '0 1.25rem' }}>
      <Sections />
    </div>
    {children}
  </div>
);

// Default story
export const Default: StoryFn = () => (
  <ScrollContainer>
    <ScrollToTop />
  </ScrollContainer>
);


// With reduced motion: the button appears and reacts without animation
export const ReducedMotion: StoryFn = () => (
  <div style={{ minHeight: '200vh', background: 'var(--color-background)', color: 'var(--color-text)' }}>
    <Header>Reduced motion: the button appears without the slide-in</Header>
    <div style={{ padding: '0 1.25rem' }}>
      <Sections />
    </div>
    <ScrollToTop animated={false} />
  </div>
);
