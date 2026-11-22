import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
/** Paths the blog itself uses; an article can't take them */
const RESERVED = new Set(['topics', '404', 'rss', 'media', 'assets', '_astro']);

/** Published posts, newest first. A folder name that isn't a clean, free slug fails the build. */
export const getPosts = async (): Promise<Post[]> => {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  for (const post of posts) {
    if (!SLUG.test(post.id)) {
      throw new Error(`Article folder "${post.id}" is not a valid slug (lowercase words joined by hyphens)`);
    }
    if (RESERVED.has(post.id)) {
      throw new Error(`Article folder "${post.id}" uses a name the blog reserves for its own pages`);
    }
  }
  return posts.sort((a, b) => b.data.published.getTime() - a.data.published.getTime());
};

/** Every topic with its posts, alphabetical. */
export const getTopics = async (): Promise<Map<string, Post[]>> => {
  const topics = new Map<string, Post[]>();
  for (const post of await getPosts()) {
    for (const topic of post.data.topics) {
      topics.set(topic, [...(topics.get(topic) ?? []), post]);
    }
  }
  return new Map([...topics.entries()].sort(([a], [b]) => a.localeCompare(b)));
};

/** "November 21, 2026", in UTC so the date never shifts with the build machine's zone. */
export const formatDate = (date: Date): string =>
  date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });

/** "2026-11-21" for <time datetime>. */
export const isoDate = (date: Date): string => date.toISOString().slice(0, 10);

/** Rough reading time at 230 words a minute, at least one minute. */
export const readingMinutes = (markdown: string | undefined): number =>
  Math.max(1, Math.round((markdown ?? '').split(/\s+/).filter(Boolean).length / 230));

/** Path under the blog base, e.g. url('waiting-is-not-failing/') -> /blog/waiting-is-not-failing/ */
export const url = (path = ''): string => `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path}`;
