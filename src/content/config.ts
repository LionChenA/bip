import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    tags: z.array(z.string()).default([]),
    lang: z.enum(['en', 'zh']).default('en'),
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
    lang: z.enum(['en', 'zh']).default('en'),
    sortOrder: z.number().default(0),
  }),
});

export const collections = { blog, portfolio };
