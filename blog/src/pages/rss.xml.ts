import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPosts, url } from '../lib/posts';

export async function GET(context: APIContext) {
  const posts = await getPosts();
  return rss({
    title: "Derek Mackley's blog",
    description: 'Security engineering, AI agents and the Kubernetes cluster in my garage.',
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.published,
      link: url(`${post.id}/`),
      categories: post.data.topics,
    })),
  });
}
