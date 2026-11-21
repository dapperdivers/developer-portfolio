import { describe, it, expect } from 'vitest';
import { runCommand } from './commands';
import type { ClusterStatusData } from '@/types/cluster';

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

  it('lists the cluster section first and can open it', () => {
    expect(text('ls').startsWith('cluster/')).toBe(true);
    expect(runCommand('cd cluster', ctx).effect).toEqual({ type: 'scroll', section: 'cluster' });
  });

  it('lists the new cluster commands in help', () => {
    const help = text('help');
    expect(help).toContain('neofetch');
    expect(help).toContain('kubectl get nodes');
    expect(help).toContain('status');
  });

  describe('with cluster data', () => {
    const badge = (value: string) => ({ title: '', value, color: 'green' });
    const cluster: ClusterStatusData = {
      updatedAt: '2026-11-20T19:12:00.000Z',
      badges: {
        cluster_status: badge('up'),
        cluster_node_count: badge('11'),
        cluster_pod_count: badge('266'),
        services_up: badge('69 up'),
        cluster_uptime_days: badge('8d'),
        cluster_age_days: badge('646d'),
        cluster_cpu_usage: badge('12.3%'),
        cluster_memory_usage: badge('13.8%'),
        cluster_power_usage: badge('1,074w'),
        cluster_alert_count: badge('0'),
        talos_version: badge('1.14.5'),
        kubernetes_version: badge('1.37.2'),
        flux_version: badge('2.10.1'),
      },
    };
    const live = (raw: string) => runCommand(raw, { ...ctx, cluster }).output.map((o) => o.text).join('\n');

    it('uptime prints the cluster uptime and CPU load', () => {
      expect(live('uptime')).toContain('up 8 days, 11 nodes, 266 pods');
      expect(live('uptime')).toContain('load average: 12.3% cpu, 13.8% memory');
    });

    it('kubectl get nodes prints a small table without node names', () => {
      const lines = live('kubectl get nodes').split('\n');
      expect(lines[0]).toMatch(/^NODES\s+STATUS/);
      expect(lines[1]).toMatch(/^11\s+up\s+1\.14\.5\s+1\.37\.2$/);
    });

    it('rejects other kubectl commands', () => {
      expect(runCommand('kubectl get pods', { ...ctx, cluster }).output[0].kind).toBe('error');
    });

    it('status summarises the badges', () => {
      const status = live('status');
      expect(status).toMatch(/pods\s+266/);
      expect(status).toMatch(/power\s+1,074 W/);
      expect(status).toContain('running for 646 days');
    });

    it('neofetch shows the turtle beside the facts', () => {
      const fetch = live('neofetch');
      expect(fetch).toContain('OS: Talos 1.14.5');
      expect(fetch).toContain('Kubernetes: 1.37.2');
      expect(fetch).toContain('Flux: 2.10.1');
      expect(fetch).toContain('Power: 1,074 W');
      expect(fetch).toContain('>o');
    });
  });

  describe('without cluster data', () => {
    it.each(['status', 'neofetch', 'kubectl get nodes'])('%s says telemetry is offline', (cmd) => {
      const result = runCommand(cmd, { ...ctx, cluster: null });
      expect(result.output[0].kind).toBe('error');
      expect(result.output[0].text).toMatch(/telemetry offline/);
    });

    it('uptime falls back to the page time and says so', () => {
      expect(text('uptime')).toContain('up 2 min');
      expect(text('uptime')).toMatch(/telemetry offline/);
    });
  });

  it('answers unknown commands in a friendly way', () => {
    expect(text('frobnicate')).toMatch(/command not found.*help/i);
  });

  it('is case-insensitive about the command', () => {
    expect(text('WHOAMI')).toContain('Derek Mackley');
  });
});
