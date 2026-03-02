import type React from 'react';
import { TextType } from '@/components/TextType/TextType';

interface FluxSloganProps {
  text: string;
}

export const FluxSlogan: React.FC<FluxSloganProps> = ({ text }) => {
  return (
    <h1 className="font-mono text-3xl text-foreground uppercase leading-tight tracking-widest sm:text-4xl md:text-5xl lg:text-6xl">
      <TextType
        text={text}
        typingSpeed={80}
        showCursor={true}
        cursorCharacter="_"
        loop={false}
        className="font-mono"
      />
    </h1>
  );
};
