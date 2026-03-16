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
      .enum(['evergreen', 'literature', 'article', 'note', 'thought', 'essay', 'snippet'])
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

const learning = defineCollection({
  type: 'content',
  schema: z.object({
    moduleId: z.string(),
    courseId: z.string(),
    courseName: z.string(),
    status: z.enum(['not_started', 'in_progress', 'completed', 'reviewed']).default('not_started'),
    isPublic: z.boolean().default(false),
    title: z.string(),
    description: z.string().optional(),
    tags: z.array(z.string()).default([]),
    completedDate: z.coerce.date().optional(),
  }),
});

export const collections = { portfolio, garden, learning };
