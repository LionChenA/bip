import fs from 'node:fs';
import path from 'node:path';
import type { LearningStatus, LearningType } from '../types/learning';

// Types for .tutor/module.json format
type ModuleType =
  | 'lecture'
  | 'discussion'
  | 'lab'
  | 'homework'
  | 'project'
  | 'exam'
  | 'quiz'
  | 'reading';

interface CourseModule {
  id: string;
  type: ModuleType;
  title: string;
  status: 'not-started' | 'in-progress' | 'completed' | 'reviewed';
  completedDate?: string;
  from: string[];
  to: string[];
  resources: {
    video?: { url: string; has_subtitles?: boolean; note?: string };
    slides?: { url: string };
    textbook?: { url: string; chapter?: string };
  };
  subtitle_index?: {
    topics: Array<{ keyword: string; timestamps: number[] }>;
  };
  notes: string;
}

interface Syllabus {
  id: string;
  title: string;
  provider: string;
  url: string;
  textbook: string;
  textbook_url: string;
  expectations: {
    lectures: number;
    homeworks: number;
    projects: number;
  };
}

// ============================================
// Existing types for frontmatter (backward compatibility)
// ============================================

interface LearningFrontmatter {
  title: string;
  description?: string;
  courseId: string;
  courseName: string;
  type: LearningType;
  status: LearningStatus;
  isPublic: boolean;
  tags: string[];
  order: number;
  dueDate?: string;
  completedDate?: string;
}

interface CourseProgress {
  courseId: string;
  courseName: string;
  totalItems: number;
  completedItems: number;
  progress: number;
  recentItems: {
    slug: string;
    title: string;
    status: LearningStatus;
    completedDate?: string;
  }[];
}

interface IntellectSummary {
  totalCourses: number;
  totalItems: number;
  completedItems: number;
  overallProgress: number;
  lastUpdated: string;
  courses: CourseProgress[];
}

const CONTENT_DIR = path.join(process.cwd(), 'src/content/learning');
const MOCK_DIR = path.join(process.cwd(), 'src/content/learning_mock');
const OUTPUT_DIR = path.join(process.cwd(), 'src/modules/infra/data');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'intellect-progress.json');

// ============================================
// Module ID prefix → type mapping (NEW)
// ============================================

const TYPE_MAP: Record<string, string> = {
  LEC: 'lecture',
  DIS: 'discussion',
  LAB: 'lab',
  HW: 'homework',
  PRJ: 'project',
  EX: 'exam',
  QZ: 'quiz',
  RD: 'reading',
};

// ============================================
// Helper functions (NEW)
// ============================================

/**
 * Normalize status format: "in-progress" → "in_progress"
 */
function normalizeStatus(status: string): LearningStatus {
  const map: Record<string, LearningStatus> = {
    'not-started': 'not_started',
    'in-progress': 'in_progress',
    completed: 'completed',
    reviewed: 'reviewed',
  };
  return map[status] || 'not_started';
}

/**
 * Infer type from moduleId prefix: "LEC01" → "lecture"
 */
function inferTypeFromModuleId(moduleId: string): string {
  const prefix = moduleId.match(/^([A-Z]+)/)?.[1] || '';
  return TYPE_MAP[prefix] || 'note';
}

/**
 * Load syllabus.json to build courseId → courseName mapping
 */
function loadSyllabusMap(coursePath: string): Map<string, string> {
  const syllabusPath = path.join(coursePath, 'syllabus.json');
  if (!fs.existsSync(syllabusPath)) return new Map();

  try {
    const syllabus: Syllabus = JSON.parse(fs.readFileSync(syllabusPath, 'utf-8'));
    return new Map([[syllabus.id.toLowerCase(), syllabus.title]]);
  } catch {
    console.warn('Failed to parse syllabus.json:', syllabusPath);
    return new Map();
  }
}

/**
 * Load module data from .tutor/module.json if exists
 */
