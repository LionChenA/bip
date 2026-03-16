# Design: Init Intellect-Link System

## Overview

This document describes the architecture for linking the BIP project with an external course repository. The design enables bidirectional but asymmetric data flow: course content lives in an external repository and is referenced (via symlink) in BIP for display purposes.

---

## Architecture

```
/Users/lion/Developer/MyProjects/
├── course/           ← Git Submodule (external course repo)
│   ├── .git/
│   ├── src/types/course-content.ts   ← Type definitions
│   ├── syllabus.json                 ← Course metadata
│   ├── cs188/
│   │   └── lectures/L1-introduction/
│   │       ├── notes.md
│   │       └── .tutor/module.json   ← Module metadata
│   └── cs61a/
│
└── bip/
    ├── src/content/
    │   └── learning → ../../course  ← Symlink (relative path)
    └── src/modules/infra/scripts/intellect-sync.ts
```

### Key Decisions

1. **Symlink over Git Submodule for content**: The `src/content/learning` directory is a symlink pointing to the `course` directory. This allows Astro to read content directly from the external repository.

2. **Course as source of truth**: Content flows one-way (course → BIP). BIP only reads and displays; it does not modify course content.

3. **Data source: .tutor/module.json**: BIP reads module metadata from `.tutor/module.json` files, NOT from frontmatter. This aligns with the tutor skill architecture.

---

## Data Format Specifications

### Course-Side: `.tutor/module.json`

This is the authoritative data source for course modules.

```typescript
interface CourseModule {
  // Identification
  /** Module ID - MUST follow prefix convention */
  id: string;           // Format: LEC01, HW01, PRJ1
  /** Module type */
  type: ModuleType;
  /** Module title */
  title: string;
  
  // Status
  /** Learning status */
  status: 'not-started' | 'in-progress' | 'completed' | 'reviewed';
  /** Completion timestamp (ISO date string) */
  completedDate?: string;
  
  // Course relationships (for tutor skill)
  /** Prerequisite module IDs */
  from: string[];
  /** Next modules */
  to: string[];
  
  // Resources
  resources: {
    video?: { url: string; has_subtitles?: boolean; note?: string };
    slides?: { url: string };
    textbook?: { url: string; chapter?: string };
  };
  
  // Knowledge (for tutor)
  subtitle_index?: {
    topics: Array<{ keyword: string; timestamps: number[] }>;
  };
  
  /** Relative path to notes.md */
  notes: string;
}

type ModuleType = 
  | 'lecture' 
  | 'discussion' 
  | 'lab' 
  | 'homework' 
  | 'project' 
  | 'exam' 
  | 'quiz' 
  | 'reading';
```

### Course-Side: `syllabus.json`

Located at course root, contains course-level metadata.

```typescript
interface Syllabus {
  id: string;           // e.g., "CS188"
  title: string;        // e.g., "Introduction to Artificial Intelligence"
  provider: string;     // e.g., "UC Berkeley"
  url: string;
  textbook: string;
  textbook_url: string;
  expectations: {
    lectures: number;
    homeworks: number;
    projects: number;
  };
}
```

---

## Module ID Specification

### Prefix Convention

Module IDs MUST follow the `{PREFIX}{NUMBER}` pattern where the prefix indicates the module type.

| Prefix | Full Name | Type | Example |
|--------|-----------|------|---------|
| `LEC` | Lecture | 讲座/授课 | `LEC01`, `LEC02` |
| `DIS` | Discussion | 讨论课 (TA 带领) | `DIS01`, `DIS02` |
| `LAB` | Lab | 实验课 | `LAB01` |
| `HW` | Homework / Problem Set | 作业 | `HW01`, `HW02` |
| `PRJ` | Project | 课程项目 | `PRJ1`, `PRJ2` |
| `EX` | Exam | 考试 | `EX1`, `EX2` |
| `QZ` | Quiz | 小测验 | `QZ1` |
| `RD` | Reading | 阅读材料 | `RD01` |

### Inferring Type from Module ID

```typescript
const TYPE_MAP: Record<string, string> = {
  'LEC': 'lecture',
  'DIS': 'discussion',
  'LAB': 'lab',
  'HW': 'homework',
  'PRJ': 'project',
  'EX': 'exam',
  'QZ': 'quiz',
  'RD': 'reading',
};

function inferType(moduleId: string): string {
  const prefix = moduleId.match(/^([A-Z]+)/)?.[1] || '';
  return TYPE_MAP[prefix] || 'note';
}
```

