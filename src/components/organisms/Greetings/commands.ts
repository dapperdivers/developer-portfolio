import type { TerminalLineKind } from '@molecules/TerminalWindow';
import type { ClusterStatusData } from '@/types/cluster';
import { ageSentence, badgeText, gitopsSummary, splitBadgeValue } from '@utils/clusterTelemetry';
import { siteLinks } from '@/portfolio';

/** Page sections the terminal can open, in page order. */
export const SECTIONS = ['cluster', 'skills', 'experience', 'projects', 'education', 'contact'] as const;
export type SectionName = (typeof SECTIONS)[number];

export interface CommandContext {
  name: string;
  jobTitle: string;
  location: string;
  /** Seconds since the page loaded */
  uptimeSeconds: number;
  /** Latest cluster reading, or null/absent when telemetry is not available */
  cluster?: ClusterStatusData | null;
}

export interface CommandOutput {
  kind: TerminalLineKind;
  text: string;
}

export type CommandEffect =
  | { type: 'clear' }
  | { type: 'scroll'; section: SectionName | 'top' }
  | { type: 'download' }
  | { type: 'navigate'; href: string; external: boolean };

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
  ['docs', 'open the technical docs'],
  ['storybook', 'browse the component library'],
  ['blog', 'read the blog'],
  ['source', 'the code for this site'],
  ['uptime', 'how long the cluster has been up'],
  ['status', 'live cluster summary'],
  ['kubectl get nodes', 'the cluster nodes'],
  ['flux get all', 'what GitOps runs, and whether it is healthy'],
  ['neofetch', 'the cluster at a glance'],
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

/** Commands (and `cd` targets) that leave the page, keyed to a site link id. */
const SITE_COMMANDS: Record<string, string> = {
  docs: 'docs',
  doc: 'docs',
  storybook: 'storybook',
  components: 'storybook',
  blog: 'blog',
  source: 'source',
  src: 'source',
};

const siteLinkFor = (word: string | undefined) => {
  const id = SITE_COMMANDS[(word ?? '').toLowerCase().replace(/^(~\/|\.\/|\/)/, '').replace(/\/$/, '')];
  return id ? siteLinks.find((link) => link.id === id) ?? null : null;
};

const navigateTo = (link: (typeof siteLinks)[number]): CommandResult => ({
  output: [out(`Opening ${link.label.toLowerCase()}${link.external ? ' in a new tab' : ''}`, 'success')],
  effect: { type: 'navigate', href: link.href, external: Boolean(link.external) },
});

const formatUptime = (seconds: number): string => {
  if (seconds < 60) return `${seconds} sec`;
  return `${Math.floor(seconds / 60)} min`;
};

const OFFLINE = 'telemetry offline: the cluster is not reporting right now';

const TURTLE = [
  '     ______',
  '   /  _  _ \\_',
  '  | _| || |_ _>o',
  '   \\_\\_||_/_/',
  '    /_/  \\_\\',
];

const withUnit = (raw: string | null): string | null => {
  if (!raw) return null;
  const { number, unit } = splitBadgeValue(raw);
  if (unit === '%') return `${number}%`;
  return unit ? `${number} ${unit}` : number;
};

const uptimeOutput = (ctx: CommandContext): CommandOutput[] => {
  const data = ctx.cluster ?? null;
  const days = badgeText(data, 'cluster_uptime_days');
  if (!data || !days) {
    return [out(`up ${formatUptime(ctx.uptimeSeconds)} on this page, 1 visitor`), out(OFFLINE, 'muted')];
  }
  const { number, unit } = splitBadgeValue(days);
  const one = number === '1';
  const word = unit === 'hours' ? (one ? 'hour' : 'hours') : unit === 'min' ? 'min' : one ? 'day' : 'days';
  const parts = [
    `up ${number} ${word}`,
    withUnit(badgeText(data, 'cluster_node_count')) && `${withUnit(badgeText(data, 'cluster_node_count'))} nodes`,
    withUnit(badgeText(data, 'cluster_pod_count')) && `${withUnit(badgeText(data, 'cluster_pod_count'))} pods`,
  ].filter(Boolean);
  const cpu = withUnit(badgeText(data, 'cluster_cpu_usage'));
  const mem = withUnit(badgeText(data, 'cluster_memory_usage'));
  const load = [cpu && `${cpu} cpu`, mem && `${mem} memory`].filter(Boolean).join(', ');
  return [
    out(parts.join(', ')),
    ...(load ? [out(`load average: ${load}`)] : []),
    out(`you have been here ${formatUptime(ctx.uptimeSeconds)}`, 'muted'),
  ];
};

const nodesOutput = (data: ClusterStatusData | null): CommandOutput[] => {
  const nodes = withUnit(badgeText(data, 'cluster_node_count'));
  if (!data || !nodes) return [out(OFFLINE, 'error')];
  const status = badgeText(data, 'cluster_status') ?? 'unknown';
  const k8s = badgeText(data, 'kubernetes_version');
  const talos = badgeText(data, 'talos_version');
  const header = ['NODES'.padEnd(7), 'STATUS'.padEnd(10), talos ? 'TALOS'.padEnd(8) : '', k8s ? 'KUBERNETES' : ''];
  const row = [nodes.padEnd(7), status.padEnd(10), talos ? talos.padEnd(8) : '', k8s ?? ''];
  return [out(header.join('').trimEnd()), out(row.join('').trimEnd())];
};

