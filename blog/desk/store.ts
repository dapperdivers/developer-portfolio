/**
 * The desk's view of the vault and the blog-content volume, and the push itself.
 *
 *   <vault>/Projects/Blog/**.md with `type: blog-post`   the posts (read only)
 *   <content>/articles/<slug>/                           pushed articles (the builder's input)
 *   <content>/site/current/<slug>/index.html             what is live right now
 *   <content>/.desk-staging/                             the desk's scratch space for atomic pushes
 *
 * Staging lives outside articles/ on purpose: the builder refuses hidden entries there,
 * so a half-finished push must never appear inside it.
 */
import { randomBytes } from 'node:crypto';
import { existsSync, mkdirSync, readdirSync, readFileSync, renameSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { BLOG_FOLDER, describeNote, hashFiles, splitFrontmatter, type Article, type NoteInfo } from './export.ts';

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export interface Paths {
  vault: string;
  content: string;
}

const articlesDir = (p: Paths) => path.join(p.content, 'articles');
const stagingDir = (p: Paths) => path.join(p.content, '.desk-staging');

/** Blog posts in the vault (notes with `type: blog-post` under the blog folder), no symlinks. */
export const listPosts = (p: Paths): NoteInfo[] => {
  const root = path.join(p.vault, BLOG_FOLDER);
  if (!existsSync(root)) return [];
  const out: NoteInfo[] = [];
  const walk = (dir: string) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (entry.name.startsWith('.') || entry.isSymbolicLink()) continue;
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.isFile() && entry.name.endsWith('.md')) {
        const raw = readFileSync(full, 'utf8');
        if (splitFrontmatter(raw).data.type !== 'blog-post') continue;
        out.push(describeNote(path.relative(p.vault, full).split(path.sep).join('/'), raw));
      }
    }
  };
  walk(root);
  // Closest to done first, then by title
  const order = ['published', 'edit', 'draft', 'drafting', 'outline', 'idea', 'suggested'];
  const rank = (stage: string) => (order.includes(stage) ? order.indexOf(stage) : order.length);
  return out.sort((a, b) => rank(a.stage) - rank(b.stage) || a.title.localeCompare(b.title));
};

/** Resolves a note path from a request; null unless it is a .md file inside the blog folder. */
export const safeNotePath = (p: Paths, rel: string): string | null => {
  if (typeof rel !== 'string' || !rel.endsWith('.md') || rel.includes('\0')) return null;
  const root = path.resolve(p.vault, BLOG_FOLDER);
  const full = path.resolve(p.vault, rel);
  if (!full.startsWith(root + path.sep)) return null;
  return existsSync(full) ? path.relative(p.vault, full).split(path.sep).join('/') : null;
};

/** Slug → hash of the pushed files. */
export const pushedArticles = (p: Paths): Map<string, string> => {
  const out = new Map<string, string>();
  const dir = articlesDir(p);
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory() || !SLUG.test(entry.name)) continue;
    const files = new Map<string, Buffer>();
    for (const f of readdirSync(path.join(dir, entry.name), { withFileTypes: true })) {
      if (f.isFile()) files.set(f.name, readFileSync(path.join(dir, entry.name, f.name)));
    }
    out.set(entry.name, hashFiles(files));
  }
  return out;
};

/** Slugs with a page in the live site. */
export const liveSlugs = (p: Paths): Set<string> => {
  const current = path.join(p.content, 'site', 'current');
  if (!existsSync(current)) return new Set();
  return new Set(
    readdirSync(current, { withFileTypes: true })
      .filter((e) => e.isDirectory() && SLUG.test(e.name) && existsSync(path.join(current, e.name, 'index.html')))
      .map((e) => e.name),
  );
};

/** Note name and path (without .md) → slug, for posts that are pushed: what [[links]] may point at. */
export const linkTargets = (posts: NoteInfo[], pushed: Map<string, string>): Map<string, string> => {
  const out = new Map<string, string>();
  for (const post of posts) {
    if (!pushed.has(post.slug)) continue;
    out.set(post.name, post.slug);
    out.set(post.rel.replace(/\.md$/, ''), post.slug);
  }
  return out;
};

/** Writes an article folder, replacing any previous version in one rename. */
export const pushArticle = (p: Paths, article: Article): void => {
  if (!SLUG.test(article.slug)) throw new Error(`invalid slug: ${article.slug}`);
  const staging = stagingDir(p);
  const articles = articlesDir(p);
  mkdirSync(staging, { recursive: true });
  mkdirSync(articles, { recursive: true });
  const id = randomBytes(4).toString('hex');
  const next = path.join(staging, `${article.slug}-${id}`);
  mkdirSync(next);
  for (const [name, data] of article.files) {
    if (name.includes('/') || name.startsWith('.')) throw new Error(`invalid file name: ${name}`);
    writeFileSync(path.join(next, name), data);
  }
  const target = path.join(articles, article.slug);
  if (existsSync(target)) {
    const old = path.join(staging, `old-${article.slug}-${id}`);
    renameSync(target, old);
    renameSync(next, target);
    rmSync(old, { recursive: true, force: true });
  } else {
    renameSync(next, target);
  }
};

/** Removes a pushed article; the builder drops it from the site on its next run. */
export const unpushArticle = (p: Paths, slug: string): boolean => {
  if (!SLUG.test(slug)) throw new Error(`invalid slug: ${slug}`);
  const target = path.join(articlesDir(p), slug);
  if (!existsSync(target)) return false;
  mkdirSync(stagingDir(p), { recursive: true });
  const gone = path.join(stagingDir(p), `removed-${slug}-${randomBytes(4).toString('hex')}`);
  renameSync(target, gone);
  rmSync(gone, { recursive: true, force: true });
  return true;
};
