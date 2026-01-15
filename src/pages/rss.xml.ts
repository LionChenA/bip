import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context: any) {
  const posts = await getCollection('garden');
  return rss({
    title: 'Sisyphus Digital Garden',
    description: 'A minimalist digital garden and portfolio exploring software engineering, design, and philosophy.',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/${post.data.lang}/garden/${post.slug}/`,
    })),
  });
}
