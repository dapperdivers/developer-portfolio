/**
 * The blog desk: a private page to review drafts and make them live.
 *
 * Runs behind single sign-on on the internal gateway only. Mounts:
 *   VAULT_DIR    the Obsidian vault, read-only     (posts: Projects/Blog/**, type: blog-post)
 *   CONTENT_DIR  the blog-content volume           (writes articles/ only)
 *
 * Pages and actions:
 *   GET  /                 every post with its stage and status, and what blocks it
 *   POST /preview          builds the live articles + this draft with the real blog build,
 *                          then shows it at /blog/... with a "preview" bar
 *   POST /publish          converts the note and pushes it to articles/<slug> (Make live)
 *   POST /unpublish        removes articles/<slug>
 * The blog-builder CronJob picks pushed changes up within five minutes.
 *
 * Every request needs the SSO user header (DESK_AUTH_HEADER, set by the gateway's
 * forward auth); DESK_USERS and DESK_GROUPS (x-authentik-groups) narrow it. The pod must
 * only be reachable through the gateway, or the header could be forged (network policy). Every POST needs the page's form
 * token and a same-origin Origin header. Note paths can't leave the blog folder.
 */
import { randomBytes, timingSafeEqual } from 'node:crypto';
import { cpSync, existsSync, mkdirSync, readFileSync, renameSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { createServer, type IncomingMessage, type ServerResponse } from 'node:http';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { astroBuild } from '../scripts/publish.ts';
import { exportNote, indexImages, type Article, type NoteInfo } from './export.ts';
import { linkTargets, liveSlugs, listPosts, pushArticle, pushedArticles, safeNotePath, unpushArticle, type Paths } from './store.ts';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(HERE, '..', '..');

export interface DeskOptions extends Paths {
  /** Header the gateway sets to the signed-in user; empty string disables the check (local use) */
  authHeader: string;
  /** Allowed users; with groups also empty, anyone the gateway let through */
  users: string[];
  /** Allowed groups (from x-authentik-groups, `|`-separated); a member of any is allowed */
  groups?: string[];
  /** Builds articlesDir into outDir (the real Astro build by default) */
  build?: (articlesDir: string, outDir: string) => void;
  previewDir?: string;
}

const esc = (s: unknown): string =>
  String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

const MIME: Record<string, string> = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.xml': 'application/xml', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.gif': 'image/gif', '.webp': 'image/webp', '.avif': 'image/avif', '.ico': 'image/x-icon', '.woff2': 'font/woff2',
};

/** The design tokens as one stylesheet (their @imports inlined), plus the desk's own styles. */
const loadCss = (): string => {
  const inline = (file: string): string =>
    readFileSync(file, 'utf8').replace(/@import\s+['"](.+?)['"];/g, (_m, rel: string) => inline(path.resolve(path.dirname(file), rel)));
  return inline(path.join(REPO, 'src/assets/css/design-system/index.css')) + '\n' + readFileSync(path.join(HERE, 'desk.css'), 'utf8');
};

type Status = { label: string; tone: 'live' | 'pending' | 'changed' | 'off' | 'blocked'; detail: string };

const statusOf = (post: NoteInfo, article: Article | null, pushed: Map<string, string>, live: Set<string>): Status => {
  if (post.problems.length) return { label: 'Not ready', tone: 'blocked', detail: post.problems.join(' · ') };
  const pushedHash = pushed.get(post.slug);
  if (!pushedHash) return { label: 'Not live', tone: 'off', detail: '' };
  if (article && article.hash !== pushedHash) return { label: 'Changed since it went live', tone: 'changed', detail: 'Make live again to update it' };
  if (!live.has(post.slug)) return { label: 'Going live', tone: 'pending', detail: 'The builder runs every five minutes' };
  return { label: 'Live', tone: 'live', detail: '' };
};

const page = (title: string, body: string): string => `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)} | Blog desk</title><link rel="stylesheet" href="/desk.css">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap">
</head><body><main class="desk">${body}</main></body></html>`;

export const createDesk = (opts: DeskOptions) => {
  const token = randomBytes(24).toString('hex');
  const build = opts.build ?? astroBuild;
  const previewRoot = opts.previewDir ?? path.join(tmpdir(), 'desk-preview');
  const previewSite = path.join(previewRoot, 'site');
  let css: string | null = null;
  let busy = false;

  const form = (action: string, fields: Record<string, string>, label: string, cls = '') =>
    `<form method="post" action="${action}">${Object.entries(fields)
      .map(([k, v]) => `<input type="hidden" name="${esc(k)}" value="${esc(v)}">`)
      .join('')}<input type="hidden" name="token" value="${token}"><button class="desk-button ${cls}">${esc(label)}</button></form>`;

  const listPage = (flash: string): string => {
    const posts = listPosts(opts);
    const pushed = pushedArticles(opts);
    const live = liveSlugs(opts);
    const targets = linkTargets(posts, pushed);
    const images = indexImages(opts.vault);
    const rows = posts.map((post) => {
      let article: Article | null = null;
      if (!post.problems.length) {
        try {
          article = exportNote(opts.vault, post.rel, targets, images);
        } catch {
          article = null;
        }
      }
      const s = statusOf(post, article, pushed, live);
      const actions = [
        post.problems.length ? '' : form('/preview', { path: post.rel }, 'Preview'),
        post.problems.length ? '' : form('/publish', { path: post.rel }, s.tone === 'off' ? 'Make live' : 'Update live', 'desk-button--primary'),
        pushed.has(post.slug) ? form('/unpublish', { slug: post.slug }, 'Unpublish', 'desk-button--quiet') : '',
        live.has(post.slug) ? `<a class="desk-link" href="https://derekmackley.com/blog/${esc(post.slug)}/" target="_blank" rel="noopener">View live ↗</a>` : '',
      ].join('');
      const warn = article?.warnings.length ? `<p class="desk-warn">${article.warnings.map(esc).join('<br>')}</p>` : '';
      return `<tr>
        <td><span class="desk-title">${esc(post.title)}</span><span class="desk-path">${esc(post.rel)}</span></td>
        <td class="desk-mono">${esc(post.pillar || '—')}</td>
        <td class="desk-mono">${esc(post.stage || '—')}</td>
        <td><span class="desk-status desk-status--${s.tone}">${esc(s.label)}</span>${s.detail ? `<span class="desk-detail">${esc(s.detail)}</span>` : ''}${warn}</td>
        <td><div class="desk-actions">${actions}</div></td></tr>`;
    });
    const known = new Set(posts.map((p) => p.slug));
    const orphans = [...pushed.keys()].filter((slug) => !known.has(slug));
    const orphanList = orphans.length
      ? `<section class="desk-orphans"><h2>Live without a note</h2><p>Pushed articles whose note was renamed or removed.</p><ul>${orphans
          .map((slug) => `<li><span class="desk-mono">${esc(slug)}</span>${form('/unpublish', { slug }, 'Unpublish', 'desk-button--quiet')}</li>`)
          .join('')}</ul></section>`
      : '';
    return page('Posts', `<header class="desk-header"><p class="desk-kicker">~/blog/desk</p><h1>Posts</h1>
      <p class="desk-lede">Write and polish in Obsidian. Preview here exactly as the blog will show it, then make it live.</p></header>
      ${flash ? `<p class="desk-flash">${esc(flash)}</p>` : ''}
      ${posts.length ? `<div class="desk-table-wrap"><table class="desk-table"><thead><tr><th>Post</th><th>Pillar</th><th>Stage</th><th>Status</th><th></th></tr></thead><tbody>${rows.join('')}</tbody></table></div>` : '<p class="desk-lede">No notes with <code>type: blog-post</code> yet.</p>'}
      ${orphanList}`);
  };

  const sendStatic = (res: ServerResponse, root: string, urlPath: string, banner = false): boolean => {
    let rel: string;
    try {
      rel = decodeURIComponent(urlPath);
    } catch {
      return false;
    }
    if (rel.includes('\0') || rel.split('/').some((seg) => seg.startsWith('.'))) return false;
    let file = path.resolve(root, '.' + rel);
    if (!file.startsWith(path.resolve(root))) return false;
    if (existsSync(file) && statSync(file).isDirectory()) file = path.join(file, 'index.html');
    else if (!existsSync(file) && existsSync(file + '.html')) file += '.html';
    if (!existsSync(file) || !statSync(file).isFile()) return false;
    let data: Buffer | string = readFileSync(file);
    const type = MIME[path.extname(file).toLowerCase()] ?? 'application/octet-stream';
    if (banner && type.startsWith('text/html')) {
      data = data.toString('utf8').replace(/<body([^>]*)>/, '<body$1><div class="desk-preview-bar">Preview, not live · <a href="/">Back to the desk</a></div><style>.desk-preview-bar{position:sticky;top:0;z-index:10;padding:var(--spacing-2) var(--spacing-4);background:var(--color-warning);color:var(--color-black);font-family:var(--font-family-jetbrains);font-size:var(--font-size-sm)}.desk-preview-bar a{color:inherit}</style>');
    }
    res.writeHead(200, { 'Content-Type': type, 'Cache-Control': 'no-store' });
    res.end(data);
    return true;
  };

  const readForm = (req: IncomingMessage): Promise<URLSearchParams> =>
    new Promise((resolve, reject) => {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk;
        if (body.length > 10_000) {
          reject(new Error('form too large'));
          req.destroy();
        }
      });
      req.on('end', () => resolve(new URLSearchParams(body)));
      req.on('error', reject);
    });

  const groups = opts.groups ?? [];
  const allowedUser = (req: IncomingMessage): boolean => {
    if (!opts.authHeader) return true;
    const user = req.headers[opts.authHeader.toLowerCase()];
    if (typeof user !== 'string' || !user) return false;
    if (opts.users.length === 0 && groups.length === 0) return true;
    if (opts.users.includes(user)) return true;
    const memberOf = String(req.headers['x-authentik-groups'] ?? '').split('|').map((g) => g.trim());
    return groups.some((g) => memberOf.includes(g));
  };

  const sameOrigin = (req: IncomingMessage): boolean => {
    const origin = req.headers.origin ?? req.headers.referer;
    if (!origin) return false;
    try {
      return new URL(origin).host === req.headers.host;
    } catch {
      return false;
    }
  };

  const tokenOk = (given: string | null): boolean => {
    if (!given || given.length !== token.length) return false;
    return timingSafeEqual(Buffer.from(given), Buffer.from(token));
  };

  const redirect = (res: ServerResponse, to: string) => {
    res.writeHead(303, { Location: to });
    res.end();
  };

  const fail = (res: ServerResponse, code: number, message: string) => {
    res.writeHead(code, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(message);
  };

  const exportFor = (rel: string): Article => {
    const posts = listPosts(opts);
    return exportNote(opts.vault, rel, linkTargets(posts, pushedArticles(opts)));
  };

  const preview = (article: Article): void => {
    const work = path.join(previewRoot, `run-${randomBytes(4).toString('hex')}`);
    const articles = path.join(work, 'articles');
    try {
      mkdirSync(articles, { recursive: true });
      const pushedDir = path.join(opts.content, 'articles');
      if (existsSync(pushedDir)) cpSync(pushedDir, articles, { recursive: true });
      const own = path.join(articles, article.slug);
      rmSync(own, { recursive: true, force: true });
      mkdirSync(own);
      for (const [name, data] of article.files) writeFileSync(path.join(own, name), data);
      const out = path.join(work, 'site');
      build(articles, out);
      rmSync(previewSite, { recursive: true, force: true });
      renameSync(out, previewSite);
    } finally {
      rmSync(work, { recursive: true, force: true });
    }
  };

  const handler = async (req: IncomingMessage, res: ServerResponse) => {
    const url = new URL(req.url ?? '/', 'http://desk.invalid');
    if (url.pathname === '/healthz') return fail(res, 200, 'ok');
    if (!allowedUser(req)) return fail(res, 403, 'Sign in through the gateway.');

    if (req.method === 'GET') {
      if (url.pathname === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' });
        return res.end(listPage(url.searchParams.get('done') ?? ''));
      }
      if (url.pathname === '/desk.css') {
        css ??= loadCss();
        res.writeHead(200, { 'Content-Type': 'text/css; charset=utf-8' });
        return res.end(css);
      }
      if (url.pathname === '/apple-touch-icon.png' || url.pathname === '/favicon-32.png') {
        if (sendStatic(res, path.join(REPO, 'public'), url.pathname)) return;
      }
      if (url.pathname.startsWith('/blog/') || url.pathname === '/blog') {
        if (sendStatic(res, previewSite, url.pathname.replace(/^\/blog/, '') || '/', true)) return;
      }
      return fail(res, 404, 'Not found');
    }

    if (req.method !== 'POST') return fail(res, 405, 'Method not allowed');
    if (!sameOrigin(req)) return fail(res, 403, 'Cross-origin request refused.');
    let fields: URLSearchParams;
    try {
      fields = await readForm(req);
    } catch {
      return fail(res, 413, 'Form too large.');
    }
    if (!tokenOk(fields.get('token'))) return fail(res, 403, 'The page is out of date; reload it.');
    if (busy) return redirect(res, '/?done=' + encodeURIComponent('Busy with another build; try again in a moment.'));
    busy = true;
    try {
      if (url.pathname === '/preview' || url.pathname === '/publish') {
        const rel = safeNotePath(opts, fields.get('path') ?? '');
        if (!rel) return fail(res, 400, 'Unknown note.');
        const article = exportFor(rel);
        if (url.pathname === '/preview') {
          preview(article);
          return redirect(res, `/blog/${article.slug}/`);
        }
        pushArticle(opts, article);
        return redirect(res, '/?done=' + encodeURIComponent(`Pushed "${article.meta.title}". It goes live within five minutes.`));
      }
      if (url.pathname === '/unpublish') {
        const slug = fields.get('slug') ?? '';
        const removed = unpushArticle(opts, slug);
        return redirect(res, '/?done=' + encodeURIComponent(removed ? `Unpublished ${slug}. It leaves the site within five minutes.` : `${slug} was not live.`));
      }
      return fail(res, 404, 'Not found');
    } catch (e) {
      return redirect(res, '/?done=' + encodeURIComponent(`Failed: ${(e as Error).message}`));
    } finally {
      busy = false;
    }
  };

  return { handler, token };
};

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  const desk = createDesk({
    vault: process.env.VAULT_DIR ?? '/vault',
    content: process.env.CONTENT_DIR ?? '/content',
    authHeader: process.env.DESK_AUTH_HEADER ?? 'x-authentik-username',
    users: (process.env.DESK_USERS ?? '').split(',').map((u) => u.trim()).filter(Boolean),
    groups: (process.env.DESK_GROUPS ?? '').split(',').map((g) => g.trim()).filter(Boolean),
  });
  const port = Number(process.env.PORT ?? '8080');
  createServer((req, res) => {
    desk.handler(req, res).catch((e) => {
      console.error('desk:', e);
      if (!res.headersSent) res.writeHead(500).end('Internal error');
    });
  }).listen(port, () => console.log(`desk: listening on ${port}`));
}
