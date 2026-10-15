"use client";
/* eslint-disable @next/next/no-img-element */

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface BlogImageProps {
  src: string;
  alt: string;
  caption?: string;
}

const BORDER = "rgb(60, 60, 60)";
const NEON   = "rgb(0, 255, 106)";
const MUTED  = "rgb(168, 215, 231)";

export default function BlogImage({ src, alt, caption }: BlogImageProps) {
  const [open, setOpen] = useState(false);
  const portalRef = useRef<Element | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    portalRef.current = document.body;
    setMounted(true);
  }, []);

  const overlay = (
    <div
      onClick={() => setOpen(false)}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundColor: "rgb(0, 0, 0)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(16px, 5vw, 60px)",
      }}
    >
      <button
        onClick={() => setOpen(false)}
        aria-label="Close"
        style={{
          position: "absolute",
          top: "16px",
          right: "16px",
          background: "none",
          border: `1px solid ${NEON}`,
          borderRadius: "0px",
          color: NEON,
          fontSize: "13px",
          padding: "6px 14px",
          cursor: "pointer",
          fontFamily: "inherit",
          zIndex: 10000,
        }}
      >
        close ✕
      </button>

      <img
        src={src}
        alt={alt}
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: "100%",
          maxHeight: "90vh",
          borderRadius: "0px",
          border: `1px solid ${BORDER}`,
          display: "block",
          objectFit: "contain",
        }}
      />
    </div>
  );

  return (
    <>
      <figure
        style={{ margin: 0, display: "flex", flexDirection: "column", gap: "10px", position: "relative", zIndex: 25 }}
      >
        <img
          src={src}
          alt={alt}
          onClick={() => setOpen(true)}
          style={{
            width: "100%",
            borderRadius: "0px",
            border: `1px solid ${BORDER}`,
            display: "block",
            cursor: "zoom-in",
          }}
        />
        {caption && (
          <figcaption className="text-xs tablet:text-sm" style={{ color: MUTED, fontStyle: "normal" }}>
            {caption}
          </figcaption>
        )}
      </figure>

      {mounted && open && createPortal(overlay, portalRef.current!)}
    </>
  );
}
