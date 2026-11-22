import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'fs';
import { tmpdir } from 'os';
import path from 'path';
import express from 'express';
import http from 'http';
import { blogViewLogger, classifyPage, referrerSource, isBot } from '../../config/vite/blogViews.js';

describe('classifyPage', () => {
  it.each([
    ['/', { kind: 'index', page: 'index' }],
    ['/the-30tb-lesson/', { kind: 'post', page: 'the-30tb-lesson' }],
    ['/the-30tb-lesson', { kind: 'post', page: 'the-30tb-lesson' }],
    ['/topics/security/', { kind: 'topic', page: 'topics/security' }],
    ['/rss.xml', { kind: 'feed', page: 'rss' }],
  ])('%s is a page', (p, expected) => {
    expect(classifyPage(p)).toEqual(expected);
  });

  it.each(['/_astro/app-3f9a1c2b.css', '/the-30tb-lesson/diagram.png', '/sitemap-index.xml', '/404', '/Upper', '/a/b/c'])(
    '%s is not counted',
    (p) => {
      expect(classifyPage(p)).toBeNull();
    },
  );
});

describe('referrerSource', () => {
  const own = new Set(['derekmackley.com']);
  it('reduces a referrer to its host', () => {
    expect(referrerSource('https://news.ycombinator.com/item?id=1', own)).toBe('news.ycombinator.com');
    expect(referrerSource('https://www.linkedin.com/feed/?trk=abc', own)).toBe('linkedin.com');
  });
  it('marks our own pages internal and missing referrers direct', () => {
    expect(referrerSource('https://www.derekmackley.com/blog/', own)).toBe('internal');
    expect(referrerSource(undefined, own)).toBe('direct');
    expect(referrerSource('not a url', own)).toBe('unknown');
  });
});

describe('isBot', () => {
  it('separates browsers from crawlers, feed readers and scripts', () => {
    expect(isBot('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/131.0 Safari/537.36')).toBe(false);
    expect(isBot('Mozilla/5.0 (compatible; Googlebot/2.1)')).toBe(true);
    expect(isBot('Feedly/1.0')).toBe(true);
    expect(isBot('curl/8.5.0')).toBe(true);
    expect(isBot(undefined)).toBe(true);
  });
});

describe('blogViewLogger on a real /blog mount', () => {
  let dir;
  let server;
  let lines;
  // node:http, not fetch: the test environment's fetch drops conditional headers
  const get = (p, headers = {}, method = 'GET') =>
    new Promise((resolve, reject) => {
      const req = http.request({ host: '127.0.0.1', port: server.address().port, path: p, method, headers }, (res) => {
        res.resume();
        res.on('end', () => resolve({ status: res.statusCode, etag: res.headers.etag }));
      });
      req.on('error', reject);
      req.end();
    });
  // 'finish' fires after the body is sent; give the event loop a turn.
  const settle = () => new Promise((r) => setTimeout(r, 20));

  beforeAll(async () => {
    dir = mkdtempSync(path.join(tmpdir(), 'blog-views-'));
    mkdirSync(path.join(dir, 'a-post'));
    writeFileSync(path.join(dir, 'a-post', 'index.html'), '<h1>Post</h1>');
    writeFileSync(path.join(dir, 'app-3f9a1c2b.css'), 'body{}');
    const app = express();
    app.use('/blog', blogViewLogger({ ownHosts: ['derekmackley.com'], log: (l) => lines.push(JSON.parse(l)) }));
    app.use('/blog', express.static(dir, { etag: true }));
    app.use('/blog', (req, res) => res.status(404).send('nope'));
    server = await new Promise((resolve) => {
      const s = app.listen(0, '127.0.0.1', () => resolve(s));
    });
  });
  beforeEach(() => {
    lines = [];
  });
  afterAll(() => {
    server?.close();
    rmSync(dir, { recursive: true, force: true });
  });

  it('logs a post view without the IP or user agent', async () => {
    await get('/blog/a-post/', { 'user-agent': 'Mozilla/5.0 Firefox/133.0', referer: 'https://www.linkedin.com/feed/' });
    await settle();
    expect(lines).toEqual([{ event: 'blog_view', kind: 'post', page: 'a-post', ref: 'linkedin.com', bot: false, repeat: false }]);
  });

  it('counts a revalidated page as a repeat view', async () => {
    const first = await get('/blog/a-post/');
    const { etag } = first;
    await get('/blog/a-post/', { 'if-none-match': etag });
    await settle();
    expect(lines.map((l) => l.repeat)).toEqual([false, true]);
  });

  it('ignores assets, missing pages and non-GET requests', async () => {
    await get('/blog/app-3f9a1c2b.css');
    await get('/blog/missing-post/');
    await get('/blog/a-post/', {}, 'HEAD');
    await settle();
    expect(lines).toEqual([]);
  });
});
