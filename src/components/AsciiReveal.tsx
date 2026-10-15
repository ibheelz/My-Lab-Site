"use client";

interface Props {
  text: string;
  style?: React.CSSProperties;
  className?: string;
}

export default function AsciiReveal({ text, style, className }: Props) {
  const lines = text.split("\n");
  const total = lines.length;

  return (
    <pre style={{ ...style, color: "#00ff6a" }} className={className}>
      {lines.map((line, i) => {
        const delay = (total - 1 - i) * 30;
        return (
          <span
            key={i}
            style={{
              display: "block",
              animationName: "fadeBlurIn",
              animationDuration: "0.65s",
              animationTimingFunction: "ease-out",
              animationFillMode: "both",
              animationDelay: `${delay}ms`,
              willChange: "transform, opacity",
            }}
          >
            {line || " "}
          </span>
        );
      })}
    </pre>
  );
}
