"use client";
export default function MielaPage() {
  return (
    <>
      <div style={{ position: "fixed", inset: 0, backgroundColor: "#000", zIndex: 9998 }} />
      <iframe
        src="/miela/index.html"
        title="Miela Digital"
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
