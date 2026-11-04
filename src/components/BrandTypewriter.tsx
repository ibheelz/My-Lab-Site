"use client";

import { useTypewriter } from "@/hooks/useTypewriter";

const NEON  = "rgb(0, 255, 106)";
const WHITE = "rgb(255, 255, 255)";

interface Props {
  base: string;
  suffix: string;
  typingSpeed?: number;
  cursorThickness?: number;
}

export default function BrandTypewriter({
  base,
  suffix,
  typingSpeed = 0.04,
  cursorThickness = 2,
}: Props) {
  const { displayed, cursorVisible } = useTypewriter({
    text: base + suffix,
    speed: typingSpeed,
    loop: true,
    loopDelay: 20000,
  });

  const basePart   = displayed.slice(0, base.length);
  const suffixPart = displayed.slice(base.length);

  return (
    <span>
      <span style={{ color: NEON }}>{basePart}</span>
      {suffixPart && <span style={{ color: WHITE }}>{suffixPart}</span>}
      <span
        style={{
          display: "inline-block",
          width: `${cursorThickness}px`,
          height: "0.9em",
          backgroundColor: NEON,
          marginLeft: "2px",
          verticalAlign: "middle",
          opacity: cursorVisible ? 1 : 0,
          transition: "opacity 0.1s ease-in-out",
        }}
      />
    </span>
  );
}
