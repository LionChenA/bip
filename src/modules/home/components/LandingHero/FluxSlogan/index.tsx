import type React from "react";
import TextType from "@/components/TextType/TextType";

interface FluxSloganProps {
  text: string;
}

// Detect if text contains Chinese characters
const isChinese = (text: string): boolean => /[\u4e00-\u9fff]/.test(text);

export const FluxSlogan: React.FC<FluxSloganProps> = ({ text }) => {
  // Chinese characters need slower typing speed (2-3x slower)
  const typingSpeed = isChinese(text) ? 150 : 75;

  return (
    <h1 className="flex flex-wrap justify-center font-bold font-sans text-4xl leading-none tracking-tight md:text-6xl lg:text-7xl">
      <TextType
        text={text}
        typingSpeed={typingSpeed}
        initialDelay={0}
        pauseDuration={2000}
        showCursor={true}
        cursorCharacter="_"
        cursorBlinkDuration={0.5}
        loop={false}
      />
    </h1>
  );
};
