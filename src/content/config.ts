import { defineCollection, z } from 'astro:content';

const garden = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    lastGroomed: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    tags: z.array(z.string()).default([]),
    lang: z.enum(['en', 'zh']).default('en'),
    type: z
      .enum([
        'evergreen',
        'literature',
        'article',
        'note',
        'thought',
        'essay',
        'snippet',
        'Essay',
        'Note',
        'Snippet',
        'Thought',
      ])
      .default('article'),
  }),
});

const portfolio = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string().optional(),
    link: z.string().url().optional(),
    tags: z.array(z.string()).default([]),
    stack: z.array(z.string()).default([]),
    lang: z.enum(['en', 'zh']).default('en'),
    sortOrder: z.number().default(0),
    featured: z.boolean().default(false),
  }),
});

export const collections = { portfolio, garden };
