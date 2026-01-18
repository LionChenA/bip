import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { Badge } from '@/components/ui/badge';
import { stack } from '@/data/stack';

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
      className="mx-auto max-w-3xl space-y-16"
    >
      <BioSection />
      <InterestsSection />
      <TechStackSection />
      <AchievementsSection />
      <ContactSection />
    </motion.div>
  );
}

function BioSection() {
  return (
    <motion.section variants={item} className="space-y-4">
      <h2 className="font-bold text-2xl tracking-tight">Who Am I</h2>
      <div className="prose dark:prose-invert text-lg text-muted-foreground leading-relaxed">
        <p>
          I am a dedicated software engineer with a passion for building beautiful, functional, and
          scalable web applications. With a strong foundation in modern web technologies, I bridge
          the gap between design and engineering.
        </p>
        <p>
          My approach is rooted in simplicity and performance. I believe that the best user
          experiences are those that feel natural and intuitive.
        </p>
      </div>
    </motion.section>
  );
}

function InterestsSection() {
  const interests = [
    'Open Source',
    'UI/UX Design',
    'AI Agents',
    'System Architecture',
    'Photography',
    'Generative Art',
  ];
  return (
    <motion.section variants={item} className="space-y-4">
      <h2 className="font-bold text-2xl tracking-tight">Interests</h2>
      <div className="flex flex-wrap gap-2">
        {interests.map((interest) => (
          <Badge
            key={interest}
            variant="secondary"
            className="bg-muted/50 px-3 py-1 text-sm transition-colors hover:bg-muted"
          >
            {interest}
          </Badge>
        ))}
      </div>
    </motion.section>
  );
}

function TechStackSection() {
  return (
    <motion.section variants={item} className="space-y-6">
      <h2 className="font-bold text-2xl tracking-tight">Tech Stack</h2>
      <div className="grid grid-cols-4 gap-4 sm:grid-cols-6 md:grid-cols-8">
        {Object.values(stack).map((tech) => {
          const Icon = tech.icon;
          return (
            <div
              key={tech.id}
              className="group flex flex-col items-center gap-2 rounded-lg p-2 transition-colors hover:bg-muted/50"
              title={tech.label}
            >
              <div className="text-2xl text-muted-foreground transition-colors group-hover:text-foreground">
                <Icon />
              </div>
            </div>
          );
        })}
      </div>
    </motion.section>
  );
}

function AchievementsSection() {
  const achievements = [
    { year: '2025', title: 'Launched Garden Core v1.0' },
    { year: '2024', title: 'Contributed to Astro Ecosystem' },
    { year: '2023', title: 'Senior Frontend Engineer Promotion' },
  ];
  return (
    <motion.section variants={item} className="space-y-4">
      <h2 className="font-bold text-2xl tracking-tight">Achievements</h2>
      <div className="space-y-4 border-muted border-l-2 pl-4">
        {achievements.map((item) => (
          <div key={item.year + item.title} className="relative">
            <div className="absolute top-1.5 -left-[21px] h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
              <span className="font-mono text-muted-foreground text-sm">{item.year}</span>
              <span className="font-medium">{item.title}</span>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

function ContactSection() {
  return (
    <motion.section variants={item} className="space-y-4">
      <h2 className="font-bold text-2xl tracking-tight">Connect</h2>
      <p className="text-muted-foreground">
        Feel free to reach out for collaborations or just a chat.
      </p>
      <div className="flex gap-4 pt-2">
        <SocialLink href="https://github.com" icon={FaGithub} label="GitHub" />
        <SocialLink href="https://twitter.com" icon={FaTwitter} label="Twitter" />
        <SocialLink href="https://linkedin.com" icon={FaLinkedin} label="LinkedIn" />
        <SocialLink href="mailto:hello@example.com" icon={Mail} label="Email" />
      </div>
    </motion.section>
  );
}

function SocialLink({ href, icon: Icon, label }: { href: string; icon: any; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="rounded-full bg-muted/50 p-3 transition-all hover:scale-110 hover:bg-primary hover:text-primary-foreground"
      aria-label={label}
    >
      <Icon size={20} />
    </a>
  );
}
