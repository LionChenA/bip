import { useCallback, useEffect, useState } from 'react';
import './TextType.css';

interface TextTypeProps {
  text: string | string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  loop?: boolean;
  showCursor?: boolean;
  cursorCharacter?: string;
  cursorBlinkDuration?: number;
  initialDelay?: number;
  className?: string;
  variableSpeed?: boolean;
  reverseMode?: boolean;
  onSentenceComplete?: () => void;
}

export const TextType = ({
  text,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 1000,
  loop = true,
  showCursor = true,
  cursorCharacter = '|',
  cursorBlinkDuration = 530,
  initialDelay = 0,
  className = '',
  variableSpeed = false,
  reverseMode = false,
  onSentenceComplete,
}: TextTypeProps) => {
  const textArray = Array.isArray(text) ? text : [text];
  const [displayedText, setDisplayedText] = useState('');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (initialDelay > 0 && !isVisible) {
      timeoutId = setTimeout(() => setIsVisible(true), initialDelay);
    } else {
      setIsVisible(true);
    }

    return () => clearTimeout(timeoutId);
  }, [initialDelay, isVisible]);

  useEffect(() => {
    if (showCursor) {
      document.documentElement.style.setProperty(
        '--cursor-blink-duration',
        `${cursorBlinkDuration}ms`
      );
    }
  }, [showCursor, cursorBlinkDuration]);

  const getRandomSpeed = useCallback(
    (baseSpeed: number) => {
      if (!variableSpeed) return baseSpeed;
      const variance = baseSpeed * 0.5;
      return baseSpeed - variance + Math.random() * variance * 2;
    },
    [variableSpeed]
  );

  useEffect(() => {
    if (!isVisible) return;

    let timeoutId: NodeJS.Timeout;

    const currentText = textArray[currentTextIndex];

    if (!isDeleting) {
      if (currentCharIndex < currentText.length) {
        timeoutId = setTimeout(() => {
          setDisplayedText((prev) => prev + currentText[currentCharIndex]);
          setCurrentCharIndex((prev) => prev + 1);
        }, getRandomSpeed(typingSpeed));
      } else if (textArray.length > 1) {
        timeoutId = setTimeout(() => {
          setIsDeleting(true);
          onSentenceComplete?.();
        }, pauseDuration);
      } else if (textArray.length === 1 && loop) {
        timeoutId = setTimeout(() => {
          setIsDeleting(true);
          onSentenceComplete?.();
        }, pauseDuration);
      }
    } else {
      if (currentCharIndex > 0) {
        timeoutId = setTimeout(() => {
          if (reverseMode) {
            setDisplayedText((prev) => prev.slice(1));
          } else {
            setDisplayedText((prev) => prev.slice(0, -1));
          }
          setCurrentCharIndex((prev) => prev - 1);
        }, getRandomSpeed(deletingSpeed));
      } else {
        setIsDeleting(false);
        if (textArray.length > 1) {
          setCurrentTextIndex((prev) => (prev + 1) % textArray.length);
        } else if (!loop) {
          return;
        }
      }
    }

    return () => clearTimeout(timeoutId);
  }, [
    currentCharIndex,
    isDeleting,
    currentTextIndex,
    isVisible,
    textArray,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
    loop,
    reverseMode,
    onSentenceComplete,
    getRandomSpeed,
  ]);

  return (
    <span className={`inline-block ${className}`}>
      {displayedText}
      {showCursor && (
        <span
          className="inline-block w-[1ch] text-type-cursor opacity-100"
          style={{ animationDuration: `${cursorBlinkDuration}ms` }}
        >
          {cursorCharacter}
        </span>
      )}
    </span>
  );
};
