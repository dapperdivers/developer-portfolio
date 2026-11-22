import { describe, it, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { createServer, type Server } from 'node:http';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { convertBody, describeNote, exportNote, indexImages, slugify } from './export.ts';
import { linkTargets, listPosts, pushArticle, pushedArticles, safeNotePath, unpushArticle } from './store.ts';
import { createDesk } from './server.ts';

let root: string;
let vault: string;
let content: string;

const post = (fm: string, draft: string, extra = '') =>
  `---\n${fm.trim()}\n---\n\n# Heading\n\n## Thesis\nprivate planning ${extra}\n\n## Draft\n${draft}\n`;

const write = (rel: string, text: string | Buffer) => {
  const full = path.join(vault, rel);
  mkdirSync(path.dirname(full), { recursive: true });
  writeFileSync(full, text);
};

const READY = `type: blog-post
title: "Watering on a Timer"
summary: "What a drip timer taught me."
description: "Vault-only note about the post idea."
published: 2024-05-12
topics: [Gardening, Drip Irrigation]
stage: edit
pillar: "Gardening"
related:
  - "[[Personal/Finance/Budget]]"`;

beforeEach(() => {
  root = mkdtempSync(path.join(tmpdir(), 'desk-test-'));
  vault = path.join(root, 'vault');
  content = path.join(root, 'content');
  mkdirSync(content);
  write('Personal/Finance/Budget.md', '---\ntype: note\n---\nSECRET budget numbers');
  write('Attachments/Garden/timer.png', Buffer.from('png-bytes'));
  write('Projects/Blog/000 Blog Index.md', '---\ntype: index\n---\n# Index');
  write('Projects/Blog/Ideas/Gardening/Watering on a Timer.md', post(READY, [
    'The timer runs at dawn. See [[Personal/Finance/Budget|my budget]] and [[Raised Beds]].',
    '',
    '![[timer.png|The timer]]',
    '',
    '> [!info] Worth knowing',
    '> Drip lines clog.',
    '',
    '%% do not publish this aside %%',
    '<!-- nor this -->',
    '',
    '```md',
    '[[Not a link]] %% stays %%',
    '```',
  ].join('\n')));
  write('Projects/Blog/Ideas/Gardening/Raised Beds.md', post('type: blog-post\ntitle: Raised Beds\nsummary: Beds.\npublished: 2024-05-01', 'Beds text.'));
  write('Projects/Blog/Ideas/Cooking/Half Done.md', post('type: blog-post\nstage: idea', ''));
});

afterEach(() => rmSync(root, { recursive: true, force: true }));

describe('export', () => {
  it('slugifies titles', () => {
    assert.equal(slugify('Waiting Is Not Failing!'), 'waiting-is-not-failing');
    assert.equal(slugify('Crème brûlée & you'), 'creme-brulee-you');
  });

  it('lists what blocks a note', () => {
    const info = describeNote('x.md', post('type: blog-post\ntitle: x', ''));
    assert.deepEqual(info.problems, ['add summary: (the public one-line description)', 'add published: YYYY-MM-DD', 'write the post under ## Draft']);
    assert.deepEqual(describeNote('y.md', post('type: blog-post\ntitle: Topics\nsummary: d\npublished: 2024-01-01', 'x')).problems,
      ['"topics" is reserved; set slug:']);
  });

  it('exports only the public fields and the draft', () => {
    const a = exportNote(vault, 'Projects/Blog/Ideas/Gardening/Watering on a Timer.md', new Map());
    const index = a.files.get('index.md')!.toString();
    assert.equal(a.slug, 'watering-on-a-timer');
    assert.deepEqual(a.meta, { title: 'Watering on a Timer', description: 'What a drip timer taught me.', published: '2024-05-12', topics: ['gardening', 'drip-irrigation'] });
    for (const leak of ['Budget', 'related', 'pillar', 'private planning', 'do not publish', 'nor this', 'SECRET', 'Vault-only']) {
      assert.ok(!index.includes(leak) || index.includes('my budget'), `leaked: ${leak}`);
    }
    assert.ok(!index.includes('Personal/Finance'));
    assert.ok(!index.includes('private planning'));
  });

  it('turns links to unpublished notes into plain text and to live posts into links', () => {
    const a = exportNote(vault, 'Projects/Blog/Ideas/Gardening/Watering on a Timer.md', new Map([['Raised Beds', 'raised-beds']]));
    const index = a.files.get('index.md')!.toString();
    assert.match(index, /See my budget and \[Raised Beds\]\(\/blog\/raised-beds\/\)\./);
  });

  it('ships embedded images next to the article', () => {
    const a = exportNote(vault, 'Projects/Blog/Ideas/Gardening/Watering on a Timer.md', new Map());
    assert.match(a.files.get('index.md')!.toString(), /!\[The timer\]\(\.\/timer\.png\)/);
    assert.equal(a.files.get('timer.png')!.toString(), 'png-bytes');
  });

  it('takes the whole draft, including its own ## headings', () => {
    write('Projects/Blog/Long.md', post('type: blog-post\ntitle: Long\nsummary: s\npublished: 2024-01-01', 'Intro.\n\n## Part two\n\nMore.\n\n```\n## Draft\n```'));
    const index = exportNote(vault, 'Projects/Blog/Long.md', new Map()).files.get('index.md')!.toString();
    assert.match(index, /Intro\.\n\n## Part two\n\nMore\./);
    assert.ok(!index.includes('private planning'));
  });

  it('maps Obsidian callouts and leaves code alone', () => {
    const body = convertBody('> [!info] Title\n> text\n\n`[[x]]` and ```\n[[y]] %%z%%\n```', {
      liveSlugs: new Map(), images: new Map(), addImage: () => null, warn: () => {},
    });
    assert.match(body, /> \[!NOTE\] Title/);
    assert.match(body, /`\[\[x\]\]`/);
    assert.match(body, /\[\[y\]\] %%z%%/);
  });

  it('refuses a note that is not ready', () => {
    assert.throws(() => exportNote(vault, 'Projects/Blog/Ideas/Cooking/Half Done.md', new Map()), /summary/);
  });

  it('never follows symlinks out of the vault when finding images', () => {
    const outside = path.join(root, 'outside');
    mkdirSync(outside);
    writeFileSync(path.join(outside, 'secret.png'), 'x');
    symlinkSync(outside, path.join(vault, 'Attachments', 'link'));
    symlinkSync(path.join(outside, 'secret.png'), path.join(vault, 'Attachments', 'direct.png'));
    const images = indexImages(vault);
    assert.equal(images.has('secret.png'), false);
    assert.equal(images.has('direct.png'), false);
    assert.equal(images.get('timer.png'), path.join(vault, 'Attachments/Garden/timer.png'));
  });
});

describe('store', () => {
  const paths = () => ({ vault, content });

  it('lists blog-post notes only', () => {
    // Closest to done first: edit, then idea, then notes with no stage
    assert.deepEqual(listPosts(paths()).map((p) => p.name), ['Watering on a Timer', 'Half Done', 'Raised Beds']);
  });

  it('keeps note paths inside the blog folder', () => {
    assert.equal(safeNotePath(paths(), 'Projects/Blog/Ideas/Gardening/Raised Beds.md'), 'Projects/Blog/Ideas/Gardening/Raised Beds.md');
    assert.equal(safeNotePath(paths(), 'Personal/Finance/Budget.md'), null);
    assert.equal(safeNotePath(paths(), 'Projects/Blog/../../Personal/Finance/Budget.md'), null);
    assert.equal(safeNotePath(paths(), 'Projects/Blog/missing.md'), null);
  });

  it('pushes, replaces and removes articles without leaving hidden files in articles/', () => {
    const a = exportNote(vault, 'Projects/Blog/Ideas/Gardening/Raised Beds.md', new Map());
    pushArticle(paths(), a);
    assert.equal(pushedArticles(paths()).get('raised-beds'), a.hash);
    pushArticle(paths(), a);
    assert.deepEqual(readdirSync(path.join(content, 'articles')), ['raised-beds']);
    assert.equal(unpushArticle(paths(), 'raised-beds'), true);
    assert.equal(unpushArticle(paths(), 'raised-beds'), false);
    assert.throws(() => unpushArticle(paths(), '../vault'), /invalid slug/);
  });

  it('only links to posts that are pushed', () => {
    const posts = listPosts(paths());
    assert.equal(linkTargets(posts, new Map()).size, 0);
    assert.equal(linkTargets(posts, new Map([['raised-beds', 'h']])).get('Raised Beds'), 'raised-beds');
  });
});

describe('server', () => {
  let server: Server;
  let base: string;
  let built: string[];
  let token: string;

  const start = (authHeader = 'x-authentik-username', users: string[] = [], groups: string[] = []) =>
    new Promise<void>((resolve) => {
      built = [];
      const desk = createDesk({
        vault, content, authHeader, users, groups, previewDir: path.join(root, 'preview'),
        build: (articles, out) => {
          built.push(...readdirSync(articles));
          mkdirSync(path.join(out, 'raised-beds'), { recursive: true });
          writeFileSync(path.join(out, 'raised-beds', 'index.html'), '<html><body><h1>Beds</h1></body></html>');
        },
      });
      token = desk.token;
      server = createServer((req, res) => void desk.handler(req, res));
      server.listen(0, '127.0.0.1', () => {
        base = `http://127.0.0.1:${(server.address() as { port: number }).port}`;
        resolve();
      });
    });

  afterEach(() => server?.close());

  const auth = { 'x-authentik-username': 'owner' };
  const post = (p: string, fields: Record<string, string>, headers: Record<string, string> = {}) =>
    fetch(base + p, {
      method: 'POST',
      redirect: 'manual',
      headers: { ...auth, 'content-type': 'application/x-www-form-urlencoded', origin: base, ...headers },
      body: new URLSearchParams(fields),
    });

  it('requires the SSO header, and an allowed user when set', async () => {
    await start('x-authentik-username', ['owner']);
    assert.equal((await fetch(base + '/')).status, 403);
    assert.equal((await fetch(base + '/', { headers: { 'x-authentik-username': 'someone' } })).status, 403);
    assert.equal((await fetch(base + '/', { headers: auth })).status, 200);
    assert.equal((await fetch(base + '/healthz')).status, 200);
  });

  it('can allow by authentik group instead of by name', async () => {
    await start('x-authentik-username', [], ['authentik Admins']);
    const as = (groups: string) => fetch(base + '/', { headers: { ...auth, 'x-authentik-groups': groups } });
    assert.equal((await as('family|authentik Admins')).status, 200);
    assert.equal((await as('family|authentik Admins2')).status, 403);
    assert.equal((await fetch(base + '/', { headers: auth })).status, 403);
  });

  it('lists posts with what blocks them', async () => {
    await start();
    const html = await (await fetch(base + '/', { headers: auth })).text();
    assert.match(html, /Watering on a Timer/);
    assert.match(html, /Not ready/);
    assert.match(html, /add summary/);
    assert.ok(!html.includes('Budget.md'));
  });

  it('refuses posts without the token or from another origin', async () => {
    await start();
    const rel = 'Projects/Blog/Ideas/Gardening/Raised Beds.md';
    assert.equal((await post('/publish', { path: rel })).status, 403);
    assert.equal((await post('/publish', { path: rel, token }, { origin: 'https://evil.example' })).status, 403);
    assert.equal(existsSync(path.join(content, 'articles')), false);
  });

  it('makes a post live and unpublishes it', async () => {
    await start();
    const rel = 'Projects/Blog/Ideas/Gardening/Raised Beds.md';
    const res = await post('/publish', { path: rel, token });
    assert.equal(res.status, 303);
    assert.ok(existsSync(path.join(content, 'articles', 'raised-beds', 'index.md')));
    assert.equal((await post('/unpublish', { slug: 'raised-beds', token })).status, 303);
    assert.equal(existsSync(path.join(content, 'articles', 'raised-beds')), false);
  });

  it('refuses notes outside the blog folder', async () => {
    await start();
    assert.equal((await post('/publish', { path: 'Personal/Finance/Budget.md', token })).status, 400);
    assert.equal((await post('/preview', { path: '../../etc/passwd.md', token })).status, 400);
  });

  it('previews with the live articles plus the draft, marked as a preview', async () => {
    await start();
    mkdirSync(path.join(content, 'articles', 'already-live'), { recursive: true });
    writeFileSync(path.join(content, 'articles', 'already-live', 'index.md'), 'x');
    const res = await post('/preview', { path: 'Projects/Blog/Ideas/Gardening/Raised Beds.md', token });
    assert.equal(res.headers.get('location'), '/blog/raised-beds/');
    assert.deepEqual(built.sort(), ['already-live', 'raised-beds']);
    const html = await (await fetch(base + '/blog/raised-beds/', { headers: auth })).text();
    assert.match(html, /Preview, not live/);
    assert.equal((await fetch(base + '/blog/..%2f..%2fcontent/articles', { headers: auth })).status, 404);
    // Previewing never pushes
    assert.equal(existsSync(path.join(content, 'articles', 'raised-beds')), false);
  });
});
