import type { ClusterStatusData } from '@/types/cluster';

export type ClusterHealth = 'up' | 'degraded' | 'unknown';

export interface ClusterReading {
  /** Stable key, also the Kromgo badge id */
  id: string;
  label: string;
  value: string;
}

/** Badges shown as rows, in order. Missing badges are skipped, never invented. */
const READINGS: ReadonlyArray<{ id: string; label: string }> = [
  { id: 'cluster_node_count', label: 'NODES' },
  { id: 'cluster_pod_count', label: 'PODS' },
  { id: 'services_up', label: 'SERVICES' },
  { id: 'cluster_uptime_days', label: 'UPTIME' },
  { id: 'cluster_cpu_usage', label: 'CPU' },
  { id: 'cluster_memory_usage', label: 'MEMORY' },
  { id: 'cluster_power_usage', label: 'POWER' },
  { id: 'cluster_alert_count', label: 'ALERTS' },
];

/** Overall health from the `cluster_status` badge. */
export const clusterHealth = (data: ClusterStatusData | null): ClusterHealth => {
  const value = data?.badges.cluster_status?.value.trim().toLowerCase();
  if (!value) return 'unknown';
  return value === 'up' ? 'up' : 'degraded';
};

/** The numbers the cluster actually reported. */
export const clusterReadings = (data: ClusterStatusData | null): ClusterReading[] =>
  READINGS.flatMap(({ id, label }) => {
    const badge = data?.badges[id];
    return badge ? [{ id, label, value: badge.value }] : [];
  });

/** Short wording for the overall state, or null when unknown. */
export const healthLabel = (health: ClusterHealth): string | null => {
  if (health === 'up') return 'all systems up';
  if (health === 'degraded') return 'degraded';
  return null;
};
