import { getCollection } from 'astro:content';
import { experimental_AstroContainer } from 'astro/container';

export async function GET({ props }: { props: { entry: any } }) {
  const { entry } = props;
  const { Content } = await entry.render();
  
  const container = await experimental_AstroContainer.create();
  const html = await container.renderToString(Content);

  return new Response(JSON.stringify({
    content: html,
    ...entry.data
  }));
}

export async function getStaticPaths() {
  const posts = await getCollection('garden');
  return posts.map(entry => ({
    params: { slug: entry.slug },
    props: { entry },
  }));
}