const fluxOutput = (data: ClusterStatusData | null): CommandOutput[] => {
  const { items, note } = gitopsSummary(data);
  if (!data || (items.length === 0 && !note)) return [out(OFFLINE, 'error')];
  const version = badgeText(data, 'flux_version');
  const rows = items.map(({ label, value }) => out(`${label.padEnd(16)}${value}`));
  const failing = note?.includes('failing');
  return [
    ...(version ? [out(`flux ${version}`, 'muted')] : []),
    ...(rows.length > 0 ? [out(`${'KIND'.padEnd(16)}COUNT`), ...rows] : []),
    ...(note ? [out(note, failing ? 'error' : note === 'all reconciled' ? 'success' : 'output')] : []),
  ];
};

const statusOutput = (data: ClusterStatusData | null): CommandOutput[] => {
  if (!data) return [out(OFFLINE, 'error')];
  const rows: Array<[string, string | null]> = [
    ['cluster', badgeText(data, 'cluster_status')],
    ['nodes', withUnit(badgeText(data, 'cluster_node_count'))],
    ['pods', withUnit(badgeText(data, 'cluster_pod_count'))],
    ['services', badgeText(data, 'services_up')],
    ['uptime', badgeText(data, 'cluster_uptime_days')],
    ['age', badgeText(data, 'cluster_age_days')],
    ['cpu', withUnit(badgeText(data, 'cluster_cpu_usage'))],
    ['memory', withUnit(badgeText(data, 'cluster_memory_usage'))],
    ['power', withUnit(badgeText(data, 'cluster_power_usage'))],
    ['alerts', badgeText(data, 'cluster_alert_count')],
    ['gitops', gitopsSummary(data).note],
  ];
  const lines = rows.flatMap(([k, v]) => (v ? [out(`${k.padEnd(10)}${v}`)] : []));
  if (lines.length === 0) return [out(OFFLINE, 'error')];
  const age = ageSentence(data);
  return [...lines, ...(age ? [out(age, 'muted')] : [])];
};

const neofetchOutput = (data: ClusterStatusData | null): CommandOutput[] => {
  const talos = badgeText(data, 'talos_version');
  const k8s = badgeText(data, 'kubernetes_version');
  const flux = badgeText(data, 'flux_version');
  const power = withUnit(badgeText(data, 'cluster_power_usage'));
  const gitops = gitopsSummary(data).note;
  const facts = [
    talos && `OS: Talos ${talos}`,
    k8s && `Kubernetes: ${k8s}`,
    flux && `Flux: ${flux}`,
    gitops && `GitOps: ${gitops}`,
    withUnit(badgeText(data, 'cluster_node_count')) && `Nodes: ${withUnit(badgeText(data, 'cluster_node_count'))}`,
    withUnit(badgeText(data, 'cluster_pod_count')) && `Pods: ${withUnit(badgeText(data, 'cluster_pod_count'))}`,
    power && `Power: ${power}`,
  ].filter((f): f is string => Boolean(f));
  if (!data || facts.length === 0) return [out(OFFLINE, 'error')];
  const width = Math.max(...TURTLE.map((l) => l.length)) + 2;
  const rows = Math.max(TURTLE.length, facts.length);
  return Array.from({ length: rows }, (_, i) =>
    out(`${(TURTLE[i] ?? '').padEnd(width)}${facts[i] ?? ''}`.trimEnd(), 'success'),
  );
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
          ...COMMAND_LIST.map(([c, d]) => out(`${c.padEnd(18)}${d}`)),
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
      const entries = [...SECTIONS.map((s) => `${s}/`), 'resume.pdf', 'docs/', 'storybook/', 'blog/'];
      return { output: [out((all ? ['.secrets', ...entries] : entries).join('  '))] };
    }

    case 'cd':
    case 'open': {
      if (!arg) {
        return { output: [out(`${cmd}: which section? Try ls`, 'error')] };
      }
      const section = asSection(arg);
      const site = section ? null : siteLinkFor(arg);
      if (site) return navigateTo(site);
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

    case 'docs':
    case 'doc':
    case 'storybook':
    case 'components':
    case 'blog':
    case 'source':
    case 'src': {
      const site = siteLinkFor(cmd);
      return site ? navigateTo(site) : { output: [out(`${cmd}: not available`, 'error')] };
    }

    case 'clear':
    case 'cls':
      return { output: [], effect: { type: 'clear' } };

    case 'uptime':
      return { output: uptimeOutput(ctx) };

    case 'status':
      return { output: statusOutput(ctx.cluster ?? null) };

    case 'neofetch':
      return { output: neofetchOutput(ctx.cluster ?? null) };

    case 'flux': {
      if (arg === 'get' || arg === undefined) return { output: fluxOutput(ctx.cluster ?? null) };
      if (arg === 'version' || arg === '--version' || arg === '-v') {
        const v = badgeText(ctx.cluster ?? null, 'flux_version');
        return { output: [v ? out(`flux: v${v}`) : out(OFFLINE, 'error')] };
      }
      return { output: [out('flux: this demo only knows: flux get all, flux version', 'error')] };
    }

    case 'kubectl': {
      if (arg === 'get' && /^(nodes?|no)$/.test(args[1] ?? '')) {
        return { output: nodesOutput(ctx.cluster ?? null) };
      }
      return { output: [out('kubectl: this demo only knows: kubectl get nodes', 'error')] };
    }

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
