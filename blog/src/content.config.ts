import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Articles arrive from the push process, one folder per post:
 *
 *   <ARTICLES_DIR>/<slug>/index.md     front matter below + standard Markdown
 *   <ARTICLES_DIR>/<slug>/<image>      referenced as ![alt](./image.png)
 *
 * The builder never sees the vault. Anything that does not match this schema
 * fails the build, so a bad push can't ship a broken or half-filled page.
 */
const articlesDir = process.env.ARTICLES_DIR ?? './fixtures/articles';

const posts = defineCollection({
  loader: glob({
    pattern: '*/index.md',
    base: articlesDir,
    // The folder name is the slug: "waiting-is-not-failing/index.md" -> "waiting-is-not-failing"
    generateId: ({ entry }) => entry.split('/')[0],
  }),
  schema: z.object({
    title: z.string().min(1).max(120),
    description: z.string().min(1).max(300),
    published: z.coerce.date(),
    updated: z.coerce.date().optional(),
    topics: z.array(z.string().regex(/^[a-z0-9-]+$/, 'topics are lowercase words joined by hyphens')).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };
