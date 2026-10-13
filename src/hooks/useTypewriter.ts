import { useState, useEffect, useRef } from "react";

interface UseTypewriterProps {
  text: string;
  speed?: number;
  delay?: number;
  loop?: boolean;
}

export function useTypewriter({
  text,
  speed = 0.04,
  delay = 0,
  loop = false,
}: UseTypewriterProps) {
  const [displayed, setDisplayed] = useState("");
  const [isDone, setIsDone] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let index = 0;
    setDisplayed("");
    setIsDone(false);

    const startTyping = () => {
      const type = () => {
        if (index < text.length) {
          setDisplayed(text.slice(0, index + 1));
          index++;
          timeoutRef.current = setTimeout(type, speed * 1000);
        } else {
          setIsDone(true);
          if (loop) {
            index = 0;
            setDisplayed("");
            timeoutRef.current = setTimeout(startTyping, 2000);
          }
        }
      };
      type();
    };

    timeoutRef.current = setTimeout(startTyping, delay * 1000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [text, speed, delay, loop]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  return { displayed, isDone, cursorVisible };
}
