import type { SiteLink } from '@/types/portfolio';

// The rest of the site: docs, component library, blog and source. Shared by the
// portfolio header, footer and terminal, and by the blog (blog/), so it imports
// nothing but a type.
// /blog is served by the Express server from a mounted volume (BLOG_PATH).
export const siteLinks: SiteLink[] = [
  { id: 'docs', label: 'Docs', href: '/docs/' },
  { id: 'storybook', label: 'Components', href: '/storybook/' },
  { id: 'blog', label: 'Blog', href: '/blog/' },
  { id: 'source', label: 'Source', href: 'https://github.com/DapperDivers/developer-portfolio', external: true },
];
