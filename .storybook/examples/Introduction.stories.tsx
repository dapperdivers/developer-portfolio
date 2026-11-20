import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { linkTo } from '@storybook/addon-links';
import { expect, within } from 'storybook/test';

/**
 * Landing page for the component library.
 */

const mono = 'var(--font-family-jetbrains)';

const LAYERS = [
  {
    name: 'Foundations',
    summary: 'Design tokens for colour, type, spacing, shape and motion, documented from the live stylesheet.',
    target: ['Foundations/Colors', 'Palette'],
  },
  {
    name: 'Atoms',
    summary: 'Single-purpose pieces: buttons, badges, progress bars, terminal cursor and prompt.',
    target: ['Atoms/Button', 'Default'],
  },
  {
    name: 'Molecules',
    summary: 'Atoms composed into units with one job: a skill card, a timeline entry, a terminal title bar.',
    target: ['Molecules/SkillCard', 'Default'],
  },
  {
    name: 'Organisms',
    summary: 'Whole page sections that read portfolio data from context: experience, education, projects.',
    target: ['Organisms/Experience', 'Default'],
  },
] as const;

const PRACTICES = [
  ['Tokens, not values', 'Components reference CSS custom properties, and the Foundations pages render those same properties, so the documentation cannot drift from the implementation.'],
  ['Stories are tests', 'Stories with a play function assert behaviour in a real browser: focus order, callbacks, scroll states.'],
  ['Motion is optional', 'Animated components read one context flag, so reduced-motion preferences are honoured everywhere at once.'],
  ['Offline by default', 'Stories use generated placeholder images and mock data, so they render the same with no network.'],
] as const;

const STACK = ['React 19', 'Vite 8', 'Tailwind CSS 4', 'TypeScript', 'Framer Motion', 'Storybook 10', 'Vitest'];

const card: React.CSSProperties = {
  display: 'block',
  width: '100%',
  padding: 'var(--spacing-4)',
  textAlign: 'left',
  borderRadius: 'var(--border-radius-lg)',
  border: '1px solid rgba(var(--color-primary-rgb), 0.25)',
  background: 'var(--color-background-alt)',
  color: 'var(--color-text)',
  font: 'inherit',
  cursor: 'pointer',
};

const heading: React.CSSProperties = {
  margin: 'var(--spacing-8) 0 var(--spacing-4)',
  paddingBottom: 'var(--spacing-2)',
  borderBottom: '1px solid var(--color-border)',
  fontFamily: 'var(--font-family-inter)',
  fontSize: 'var(--font-size-lg)',
  fontWeight: 600,
};

const Introduction: React.FC = () => (
  <div
    style={{
      maxWidth: 960,
      margin: '0 auto',
      padding: 'var(--spacing-8) var(--spacing-5) var(--spacing-9)',
      color: 'var(--color-text)',
      fontFamily: 'var(--font-family-base)',
      textAlign: 'left',
    }}
  >
    <p style={{ margin: 0, fontFamily: mono, fontSize: 'var(--font-size-xs)', letterSpacing: 'var(--letter-spacing-technical)', textTransform: 'uppercase', color: 'var(--color-primary)' }}>
      derekmackley.com / component library
    </p>
    <h1 style={{ margin: 'var(--spacing-2) 0 var(--spacing-4)', fontFamily: 'var(--font-family-inter)', fontSize: 'var(--font-size-h1)', fontWeight: 700, lineHeight: 'var(--line-height-tight)' }}>
      The parts this portfolio is built from
    </h1>
    <p style={{ margin: 0, maxWidth: '62ch', fontSize: 'var(--font-size-md)', lineHeight: 'var(--line-height-base)', color: 'var(--color-offwhite)' }}>
      Every piece of the site lives here in isolation, from a single design token up to a full page section. It is the
      workbench the site is developed on, and a record of how it is put together.
    </p>

    <h2 style={heading}>Where to look</h2>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 'var(--spacing-4)' }}>
      {LAYERS.map(({ name, summary, target }) => (
        <button key={name} type="button" style={card} onClick={linkTo(target[0], target[1])}>
          <span style={{ display: 'block', fontFamily: mono, fontSize: 'var(--font-size-sm)', color: 'var(--color-primary)' }}>{name} →</span>
          <span style={{ display: 'block', marginTop: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', lineHeight: 'var(--line-height-base)', color: 'var(--color-text-muted)' }}>
            {summary}
          </span>
        </button>
      ))}
    </div>

    <h2 style={heading}>How it is kept honest</h2>
    <dl style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--spacing-5)', margin: 0 }}>
      {PRACTICES.map(([term, detail]) => (
        <div key={term}>
          <dt style={{ fontWeight: 600 }}>{term}</dt>
          <dd style={{ margin: 'var(--spacing-1) 0 0', fontSize: 'var(--font-size-sm)', lineHeight: 'var(--line-height-base)', color: 'var(--color-text-muted)' }}>{detail}</dd>
        </div>
      ))}
    </dl>

    <h2 style={heading}>Built with</h2>
    <ul style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-2)', margin: 0, padding: 0, listStyle: 'none' }}>
      {STACK.map((item) => (
        <li
          key={item}
          style={{
            padding: 'var(--spacing-1) var(--spacing-3)',
            borderRadius: 'var(--border-radius-pill)',
            border: '1px solid var(--color-border)',
            fontFamily: mono,
            fontSize: 'var(--font-size-xs)',
            color: 'var(--color-offwhite)',
          }}
        >
          {item}
        </li>
      ))}
    </ul>

    <h2 style={heading}>Component layout</h2>
    <pre
      style={{
        margin: 0,
        padding: 'var(--spacing-4)',
        overflow: 'auto',
        borderRadius: 'var(--border-radius-lg)',
        background: 'var(--color-navy)',
        fontFamily: mono,
        fontSize: 'var(--font-size-sm)',
        lineHeight: 'var(--line-height-code)',
        color: 'var(--color-offwhite)',
      }}
    >
      {`src/components/<layer>/<Component>/
├── Component.jsx           implementation
├── Component.css           styles, tokens only
├── Component.stories.jsx   states, controls, interaction tests
├── Component.test.jsx      unit tests
└── index.js                public export`}
    </pre>
  </div>
);

const meta: Meta<typeof Introduction> = {
  title: 'Introduction',
  component: Introduction,
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
    actions: { disable: true },
  },
};
export default meta;

export const Main: StoryObj<typeof Introduction> = {
  name: 'Welcome',
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(canvas.getAllByRole('button')).toHaveLength(4);
  },
};
