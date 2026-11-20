import { useEffect, useState } from 'react';

import type { ClusterStatusData, ClusterStatusResult } from '@/types/cluster';

export type { ClusterBadge, ClusterStatusData } from '@/types/cluster';
export type UseClusterStatusResult = ClusterStatusResult;

export const CLUSTER_STATUS_URL = '/api/cluster-status';
export const CLUSTER_STATUS_INTERVAL_MS = 60_000;

const isStatusData = (value: unknown): value is ClusterStatusData => {
  if (typeof value !== 'object' || value === null) return false;
  const candidate = value as Partial<ClusterStatusData>;
  return typeof candidate.updatedAt === 'string' && typeof candidate.badges === 'object' && candidate.badges !== null;
};

/**
 * Live cluster numbers from the site's own server. Fetches on mount and then
 * every 60 s while the tab is visible. A failed refresh keeps the last good
 * data and reports `error` only when there is none.
 */
export default function useClusterStatus(): UseClusterStatusResult {
  const [result, setResult] = useState<UseClusterStatusResult>({ status: 'loading', data: null });

  useEffect(() => {
    let cancelled = false;
    let controller: AbortController | null = null;

    const load = async () => {
      controller?.abort();
      controller = new AbortController();
      try {
        const response = await fetch(CLUSTER_STATUS_URL, {
          signal: controller.signal,
          headers: { Accept: 'application/json' },
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const body: unknown = await response.json();
        if (!isStatusData(body)) throw new Error('Unexpected response');
        if (!cancelled) setResult({ status: 'ok', data: body });
      } catch {
        if (cancelled) return;
        setResult((previous) => (previous.data ? previous : { status: 'error', data: null }));
      }
    };

    void load();
    const timer = setInterval(() => {
      if (document.visibilityState === 'visible') void load();
    }, CLUSTER_STATUS_INTERVAL_MS);

    return () => {
      cancelled = true;
      controller?.abort();
      clearInterval(timer);
    };
  }, []);

  return result;
}
