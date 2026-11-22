/**
 * Turns ONE vault note into a blog article folder: the push step of the blog desk.
 *
 * Private side only. The desk runs with the vault mounted read-only; this module reads a
 * single note under BLOG_FOLDER and returns the files of its article:
 *
 *   index.md      front matter: title, description, published, updated, topics (nothing else)
 *                 body: everything after the note's `## Draft` heading (the last section)
 *                 The public description comes from the note's `summary:`; the note's own
 *                 `description:` is vault metadata (the vault catalog reads it) and stays there.
 *   <images>      images the draft embeds, copied next to index.md
 *
 * Conversion (code, fenced and inline, is never touched):
 *   [[Other note|label]]   → a link to /blog/<slug>/ when that note is live, else plain text
 *   ![[image.png|alt]]     → ![alt](./image.png), the file copied with the article
 *   ![[note]] embeds       → removed
 *   [text](note.md)        → text
 *   %% comment %%, <!-- --> → removed (private notes stay private)
 *   > [!info] Obsidian callouts → the nearest GitHub callout type
 *
 * Front matter fields such as `related`, `tags` or `source-articles` never leave the
 * vault: they would leak note titles.
 */
import { createHash } from 'node:crypto';
import { lstatSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { parse as parseYaml, stringify as stringifyYaml } from 'yaml';

export const BLOG_FOLDER = 'Projects/Blog';
const IMAGE_EXT = new Set(['.png', '.jpg', '.jpeg', '.gif', '.webp', '.avif', '.svg']);
const MAX_IMAGE_BYTES = 10 * 1024 * 1024;
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
/** Paths the blog uses for its own pages (blog/src/lib/posts.ts) */
export const RESERVED_SLUGS = new Set(['topics', '404', 'rss', 'media', 'assets', '_astro']);

/** Obsidian callout types → the five GitHub ones the blog styles. */
const CALLOUTS: Record<string, string> = {
  note: 'NOTE', info: 'NOTE', abstract: 'NOTE', summary: 'NOTE', tldr: 'NOTE', todo: 'NOTE',
  question: 'NOTE', help: 'NOTE', faq: 'NOTE', example: 'NOTE', quote: 'NOTE', cite: 'NOTE',
  tip: 'TIP', hint: 'TIP', success: 'TIP', check: 'TIP', done: 'TIP',
  important: 'IMPORTANT',
  warning: 'WARNING', caution: 'CAUTION', attention: 'WARNING',
  failure: 'CAUTION', fail: 'CAUTION', missing: 'CAUTION', danger: 'CAUTION', error: 'CAUTION', bug: 'CAUTION',
};

export interface ArticleMeta {
  title: string;
  description: string;
  published: string;
  updated?: string;
  topics: string[];
}

export interface NoteInfo {
  /** Path relative to the vault, e.g. "Projects/Blog/Ideas/GitOps/Waiting Is Not Failing.md" */
  rel: string;
  name: string;
  title: string;
  slug: string;
  stage: string;
  pillar: string;
  /** Why this note can't be made live yet; empty when it can */
  problems: string[];
}

export interface Article {
  slug: string;
  meta: ArticleMeta;
  /** File name → contents, index.md first */
  files: Map<string, Buffer>;
  /** sha256 over the files, to compare with what is already pushed */
  hash: string;
  warnings: string[];
}

export const slugify = (text: string): string =>
  text
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
    .replace(/-+$/, '');

export const splitFrontmatter = (raw: string): { data: Record<string, unknown>; body: string } => {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, body: raw };
  try {
    const data = parseYaml(match[1]);
    return { data: data && typeof data === 'object' && !Array.isArray(data) ? data : {}, body: match[2] };
  } catch {
    return { data: {}, body: match[2] };
  }
};

/**
 * Everything after the `## Draft` heading to the end of the note: the post itself.
 * `## Draft` is the last section of a blog note, so the post can use its own `##`
 * headings. A `## Draft` line inside a code block does not count.
 */
