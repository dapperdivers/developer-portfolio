import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor, within } from 'storybook/test';
import { Grid, Group, Page, TokenLabel, contrastRatio, foundationParameters, useToken } from './kit';

const meta: Meta = {
  title: 'Foundations/Colors',
  parameters: foundationParameters,
};
export default meta;

const Swatch: React.FC<{ name: string }> = ({ name }) => (
  <div>
    <div
      style={{
        height: 72,
        borderRadius: 'var(--border-radius-lg)',
        border: '1px solid rgba(var(--color-text-rgb), 0.12)',
        background: `var(${name})`,
      }}
    />
    <div style={{ marginTop: 'var(--spacing-2)' }}>
      <TokenLabel name={name} />
    </div>
  </div>
);

const Swatches: React.FC<{ names: string[] }> = ({ names }) => (
  <Grid>
    {names.map((name) => (
      <Swatch key={name} name={name} />
    ))}
  </Grid>
);

const grade = (ratio: number | null): { label: string; color: string } => {
  if (ratio === null) return { label: 'n/a', color: 'var(--color-text-muted)' };
  if (ratio >= 7) return { label: 'AAA', color: 'var(--color-success)' };
  if (ratio >= 4.5) return { label: 'AA', color: 'var(--color-success)' };
  if (ratio >= 3) return { label: 'AA large', color: 'var(--color-warning)' };
  return { label: 'Fail', color: 'var(--color-danger)' };
};

const ContrastCell: React.FC<{ foreground: string; background: string }> = ({ foreground, background }) => {
  const fg = useToken(foreground);
  const bg = useToken(background);
  const ratio = fg && bg ? contrastRatio(fg, bg) : null;
  const { label, color } = grade(ratio);
  return (
    <td style={{ padding: 'var(--spacing-2)' }}>
      <div
        data-testid={`contrast-${foreground}-${background}`}
        data-ratio={ratio ? ratio.toFixed(2) : ''}
        style={{
          padding: 'var(--spacing-3)',
          borderRadius: 'var(--border-radius-md)',
          border: '1px solid rgba(var(--color-text-rgb), 0.12)',
          background: `var(${background})`,
          color: `var(${foreground})`,
          fontSize: 'var(--font-size-sm)',
        }}
      >
        <span style={{ fontWeight: 600 }}>Aa</span> {ratio ? `${ratio.toFixed(1)}:1` : ''}
        <span style={{ display: 'block', marginTop: 2, fontFamily: 'var(--font-family-jetbrains)', fontSize: 'var(--font-size-xs)', color }}>{label}</span>
      </div>
    </td>
  );
};

const TEXT = ['--color-text', '--color-offwhite', '--color-text-muted', '--color-primary', '--color-accent', '--color-info', '--color-warning'];
const SURFACES = ['--color-background', '--color-background-alt', '--color-background-muted', '--color-navy'];

export const Palette: StoryObj = {
  render: () => (
    <Page
      title="Colour"
      lead="A dark, security-console palette: near-black surfaces, a single cyan brand colour for anything interactive or live, and red reserved for alerts. Swatches and values are read from the stylesheet at render time."
    >
      <Group title="Brand" note="Cyan marks interactive and live elements. Red is the accent for warnings and classified labels; it is never used for decoration.">
        <Swatches names={['--color-primary', '--color-primary-light', '--color-primary-dark', '--color-accent', '--color-navy', '--color-offwhite']} />
      </Group>

      <Group title="Surfaces and text" note="Semantic aliases. Components use these rather than raw greys so a surface can be retuned in one place.">
        <Swatches names={['--color-background', '--color-background-alt', '--color-background-muted', '--color-border', '--color-text', '--color-text-muted']} />
      </Group>

      <Group title="Status" note="Shared by alerts, badges and progress bars.">
        <Swatches names={['--color-success', '--color-info', '--color-warning', '--color-danger']} />
      </Group>

      <Group title="Severity" note="The five-step scale used wherever a finding or skill level is rated, from informational to critical.">
        <Swatches names={['--color-level-info', '--color-level-low', '--color-level-medium', '--color-level-high', '--color-level-critical']} />
      </Group>

      <Group title="Neutrals">
        <Swatches
          names={['--color-white', '--color-gray-100', '--color-gray-200', '--color-gray-300', '--color-gray-400', '--color-gray-500', '--color-gray-600', '--color-gray-700', '--color-gray-800', '--color-gray-900', '--color-black']}
        />
      </Group>
    </Page>
  ),
};

export const Contrast: StoryObj = {
  render: () => (
    <Page
      title="Contrast"
      lead="Every text colour against every surface, with the WCAG 2 contrast ratio computed in the browser from the live token values. Body text needs 4.5:1 (AA); large text and interface graphics need 3:1."
    >
      <Group title="Text on surfaces">
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 640 }}>
            <thead>
              <tr>
                <th />
                {SURFACES.map((surface) => (
                  <th key={surface} style={{ padding: 'var(--spacing-2)', textAlign: 'left', fontWeight: 400 }}>
                    <TokenLabel name={surface} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TEXT.map((text) => (
                <tr key={text}>
                  <th style={{ padding: 'var(--spacing-2)', textAlign: 'left', fontWeight: 400 }}>
                    <TokenLabel name={text} />
                  </th>
                  {SURFACES.map((surface) => (
                    <ContrastCell key={surface} foreground={text} background={surface} />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Group>
    </Page>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('Body text colours meet AA on every surface', async () => {
      for (const text of ['--color-text', '--color-offwhite', '--color-text-muted']) {
        for (const surface of SURFACES) {
          const cell = await canvas.findByTestId(`contrast-${text}-${surface}`);
          // The ratio is filled in after mount, once the tokens have been read
          await waitFor(() => expect(Number(cell.dataset.ratio)).toBeGreaterThanOrEqual(4.5));
        }
      }
    });
  },
};
