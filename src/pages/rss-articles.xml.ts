import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';

export async function GET(context: any) {
  const posts = await getCollection('garden', ({ data }) => {
    return data.type === 'article';
  });
  return rss({
    title: 'Sisyphus Articles',
    description: 'Long-form articles and essays from the digital garden.',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/${post.data.lang}/garden/${post.slug}/`,
    })),
  });
}
