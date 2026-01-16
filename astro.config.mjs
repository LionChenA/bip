// @ts-check

import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkToc from 'remark-toc';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://bip.dev',
  vite: {
      plugins: [tailwindcss()],
    },

  integrations: [react(), sitemap()],
  markdown: {
    remarkPlugins: [remarkMath, remarkToc],
    rehypePlugins: [
      rehypeKatex,
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap' }]
    ],
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },
});
