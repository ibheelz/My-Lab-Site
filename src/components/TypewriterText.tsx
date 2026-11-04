"use client";

import { useTypewriter } from "@/hooks/useTypewriter";

interface TypewriterTextProps {
  text: string;
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  color?: string;
  cursorColor?: string;
  cursorThickness?: number;
  typingSpeed?: number;
  delayStart?: number;
  showCursor?: boolean;
  hideCursorWhenDone?: boolean;
  enableLoop?: boolean;
  className?: string;
  splitAt?: string;
  secondColor?: string;
}

export default function TypewriterText({
  text,
  tag = "span",
  color = "rgb(255, 255, 255)",
  cursorColor = "rgb(0, 255, 106)",
  cursorThickness = 2,
  typingSpeed = 0.04,
  delayStart = 0,
  showCursor = true,
  hideCursorWhenDone = false,
  enableLoop = false,
  className = "",
  splitAt,
  secondColor = "rgb(255, 255, 255)",
}: TypewriterTextProps) {
  const { displayed, isDone, cursorVisible } = useTypewriter({
    text,
    speed: typingSpeed,
    delay: delayStart,
    loop: enableLoop,
  });

  const showCursorNow = showCursor && (!hideCursorWhenDone || !isDone || enableLoop);

  const Tag = tag as keyof JSX.IntrinsicElements;

  const splitIndex = splitAt ? text.indexOf(splitAt) : -1;
  const part1 = splitIndex >= 0 ? displayed.slice(0, splitIndex) : displayed;
  const part2 = splitIndex >= 0 ? displayed.slice(splitIndex) : "";

  return (
    <Tag
      className={className}
      style={{ color, margin: 0, whiteSpace: "pre-wrap" }}
    >
      {splitIndex >= 0 ? (
        <>
          <span style={{ color }}>{part1}</span>
          {part2 && <span style={{ color: secondColor }}>{part2}</span>}
        </>
      ) : displayed}
      {showCursorNow && (
        <span
          style={{
            display: "inline-block",
            width: `${cursorThickness}px`,
            height: "0.9em",
            backgroundColor: cursorColor,
            marginLeft: "2px",
            verticalAlign: "middle",
            opacity: cursorVisible ? 1 : 0,
            transition: "opacity 0.1s ease-in-out",
          }}
        />
      )}
    </Tag>
  );
}