---

## Field Mapping

### Course → BIP Transformation

| BIP Field | Source | Transformation |
|-----------|--------|----------------|
| `moduleId` | `.tutor/module.json:id` | Direct copy |
| `type` | Derived from `moduleId` | Prefix → type mapping |
| `title` | `.tutor/module.json:title` | Direct copy |
| `status` | `.tutor/module.json:status` | `in-progress` → `in_progress` |
| `courseId` | `syllabus.json:id` | Lowercase: `CS188` → `cs188` |
| `courseName` | `syllabus.json:title` | Direct copy |
| `resources` | `.tutor/module.json:resources` | Direct copy |
| `completedDate` | `.tutor/module.json:completedDate` | Direct copy |

---

## BIP-Side Schema (Minimal)

BIP uses a minimal schema for display purposes.

```typescript
const learning = defineCollection({
  schema: z.object({
    // Index identifier
    moduleId: z.string(),        // LEC01, HW01
    
    // Course info
    courseId: z.string(),        // cs188
    courseName: z.string(),      // Introduction to Artificial Intelligence
    
    // Status
    status: z.enum(['not_started', 'in_progress', 'completed', 'reviewed']).default('not_started'),
    isPublic: z.boolean().default(false),
    
    // Display metadata
    title: z.string(),
    description: z.string().optional(),
    tags: z.array(z.string()).default([]),
    
    // Completion
    completedDate: z.coerce.date().optional(),
  }),
});
```

---

## Sync Script

The `intellect-sync.ts` script:

1. **Read syllabus.json**: Build courseId → courseName mapping
2. **Traverse modules**: Find all `.tutor/module.json` files
3. **Transform data**: Apply mapping rules (status format, lowercase courseId)
4. **Generate progress**: Create `intellect-progress.json` for dashboard
5. **Filter public**: Only include modules where appropriate

### Key Transformation Functions

```typescript
function normalizeStatus(status: string): string {
  const map: Record<string, string> = {
    'not-started': 'not_started',
    'in-progress': 'in_progress',
    'completed': 'completed',
    'reviewed': 'reviewed',
  };
  return map[status] || 'not_started';
}

function normalizeCourseId(id: string): string {
  return id.toLowerCase();  // CS188 → cs188
}

function inferType(moduleId: string): string {
  const prefix = moduleId.match(/^([A-Z]+)/)?.[1] || '';
  return TYPE_MAP[prefix] || 'note';
}
```

---

## Directory Structure

### Course Repository

```
course/
├── .git/
├── syllabus.json                      ← Course metadata
├── src/types/
│   └── course-content.ts             ← Type definitions
├── cs188/
│   ├── lectures/
│   │   └── L1-introduction/
│   │       ├── notes.md
│   │       └── .tutor/module.json    ← Module metadata
│   ├── homeworks/
│   │   └── HW01-search/
│   │       ├── README.md
│   │       └── .tutor/module.json
│   └── projects/
│       └── PRJ1-search/
│           ├── README.md
│           └── .tutor/module.json
└── cs61a/
    └── ...
```

### BIP Repository (after symlink)

```
bip/
├── src/
│   └── content/
│       └── learning → ../../course   ← Symlink to course repo
```

---

## Migration Requirements

### Existing .tutor/module.json Files

Must be updated:

1. **Add `completedDate?: string`** field to all files
2. **Migrate `id` format**:
   - `L1` → `LEC01`
   - `L2` → `LEC02`
   - `HW0` → `HW01`
   - `HW1` → `HW02`

### Migration Script

```typescript
// Pseudocode for migration
for each .tutor/module.json:
  // Add completedDate if not exists
  if (!module.completedDate) module.completedDate = undefined;
  
  // Migrate id format
  const oldId = module.id;
  const prefix = inferPrefix(oldId);  // L -> LEC
  const num = extractNumber(oldId);    // 1 -> 01
  module.id = prefix + num;
```

---

## Security & Privacy

1. **No-Index**: BIP only displays content where appropriate
2. **Read-only**: BIP never writes to the course repository
3. **Symlink isolation**: The symlink is one-way; course repo changes reflect immediately in BIP

---

## Future Considerations

1. **Image paths**: Relative image paths in course MDX may break when accessed via symlink. Solution: Use absolute paths or configure Astro's image resolver.

2. **CI/CD**: GitHub Actions needs proper tokens to fetch submodules.

3. **Conflict resolution**: If both `garden` and `learning` collections use similar frontmatter keys, consider namespacing.
