import gardenMeta from '../../data/garden-meta.json';

export async function GET() {
  return new Response(JSON.stringify(gardenMeta));
}
