import { LayoutGroup, motion } from 'framer-motion';
import type React from 'react';
import { useState } from 'react';

const navItems = [
  { id: '01', label: 'LIBRARY', href: '/garden' },
  { id: '02', label: 'EXPERIMENTS', href: '/experiments' },
  { id: '03', label: 'SYSTEM', href: '/specs' },
  { id: '04', label: 'ABOUT', href: '/about' },
];

export const CoordinateNav: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <nav className="flex flex-col md:flex-row gap-8 md:gap-16 items-start md:items-center">
      <LayoutGroup>
        {navItems.map((item, index) => (
          <a
            key={item.id}
            href={item.href}
            className="group relative flex flex-col no-underline"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <span className="font-mono text-[10px] text-muted-foreground mb-1 tracking-widest">
              [{item.id}]
            </span>
            <span className="font-sans text-sm font-medium tracking-widest group-hover:text-foreground transition-colors">
              / {item.label}
            </span>

            {hoveredIndex === index && (
              <motion.div
                layoutId="nav-underline"
                className="absolute -bottom-2 left-0 right-0 h-[1px] bg-foreground"
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
