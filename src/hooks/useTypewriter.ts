import { useState, useEffect, useRef } from "react";

// ── Shared clock ──────────────────────────────────────────────────────────────
// One interval for the whole app. All looping instances subscribe to it and
// restart together on every tick.
const clockListeners = new Set<() => void>();
let clockId: ReturnType<typeof setInterval> | null = null;

function ensureClock(ms: number) {
  if (clockId !== null) return;
  clockId = setInterval(() => {
    clockListeners.forEach((fn) => fn());
  }, ms);
}
// ─────────────────────────────────────────────────────────────────────────────

interface UseTypewriterProps {
  text: string;
  speed?: number;
  delay?: number;
  loop?: boolean;
  loopDelay?: number;
}

export function useTypewriter({
  text,
  speed = 0.04,
  delay = 0,
  loop = false,
  loopDelay = 20000,
}: UseTypewriterProps) {
  const [displayed, setDisplayed] = useState("");
  const [isDone, setIsDone] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [tick, setTick] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Subscribe to the global clock when looping is on
  useEffect(() => {
    if (!loop) return;
    ensureClock(loopDelay);
    const notify = () => setTick((t) => t + 1);
    clockListeners.add(notify);
    return () => { clockListeners.delete(notify); };
  }, [loop, loopDelay]);

  // Run (or re-run) the typing animation whenever text/speed/delay/tick changes
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
        }
      };
      type();
    };

    timeoutRef.current = setTimeout(startTyping, delay * 1000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [text, speed, delay, tick]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  return { displayed, isDone, cursorVisible };
}
