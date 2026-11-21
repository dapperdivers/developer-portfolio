import type { ClusterStatusData } from '@/types/cluster';

/** How a reading is coloured. Never red: age and counts are not failures. */
export type TelemetryTone = 'default' | 'success' | 'warning';

export interface SplitValue {
  /** The figure, as the cluster wrote it (commas and decimals kept) */
  number: string;
  /** Display unit: "W", "%", "days", or empty */
  unit: string;
}

export interface TelemetryTile {
  id: string;
  label: string;
  number: string;
  unit: string;
  tone: TelemetryTone;
}

export interface VersionItem {
  label: string;
  value: string;
}

const UNIT_NAMES: Record<string, string> = { w: 'W', d: 'days', up: '', '%': '%' };

/** Splits a badge value: "1,074w" -> 1,074 + W, "13.8%" -> 13.8 + %, "69 up" -> 69. */
export const splitBadgeValue = (raw: string): SplitValue => {
  const match = raw.trim().match(/^(\d[\d,]*(?:\.\d+)?)\s*(.*)$/);
  if (!match) return { number: raw.trim(), unit: '' };
  const unit = match[2].trim();
  return { number: match[1], unit: UNIT_NAMES[unit.toLowerCase()] ?? unit };
};

/** Numeric value of a figure like "1,074", or null. */
export const parseNumber = (figure: string): number | null => {
  const n = Number(figure.replace(/,/g, ''));
  return Number.isFinite(n) ? n : null;
};

const TILES: ReadonlyArray<{ id: string; label: string }> = [
  { id: 'cluster_node_count', label: 'Nodes' },
  { id: 'cluster_pod_count', label: 'Pods' },
  { id: 'services_up', label: 'Services up' },
  { id: 'cluster_uptime_days', label: 'Uptime' },
  { id: 'cluster_power_usage', label: 'Power draw' },
  { id: 'cluster_cpu_usage', label: 'CPU' },
  { id: 'cluster_memory_usage', label: 'Memory' },
  { id: 'cluster_alert_count', label: 'Alerts' },
];

/** Zero alerts is good news; any alert is a warning, not a failure. */
const toneFor = (id: string, number: string): TelemetryTone => {
  if (id !== 'cluster_alert_count') return 'default';
  const n = parseNumber(number);
  if (n === null) return 'default';
  return n === 0 ? 'success' : 'warning';
};

/** The stat tiles the cluster reported, in display order. Missing badges are skipped. */
export const telemetryTiles = (data: ClusterStatusData | null): TelemetryTile[] =>
  TILES.flatMap(({ id, label }) => {
    const badge = data?.badges[id];
    if (!badge) return [];
    const { number, unit } = splitBadgeValue(badge.value);
    return [{ id, label, number, unit, tone: toneFor(id, number) }];
  });

/** Talos, Kubernetes and Flux versions that were reported. */
export const versionItems = (data: ClusterStatusData | null): VersionItem[] =>
  (
    [
      ['Talos', 'talos_version'],
      ['Kubernetes', 'kubernetes_version'],
      ['Flux', 'flux_version'],
    ] as const
  ).flatMap(([label, id]) => {
    const value = data?.badges[id]?.value.trim();
    return value ? [{ label, value }] : [];
  });

/** "running for 646 days", or null when the age was not reported. */
export const ageSentence = (data: ClusterStatusData | null): string | null => {
  const raw = data?.badges.cluster_age_days?.value;
  if (!raw) return null;
  const n = parseNumber(splitBadgeValue(raw).number);
  if (n === null) return null;
  return `running for ${n.toLocaleString('en-US')} ${n === 1 ? 'day' : 'days'}`;
};

/** Local time of the last reading, e.g. "7:12 PM", or null if the stamp is invalid. */
export const formatUpdated = (iso: string): string | null => {
  const date = new Date(iso);
  return Number.isNaN(date.getTime())
    ? null
    : date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
};

/** Raw badge text, or null. */
export const badgeText = (data: ClusterStatusData | null, id: string): string | null =>
  data?.badges[id]?.value.trim() || null;
