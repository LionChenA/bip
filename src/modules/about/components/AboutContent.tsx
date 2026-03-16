import { motion } from 'framer-motion';
import { Download, Github, Mail } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { t } from '@/lib/i18n';
import { resume } from '@/modules/about/data/resume';
import { siteConfig } from '@/modules/infra/data/siteConfig';
import type { IntellectProgress } from './IntellectDashboard';
import { IntellectDashboard } from './IntellectDashboard';

interface AboutContentProps {
  lang: 'en' | 'zh';
  intellectProgress?: IntellectProgress | null;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function AboutContent({ lang, intellectProgress }: AboutContentProps) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 gap-12 md:grid-cols-[280px_1fr]"
    >
      <Sidebar lang={lang} />
      <MainContent lang={lang} intellectProgress={intellectProgress} />
    </motion.div>
  );
}

function Sidebar({ lang }: { lang: 'en' | 'zh' }) {
  return (
    <motion.aside variants={item} className="space-y-8">
      <div className="space-y-4">
        <div className="space-y-1">
          <h1 className="font-bold text-3xl tracking-tight">{siteConfig.name}</h1>
          <p className="text-lg text-muted-foreground">{t(siteConfig.title, lang)}</p>
          <div className="flex items-center gap-2 text-muted-foreground text-xs">
            <span className="inline-block h-2 w-2 rounded-full bg-green-500/80" />
            {t('about.location', lang)}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <a
            href={siteConfig.socials[0].url}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-foreground"
          >
            <Github size={20} />
            <span>{t('contact.github', lang)}</span>
          </a>
          <a
            href={siteConfig.socials[1].url}
            className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-foreground"
          >
            <Mail size={20} />
            <span>{t('contact.email', lang)}</span>
          </a>
        </div>
      </div>

      <button
        type="button"
        className={buttonVariants({
          variant: 'outline',
          className: 'w-full cursor-not-allowed gap-2 opacity-50',
        })}
        aria-disabled="true"
        disabled
      >
        <Download size={18} />
        {t('about.download', lang)}
      </button>
    </motion.aside>
  );
}

function MainContent({
  lang,
  intellectProgress,
}: {
  lang: 'en' | 'zh';
  intellectProgress?: IntellectProgress | null;
}) {
  return (
    <motion.div variants={item} className="space-y-12">
      <section className="space-y-4">
        <h2 className="font-bold text-2xl tracking-tight">{t('about.bio', lang)}</h2>
        <div className="prose dark:prose-invert max-w-none text-lg text-muted-foreground leading-relaxed">
          <p>{t(resume.bio, lang)}</p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-bold text-2xl tracking-tight">{t('about.philosophy', lang)}</h2>
        <div className="prose dark:prose-invert max-w-none text-lg text-muted-foreground leading-relaxed">
          <p>{t(resume.philosophy, lang)}</p>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="font-bold text-2xl tracking-tight">{t('about.journey', lang)}</h2>
        <div className="space-y-8">
          {resume.journey.map((phase) => (
            <div key={t(phase.title, lang)} className="space-y-2">
              <div className="flex items-center gap-4">
                <span className="font-mono text-primary text-sm uppercase tracking-wider">
                  {phase.period}
                </span>
                <div className="h-px flex-1 bg-border" />
              </div>
              <h3 className="font-bold text-xl">{t(phase.title, lang)}</h3>
              <p className="text-muted-foreground leading-relaxed">{t(phase.description, lang)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-bold text-2xl tracking-tight">
          {lang === 'en' ? 'Learning Path' : '学习路径'}
        </h2>
        <IntellectDashboard lang={lang} progress={intellectProgress ?? null} />
      </section>
    </motion.div>
  );
}
