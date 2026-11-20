import { describe, it, expect } from 'vitest';
import { runCommand } from './commands';

const ctx = { name: 'Derek Mackley', jobTitle: 'Principal Security Engineer', location: 'Canton, GA', uptimeSeconds: 125 };
const text = (raw: string) => runCommand(raw, ctx).output.map((o) => o.text).join('\n');

describe('runCommand', () => {
  it('lists commands for help and hints at ls -a', () => {
    expect(text('help')).toContain('cat resume');
    expect(text('help')).toContain('ls -a');
  });

  it('lists the sections, and .secrets only with -a', () => {
    expect(text('ls')).toContain('experience/');
    expect(text('ls')).not.toContain('.secrets');
    expect(text('ls -a')).toContain('.secrets');
    expect(text('ls -la')).toContain('.secrets');
  });

  it('points cat .secrets at the timeline', () => {
    expect(text('cat .secrets')).toMatch(/timeline card/i);
  });

  it('scrolls for cd and open, with tolerant section names', () => {
    expect(runCommand('cd skills', ctx).effect).toEqual({ type: 'scroll', section: 'skills' });
    expect(runCommand('open ~/Projects/', ctx).effect).toEqual({ type: 'scroll', section: 'projects' });
    expect(runCommand('cd ..', ctx).effect).toEqual({ type: 'scroll', section: 'top' });
    expect(runCommand('contact', ctx).effect).toEqual({ type: 'scroll', section: 'contact' });
  });

  it('rejects an unknown section without an effect', () => {
    const result = runCommand('cd nowhere', ctx);
    expect(result.effect).toBeUndefined();
    expect(result.output[0].kind).toBe('error');
  });

  it('downloads the resume with cat resume', () => {
    expect(runCommand('cat resume', ctx).effect).toEqual({ type: 'download' });
    expect(runCommand('cat resume.pdf', ctx).effect).toEqual({ type: 'download' });
  });

  it('clears the screen', () => {
    expect(runCommand('clear', ctx).effect).toEqual({ type: 'clear' });
  });

  it('hires Derek with sudo and refuses other sudo', () => {
    expect(runCommand('sudo hire derek', ctx).effect).toEqual({ type: 'scroll', section: 'contact' });
    expect(runCommand('sudo rm -rf', ctx).effect).toBeUndefined();
  });

  it('reports uptime from the page load time', () => {
    expect(text('uptime')).toContain('up 2 min');
  });

  it('answers unknown commands in a friendly way', () => {
    expect(text('frobnicate')).toMatch(/command not found.*help/i);
  });

  it('is case-insensitive about the command', () => {
    expect(text('WHOAMI')).toContain('Derek Mackley');
  });
});
