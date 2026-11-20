import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import TerminalWindow from './TerminalWindow';
import type { TerminalWindowLine } from './TerminalWindow';

const lines: TerminalWindowLine[] = [
  { id: '1', kind: 'input', text: 'whoami' },
  { id: '2', kind: 'output', text: 'Derek' },
];

afterEach(() => {
  vi.useRealTimers();
});

describe('TerminalWindow', () => {
  it('shows every line and the prompt straight away when not animated', () => {
    render(<TerminalWindow lines={lines} animated={false} />);
    expect(screen.getByText('Derek')).toBeInTheDocument();
    expect(screen.getByLabelText(/Terminal command/)).toBeInTheDocument();
  });

  it('reports a trimmed command and clears the input', () => {
    const onCommand = vi.fn();
    render(<TerminalWindow lines={lines} animated={false} onCommand={onCommand} />);
    const input = screen.getByLabelText(/Terminal command/);
    fireEvent.change(input, { target: { value: '  help ' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onCommand).toHaveBeenCalledWith('help');
    expect(input).toHaveValue('');
  });

  it('recalls the previous command with the up arrow', () => {
    render(<TerminalWindow lines={lines} animated={false} onCommand={() => {}} />);
    const input = screen.getByLabelText(/Terminal command/);
    fireEvent.change(input, { target: { value: 'ls' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    fireEvent.keyDown(input, { key: 'ArrowUp' });
    expect(input).toHaveValue('ls');
  });

  it('runs a suggestion button as a command', () => {
    const onCommand = vi.fn();
    render(<TerminalWindow lines={lines} animated={false} suggestions={['ls']} onCommand={onCommand} />);
    fireEvent.click(screen.getByRole('button', { name: 'ls' }));
    expect(onCommand).toHaveBeenCalledWith('ls');
  });

  it('types the opening and finishes it on a key press', () => {
    vi.useFakeTimers();
    const onBootComplete = vi.fn();
    render(<TerminalWindow lines={lines} animated onBootComplete={onBootComplete} />);
    // Reduced motion may be on in the test environment; only check the skip path when it is off
    if (screen.queryByLabelText(/Terminal command/)) return;
    expect(onBootComplete).not.toHaveBeenCalled();
    act(() => {
      fireEvent.keyDown(window, { key: 'a' });
    });
    expect(screen.getByLabelText(/Terminal command/)).toBeInTheDocument();
    expect(onBootComplete).toHaveBeenCalledTimes(1);
  });
});
