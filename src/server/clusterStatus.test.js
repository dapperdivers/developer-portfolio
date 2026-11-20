import { describe, it, expect, vi } from 'vitest';
import {
  CLUSTER_BADGE_IDS,
  createClusterStatusHandler,
  shapeBadge,
} from '../../config/vite/prod/clusterStatus.js';

// Minimal Express response double
const makeRes = () => {
  const res = { statusCode: 200, headers: {}, body: undefined };
  res.status = (code) => {
    res.statusCode = code;
    return res;
  };
  res.set = (name, value) => {
    res.headers[name] = value;
    return res;
  };
  res.json = (body) => {
    res.body = body;
    return res;
  };
  return res;
};

const idOf = (url) => url.split('/badges/')[1].split('?')[0];

const badgeResponse = (id, extra = {}) => ({
  ok: true,
  json: async () => ({ id, title: `T ${id}`, value: `v-${id}`, color: 'green', result: 1, ...extra }),
});

describe('shapeBadge', () => {
  it('keeps only title, value and color', () => {
    expect(shapeBadge({ id: 'x', title: 'Pods', value: '266', color: 'green', result: 266, secret: 'no' })).toEqual({
      title: 'Pods',
      value: '266',
      color: 'green',
    });
  });

  it('rejects badges without a string value', () => {
    expect(shapeBadge(null)).toBeNull();
    expect(shapeBadge({ title: 'x' })).toBeNull();
    expect(shapeBadge({ value: 5 })).toBeNull();
    expect(shapeBadge({ value: '' })).toBeNull();
  });
});

describe('createClusterStatusHandler', () => {
  const setup = (fetchImpl, now = () => 1_000) =>
    createClusterStatusHandler({ fetchImpl, baseUrl: 'https://kromgo.test/', now });

  it('fetches every allow-listed badge and returns the shaped result', async () => {
    const fetchImpl = vi.fn(async (url) => badgeResponse(idOf(url)));
    const res = makeRes();
    await setup(fetchImpl)({}, res);

    expect(fetchImpl).toHaveBeenCalledTimes(CLUSTER_BADGE_IDS.length);
    expect(fetchImpl.mock.calls[0][0]).toBe('https://kromgo.test/badges/cluster_status?format=json');
    expect(res.statusCode).toBe(200);
    expect(res.headers['Cache-Control']).toBe('public, max-age=60');
    expect(Object.keys(res.body).sort()).toEqual(['badges', 'updatedAt']);
    expect(Object.keys(res.body.badges)).toEqual(CLUSTER_BADGE_IDS);
    expect(res.body.badges.cluster_pod_count).toEqual({
      title: 'T cluster_pod_count',
      value: 'v-cluster_pod_count',
      color: 'green',
    });
  });

  it('returns what it got on partial failure', async () => {
    const fetchImpl = vi.fn(async (url) => {
      if (url.includes('cluster_pod_count')) return badgeResponse('cluster_pod_count');
      if (url.includes('cluster_status')) throw new Error('timeout');
      return { ok: false, json: async () => ({}) };
    });
    const res = makeRes();
    await setup(fetchImpl)({}, res);
    expect(res.statusCode).toBe(200);
    expect(Object.keys(res.body.badges)).toEqual(['cluster_pod_count']);
  });

  it('returns 503 when every call fails', async () => {
    const res = makeRes();
    await setup(
      vi.fn(async () => {
        throw new Error('down');
      })
    )({}, res);
    expect(res.statusCode).toBe(503);
    expect(res.body).toEqual({ error: 'Cluster status unavailable' });
  });

  it('serves from cache for 60 s, then refetches', async () => {
    let time = 1_000;
    const fetchImpl = vi.fn(async (url) => badgeResponse(idOf(url)));
    const handler = setup(fetchImpl, () => time);

    await handler({}, makeRes());
    time += 59_000;
    await handler({}, makeRes());
    expect(fetchImpl).toHaveBeenCalledTimes(CLUSTER_BADGE_IDS.length);

    time += 2_000;
    await handler({}, makeRes());
    expect(fetchImpl).toHaveBeenCalledTimes(CLUSTER_BADGE_IDS.length * 2);
  });

  it('shares one upstream fetch between concurrent requests', async () => {
    const fetchImpl = vi.fn(async (url) => badgeResponse(idOf(url)));
    const handler = setup(fetchImpl);
    await Promise.all([handler({}, makeRes()), handler({}, makeRes())]);
    expect(fetchImpl).toHaveBeenCalledTimes(CLUSTER_BADGE_IDS.length);
  });

  it('does not cache a total failure', async () => {
    const fetchImpl = vi.fn(async () => {
      throw new Error('down');
    });
    const handler = setup(fetchImpl);
    await handler({}, makeRes());
    await handler({}, makeRes());
    expect(fetchImpl).toHaveBeenCalledTimes(CLUSTER_BADGE_IDS.length * 2);
  });
});
