import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Group, Page, Row, foundationParameters } from './kit';

const meta: Meta = {
  title: 'Foundations/Typography',
  parameters: foundationParameters,
};
export default meta;

const SAMPLE = 'Automated, measurable and easy to live with';

const FAMILIES = [
  { name: '--font-family-base', role: 'Body and interface text', sample: SAMPLE },
  { name: '--font-family-jetbrains', role: 'Code, terminal output, labels and data', sample: 'user@portfolio:~$ nmap -sV 10.0.0.0/24' },
  { name: '--font-family-heading', role: 'Signature only: the name in the header', sample: 'Derek Mackley' },
];

const SIZES = ['--font-size-h1', '--font-size-3xl', '--font-size-2xl', '--font-size-xl', '--font-size-lg', '--font-size-md', '--font-size-base', '--font-size-sm', '--font-size-xs'];
const WEIGHTS = ['--font-weight-light', '--font-weight-normal', '--font-weight-medium', '--font-weight-semibold', '--font-weight-bold'];
const LINE_HEIGHTS = ['--line-height-tight', '--line-height-code', '--line-height-md', '--line-height-base', '--line-height-loose'];
const TRACKING = ['--letter-spacing-tight', '--letter-spacing-normal', '--letter-spacing-wide', '--letter-spacing-technical'];

const PARAGRAPH =
  'Security programs work when the safe path is also the easy one. Guardrails belong in the tooling, findings belong in the backlog with an owner, and every control should be something you can measure.';

export const TypeScale: StoryObj = {
  name: 'Type scale',
  render: () => (
    <Page
      title="Typography"
      lead="Three typefaces with strict roles: a sans-serif for reading, a monospace for anything that is data or machine output, and a script face used once, for the signature."
    >
      <Group title="Families">
        {FAMILIES.map(({ name, role, sample }) => (
          <Row key={name} name={name} value={role}>
            <span style={{ fontFamily: `var(${name})`, fontSize: name === '--font-family-heading' ? '2.5rem' : 'var(--font-size-xl)', color: name === '--font-family-heading' ? 'var(--color-primary)' : undefined }}>
              {sample}
            </span>
          </Row>
        ))}
      </Group>

      <Group title="Size">
        {SIZES.map((name) => (
          <Row key={name} name={name}>
            <span style={{ display: 'block', fontSize: `var(${name})`, lineHeight: 'var(--line-height-tight)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {SAMPLE}
            </span>
          </Row>
        ))}
      </Group>

      <Group title="Weight">
        {WEIGHTS.map((name) => (
          <Row key={name} name={name}>
            <span style={{ fontSize: 'var(--font-size-lg)', fontWeight: `var(${name})` as React.CSSProperties['fontWeight'] }}>{SAMPLE}</span>
          </Row>
        ))}
      </Group>

      <Group title="Line height" note="Tight for headings, code for terminal blocks, base for running text.">
        {LINE_HEIGHTS.map((name) => (
          <Row key={name} name={name}>
            <p style={{ margin: 0, maxWidth: '60ch', lineHeight: `var(${name})`, color: 'var(--color-offwhite)' }}>{PARAGRAPH}</p>
          </Row>
        ))}
      </Group>

      <Group title="Letter spacing" note="The technical setting is for short uppercase labels in the monospace face.">
        {TRACKING.map((name) => (
          <Row key={name} name={name}>
            <span style={{ fontFamily: 'var(--font-family-jetbrains)', fontSize: 'var(--font-size-sm)', textTransform: 'uppercase', letterSpacing: `var(${name})` }}>
              Secure connection established
            </span>
          </Row>
        ))}
      </Group>
    </Page>
  ),
};
