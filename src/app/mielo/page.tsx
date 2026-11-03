"use client";

export default function MieloPage() {
  return (
    <>
      <div style={{ position: "fixed", inset: 0, backgroundColor: "#000", zIndex: 9998 }} />
      <iframe
        src="https://frontend-olive-gamma-m7k5t9i3pg.vercel.app"
        title="Mielo"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          border: "none",
          zIndex: 9999,
        }}
      />
    </>
  );
}
