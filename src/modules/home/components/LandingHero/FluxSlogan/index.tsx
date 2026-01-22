import { motion, useSpring } from 'framer-motion';
import type React from 'react';
import { useEffect } from 'react';

interface CharacterProps {
  char: string;
  index: number;
}

const Character: React.FC<CharacterProps> = ({ char, index }) => {
  const x = useSpring(0, { stiffness: 100, damping: 20 });
  const y = useSpring(0, { stiffness: 100, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = document.getElementById(`char-${index}`)?.getBoundingClientRect();
      if (!rect) return;

      const charX = rect.left + rect.width / 2;
      const charY = rect.top + rect.height / 2;

      const distance = Math.sqrt((e.clientX - charX) ** 2 + (e.clientY - charY) ** 2);

      const maxDist = 100;
      if (distance < maxDist) {
        const factor = (1 - distance / maxDist) * 20;
        const angle = Math.atan2(charY - e.clientY, charX - e.clientX);
        x.set(Math.cos(angle) * factor);
        y.set(Math.sin(angle) * factor);
      } else {
        x.set(0);
        y.set(0);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [index, x, y]);

  return (
    <motion.span
      id={`char-${index}`}
      initial={{ filter: 'blur(10px)', opacity: 0 }}
      animate={{ filter: 'blur(0px)', opacity: 1 }}
      transition={{
        duration: 0.8,
        delay: index * 0.03,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ x, y, display: 'inline-block', whiteSpace: 'pre' }}
      className="select-none"
    >
      {char}
    </motion.span>
  );
};

export const FluxSlogan: React.FC<{ text: string }> = ({ text }) => {
  return (
    <h1 className="text-6xl md:text-8xl font-sans font-bold tracking-tight flex flex-wrap justify-center leading-none">
      {text.split('').map((char, i) => (
        <Character key={`flux-char-${i}-${char}`} char={char} index={i} />
      ))}
    </h1>
  );
};
