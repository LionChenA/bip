import { useEffect, useState } from 'react';

interface TOCProps {
  content: string;
}

interface Heading {
  id: string;
  text: string;
  level: number;
}

export function TOC({ content }: TOCProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);

  useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const elements = Array.from(doc.querySelectorAll('h2, h3'));

    const extracted = elements.map((el, index) => {
      const id = el.id || `heading-${index}`;
      return {
        id,
        text: el.textContent || '',
        level: parseInt(el.tagName.substring(1), 10),
      };
    });

    setHeadings(extracted);
  }, [content]);

  if (headings.length === 0) return null;

  return (
    <div className="fixed top-32 right-8 hidden w-48 xl:block">
      <h4 className="mb-4 font-bold text-muted-foreground text-sm">On this page</h4>
      <ul className="space-y-2 text-sm">
        {headings.map((heading) => (
          <li key={heading.id} style={{ paddingLeft: (heading.level - 2) * 12 }}>
            <a
              href={`#${heading.id}`}
              className="text-muted-foreground transition-colors hover:text-foreground"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(heading.id);
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
