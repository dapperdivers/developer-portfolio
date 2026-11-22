// Reading stats for the blog, counted on the server so the blog ships no
// tracking script and sets no cookies. Each page view is one JSON line on
// stdout; the cluster's log shipper parses it into fields and Grafana counts
// them. Nothing identifying is logged: no IP address, no user agent string,
// and referrers are reduced to their host.

const SLUG = /^[a-z0-9][a-z0-9-]{0,79}$/;

// Crawlers, link previews, feed readers, monitors and scripts. Deliberately
// broad: a reader misfiled as a bot costs less than bots counted as readers.
const BOT_UA =
  /bot|crawl|spider|slurp|archiver|preview|facebookexternalhit|embedly|feed|rss|reader|fetch|curl|wget|python|go-http|java\/|okhttp|axios|node-fetch|undici|headless|lighthouse|pagespeed|monitor|uptime|gatus|blackbox|probe|scan/i;

/**
 * What kind of blog page a request path (relative to /blog) is, or null for
 * assets and anything else that isn't a page.
 */
export function classifyPage(relPath) {
  const p = relPath.replace(/\/+$/, '') || '/';
  if (p === '/') return { kind: 'index', page: 'index' };
  if (p === '/rss.xml') return { kind: 'feed', page: 'rss' };
  const parts = p.slice(1).split('/');
  if (parts.length === 2 && parts[0] === 'topics' && SLUG.test(parts[1])) {
    return { kind: 'topic', page: `topics/${parts[1]}` };
  }
  if (parts.length === 1 && SLUG.test(parts[0]) && parts[0] !== '404') {
    return { kind: 'post', page: parts[0] };
  }
  return null;
}

/** "direct", "internal" (one of our own hosts), or the referring host. */
export function referrerSource(referer, ownHosts) {
  if (!referer) return 'direct';
  let host;
  try {
    host = new URL(referer).hostname.toLowerCase().replace(/^www\./, '');
  } catch {
    return 'unknown';
  }
  if (!host) return 'unknown';
  return ownHosts.has(host) ? 'internal' : host.slice(0, 100);
}

export const isBot = (userAgent) => !userAgent || BOT_UA.test(userAgent);

/**
 * Express middleware for the /blog mount. Logs after the response is sent, and
 * only for successful GETs of pages (200, or 304 for a returning reader).
 */
export function blogViewLogger({ ownHosts = [], log = (line) => console.log(line) } = {}) {
  const hosts = new Set(ownHosts.map((h) => h.toLowerCase().replace(/^www\./, '')));
  return (req, res, next) => {
    if (req.method !== 'GET') return next();
    const page = classifyPage(req.path);
    if (!page) return next();
    res.on('finish', () => {
      if (res.statusCode !== 200 && res.statusCode !== 304) return;
      log(JSON.stringify({
        event: 'blog_view',
        kind: page.kind,
        page: page.page,
        ref: referrerSource(req.get('referer'), hosts),
        bot: isBot(req.get('user-agent')),
        repeat: res.statusCode === 304,
      }));
    });
    next();
  };
}
