import fs from 'node:fs';
import path from 'node:path';

const contentDir = path.join(process.cwd(), 'src/content/garden');
const outputDir = path.join(process.cwd(), 'src/data');
const outputFile = path.join(outputDir, 'backlinks.json');
const metaFile = path.join(outputDir, 'garden-meta.json');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function getSlug(filename: string) {
  return filename.replace(/\.(md|mdx)$/, '');
}

export function generateBacklinks() {
  console.log('Generating backlinks...');
  
  if (!fs.existsSync(contentDir)) {
    console.warn('Garden directory not found:', contentDir);
    return;
  }

  const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));

  const links: Record<string, string[]> = {};
  const backlinks: Record<string, { slug: string, title: string, excerpt?: string }[]> = {};
  const gardenMeta: any[] = [];
  const meta: Record<string, { title: string }> = {};

  files.forEach(file => {
    const slug = getSlug(file);
    const content = fs.readFileSync(path.join(contentDir, file), 'utf-8');
    
    const titleMatch = content.match(/^title:\s*["']?(.*?)["']?$/m);
    const title = titleMatch ? titleMatch[1] : slug;
    
    const dateMatch = content.match(/^pubDate:\s*["']?(.*?)["']?$/m);
    const pubDate = dateMatch ? dateMatch[1] : '';

    const typeMatch = content.match(/^type:\s*["']?(.*?)["']?$/m);
    const type = typeMatch ? typeMatch[1] : 'article';

    const descMatch = content.match(/^description:\s*["']?(.*?)["']?$/m);
    const description = descMatch ? descMatch[1] : '';

    const langMatch = content.match(/^lang:\s*["']?(.*?)["']?$/m);
    const lang = langMatch ? langMatch[1] : 'en';

    meta[slug] = { title };

    gardenMeta.push({
      slug,
      title,
      pubDate,
      type,
      description,
      lang,
    });

    if (!links[slug]) links[slug] = [];
    
    const linkRegex = /\[.*?\]\(\/garden\/([^)]+)\)/g;
    const standardLinks = [...content.matchAll(linkRegex)];
    
    for (const match of standardLinks) {
      const targetSlug = match[1];
      if (!links[slug].includes(targetSlug)) {
        links[slug].push(targetSlug);
      }
    }
    
    const wikiRegex = /\[\[(.*?)\]\]/g;
    const wikiLinks = [...content.matchAll(wikiRegex)];
    
    for (const match of wikiLinks) {
      const targetRaw = match[1];
      const targetSlug = targetRaw.toLowerCase().replace(/\s+/g, '-');
      if (!links[slug].includes(targetSlug)) {
          links[slug].push(targetSlug);
      }
    }
  });

  Object.keys(links).forEach(sourceSlug => {
    links[sourceSlug].forEach(targetSlug => {
      const cleanTarget = targetSlug.split('#')[0].split('?')[0];
      
      if (!backlinks[cleanTarget]) backlinks[cleanTarget] = [];
      
      if (!backlinks[cleanTarget].find(b => b.slug === sourceSlug)) {
          backlinks[cleanTarget].push({
              slug: sourceSlug,
              title: meta[sourceSlug]?.title || sourceSlug
          });
      }
    });
  });

  fs.writeFileSync(outputFile, JSON.stringify(backlinks, null, 2));
  fs.writeFileSync(metaFile, JSON.stringify(gardenMeta, null, 2));
  console.log(`Generated backlinks for ${Object.keys(backlinks).length} notes.`);
  console.log(`Generated metadata for ${gardenMeta.length} notes.`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  generateBacklinks();
}
