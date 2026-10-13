"use client";

import { useState } from "react";

const CYAN   = "rgb(0, 255, 255)";
const BORDER = "rgb(60, 60, 60)";

interface FaqItemProps {
  question: string;
  answer: string;
}

export default function FaqItem({ question, answer }: FaqItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        border: `1px solid ${BORDER}`,
        borderRadius: "10px",
        overflow: "hidden",
        position: "relative",
        zIndex: 25,
      }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "16px",
          padding: "clamp(14px, 3vw, 18px)",
          backgroundColor: "rgb(0, 0, 0)",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          color: CYAN,
          fontSize: "14px",
          lineHeight: "1.6",
          fontFamily: "inherit",
          fontWeight: 400,
        }}
      >
        <span>{question}</span>
        <span
          style={{
            flexShrink: 0,
            fontSize: "16px",
            color: CYAN,
            transform: open ? "rotate(180deg)" : "none",
            transition: "transform 0.2s",
            display: "inline-block",
          }}
        >
          ▾
        </span>
      </button>

      {open && (
        <div
          style={{
            padding: "0 clamp(14px, 3vw, 18px) clamp(14px, 3vw, 18px)",
            backgroundColor: "rgb(0, 0, 0)",
            borderTop: `1px solid ${BORDER}`,
          }}
        >
          <p
            style={{
              color: "rgb(255, 255, 255)",
              fontSize: "14px",
              lineHeight: "1.8em",
              margin: "clamp(12px, 2vw, 16px) 0 0",
              fontWeight: 300,
            }}
          >
            {answer}
          </p>
        </div>
      )}
    </div>
  );
}
