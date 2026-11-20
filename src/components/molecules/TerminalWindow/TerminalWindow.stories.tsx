import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import TerminalWindow from './TerminalWindow';
import type { TerminalWindowLine } from './TerminalWindow';

const openingLines: TerminalWindowLine[] = [
  { id: '1', kind: 'input', text: 'whoami' },
  { id: '2', kind: 'output', text: 'Principal Security Engineer, Canton, GA' },
  { id: '3', kind: 'input', text: 'cat story.txt' },
  { id: '4', kind: 'output', text: 'I build security programs the way I used to build software.' },
  { id: '5', kind: 'muted', text: 'Type help to look around.' },
];

const meta = {
  title: 'Molecules/TerminalWindow',
  component: TerminalWindow,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A terminal window that types its opening lines (any key or click skips), then leaves a prompt. It only reports commands through onCommand; the parent decides what they do. Reduced motion shows the final state immediately.',
      },
    },
  },
  argTypes: {
    animated: { control: 'boolean', description: 'Type the opening lines; reduced motion always turns this off' },
  },
  args: {
    lines: openingLines,
    animated: false,
    suggestions: ['help', 'ls'],
    onCommand: fn(),
    onBootComplete: fn(),
  },
  decorators: [
    (Story) => (
      <div style={{ width: 'min(46rem, 92vw)' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TerminalWindow>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Final state, as shown with reduced motion. */
export const Default: Story = {};

/** With a heading above the log. */
export const WithHeader: Story = {
  args: { header: <h2 style={{ margin: 0, color: 'var(--color-primary)' }}>Hi There, I'm Derek</h2> },
};

/** Opening lines typing out; any key or click finishes them. */
export const Booting: Story = {
  args: { animated: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvasElement);
    await expect(await canvas.findByLabelText(/Terminal command/)).toBeInTheDocument();
    await expect(canvas.getByText('Type help to look around.')).toBeInTheDocument();
  },
};

/** The parent appends output lines when a command arrives. */
export const TypeACommand: Story = {
  render: (args) => {
    const [lines, setLines] = useState<TerminalWindowLine[]>(args.lines);
    return (
      <TerminalWindow
        {...args}
        lines={lines}
        onCommand={(cmd) => {
          args.onCommand?.(cmd);
          setLines((l) => [
            ...l,
            { id: `i${l.length}`, kind: 'input', text: cmd },
            { id: `o${l.length}`, kind: 'output', text: `you ran: ${cmd}` },
          ]);
        }}
      />
    );
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText(/Terminal command/);
    await userEvent.type(input, 'ls -a{Enter}');
    await expect(args.onCommand).toHaveBeenCalledWith('ls -a');
    await expect(await canvas.findByText('you ran: ls -a')).toBeInTheDocument();
    await expect(input).toHaveValue('');
    await userEvent.type(input, '{ArrowUp}');
    await expect(input).toHaveValue('ls -a');
  },
};

/** The quick-command buttons run a command with one tap. */
export const QuickCommand: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'help' }));
    await expect(args.onCommand).toHaveBeenCalledWith('help');
  },
};