export const draftSection = (body: string): string => {
  const lines = body.split(/\r?\n/);
  let inFence = false;
  for (let i = 0; i < lines.length; i++) {
    if (/^\s*(```|~~~)/.test(lines[i])) inFence = !inFence;
    if (!inFence && /^##\s+Draft\s*$/.test(lines[i])) return lines.slice(i + 1).join('\n').trim();
  }
  return '';
};

const isDate = (v: unknown): boolean =>
  v instanceof Date ? !Number.isNaN(v.getTime()) : typeof v === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(v);
const toDate = (v: unknown): string => (v instanceof Date ? v.toISOString().slice(0, 10) : String(v));
const firstHeading = (body: string): string => body.match(/^# (.+)$/m)?.[1]?.trim() ?? '';

/** What the desk lists for a note, with everything that blocks making it live. */
export const describeNote = (rel: string, raw: string): NoteInfo => {
  const { data, body } = splitFrontmatter(raw);
  const name = path.basename(rel, '.md');
  const title = typeof data.title === 'string' && data.title.trim() ? data.title.trim() : firstHeading(body) || name;
  const slug = typeof data.slug === 'string' && data.slug.trim() ? slugify(data.slug) : slugify(title);
  const problems: string[] = [];
  if (typeof data.summary !== 'string' || !data.summary.trim()) problems.push('add summary: (the public one-line description)');
  if (!isDate(data.published)) problems.push('add published: YYYY-MM-DD');
  if (data.updated !== undefined && data.updated !== null && !isDate(data.updated)) problems.push('updated must be YYYY-MM-DD');
  if (data.topics !== undefined && !Array.isArray(data.topics)) problems.push('topics must be a list');
  if (!draftSection(body)) problems.push('write the post under ## Draft');
  if (!SLUG.test(slug)) problems.push('the title gives no usable slug; set slug:');
  else if (RESERVED_SLUGS.has(slug)) problems.push(`"${slug}" is reserved; set slug:`);
  return {
    rel,
    name,
    title,
    slug,
    stage: typeof data.stage === 'string' ? data.stage : '',
    pillar: typeof data.pillar === 'string' ? data.pillar : '',
    problems,
  };
};

const segments = (text: string): Array<{ code: boolean; text: string }> => {
  const out: Array<{ code: boolean; text: string }> = [];
  const inline = (t: string) => {
    let last = 0;
    for (const m of t.matchAll(/(`+)[^`]*?\1/g)) {
      out.push({ code: false, text: t.slice(last, m.index) }, { code: true, text: m[0] });
      last = m.index + m[0].length;
    }
    out.push({ code: false, text: t.slice(last) });
  };
  let last = 0;
  for (const m of text.matchAll(/^(```|~~~)[^\n]*\n[\s\S]*?^\1[^\n]*$/gm)) {
    inline(text.slice(last, m.index));
    out.push({ code: true, text: m[0] });
    last = m.index + m[0].length;
  }
  inline(text.slice(last));
  return out;
};

const escapeText = (text: string): string => text.replace(/([\\[\]*_<>])/g, '\\$1');

export interface ConvertContext {
  /** Note name or vault path (without .md) → slug, for notes that are live */
  liveSlugs: Map<string, string>;
  /** Image file name → absolute path, anywhere in the vault */
  images: Map<string, string>;
  /** Collects the images to ship: returns the file name to use next to index.md, or null */
  addImage: (source: string, name: string) => string | null;
  warn: (message: string) => void;
}

