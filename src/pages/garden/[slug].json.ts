import { getCollection } from 'astro:content';
import { experimental_AstroContainer } from 'astro/container';
import backlinks from '../../modules/garden/data/backlinks.json';

export async function GET({ props }: { props: { entry: any } }) {
  const { entry } = props;
  const { Content } = await entry.render();

  const container = await experimental_AstroContainer.create();
  const html = await container.renderToString(Content);

  const entryBacklinks = (backlinks as Record<string, any>)[entry.slug] || [];

  return new Response(
    JSON.stringify({
      content: html,
      backlinks: entryBacklinks,
      ...entry.data,
    })
  );
}

export async function getStaticPaths() {
  const posts = await getCollection('garden');
  return posts.map((entry) => ({
    params: { slug: entry.slug },
    props: { entry },
  }));
}
