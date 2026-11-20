import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Group, Page, Row, foundationParameters } from './kit';

const meta: Meta = {
  title: 'Foundations/Motion',
  parameters: foundationParameters,
};
export default meta;

const TRANSITIONS = ['--transition-fast', '--transition-base', '--transition-slow', '--transition-transform', '--transition-fade'];

const Demo: React.FC<{ name: string; on: boolean }> = ({ name, on }) => (
  <div style={{ position: 'relative', height: 32, borderRadius: 'var(--border-radius-pill)', background: 'rgba(var(--color-text-rgb), 0.06)' }}>
    <div
      style={{
        position: 'absolute',
        top: 4,
        left: 4,
        width: 24,
        height: 24,
        borderRadius: 'var(--border-radius-circle)',
        background: 'var(--color-primary)',
        transition: `var(${name})`,
        transform: on ? 'translateX(min(320px, 50vw))' : 'translateX(0)',
        opacity: on && name === '--transition-fade' ? 0.25 : 1,
      }}
    />
  </div>
);

const MotionPage: React.FC = () => {
  const [on, setOn] = useState(false);
  return (
    <Page
      title="Motion"
      lead="Motion confirms an action or draws the eye to something live; it is never the only way information is conveyed. Every animated component reads one context flag, so animation can be switched off globally and is off automatically when the visitor prefers reduced motion."
    >
      <Group title="Transitions" note="Press the button to run each transition. The dot moves, or fades for the fade token.">
        <button
          type="button"
          onClick={() => setOn((value) => !value)}
          style={{
            marginBottom: 'var(--spacing-4)',
            padding: 'var(--button-padding-y) var(--button-padding-x)',
            borderRadius: 'var(--border-radius-pill)',
            border: '1px solid var(--color-primary)',
            background: 'transparent',
            color: 'var(--color-primary)',
            fontFamily: 'var(--font-family-jetbrains)',
            fontSize: 'var(--font-size-sm)',
            cursor: 'pointer',
          }}
        >
          {on ? 'Reset' : 'Play'}
        </button>
        {TRANSITIONS.map((name) => (
          <Row key={name} name={name}>
            <Demo name={name} on={on} />
          </Row>
        ))}
      </Group>
    </Page>
  );
};

export const Transitions: StoryObj = {
  render: () => <MotionPage />,
};
