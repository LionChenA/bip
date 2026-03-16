import { z } from 'astro:content';

export const LEARNING_TYPES = ['lecture', 'project', 'hw', 'exam', 'reading', 'note'] as const;
export type LearningType = (typeof LEARNING_TYPES)[number];

export const LEARNING_STATUSES = ['not_started', 'in_progress', 'completed', 'reviewed'] as const;
export type LearningStatus = (typeof LEARNING_STATUSES)[number];

export interface Syllabus {
  id: string;
  name: string;
  institution: string;
  term: string;
  year: number;
  items: SyllabusItem[];
}

export interface SyllabusItem {
  id: string;
  title: string;
  type: LearningType;
  order: number;
  dependencies?: string[];
}

export interface LearningData {
  courseId: string;
  totalItems: number;
  completedItems: number;
  progress: number;
  lastUpdated: Date;
  items: LearningProgressItem[];
}

export interface LearningProgressItem {
  slug: string;
  title: string;
  type: LearningType;
  status: LearningStatus;
  completedDate?: Date;
}

export interface IntellectSummary {
  totalCourses: number;
  totalItems: number;
  completedItems: number;
  overallProgress: number;
  courses: CourseProgress[];
}

export interface CourseProgress {
  courseId: string;
  courseName: string;
  progress: number;
  completedItems: number;
  totalItems: number;
  recentActivity?: {
    slug: string;
    title: string;
    status: LearningStatus;
    date: Date;
  };
}

export const LearningSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  courseId: z.string(),
  courseName: z.string(),
  type: z.enum(LEARNING_TYPES),
  status: z.enum(LEARNING_STATUSES).default('not_started'),
  isPublic: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
  order: z.number().default(0),
  dueDate: z.date().optional(),
  completedDate: z.date().optional(),
});

export type LearningContent = z.infer<typeof LearningSchema>;
