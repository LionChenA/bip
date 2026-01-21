import { BookOpen, Cpu, Terminal } from 'lucide-react';
import type { IconType } from 'react-icons';
import {
  SiAstro,
  SiDocker,
  SiOpenai,
  SiPython,
  SiReact,
  SiRust,
  SiTypescript,
} from 'react-icons/si';

export type StackCategory = 'Code' | 'AI' | 'Course' | 'Environment';

export interface TechItem {
  id: string;
  label: string;
  icon: IconType | any;
  category: StackCategory;
}

export const stack: Record<string, TechItem> = {
  typescript: {
    id: 'typescript',
    label: 'TypeScript',
    icon: SiTypescript,
    category: 'Code',
  },
  react: {
    id: 'react',
    label: 'React',
    icon: SiReact,
    category: 'Code',
  },
  astro: {
    id: 'astro',
    label: 'Astro',
    icon: SiAstro,
    category: 'Code',
  },
  python: {
    id: 'python',
    label: 'Python',
    icon: SiPython,
    category: 'Code',
  },
  rust: {
    id: 'rust',
    label: 'Rust',
    icon: SiRust,
    category: 'Code',
  },
  llm: {
    id: 'llm',
    label: 'LLM Reasoning',
    icon: SiOpenai,
    category: 'AI',
  },
  opencode: {
    id: 'opencode',
    label: 'OpenCode',
    icon: Cpu,
    category: 'AI',
  },
  cs61b: {
    id: 'cs61b',
    label: 'CS61B: Data Structures',
    icon: BookOpen,
    category: 'Course',
  },
  cs188: {
    id: 'cs188',
    label: 'CS188: Intro to AI',
    icon: BookOpen,
    category: 'Course',
  },
  docker: {
    id: 'docker',
    label: 'Docker',
    icon: SiDocker,
    category: 'Environment',
  },
  terminal: {
    id: 'terminal',
    label: 'Terminal',
    icon: Terminal,
    category: 'Environment',
  },
};
