import { motion } from 'framer-motion';
import type React from 'react';

interface FluxSloganProps {
  text: string;
}

const Character: React.FC<{ char: string; index: number }> = ({ char, index }) => {
  return (
    <motion.span
      initial={{ filter: 'blur(10px)', opacity: 0 }}
      animate={{ filter: 'blur(0px)', opacity: 1 }}
      transition={{
        duration: 0.8,
        delay: index * 0.03,
        ease: 'easeOut',
      }}
      whileHover={{
        y: -5,
        scale: 1.1,
        transition: { duration: 0.2 },
      }}
      className="inline-block cursor-default select-none"
    >
      {char === ' ' ? '\u00A0' : char}
    </motion.span>
  );
};

export const FluxSlogan: React.FC<FluxSloganProps> = ({ text }) => {
  return (
    <h1 className="flex flex-wrap justify-center font-bold font-sans text-4xl leading-none tracking-tight md:text-6xl lg:text-7xl">
      {text.split('').map((char, i) => (
        <Character key={`${text}-${i}`} char={char} index={i} />
      ))}
    </h1>
  );
};
