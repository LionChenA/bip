import { motion } from 'framer-motion';
import { BookOpen, CheckCircle2, Circle, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface IntellectDashboardProps {
  lang: 'en' | 'zh';
  progress: IntellectProgress | null;
}

export interface IntellectProgress {
  totalCourses: number;
  totalItems: number;
  completedItems: number;
  overallProgress: number;
  lastUpdated: string;
  courses: CourseProgress[];
}

interface CourseProgress {
  courseId: string;
  courseName: string;
  totalItems: number;
  completedItems: number;
  progress: number;
  recentItems: RecentItem[];
}

interface RecentItem {
  slug: string;
  title: string;
  status: string;
  completedDate?: string;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

export function IntellectDashboard({ lang, progress }: IntellectDashboardProps) {
  if (!progress || progress.totalCourses === 0) {
    return (
      <Card className="bg-muted/30">
        <CardContent className="py-8 text-center">
          <BookOpen className="mx-auto h-8 w-8 text-muted-foreground mb-3" />
          <p className="text-muted-foreground text-sm">
            {lang === 'en' ? 'No learning content yet.' : '暂无学习内容。'}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>{lang === 'en' ? 'Learning Progress' : '学习进度'}</CardTitle>
            <span className="text-2xl font-bold text-primary">{progress.overallProgress}%</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${progress.overallProgress}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>
              {progress.completedItems}/{progress.totalItems}{' '}
              {lang === 'en' ? 'items completed' : '项已完成'}
            </span>
            <span>
              {progress.totalCourses} {lang === 'en' ? 'courses' : '门课程'}
            </span>
          </div>
        </CardContent>
      </Card>

      {progress.courses.map((course) => (
        <CourseCard key={course.courseId} course={course} />
      ))}
    </motion.div>
  );
}

function CourseCard({ course }: { course: CourseProgress }) {
  const statusColors: Record<string, string> = {
    completed: 'bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30',
    in_progress: 'bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-500/30',
    not_started: 'bg-muted text-muted-foreground border-border',
    reviewed: 'bg-purple-500/20 text-purple-600 dark:text-purple-400 border-purple-500/30',
  };

  return (
    <motion.div variants={item}>
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">{course.courseName}</CardTitle>
            <Badge
              variant="outline"
              className={statusColors[course.recentItems[0]?.status || 'not_started']}
            >
              {course.progress}%
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${course.progress}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>

          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <CheckCircle2 size={12} />
              {course.completedItems}/{course.totalItems}
            </span>
          </div>

          {course.recentItems.length > 0 && (
            <div className="space-y-1.5 pt-1">
              {course.recentItems.slice(0, 3).map((recentItem) => (
                <div key={recentItem.slug} className="flex items-center gap-2 text-xs">
                  {recentItem.status === 'completed' || recentItem.status === 'reviewed' ? (
                    <CheckCircle2 size={12} className="text-green-500" />
                  ) : recentItem.status === 'in_progress' ? (
                    <Clock size={12} className="text-blue-500" />
                  ) : (
                    <Circle size={12} className="text-muted-foreground" />
                  )}
                  <span className="truncate flex-1">{recentItem.title}</span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
