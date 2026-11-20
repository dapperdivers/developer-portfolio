import type { Plugin } from 'vite';
// @ts-expect-error plain JS module shared with the production server
import { createClusterStatusHandler } from '../prod/clusterStatus.js';

/**
 * Serves GET /api/cluster-status from the Vite dev server with the same
 * handler the production Express server uses.
 */
export default function clusterStatusDevPlugin(): Plugin {
  const handler = createClusterStatusHandler();
  return {
    name: 'cluster-status-dev',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/api/cluster-status', (req, res) => {
        const adapter = {
          status(code: number) {
            res.statusCode = code;
            return adapter;
          },
          set(name: string, value: string) {
            res.setHeader(name, value);
            return adapter;
          },
          json(body: unknown) {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(body));
            return adapter;
          },
        };
        handler(req, adapter).catch(() => {
          res.statusCode = 503;
          res.end('{"error":"Cluster status unavailable"}');
        });
      });
    },
  };
}