function loadModuleFromTutorJson(moduleDir: string): CourseModule | null {
  const tutorJsonPath = path.join(moduleDir, '.tutor', 'module.json');
  if (!fs.existsSync(tutorJsonPath)) return null;

  try {
    return JSON.parse(fs.readFileSync(tutorJsonPath, 'utf-8'));
  } catch {
    console.warn('Failed to parse .tutor/module.json:', tutorJsonPath);
    return null;
  }
}

// ============================================
// Existing functions (unchanged)
// ============================================

function getSlug(filename: string): string {
  return filename.replace(/\.(md|mdx)$/, '');
}

function parseFrontmatter(content: string): LearningFrontmatter | null {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;

  const frontmatter: Record<string, string | string[] | boolean | number> = {};
  const lines = match[1].split('\n');

  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) continue;

    const key = line.slice(0, colonIndex).trim();
    const value = line.slice(colonIndex + 1).trim();

    if (value === 'true') {
      frontmatter[key] = true;
    } else if (value === 'false') {
      frontmatter[key] = false;
    } else if (!Number.isNaN(Number(value))) {
      frontmatter[key] = Number(value);
    } else if (value.startsWith('"') || value.startsWith("'")) {
      frontmatter[key] = value.slice(1, -1);
    } else if (value.startsWith('[')) {
      frontmatter[key] = value
        .slice(1, -1)
        .split(',')
        .map((s) => s.trim().replace(/"/g, ''));
    } else {
      frontmatter[key] = value;
    }
  }

  return frontmatter as unknown as LearningFrontmatter;
}

// ============================================
// Main function - Updated for dual-mode support
// ============================================

