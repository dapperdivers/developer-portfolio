import { describe, it, expect } from 'vitest';
import { ageSentence, gitopsSummary, splitBadgeValue, telemetryTiles, versionItems } from '../clusterTelemetry';
import type { ClusterStatusData } from '@/types/cluster';

const badge = (value: string, color = 'green') => ({ title: '', value, color });
const data = (alerts: string): ClusterStatusData => ({
  updatedAt: '2026-11-20T19:12:00.000Z',
  badges: {
    cluster_node_count: badge('11'),
    cluster_power_usage: badge('1,074w'),
    cluster_memory_usage: badge('13.8%'),
    services_up: badge('69 up'),
    cluster_uptime_days: badge('8d'),
    cluster_age_days: badge('646d', 'red'),
    cluster_alert_count: badge(alerts, 'red'),
    talos_version: badge('1.14.5', 'blue'),
  },
});

describe('splitBadgeValue', () => {
  it('splits figure and unit', () => {
    expect(splitBadgeValue('1,074w')).toEqual({ number: '1,074', unit: 'W' });
    expect(splitBadgeValue('13.8%')).toEqual({ number: '13.8', unit: '%' });
    expect(splitBadgeValue('69 up')).toEqual({ number: '69', unit: '' });
    expect(splitBadgeValue('8d')).toEqual({ number: '8', unit: 'days' });
    expect(splitBadgeValue('11')).toEqual({ number: '11', unit: '' });
  });
});

describe('telemetryTiles', () => {
  it('orders tiles and skips missing badges', () => {
    expect(telemetryTiles(data('0')).map((t) => t.label)).toEqual([
      'Nodes', 'Services up', 'Uptime', 'Power draw', 'Memory', 'Alerts',
    ]);
    expect(telemetryTiles(null)).toEqual([]);
  });

  it('colours alerts honestly: zero green, any amber with the real count', () => {
    const alerts = (n: string) => telemetryTiles(data(n)).find((t) => t.id === 'cluster_alert_count');
    expect(alerts('0')).toMatchObject({ number: '0', tone: 'success' });
    expect(alerts('3')).toMatchObject({ number: '3', tone: 'warning' });
  });

  it('never gives other tiles a warning or danger tone', () => {
    const others = telemetryTiles(data('0')).filter((t) => t.id !== 'cluster_alert_count');
    expect(others.every((t) => t.tone === 'default')).toBe(true);
  });
});

describe('versions and age', () => {
  it('lists only reported versions', () => {
    expect(versionItems(data('0'))).toEqual([{ label: 'Talos', value: '1.14.5' }]);
  });

  it('words the age without a verdict', () => {
    expect(ageSentence(data('0'))).toBe('running for 646 days');
    expect(ageSentence(null)).toBeNull();
  });
});

describe('gitopsSummary', () => {
  const b = (value: string) => ({ title: '', value, color: '' });
  const withBadges = (badges: Record<string, ReturnType<typeof b>>): ClusterStatusData => ({
    updatedAt: '2026-11-21T19:00:00.000Z',
    badges,
  });

  it('lists the object counts and says all reconciled when nothing waits or fails', () => {
    const s = gitopsSummary(withBadges({
      flux_kustomization_count: b('131'),
      flux_helmrelease_count: b('110'),
      flux_waiting_count: b('0'),
      flux_failing_count: b('0'),
    }));
    expect(s.items).toEqual([
      { label: 'Kustomizations', value: '131' },
      { label: 'HelmReleases', value: '110' },
    ]);
    expect(s.note).toBe('all reconciled');
  });

  it('prefers failing over waiting', () => {
    expect(gitopsSummary(withBadges({ flux_waiting_count: b('49'), flux_failing_count: b('2') })).note).toBe('2 failing to reconcile');
    expect(gitopsSummary(withBadges({ flux_waiting_count: b('1,049'), flux_failing_count: b('0') })).note).toBe('1,049 waiting on dependencies');
  });

  it('claims nothing when the health badges are missing', () => {
    expect(gitopsSummary(withBadges({ flux_kustomization_count: b('131') })).note).toBeNull();
    expect(gitopsSummary(withBadges({ flux_waiting_count: b('0') })).note).toBeNull();
    expect(gitopsSummary(null)).toEqual({ items: [], note: null });
  });
});

describe('splitBadgeValue short durations', () => {
  it('names minutes and hours', () => {
    expect(splitBadgeValue('52m')).toEqual({ number: '52', unit: 'min' });
    expect(splitBadgeValue('7h')).toEqual({ number: '7', unit: 'hours' });
  });
});
