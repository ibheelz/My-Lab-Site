"use client";

const NEON_GREEN = "rgb(0, 255, 106)";

export default function ViewProjectButton({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "8px 20px",
        backgroundColor: "transparent",
        color: NEON_GREEN,
        fontSize: "14px",
        fontWeight: 300,
        borderRadius: "0px",
        border: `1px solid ${NEON_GREEN}`,
        cursor: "pointer",
        textDecoration: "none",
        transition: "background-color 0.2s, color 0.2s",
        width: "100%",
        boxSizing: "border-box",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.backgroundColor = NEON_GREEN;
        el.style.color = "rgb(0, 0, 0)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.backgroundColor = "transparent";
        el.style.color = NEON_GREEN;
      }}
    >
      View Project
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: "6px", flexShrink: 0 }}>
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" y1="14" x2="21" y2="3" />
      </svg>
    </a>
  );
}
