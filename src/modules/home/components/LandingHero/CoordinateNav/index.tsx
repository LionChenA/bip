import { LayoutGroup, motion } from 'framer-motion';
import type React from 'react';
import { useEffect, useState } from 'react';
import { path } from '@/lib/routing';

const NAV_ITEMS = [
  { id: '01', label: { en: 'GARDEN', zh: '数字花园' }, baseHref: '/garden' },
  { id: '02', label: { en: 'WORK', zh: '作品项目' }, baseHref: '/work' },
  { id: '03', label: { en: 'ABOUT', zh: '关于自我' }, baseHref: '/about' },
];

export const CoordinateNav: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [lang, setLang] = useState<'en' | 'zh'>('zh');

  useEffect(() => {
    const detectedLang = navigator.language.toLowerCase().startsWith('zh') ? 'zh' : 'en';
    setLang(detectedLang);
  }, []);

  return (
    <nav className="flex flex-col items-start gap-8 md:flex-row md:items-center md:gap-16">
      <LayoutGroup>
        {NAV_ITEMS.map((item, index) => (
          <a
            key={item.id}
            href={path(`/${lang}${item.baseHref}`)}
            className="group relative flex flex-col no-underline"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <span className="mb-1 font-mono text-[10px] text-muted-foreground tracking-widest">
              [{item.id}]
            </span>
            <span className="font-medium font-sans text-sm tracking-widest transition-colors group-hover:text-foreground">
              / {lang === 'zh' ? item.label.zh : item.label.en}
            </span>

            {hoveredIndex === index && (
              <motion.div
                layoutId="nav-underline"
                className="absolute right-0 -bottom-2 left-0 h-[1px] bg-foreground"
                transition={{
                  type: 'spring',
                  stiffness: 380,
                  damping: 30,
                }}
              />
            )}
          </a>
        ))}
      </LayoutGroup>
    </nav>
  );
};
