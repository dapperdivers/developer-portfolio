// Live cluster numbers for the site, read from Kromgo badges.
// Kromgo sends no CORS headers, so the server fetches the badges and the
// browser only ever talks to /api/cluster-status.

/* global AbortSignal */

export const CLUSTER_BADGE_IDS = [
  'cluster_status',
  'cluster_node_count',
  'cluster_pod_count',
  'services_up',
  'cluster_uptime_days',
  'cluster_age_days',
  'cluster_cpu_usage',
  'cluster_memory_usage',
  'cluster_power_usage',
  'cluster_alert_count',
  'talos_version',
  'kubernetes_version',
  'flux_version',
];

const DEFAULT_KROMGO_URL = 'https://kromgo.chelonianlabs.com';
const CACHE_TTL_MS = 60_000;
const TIMEOUT_MS = 3_000;
const MAX_FIELD_LENGTH = 64;

// Keep only short non-empty strings; anything else is dropped.
const cleanString = (value) =>
  typeof value === 'string' && value.length > 0 ? value.slice(0, MAX_FIELD_LENGTH) : null;

// Shape one badge down to the three public fields, or null if unusable.
export function shapeBadge(raw) {
  if (!raw || typeof raw !== 'object') return null;
  const value = cleanString(raw.value);
  if (value === null) return null;
  return {
    title: cleanString(raw.title) ?? '',
    value,
    color: cleanString(raw.color) ?? '',
  };
}

async function fetchBadge(fetchImpl, baseUrl, id, timeoutMs) {
  try {
    const response = await fetchImpl(`${baseUrl}/badges/${id}?format=json`, {
      signal: AbortSignal.timeout(timeoutMs),
      headers: { Accept: 'application/json' },
    });
    if (!response.ok) return null;
    return shapeBadge(await response.json());
  } catch {
    return null;
  }
}

/**
 * Creates the GET /api/cluster-status handler.
 * Options are injectable for tests.
 */
export function createClusterStatusHandler({
  fetchImpl = (...args) => fetch(...args),
  baseUrl = process.env.KROMGO_URL || DEFAULT_KROMGO_URL,
  ttlMs = CACHE_TTL_MS,
  timeoutMs = TIMEOUT_MS,
  now = Date.now,
} = {}) {
  const base = baseUrl.replace(/\/+$/, '');
  let cache = null; // { at, body }
  let inflight = null;

  async function load() {
    const results = await Promise.all(
      CLUSTER_BADGE_IDS.map(async (id) => [id, await fetchBadge(fetchImpl, base, id, timeoutMs)])
    );
    const badges = {};
    for (const [id, badge] of results) {
      if (badge) badges[id] = badge;
    }
    if (Object.keys(badges).length === 0) return null;
    return { updatedAt: new Date(now()).toISOString(), badges };
  }

  return async function clusterStatusHandler(req, res) {
    let body = cache && now() - cache.at < ttlMs ? cache.body : null;
    if (!body) {
      inflight ??= load().finally(() => {
        inflight = null;
      });
      body = await inflight;
      if (body) cache = { at: now(), body };
    }
    if (!body) {
      res.status(503).set('Cache-Control', 'no-store').json({ error: 'Cluster status unavailable' });
      return;
    }
    res.set('Cache-Control', 'public, max-age=60').json(body);
  };
}
