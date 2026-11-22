/**
 * Builds the blog from pushed articles and switches the live site over atomically.
 *
 *   ARTICLES_DIR  articles pushed by the private side (read only):  <slug>/index.md + images
 *   SITE_DIR      what the portfolio serves:  releases/<stamp>-<hash>/ and `current` -> one of them
 *
 * Each run hashes the articles (plus BUILD_ID, the builder image's version) and does
 * nothing when the live release was built from the same input. Otherwise it builds into
 * scratch space, copies the result to a new release folder, then points `current` at it
 * with a symlink rename, so a reader gets the old site or the new one, never a mix.
 * The newest KEEP_RELEASES releases are kept for rollback; older ones are removed.
 *
 * It never reads anything outside ARTICLES_DIR: symlinks and dotfiles there are refused.
 *
 * Usage: ARTICLES_DIR=/content/articles SITE_DIR=/content/site node scripts/publish.ts [--force]
 */
import { createHash, randomBytes } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import {
  cpSync, existsSync, lstatSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, readlinkSync, renameSync, rmSync,
  symlinkSync, writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const HASH_FILE = '.publish-hash';
const BLOG_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

export interface PublishOptions {
  articlesDir: string;
  siteDir: string;
  buildId: string;
  keep: number;
  force: boolean;
  /** Builds the site from articlesDir into outDir; throws on failure */
  build: (articlesDir: string, outDir: string) => void;
  log: (line: string) => void;
}

export type PublishResult =
  | { status: 'unchanged'; release: string }
  | { status: 'published'; release: string; removed: string[] };

/** Every regular file under dir as a path relative to it, sorted. Refuses symlinks and dotfiles. */
export const listArticleFiles = (dir: string): string[] => {
  if (!existsSync(dir)) return [];
  const out: string[] = [];
  const walk = (rel: string) => {
    for (const entry of readdirSync(path.join(dir, rel), { withFileTypes: true })) {
      const child = rel ? `${rel}/${entry.name}` : entry.name;
      if (entry.name.startsWith('.')) throw new Error(`refusing hidden file in articles: ${child}`);
      if (entry.isSymbolicLink()) throw new Error(`refusing symlink in articles: ${child}`);
      if (entry.isDirectory()) walk(child);
      else if (entry.isFile()) out.push(child);
      else throw new Error(`refusing special file in articles: ${child}`);
    }
  };
  walk('');
  return out.sort();
};

/** Hash of the article files (names and bytes) and the builder version. */
export const inputHash = (articlesDir: string, buildId: string): string => {
  const hash = createHash('sha256').update(`build:${buildId}\0`);
  for (const rel of listArticleFiles(articlesDir)) {
    hash.update(rel).update('\0').update(readFileSync(path.join(articlesDir, rel))).update('\0');
  }
  return hash.digest('hex');
};

/** The release `current` points at, or null. */
export const currentRelease = (siteDir: string): string | null => {
  const link = path.join(siteDir, 'current');
  try {
    if (!lstatSync(link).isSymbolicLink()) return null;
    return path.basename(readlinkSync(link));
  } catch {
    return null;
  }
};

const releaseHash = (siteDir: string, release: string): string | null => {
  try {
    return readFileSync(path.join(siteDir, 'releases', release, HASH_FILE), 'utf8').trim();
  } catch {
    return null;
  }
};

/** Points `current` at releases/<release> with one rename. */
export const switchCurrent = (siteDir: string, release: string): void => {
  const tmp = path.join(siteDir, `.current-${randomBytes(4).toString('hex')}`);
  symlinkSync(path.join('releases', release), tmp);
  renameSync(tmp, path.join(siteDir, 'current'));
};

/** Removes all but the newest `keep` releases, never the live one. Returns what it removed. */
export const pruneReleases = (siteDir: string, keep: number): string[] => {
  const dir = path.join(siteDir, 'releases');
  if (!existsSync(dir)) return [];
  const live = currentRelease(siteDir);
  const releases = readdirSync(dir).filter((n) => !n.startsWith('.')).sort().reverse();
  const removed: string[] = [];
  releases.forEach((name, i) => {
    if (i >= Math.max(1, keep) && name !== live) {
      rmSync(path.join(dir, name), { recursive: true, force: true });
      removed.push(name);
    }
  });
  return removed;
};

export const publish = (opts: PublishOptions): PublishResult => {
  const hash = inputHash(opts.articlesDir, opts.buildId);
  const live = currentRelease(opts.siteDir);
  if (!opts.force && live && releaseHash(opts.siteDir, live) === hash) {
    opts.log(`unchanged: ${live} was built from these articles`);
    return { status: 'unchanged', release: live };
  }

  const scratch = path.join(tmpdir(), `blog-build-${randomBytes(4).toString('hex')}`);
  try {
    opts.log(`building ${listArticleFiles(opts.articlesDir).length} article file(s)`);
    opts.build(opts.articlesDir, scratch);
    if (!existsSync(path.join(scratch, 'index.html'))) throw new Error('build produced no index.html');
    writeFileSync(path.join(scratch, HASH_FILE), `${hash}\n`);

    const stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d+Z$/, 'Z');
    // Random suffix: a forced rebuild of the same input in the same second gets its own folder
    const release = `${stamp}-${hash.slice(0, 12)}-${randomBytes(2).toString('hex')}`;
    const releases = path.join(opts.siteDir, 'releases');
    mkdirSync(releases, { recursive: true });
    // Copy into a hidden folder first (the volume is another filesystem), then rename into place
    const staging = path.join(releases, `.staging-${release}`);
    cpSync(scratch, staging, { recursive: true });
    renameSync(staging, path.join(releases, release));

    switchCurrent(opts.siteDir, release);
    opts.log(`published ${release}`);
    const removed = pruneReleases(opts.siteDir, opts.keep);
    if (removed.length) opts.log(`removed old release(s): ${removed.join(', ')}`);
    return { status: 'published', release, removed };
  } finally {
    rmSync(scratch, { recursive: true, force: true });
  }
};

