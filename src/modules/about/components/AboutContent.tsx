import { motion } from 'framer-motion';
import { Download, Github, Mail } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { resume } from '@/modules/about/data/resume';
import { siteConfig } from '@/modules/infra/data/siteConfig';

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

export function AboutContent() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 gap-12 md:grid-cols-[280px_1fr]"
    >
      <Sidebar />
      <MainContent />
    </motion.div>
  );
}

function Sidebar() {
  return (
    <motion.aside variants={item} className="space-y-8">
      <div className="space-y-4">
        <div className="space-y-1">
          <h1 className="font-bold text-3xl tracking-tight">{siteConfig.name}</h1>
          <p className="text-muted-foreground text-lg">{siteConfig.title}</p>
        </div>

        <div className="flex flex-col gap-3">
          <a
            href={siteConfig.socials.github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-foreground"
          >
            <Github size={20} />
            <span>GitHub</span>
          </a>
          <a
            href={siteConfig.socials.email}
            className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-foreground"
          >
            <Mail size={20} />
            <span>Email</span>
          </a>
        </div>
      </div>

      <a
        href="/resume.pdf"
        target="_blank"
        className={buttonVariants({ variant: 'outline', className: 'w-full gap-2' })}
        rel="noopener"
      >
        <Download size={18} />
        Download CV
      </a>
    </motion.aside>
  );
}

function MainContent() {
  return (
    <motion.div variants={item} className="space-y-12">
      <section className="space-y-4">
        <h2 className="font-bold text-2xl tracking-tight">Bio</h2>
        <div className="prose dark:prose-invert max-w-none text-lg text-muted-foreground leading-relaxed">
          <p>{resume.bio}</p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-bold text-2xl tracking-tight">Philosophy</h2>
        <div className="prose dark:prose-invert max-w-none text-lg text-muted-foreground leading-relaxed">
          <p>{resume.philosophy}</p>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="font-bold text-2xl tracking-tight">The Journey</h2>
        <div className="space-y-8">
          {resume.journey.map((phase) => (
            <div key={phase.title} className="space-y-2">
              <div className="flex items-center gap-4">
                <span className="font-mono text-primary text-sm tracking-wider uppercase">
                  {phase.period}
                </span>
                <div className="h-px flex-1 bg-border" />
              </div>
              <h3 className="font-bold text-xl">{phase.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{phase.description}</p>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
