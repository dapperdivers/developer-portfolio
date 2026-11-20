import type { TerminalLineKind } from '@molecules/TerminalWindow';

/** Page sections the terminal can open, in page order. */
export const SECTIONS = ['skills', 'experience', 'projects', 'education', 'contact'] as const;
export type SectionName = (typeof SECTIONS)[number];

export interface CommandContext {
  name: string;
  jobTitle: string;
  location: string;
  /** Seconds since the page loaded */
  uptimeSeconds: number;
}

export interface CommandOutput {
  kind: TerminalLineKind;
  text: string;
}

export type CommandEffect =
  | { type: 'clear' }
  | { type: 'scroll'; section: SectionName | 'top' }
  | { type: 'download' };

export interface CommandResult {
  output: CommandOutput[];
  effect?: CommandEffect;
}

export const COMMAND_LIST: ReadonlyArray<readonly [string, string]> = [
  ['help', 'this list'],
  ['whoami', 'who is Derek'],
  ['ls', 'list the page sections (ls -a shows more)'],
  ['cd <section>', 'jump to a section (also: open <section>)'],
  ['cat resume', 'download the resume'],
  ['contact', 'jump to the contact section'],
  ['uptime', 'how long you have been here'],
  ['ping', 'check that Derek is reachable'],
  ['clear', 'clear the screen'],
];

const out = (text: string, kind: TerminalLineKind = 'output'): CommandOutput => ({ kind, text });

const asSection = (arg: string | undefined): SectionName | 'top' | null => {
  if (!arg) return null;
  const clean = arg.toLowerCase().replace(/^(~\/|\.\/|\/|#)/, '').replace(/\/$/, '');
  if (clean === '' || clean === '~' || clean === '..' || clean === 'top' || clean === 'home') return 'top';
  return (SECTIONS as readonly string[]).includes(clean) ? (clean as SectionName) : null;
};

const formatUptime = (seconds: number): string => {
  if (seconds < 60) return `${seconds} sec`;
  return `${Math.floor(seconds / 60)} min`;
};

/**
 * Works out what a typed command prints and does.
 * Pure: the organism applies the effect (scroll, download, clear).
 */
export const runCommand = (raw: string, ctx: CommandContext): CommandResult => {
  const parts = raw.trim().split(/\s+/);
  const cmd = (parts[0] ?? '').toLowerCase();
  const args = parts.slice(1);
  const arg = args[0];
  const rest = args.join(' ').toLowerCase();

  switch (cmd) {
    case 'help':
    case '?':
      return {
        output: [
          ...COMMAND_LIST.map(([c, d]) => out(`${c.padEnd(14)}${d}`)),
          out('psst: there is more than the list shows. Try ls -a', 'muted'),
        ],
      };

    case 'whoami':
      return {
        output: [
          out(ctx.name),
          out([ctx.jobTitle, ctx.location].filter(Boolean).join(', ')),
          out('Security programs, Kubernetes, and a garage full of agents.', 'muted'),
        ],
      };

    case 'ls': {
      const all = args.some((a) => /^-[a-z]*a[a-z]*$/.test(a));
      const entries = [...SECTIONS.map((s) => `${s}/`), 'resume.pdf'];
      return { output: [out((all ? ['.secrets', ...entries] : entries).join('  '))] };
    }

    case 'cd':
    case 'open': {
      if (!arg) {
        return { output: [out(`${cmd}: which section? Try ls`, 'error')] };
      }
      const section = asSection(arg);
      if (!section) {
        return { output: [out(`${cmd}: ${arg}: no such section. Try ls`, 'error')] };
      }
      return {
        output: [out(section === 'top' ? 'Back to the top' : `Opening ${section}`, 'success')],
        effect: { type: 'scroll', section },
      };
    }

    case 'cat': {
      const target = (arg ?? '').toLowerCase().replace(/\/$/, '');
      if (target === 'resume' || target === 'resume.pdf') {
        return { output: [out('Downloading resume.pdf', 'success')], effect: { type: 'download' } };
      }
      if (target === '.secrets') {
        return {
          output: [
            out('Something in the Experience timeline notices attention.'),
            out('Click a timeline card a few times and see what happens.'),
            out('Konami code people: you already know.', 'muted'),
          ],
        };
      }
      if (!target) return { output: [out('cat: which file? Try ls', 'error')] };
      if ((SECTIONS as readonly string[]).includes(target)) {
        return { output: [out(`cat: ${target}: Is a directory (try cd ${target})`, 'error')] };
      }
      return { output: [out(`cat: ${arg}: No such file`, 'error')] };
    }

    case 'contact':
      return {
        output: [out('Opening contact', 'success')],
        effect: { type: 'scroll', section: 'contact' },
      };

    case 'clear':
    case 'cls':
      return { output: [], effect: { type: 'clear' } };

    case 'uptime':
      return {
        output: [
          out(`up ${formatUptime(ctx.uptimeSeconds)}, 1 visitor, load average: mostly agents`),
        ],
      };

    case 'ping': {
      const host = arg ?? 'derek';
      return {
        output: [
          out(`PING ${host}`),
          out(`64 bytes from ${host}: icmp_seq=1 ttl=64 time=0.4 ms`),
          out('Derek replies faster by email: contact@chelonianlabs.com', 'muted'),
        ],
      };
    }

    case 'sudo':
      if (rest.startsWith('hire')) {
        return {
          output: [
            out('[sudo] password for guest: ********'),
            out('guest is in the sudoers file. This incident will be reported, favourably.', 'success'),
            out('Opening contact', 'success'),
          ],
          effect: { type: 'scroll', section: 'contact' },
        };
      }
      return { output: [out('guest is not in the sudoers file. This incident will be reported.', 'error')] };

    case 'rm':
      return { output: [out('Nice try. Policy as code says no.', 'error')] };

    case 'exit':
    case 'logout':
      return { output: [out('There is no escape. There is only scrolling.', 'muted')] };

    case 'turtle':
      return { output: [out("A turtle carries its home on its back. Derek's is a rack in the garage.")] };

    default:
      return { output: [out(`${cmd}: command not found. Try help`, 'error')] };
  }
};
