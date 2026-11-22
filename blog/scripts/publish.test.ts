import { describe, it, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, readlinkSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { currentRelease, inputHash, listArticleFiles, pruneReleases, publish, type PublishOptions } from './publish.ts';

let root: string;
let articles: string;
let site: string;
let builds: number;

/** Stand-in for astro: writes an index.html listing the article folders. */
const fakeBuild = (articlesDir: string, outDir: string) => {
  builds++;
  mkdirSync(outDir, { recursive: true });
  writeFileSync(path.join(outDir, 'index.html'), existsSync(articlesDir) ? readdirSync(articlesDir).sort().join(',') : '');
};

const opts = (over: Partial<PublishOptions> = {}): PublishOptions => ({
  articlesDir: articles,
  siteDir: site,
  buildId: 'test',
  keep: 2,
  force: false,
  build: fakeBuild,
  log: () => {},
  ...over,
});

const addArticle = (slug: string, body = 'text') => {
  mkdirSync(path.join(articles, slug), { recursive: true });
  writeFileSync(path.join(articles, slug, 'index.md'), body);
};

const liveIndex = () => readFileSync(path.join(site, 'current', 'index.html'), 'utf8');

beforeEach(() => {
  root = mkdtempSync(path.join(tmpdir(), 'publish-test-'));
  articles = path.join(root, 'articles');
  site = path.join(root, 'site');
  mkdirSync(articles);
  builds = 0;
});

afterEach(() => rmSync(root, { recursive: true, force: true }));

describe('publish', () => {
  it('builds a release and points current at it', () => {
    addArticle('first-post');
    const result = publish(opts());
    assert.equal(result.status, 'published');
    assert.equal(liveIndex(), 'first-post');
    assert.equal(readlinkSync(path.join(site, 'current')), path.join('releases', result.release));
    assert.match(readFileSync(path.join(site, 'current', '.publish-hash'), 'utf8'), /^[0-9a-f]{64}\n$/);
  });

  it('does nothing when the articles have not changed', () => {
    addArticle('first-post');
    const first = publish(opts());
    const second = publish(opts());
    assert.deepEqual(second, { status: 'unchanged', release: first.release });
    assert.equal(builds, 1);
  });

  it('rebuilds when an article changes, the builder changes, or --force', () => {
    addArticle('first-post');
    publish(opts());
    addArticle('first-post', 'edited');
    assert.equal(publish(opts()).status, 'published');
    assert.equal(publish(opts({ buildId: 'new-image' })).status, 'published');
    assert.equal(publish(opts({ buildId: 'new-image', force: true })).status, 'published');
    assert.equal(builds, 4);
  });

  it('keeps the newest releases and never removes the live one', () => {
    addArticle('a');
    for (const body of ['1', '2', '3', '4']) {
      addArticle('a', body);
      publish(opts());
    }
    const releases = readdirSync(path.join(site, 'releases'));
    assert.equal(releases.length, 2);
    assert.ok(releases.includes(currentRelease(site)!));
  });

  it('leaves the live site alone when the build fails', () => {
    addArticle('first-post');
    publish(opts());
    addArticle('second-post');
    assert.throws(() => publish(opts({ build: () => { throw new Error('boom'); } })), /boom/);
    assert.equal(liveIndex(), 'first-post');
    assert.equal(readdirSync(path.join(site, 'releases')).filter((n) => n.startsWith('.')).length, 0);
  });

  it('refuses a build with no index.html', () => {
    addArticle('first-post');
    assert.throws(() => publish(opts({ build: (_a, out) => mkdirSync(out, { recursive: true }) })), /no index.html/);
    assert.equal(existsSync(path.join(site, 'current')), false);
  });

  it('publishes an empty blog when there are no articles yet', () => {
    rmSync(articles, { recursive: true });
    assert.equal(publish(opts()).status, 'published');
    assert.equal(liveIndex(), '');
  });
});

describe('article files', () => {
  it('lists regular files, sorted', () => {
    addArticle('b');
    addArticle('a');
    writeFileSync(path.join(articles, 'a', 'diagram.png'), 'png');
    assert.deepEqual(listArticleFiles(articles), ['a/diagram.png', 'a/index.md', 'b/index.md']);
  });

  it('refuses symlinks, so nothing outside the articles can be read', () => {
    addArticle('a');
    writeFileSync(path.join(root, 'secret.md'), 'private');
    symlinkSync(path.join(root, 'secret.md'), path.join(articles, 'a', 'leak.md'));
    assert.throws(() => listArticleFiles(articles), /symlink/);
    assert.throws(() => publish(opts()), /symlink/);
  });

  it('refuses hidden files', () => {
    addArticle('a');
    writeFileSync(path.join(articles, 'a', '.env'), 'x');
    assert.throws(() => listArticleFiles(articles), /hidden/);
  });

  it('hashes names and contents', () => {
    addArticle('a', 'one');
    const h1 = inputHash(articles, 'x');
    addArticle('a', 'two');
    assert.notEqual(inputHash(articles, 'x'), h1);
    assert.notEqual(inputHash(articles, 'y'), inputHash(articles, 'x'));
  });
});

describe('pruneReleases', () => {
  it('is a no-op without a releases folder', () => {
    assert.deepEqual(pruneReleases(site, 3), []);
  });
});