const convertProse = (text: string, ctx: ConvertContext): string =>
  text
    .replace(/%%[\s\S]*?%%/g, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    // Callout headers: > [!info] Title  →  > [!NOTE] Title
    .replace(/^(\s*>\s*)\[!([A-Za-z-]+)\]([+-]?)/gm, (_m, lead: string, type: string) =>
      `${lead}[!${CALLOUTS[type.toLowerCase()] ?? 'NOTE'}]`)
    .replace(/!\[\[([^\]|#]+)(?:#[^\]|]*)?(?:\|([^\]]*))?\]\]/g, (_m, target: string, alt: string | undefined) => {
      const name = path.basename(target.trim());
      if (!IMAGE_EXT.has(path.extname(name).toLowerCase())) return '';
      const source = ctx.images.get(name);
      if (!source) {
        ctx.warn(`image not found in the vault: ${name}`);
        return '';
      }
      const file = ctx.addImage(source, name);
      if (!file) return '';
      const altText = alt && !/^\d+(x\d+)?$/.test(alt.trim()) ? alt.trim() : path.parse(name).name;
      return `![${escapeText(altText)}](./${file})`;
    })
    .replace(/\[\[([^\]|#]+)(?:#[^\]|]*)?(?:\|([^\]]*))?\]\]/g, (_m, target: string, label: string | undefined) => {
      const clean = target.trim();
      const text = (label ?? path.basename(clean)).trim();
      const slug = ctx.liveSlugs.get(clean) ?? ctx.liveSlugs.get(path.basename(clean));
      return slug ? `[${escapeText(text)}](/blog/${slug}/)` : escapeText(text);
    })
    .replace(/(?<!!)\[([^\]]*)\]\((?!https?:|mailto:|#|\/)([^)\s]+\.md)(?:#[^)]*)?\)/g, (_m, label: string) => label)
    // Any other relative image can't be resolved safely
    .replace(/!\[[^\]]*\]\((?!https?:|\.\/[a-z0-9-]+\.[a-z]+\))[^)]*\)/g, '');

export const convertBody = (draft: string, ctx: ConvertContext): string =>
  segments(draft)
    .map((s) => (s.code ? s.text : convertProse(s.text, ctx)))
    .join('')
    .replace(/\n{3,}/g, '\n\n')
    .trim() + '\n';

/** Image file name → absolute path for every image in the vault (first match wins), no symlinks. */
export const indexImages = (vaultDir: string): Map<string, string> => {
  const index = new Map<string, string>();
  const walk = (dir: string) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (entry.name.startsWith('.') || entry.isSymbolicLink()) continue;
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.isFile() && IMAGE_EXT.has(path.extname(entry.name).toLowerCase()) && !index.has(entry.name)) {
        index.set(entry.name, full);
      }
    }
  };
  walk(vaultDir);
  return index;
};

export const hashFiles = (files: Map<string, Buffer>): string => {
  const hash = createHash('sha256');
  for (const name of [...files.keys()].sort()) hash.update(name).update('\0').update(files.get(name)!).update('\0');
  return hash.digest('hex');
};

/**
 * Builds the article for one note. Throws when the note can't be made live
 * (see describeNote's problems).
 */
export const exportNote = (
  vaultDir: string,
  rel: string,
  liveSlugs: Map<string, string>,
  images: Map<string, string> = indexImages(vaultDir),
): Article => {
  const raw = readFileSync(path.join(vaultDir, rel), 'utf8');
  const info = describeNote(rel, raw);
  if (info.problems.length) throw new Error(info.problems.join('; '));
  const { data, body } = splitFrontmatter(raw);
  const files = new Map<string, Buffer>();
  const warnings: string[] = [];
  const used = new Map<string, string>();
  const content = convertBody(draftSection(body), {
    liveSlugs,
    images,
    warn: (m) => warnings.push(m),
    addImage: (source, name) => {
      if (used.has(source)) return used.get(source)!;
      const size = lstatSync(source).size;
      if (size > MAX_IMAGE_BYTES) {
        warnings.push(`image too large to publish: ${name}`);
        return null;
      }
      const parsed = path.parse(name);
      let file = `${slugify(parsed.name) || 'image'}${parsed.ext.toLowerCase()}`;
      for (let n = 2; [...used.values()].includes(file) || file === 'index.md'; n++) {
        file = `${slugify(parsed.name) || 'image'}-${n}${parsed.ext.toLowerCase()}`;
      }
      files.set(file, readFileSync(source));
      used.set(source, file);
      return file;
    },
  });
  const meta: ArticleMeta = {
    title: info.title,
    description: String(data.summary).trim(),
    published: toDate(data.published),
    ...(data.updated ? { updated: toDate(data.updated) } : {}),
    topics: [...new Set(((data.topics as unknown[]) ?? []).map((t) => slugify(String(t))).filter(Boolean))],
  };
  const index = `---\n${stringifyYaml(meta, { lineWidth: 0 }).trimEnd()}\n---\n\n${content}`;
  const ordered = new Map<string, Buffer>([['index.md', Buffer.from(index)], ...files]);
  return { slug: info.slug, meta, files: ordered, hash: hashFiles(ordered), warnings };
};
