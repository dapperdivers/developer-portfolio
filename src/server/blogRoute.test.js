import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'fs';
import { tmpdir } from 'os';
import path from 'path';
import { createBaseServer } from '../../config/vite/server.js';

// Serves /blog from a temp directory standing in for the mounted volume.
const start = (blogPath) =>
  new Promise((resolve) => {
    const app = createBaseServer({ blogPath, rateLimitMax: 0, allowedDomains: ['http://localhost'] });
    const server = app.listen(0, '127.0.0.1', () => resolve(server));
  });
const urlOf = (server, p) => `http://127.0.0.1:${server.address().port}${p}`;

describe('/blog', () => {
  let dir;
  let server;

  beforeAll(async () => {
    dir = mkdtempSync(path.join(tmpdir(), 'blog-'));
    writeFileSync(path.join(dir, 'index.html'), '<h1>Blog home</h1>');
    writeFileSync(path.join(dir, 'waiting-is-not-failing.html'), '<h1>Waiting</h1>');
    writeFileSync(path.join(dir, '404.html'), '<h1>No such post</h1>');
    writeFileSync(path.join(dir, '.secret'), 'nope');
    mkdirSync(path.join(dir, 'assets'));
    writeFileSync(path.join(dir, 'assets', 'app-3f9a1c2b.css'), 'body{}');
    server = await start(dir);
  });

  afterAll(() => {
    server?.close();
    rmSync(dir, { recursive: true, force: true });
  });

  it('serves the index and revalidates pages', async () => {
    const res = await fetch(urlOf(server, '/blog/'));
    expect(res.status).toBe(200);
    expect(await res.text()).toContain('Blog home');
    expect(res.headers.get('cache-control')).toBe('no-cache');
    expect(res.headers.get('etag')).toBeTruthy();
  });

  it('serves clean URLs without the .html', async () => {
    const res = await fetch(urlOf(server, '/blog/waiting-is-not-failing'));
    expect(res.status).toBe(200);
    expect(await res.text()).toContain('Waiting');
  });

  it('caches hashed assets for good', async () => {
    const res = await fetch(urlOf(server, '/blog/assets/app-3f9a1c2b.css'));
    expect(res.headers.get('cache-control')).toContain('immutable');
  });

  it('answers a missing post with the blog 404 page, not the homepage', async () => {
    const res = await fetch(urlOf(server, '/blog/nope'));
    expect(res.status).toBe(404);
    expect(await res.text()).toContain('No such post');
  });

  it('never serves dotfiles or paths outside the volume', async () => {
    expect((await fetch(urlOf(server, '/blog/.secret'))).status).toBe(404);
    expect((await fetch(urlOf(server, '/blog/..%2f..%2fpackage.json'))).status).toBe(404);
  });

  it('returns a plain 404 when nothing has been published yet', async () => {
    const empty = await start(path.join(dir, 'does-not-exist'));
    const res = await fetch(urlOf(empty, '/blog/'));
    expect(res.status).toBe(404);
    expect(await res.text()).toBe('Not found');
    empty.close();
  });
});
