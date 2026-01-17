// @ts-check

import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';
import remarkMath from 'remark-math';
import remarkToc from 'remark-toc';

// https://astro.build/config
export default defineConfig({
  site: 'https://lionchena.github.io',
  base: '/bip',
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [react(), sitemap()],
  markdown: {
    remarkPlugins: [remarkMath, remarkToc],
    rehypePlugins: [rehypeKatex, rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]],
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },
});
