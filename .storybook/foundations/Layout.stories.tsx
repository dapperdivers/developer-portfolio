import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Grid, Group, Page, Row, TokenLabel, foundationParameters } from './kit';

const meta: Meta = {
  title: 'Foundations/Spacing and shape',
  parameters: foundationParameters,
};
export default meta;

const SPACING = ['--spacing-1', '--spacing-2', '--spacing-3', '--spacing-4', '--spacing-5', '--spacing-6', '--spacing-7', '--spacing-8', '--spacing-9', '--spacing-10'];
const SEMANTIC_SPACING = ['--card-padding', '--button-padding-y', '--button-padding-x', '--container-gutter', '--section-padding-y-sm', '--section-padding-y', '--container-max-width'];
const RADII = ['--border-radius-sm', '--border-radius', '--border-radius-md', '--border-radius-lg', '--border-radius-xl', '--border-radius-pill', '--border-radius-circle'];
const BORDERS = ['--border-width-thin', '--border-width-medium', '--border-width-thick'];
const SHADOWS = ['--box-shadow-sm', '--shadow-md', '--box-shadow', '--box-shadow-lg'];
const BREAKPOINTS = ['--breakpoint-sm', '--breakpoint-md', '--breakpoint-lg', '--breakpoint-xl', '--breakpoint-xxl'];
const LAYERS = ['--z-index-dropdown', '--z-index-sticky', '--z-index-fixed', '--z-index-modal-backdrop', '--z-index-modal', '--z-index-popover', '--z-index-toast'];

const tile: React.CSSProperties = {
  background: 'var(--color-background-alt)',
  border: '1px solid rgba(var(--color-primary-rgb), 0.35)',
};

export const SpacingAndShape: StoryObj = {
  name: 'Spacing and shape',
  render: () => (
    <Page
      title="Spacing and shape"
      lead="One spacing scale, a short list of radii and four elevation levels. Components pick from these rather than inventing values, which is what keeps cards, badges and panels looking related."
    >
      <Group title="Spacing scale" note="Steps are quarter-rem based at the small end and widen from step 5 upward.">
        {SPACING.map((name) => (
          <Row key={name} name={name}>
            <div style={{ width: `var(${name})`, height: 16, borderRadius: 2, background: 'var(--color-primary)' }} />
          </Row>
        ))}
      </Group>

      <Group title="Semantic spacing" note="Named uses of the scale. Changing one of these retunes every component that shares the role.">
        <Grid min={220}>
          {SEMANTIC_SPACING.map((name) => (
            <TokenLabel key={name} name={name} />
          ))}
        </Grid>
      </Group>

      <Group title="Radius" note="Pill is for badges, chips and the primary call to action. Panels and cards use lg.">
        <Grid min={130}>
          {RADII.map((name) => (
            <div key={name}>
              <div style={{ ...tile, width: name === '--border-radius-pill' ? 120 : 72, height: 72, borderRadius: `var(${name})` }} />
              <div style={{ marginTop: 'var(--spacing-2)' }}>
                <TokenLabel name={name} />
              </div>
            </div>
          ))}
        </Grid>
      </Group>

      <Group title="Border width">
        {BORDERS.map((name) => (
          <Row key={name} name={name}>
            <div style={{ borderTop: `var(${name}) solid var(--color-primary)` }} />
          </Row>
        ))}
      </Group>

      <Group title="Elevation" note="Shadows are subtle on a dark page; raised surfaces also step up in lightness.">
        <div style={{ padding: 'var(--spacing-6)', borderRadius: 'var(--border-radius-lg)', background: 'var(--color-gray-200)' }}>
          <Grid min={180}>
            {SHADOWS.map((name) => (
              <div key={name} style={{ padding: 'var(--spacing-4)', borderRadius: 'var(--border-radius-lg)', background: 'var(--color-white)', boxShadow: `var(${name})` }}>
                <code style={{ padding: 0, background: 'none', fontFamily: 'var(--font-family-jetbrains)', fontSize: 'var(--font-size-xs)', color: 'var(--color-gray-900)' }}>{name}</code>
              </div>
            ))}
          </Grid>
        </div>
      </Group>

      <Group title="Breakpoints">
        <Grid min={160}>
          {BREAKPOINTS.map((name) => (
            <TokenLabel key={name} name={name} />
          ))}
        </Grid>
      </Group>

      <Group title="Layers" note="Stacking order from lowest to highest.">
        <Grid min={200}>
          {LAYERS.map((name) => (
            <TokenLabel key={name} name={name} />
          ))}
        </Grid>
      </Group>
    </Page>
  ),
};
