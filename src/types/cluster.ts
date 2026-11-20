/** One Kromgo badge, trimmed to the fields the site uses. */
export interface ClusterBadge {
  title: string;
  value: string;
  color: string;
}

/** Shape returned by GET /api/cluster-status. */
export interface ClusterStatusData {
  /** ISO timestamp of when the server last read the cluster */
  updatedAt: string;
  badges: Record<string, ClusterBadge>;
}

export type ClusterStatusState = 'loading' | 'ok' | 'error';

/** What the hook returns and what the display components take. */
export interface ClusterStatusResult {
  status: ClusterStatusState;
  data: ClusterStatusData | null;
}
