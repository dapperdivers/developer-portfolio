// @ts-check
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import rehypeCallouts from 'rehype-callouts';
import { unified } from '@astrojs/markdown-remark';

// The portfolio's source, shared read-only: design tokens and props-only React molecules
const portfolioSrc = fileURLToPath(new URL('../src', import.meta.url));

export default defineConfig({
  site: 'https://derekmackley.com',
  // Served by the portfolio's Express server from the blog-content volume
  base: '/blog',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  outDir: process.env.BLOG_OUT_DIR ?? './dist',
  // The publisher's root filesystem is read-only; keep caches in /tmp there
  cacheDir: process.env.BLOG_CACHE_DIR ?? './node_modules/.astro',
  integrations: [react(), sitemap()],
  markdown: {
    processor: unified({
      // Raw HTML in an article is not rendered; articles are Markdown only
      remarkRehype: { allowDangerousHtml: false },
      rehypePlugins: [[rehypeCallouts, { theme: 'github' }]],
    }),
    shikiConfig: { theme: 'github-dark-dimmed', wrap: true },
  },
  vite: {
    resolve: {
      alias: {
        '@': portfolioSrc,
        '@molecules': `${portfolioSrc}/components/molecules`,
        '@atoms': `${portfolioSrc}/components/atoms`,
        '@utils': `${portfolioSrc}/utils`,
        '@tokens': `${portfolioSrc}/assets/css/design-system`,
      },
      // Components under ../src must use this package's React, not a second copy
      dedupe: ['react', 'react-dom', 'framer-motion'],
    },
    server: { fs: { allow: ['..'] } },
  },
});
