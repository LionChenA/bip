import type { IconType } from 'react-icons';
import {
  SiAstro,
  SiDocker,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRust,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si';

export interface TechItem {
  id: string;
  label: string;
  icon: IconType;
  color: string;
}

export const stack: Record<string, TechItem> = {
  react: {
    id: 'react',
    label: 'React',
    icon: SiReact,
    color: '#61DAFB',
  },
  typescript: {
    id: 'typescript',
    label: 'TypeScript',
    icon: SiTypescript,
    color: '#3178C6',
  },
  astro: {
    id: 'astro',
    label: 'Astro',
    icon: SiAstro,
    color: '#FF5D01',
  },
  tailwind: {
    id: 'tailwind',
    label: 'Tailwind CSS',
    icon: SiTailwindcss,
    color: '#06B6D4',
  },
  nextjs: {
    id: 'nextjs',
    label: 'Next.js',
    icon: SiNextdotjs,
    color: '#000000',
  },
  nodejs: {
    id: 'nodejs',
    label: 'Node.js',
    icon: SiNodedotjs,
    color: '#339933',
  },
  python: {
    id: 'python',
    label: 'Python',
    icon: SiPython,
    color: '#3776AB',
  },
  rust: {
    id: 'rust',
    label: 'Rust',
    icon: SiRust,
    color: '#000000',
  },
  docker: {
    id: 'docker',
    label: 'Docker',
    icon: SiDocker,
    color: '#2496ED',
  },
  postgresql: {
    id: 'postgresql',
    label: 'PostgreSQL',
    icon: SiPostgresql,
    color: '#4169E1',
  },
};
