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
const SURFACE_PANELS = ['--surface-card', '--surface-card-raised', '--surface-inset'];
const SURFACE_LINES = ['--surface-border', '--surface-border-strong', '--surface-divider'];
const SURFACE_SHAPES = ['--radius-card', '--radius-control', '--radius-chip'];
const SURFACE_ELEVATION = ['--shadow-card', '--shadow-card-hover', '--ring-focus'];
const SURFACE_CONTROLS = ['--control-height-sm', '--control-height', '--control-padding-x'];
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

      <Group title="Radius" note="Chips and pills use the pill radius. Cards and panels use lg, buttons and inputs use md.">
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
        <Grid min={180}>
          {SHADOWS.map((name) => (
            <div key={name} style={{ padding: 'var(--spacing-4)', borderRadius: 'var(--border-radius-lg)', background: 'var(--surface-card-raised)', boxShadow: `var(${name})` }}>
              <code style={{ padding: 0, background: 'none', fontFamily: 'var(--font-family-jetbrains)', fontSize: 'var(--font-size-xs)', color: 'var(--color-text)' }}>{name}</code>
            </div>
          ))}
        </Grid>
      </Group>

      <Group
        title="Surfaces"
        note="The panel tokens every card, terminal window, chip and control draws from. Card is the default fill; raised is opaque, for things over the map or a modal; inset is the faint fill for a block inside a card."
      >
        <Grid min={200}>
          {SURFACE_PANELS.map((name) => (
            <div key={name}>
              <div style={{ height: 72, borderRadius: 'var(--radius-card)', background: `var(${name})`, border: '1px solid var(--surface-border)', boxShadow: 'var(--shadow-card)' }} />
              <div style={{ marginTop: 'var(--spacing-2)' }}>
                <TokenLabel name={name} />
              </div>
            </div>
          ))}
        </Grid>
        <div style={{ marginTop: 'var(--spacing-5)' }}>
          {SURFACE_LINES.map((name) => (
            <Row key={name} name={name}>
              <div style={{ borderTop: `2px solid var(${name})` }} />
            </Row>
          ))}
        </div>
        <h3 style={{ margin: 'var(--spacing-5) 0 var(--spacing-3)', fontSize: 'var(--font-size-base)', fontWeight: 600 }}>Shape</h3>
        <Grid min={150}>
          {SURFACE_SHAPES.map((name) => (
            <div key={name}>
              <div style={{ ...tile, width: name === '--radius-chip' ? 120 : 72, height: name === '--radius-chip' ? 28 : 72, borderRadius: `var(${name})` }} />
              <div style={{ marginTop: 'var(--spacing-2)' }}>
                <TokenLabel name={name} />
              </div>
            </div>
          ))}
        </Grid>
        <h3 style={{ margin: 'var(--spacing-5) 0 var(--spacing-3)', fontSize: 'var(--font-size-base)', fontWeight: 600 }}>Elevation and focus</h3>
        <Grid min={200}>
          {SURFACE_ELEVATION.map((name) => (
            <div key={name}>
              <div style={{ height: 56, borderRadius: 'var(--radius-card)', background: 'var(--surface-card)', border: '1px solid var(--surface-border)', boxShadow: `var(${name})` }} />
              <div style={{ marginTop: 'var(--spacing-2)' }}>
                <TokenLabel name={name} />
              </div>
            </div>
          ))}
        </Grid>
        <h3 style={{ margin: 'var(--spacing-5) 0 var(--spacing-3)', fontSize: 'var(--font-size-base)', fontWeight: 600 }}>Controls</h3>
        <Grid min={200}>
          {SURFACE_CONTROLS.map((name) => (
            <TokenLabel key={name} name={name} />
          ))}
        </Grid>
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
