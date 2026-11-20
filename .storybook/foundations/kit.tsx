import React, { useEffect, useState } from 'react';

/**
 * Shared building blocks for the Foundations pages.
 *
 * Every value shown on those pages is read from the live stylesheet with
 * getComputedStyle, so the documentation cannot drift from the tokens.
 */

const mono = 'var(--font-family-jetbrains)';

/** Resolved value of a CSS custom property on :root. */
export const readToken = (name: string): string =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim();

/** Re-reads a token after mount so the value reflects the loaded stylesheet. */
export const useToken = (name: string): string => {
  const [value, setValue] = useState('');
  useEffect(() => setValue(readToken(name)), [name]);
  return value;
};

/** Parses hex, rgb() and rgba() colours to [r, g, b]. */
export const toRgb = (color: string): [number, number, number] | null => {
  const probe = document.createElement('span');
  probe.style.color = color;
  document.body.appendChild(probe);
  const resolved = getComputedStyle(probe).color;
  probe.remove();
  const parts = resolved.match(/[\d.]+/g);
  return parts && parts.length >= 3 ? [Number(parts[0]), Number(parts[1]), Number(parts[2])] : null;
};

const luminance = ([r, g, b]: [number, number, number]): number => {
  const channel = (v: number) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
};

/** WCAG 2 contrast ratio between two colours, or null if either cannot be parsed. */
export const contrastRatio = (foreground: string, background: string): number | null => {
  const fg = toRgb(foreground);
  const bg = toRgb(background);
  if (!fg || !bg) return null;
  const [a, b] = [luminance(fg), luminance(bg)].sort((x, y) => y - x);
  return (a + 0.05) / (b + 0.05);
};

export const Page: React.FC<{ title: string; lead: string; children: React.ReactNode }> = ({ title, lead, children }) => (
  <div
    style={{
      maxWidth: 1040,
      margin: '0 auto',
      padding: 'var(--spacing-6) var(--spacing-5) var(--spacing-9)',
      color: 'var(--color-text)',
      fontFamily: 'var(--font-family-base)',
      textAlign: 'left',
    }}
  >
    <p
      style={{
        margin: 0,
        fontFamily: mono,
        fontSize: 'var(--font-size-xs)',
        letterSpacing: 'var(--letter-spacing-technical)',
        textTransform: 'uppercase',
        color: 'var(--color-primary)',
      }}
    >
      Foundations
    </p>
    <h1 style={{ margin: 'var(--spacing-2) 0 var(--spacing-3)', fontFamily: 'var(--font-family-inter)', fontSize: 'var(--font-size-h1)', fontWeight: 700, lineHeight: 'var(--line-height-tight)' }}>
      {title}
    </h1>
    <p style={{ margin: 0, maxWidth: '65ch', fontSize: 'var(--font-size-md)', lineHeight: 'var(--line-height-base)', color: 'var(--color-text-muted)' }}>
      {lead}
    </p>
    {children}
  </div>
);

export const Group: React.FC<{ title: string; note?: string; children: React.ReactNode }> = ({ title, note, children }) => (
  <section style={{ marginTop: 'var(--spacing-8)' }}>
    <h2
      style={{
        margin: 0,
        paddingBottom: 'var(--spacing-2)',
        borderBottom: '1px solid var(--color-border)',
        fontFamily: 'var(--font-family-inter)',
        fontSize: 'var(--font-size-lg)',
        fontWeight: 600,
      }}
    >
      {title}
    </h2>
    {note && (
      <p style={{ margin: 'var(--spacing-3) 0 0', maxWidth: '65ch', fontSize: 'var(--font-size-sm)', lineHeight: 'var(--line-height-base)', color: 'var(--color-text-muted)' }}>
        {note}
      </p>
    )}
    <div style={{ marginTop: 'var(--spacing-5)' }}>{children}</div>
  </section>
);

/** Token name in monospace, with its resolved value underneath. */
export const TokenLabel: React.FC<{ name: string; value?: string }> = ({ name, value }) => {
  const resolved = useToken(name);
  return (
    <div style={{ minWidth: 0 }}>
      <code style={{ display: 'block', padding: 0, background: 'none', fontFamily: mono, fontSize: 'var(--font-size-xs)', color: 'var(--color-text)', overflowWrap: 'anywhere' }}>
        {name}
      </code>
      <span style={{ display: 'block', marginTop: 2, fontFamily: mono, fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', overflowWrap: 'anywhere' }}>
        {value ?? resolved}
      </span>
    </div>
  );
};

export const Grid: React.FC<{ min?: number; children: React.ReactNode }> = ({ min = 180, children }) => (
  <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fill, minmax(${min}px, 1fr))`, gap: 'var(--spacing-4)' }}>{children}</div>
);

/** One row of a specimen table: label on the left, specimen on the right. */
export const Row: React.FC<{ name: string; value?: string; children: React.ReactNode }> = ({ name, value, children }) => (
  <div
    style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: 'var(--spacing-3) var(--spacing-5)',
      alignItems: 'center',
      padding: 'var(--spacing-3) 0',
      borderBottom: '1px solid rgba(var(--color-text-rgb), 0.08)',
    }}
  >
    <div style={{ flex: '0 0 220px', minWidth: 0 }}>
      <TokenLabel name={name} value={value} />
    </div>
    <div style={{ flex: '1 1 240px', minWidth: 0 }}>{children}</div>
  </div>
);

/** Parameters shared by every Foundations page. */
export const foundationParameters = {
  layout: 'fullscreen',
  controls: { disable: true },
  actions: { disable: true },
} as const;