/**
 * The real build: `astro build` in a scratch copy of the blog project.
 *
 * Astro writes into the project folder while it builds (.astro/) and then renames files
 * into the output folder, so the project and the output must share a filesystem, and the
 * image's own files are read-only. The scratch copy holds the blog's sources; its
 * node_modules and the shared portfolio src/ are symlinks back into the image.
 */
export const astroBuild = (articlesDir: string, outDir: string): void => {
  const work = mkdtempSync(path.join(path.dirname(outDir), 'blog-work-'));
  const project = path.join(work, 'blog');
  try {
    cpSync(BLOG_ROOT, project, {
      recursive: true,
      filter: (src) => !['node_modules', 'dist', '.astro'].includes(path.basename(src)) || src === BLOG_ROOT,
    });
    symlinkSync(path.join(BLOG_ROOT, 'node_modules'), path.join(project, 'node_modules'));
    symlinkSync(path.resolve(BLOG_ROOT, '..', 'src'), path.join(work, 'src'));
    const astro = path.join(project, 'node_modules', 'astro', 'bin', 'astro.mjs');
    const result = spawnSync(process.execPath, [astro, 'build'], {
      cwd: project,
      stdio: 'inherit',
      env: {
        ...process.env,
        NODE_ENV: 'production',
        ASTRO_TELEMETRY_DISABLED: '1',
        ARTICLES_DIR: path.resolve(articlesDir),
        BLOG_OUT_DIR: outDir,
        BLOG_CACHE_DIR: path.join(work, 'cache'),
      },
    });
    if (result.status !== 0) throw new Error(`astro build failed (exit ${result.status ?? result.signal})`);
  } finally {
    rmSync(work, { recursive: true, force: true });
  }
};

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  try {
    publish({
      articlesDir: process.env.ARTICLES_DIR ?? '/content/articles',
      siteDir: process.env.SITE_DIR ?? '/content/site',
      buildId: process.env.BUILD_ID ?? 'dev',
      keep: Number(process.env.KEEP_RELEASES ?? '3'),
      force: process.argv.includes('--force'),
      build: astroBuild,
      log: (line) => console.log(`publish: ${line}`),
    });
  } catch (e) {
    console.error(`publish: failed: ${(e as Error).message}`);
    process.exitCode = 1;
  }
}
