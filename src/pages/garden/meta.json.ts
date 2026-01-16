import { getCollection } from 'astro:content';

export async function GET() {
  const posts = await getCollection('garden');
  
  const items = posts.map(post => ({
    slug: post.slug,
    title: post.data.title,
    description: post.data.description || '',
    pubDate: post.data.pubDate,
    type: post.data.type,
    lang: post.data.lang,
    tags: post.data.tags,
    preview: post.body.substring(0, 1000)
  }));

  return new Response(JSON.stringify(items));
}