export function generateIntellectProgress(): IntellectSummary {
  console.log('Generating intellect progress...');

  const contentDir = fs.existsSync(CONTENT_DIR) ? CONTENT_DIR : MOCK_DIR;

  if (!fs.existsSync(contentDir)) {
    console.warn('Learning content directory not found:', contentDir);
    return createEmptySummary();
  }

  const courseDirs = fs
    .readdirSync(contentDir, { withFileTypes: true })
    .filter((dir) => dir.isDirectory());

  const courses: CourseProgress[] = [];
  let totalItems = 0;
  let completedItems = 0;

  for (const courseDir of courseDirs) {
    const coursePath = path.join(contentDir, courseDir.name);

    // Load syllabus.json for course metadata (NEW)
    const syllabusMap = loadSyllabusMap(coursePath);
    const defaultCourseName = courseDir.name.replace(/-.+$/, '');

    // Determine if using new .tutor/module.json format or legacy frontmatter
    const isNewFormat =
      fs.existsSync(path.join(coursePath, 'cs188')) ||
      fs.existsSync(path.join(coursePath, 'cs61a'));

    if (isNewFormat) {
      // New format: traverse subdirectories looking for .tutor/module.json
      const moduleDirs = fs
        .readdirSync(coursePath, { withFileTypes: true })
        .filter((dir) => dir.isDirectory());

      let courseTotal = 0;
      let courseCompleted = 0;
      const recentItems: CourseProgress['recentItems'] = [];

      for (const moduleDir of moduleDirs) {
        const modulePath = path.join(coursePath, moduleDir.name);
        const tutorModule = loadModuleFromTutorJson(modulePath);

        if (tutorModule) {
          courseTotal++;
          totalItems++;

          const normalizedStatus = normalizeStatus(tutorModule.status);
          const moduleType = inferTypeFromModuleId(tutorModule.id);

          if (normalizedStatus === 'completed' || normalizedStatus === 'reviewed') {
            courseCompleted++;
            completedItems++;
          }

          if (normalizedStatus === 'completed' || normalizedStatus === 'in_progress') {
            recentItems.push({
              slug: tutorModule.id,
              title: tutorModule.title,
              status: normalizedStatus,
              completedDate: tutorModule.completedDate,
            });
          }
        } else {
          // Fallback: check for markdown files with frontmatter
          const files = fs
            .readdirSync(modulePath)
            .filter((f) => f.endsWith('.md') || f.endsWith('.mdx'));
          for (const file of files) {
            const filePath = path.join(modulePath, file);
            const content = fs.readFileSync(filePath, 'utf-8');
            const fm = parseFrontmatter(content);

            if (!fm) continue;

            courseTotal++;
            totalItems++;

            if (fm.status === 'completed' || fm.status === 'reviewed') {
              courseCompleted++;
              completedItems++;
            }

            if (fm.status === 'completed' || fm.status === 'in_progress') {
              recentItems.push({
                slug: getSlug(file),
                title: fm.title,
                status: fm.status,
                completedDate: fm.completedDate,
              });
            }
          }
        }
      }

      // Get courseName from syllabus map
      const courseId = courseDir.name.replace(/-.+$/, '');
      const courseName = syllabusMap.get(courseId) || defaultCourseName;

      courses.push({
        courseId,
        courseName,
        totalItems: courseTotal,
        completedItems: courseCompleted,
        progress: courseTotal > 0 ? Math.round((courseCompleted / courseTotal) * 100) : 0,
        recentItems: recentItems.slice(0, 5),
      });
    } else {
      // Legacy format: read directly from markdown files with frontmatter
      const files = fs
        .readdirSync(coursePath)
        .filter((f) => f.endsWith('.md') || f.endsWith('.mdx'));

      let courseTotal = 0;
      let courseCompleted = 0;
      const recentItems: CourseProgress['recentItems'] = [];

      for (const file of files) {
        const slug = getSlug(file);
        const filePath = path.join(coursePath, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        const fm = parseFrontmatter(content);

        if (!fm) continue;

        courseTotal++;
        totalItems++;

        if (fm.status === 'completed' || fm.status === 'reviewed') {
          courseCompleted++;
          completedItems++;
        }

        if (fm.status === 'completed' || fm.status === 'in_progress') {
          recentItems.push({
            slug,
            title: fm.title,
            status: fm.status,
            completedDate: fm.completedDate,
          });
        }
      }

      // Get courseName from syllabus map first, fallback to frontmatter
      const courseId = courseDir.name.replace(/-.+$/, '');
      const syllabusName = syllabusMap.get(courseId);
      let courseName = syllabusName || courseId;

      if (!syllabusName && files.length > 0) {
        const firstFile = files[0];
        const fm = parseFrontmatter(fs.readFileSync(path.join(coursePath, firstFile), 'utf-8'));
        if (fm?.courseName) courseName = fm.courseName;
      }

      courses.push({
        courseId,
        courseName,
        totalItems: courseTotal,
        completedItems: courseCompleted,
        progress: courseTotal > 0 ? Math.round((courseCompleted / courseTotal) * 100) : 0,
        recentItems: recentItems.slice(0, 5),
      });
    }
  }

  const summary: IntellectSummary = {
    totalCourses: courses.length,
    totalItems,
    completedItems,
    overallProgress: totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0,
    lastUpdated: new Date().toISOString(),
    courses: courses.sort((a, b) => b.progress - a.progress),
  };

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(summary, null, 2));
  console.log(
    `Generated intellect progress: ${summary.totalCourses} courses, ${summary.completedItems}/${summary.totalItems} items completed.`
  );

  return summary;
}

function createEmptySummary(): IntellectSummary {
  return {
    totalCourses: 0,
    totalItems: 0,
    completedItems: 0,
    overallProgress: 0,
    lastUpdated: new Date().toISOString(),
    courses: [],
  };
}

export function filterPublicContent(summary: IntellectSummary): IntellectSummary {
  return {
    ...summary,
    courses: summary.courses.map((course) => ({
      ...course,
      recentItems: course.recentItems.filter((item) => item.status === 'completed'),
    })),
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  generateIntellectProgress();
}
