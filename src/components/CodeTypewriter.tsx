"use client";

import { useTypewriter } from "@/hooks/useTypewriter";

const NEON   = "rgb(0, 255, 106)";
const BORDER = "rgb(60, 60, 60)";

export default function CodeTypewriter({ content }: { content: string }) {
  const { displayed, cursorVisible } = useTypewriter({
    text: content,
    speed: 0.015,
    loop: true,
    loopDelay: 20000,
  });

  const lines = displayed.split("\n");

  return (
    <pre
      className="text-xs tablet:text-sm leading-relaxed overflow-x-auto"
      style={{
        backgroundColor: "rgb(0, 0, 0)",
        border: `1px solid ${BORDER}`,
        borderRadius: "0px",
        padding: "clamp(14px, 3vw, 20px)",
        margin: 0,
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
        position: "relative",
        zIndex: 25,
      }}
    >
      {lines.map((line, j) => {
        const isComment = line.trimStart().startsWith("#");
        const addSpacing = j > 0 && !isComment && line.trim() !== "";
        const isLast = j === lines.length - 1;
        return (
          <span
            key={j}
            style={{
              display: isLast ? "inline" : "block",
              color: isComment ? "rgb(255, 255, 255)" : NEON,
              marginTop: addSpacing ? "12px" : undefined,
            }}
          >
            {line}
            {isLast && (
              <span
                style={{
                  display: "inline-block",
                  width: "2px",
                  height: "0.9em",
                  backgroundColor: NEON,
                  marginLeft: "1px",
                  verticalAlign: "middle",
                  opacity: cursorVisible ? 1 : 0,
                  transition: "opacity 0.1s ease-in-out",
                }}
              />
            )}
          </span>
        );
      })}
    </pre>
  );
}
