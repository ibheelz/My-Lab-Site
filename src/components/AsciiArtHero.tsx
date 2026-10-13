import { useMemo } from "react";

const PATTERNS: Record<string, string[]> = {
  A: ["  ##  ", " #  # ", "#    #", "######", "#    #", "#    #", "      "],
  B: ["##### ", "#    #", "##### ", "##### ", "#    #", "##### ", "      "],
  C: [" #### ", "#     ", "#     ", "#     ", "#     ", " #### ", "      "],
  D: ["##### ", "#    #", "#    #", "#    #", "#    #", "##### ", "      "],
  E: ["######", "#     ", "##### ", "##### ", "#     ", "######", "      "],
  F: ["######", "#     ", "##### ", "##### ", "#     ", "#     ", "      "],
  G: [" #### ", "#     ", "#  ###", "#    #", "#    #", " #### ", "      "],
  H: ["#    #", "#    #", "######", "######", "#    #", "#    #", "      "],
  I: ["######", "  ##  ", "  ##  ", "  ##  ", "  ##  ", "######", "      "],
  J: ["######", "    ##", "    ##", "    ##", "#   ##", " #### ", "      "],
  K: ["#   ##", "#  ## ", "###   ", "###   ", "#  ## ", "#   ##", "      "],
  L: ["#     ", "#     ", "#     ", "#     ", "#     ", "######", "      "],
  M: ["#    #", "######", "######", "#    #", "#    #", "#    #", "      "],
  N: ["#    #", "##   #", "###  #", "#  ###", "#   ##", "#    #", "      "],
  O: [" #### ", "#    #", "#    #", "#    #", "#    #", " #### ", "      "],
  P: ["##### ", "#    #", "##### ", "#     ", "#     ", "#     ", "      "],
  Q: [" #### ", "#    #", "#    #", "#  # #", "#   ##", " #####", "      "],
  R: ["##### ", "#    #", "##### ", "#  ## ", "#   ##", "#    #", "      "],
  S: [" #### ", "#     ", " #### ", "     #", "     #", " #### ", "      "],
  T: ["######", "  ##  ", "  ##  ", "  ##  ", "  ##  ", "  ##  ", "      "],
  U: ["#    #", "#    #", "#    #", "#    #", "#    #", " #### ", "      "],
  V: ["#    #", "#    #", "#    #", "#    #", " #  # ", "  ##  ", "      "],
  W: ["#    #", "#    #", "#    #", "######", "######", "#    #", "      "],
  X: ["#    #", " #  # ", "  ##  ", "  ##  ", " #  # ", "#    #", "      "],
  Y: ["#    #", "#    #", " #  # ", "  ##  ", "  ##  ", "  ##  ", "      "],
  Z: ["######", "    ##", "   ## ", "  ##  ", " ##   ", "######", "      "],
  " ": ["      ", "      ", "      ", "      ", "      ", "      ", "      "],
  "0": [" #### ", "#    #", "#  # #", "# ## #", "#    #", " #### ", "      "],
  "1": ["  ##  ", " ###  ", "  ##  ", "  ##  ", "  ##  ", "######", "      "],
  "2": [" #### ", "#    #", "    ##", "  ### ", " ##   ", "######", "      "],
  "3": [" #### ", "#    #", "   ## ", "     #", "#    #", " #### ", "      "],
  "4": ["#    #", "#    #", "######", "     #", "     #", "     #", "      "],
  "5": ["######", "#     ", "##### ", "     #", "#    #", " #### ", "      "],
  "6": [" #### ", "#     ", "##### ", "#    #", "#    #", " #### ", "      "],
  "7": ["######", "     #", "    ##", "   ## ", "  ##  ", " ##   ", "      "],
  "8": [" #### ", "#    #", " #### ", "#    #", "#    #", " #### ", "      "],
  "9": [" #### ", "#    #", " #### ", "     #", "     #", " #### ", "      "],
};

const GRADIENT_CHARS = ["░", "▒", "▓", "\\"];

interface AsciiArtHeroProps {
  text?: string;
  color?: string;
  fontSize?: number;
  letterSpacing?: number;
  subtitle?: string;
}

export default function AsciiArtHero({
  text = "ABIOLA",
  color = "rgb(0, 255, 106)",
  fontSize = 13,
  letterSpacing = 2.5,
  subtitle = "it support specialist",
}: AsciiArtHeroProps) {
  const art = useMemo(() => {
    const upper = text.toUpperCase();
    const rows = Array(7).fill("").map(() => "");

    for (const char of upper) {
      const pattern = PATTERNS[char] ?? PATTERNS[" "];
      pattern.forEach((line, rowIndex) => {
        const charIndex = Math.floor((rowIndex / 7) * GRADIENT_CHARS.length);
        const fillChar = GRADIENT_CHARS[charIndex] ?? "\\";
        rows[rowIndex] += line.replace(/#/g, fillChar);
      });
    }

    return rows.join("\n");
  }, [text]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        border: "5px double rgb(0, 255, 106)",
        padding: "clamp(16px, 4vw, 30px)",
        maxWidth: "100%",
        overflowX: "auto",
      }}
    >
      <pre
        className="ascii-pre"
        style={{
          fontFamily: "Courier New, monospace",
          lineHeight: 1,
          color,
          margin: 0,
          whiteSpace: "pre",
        }}
      >
        {art}
      </pre>
      <p
        style={{
          color: "rgb(0, 255, 106)",
          fontSize: "clamp(13px, 3vw, 16px)",
          fontWeight: 500,
          margin: 0,
          textAlign: "center",
        }}
      >
        {subtitle}
      </p>
    </div>
  );
}
