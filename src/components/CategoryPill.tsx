interface CategoryPillProps {
  label: string;
  color?: string;
}

function toRgba(rgb: string, alpha: number): string {
  return rgb.replace("rgb(", "rgba(").replace(")", `, ${alpha})`);
}

export default function CategoryPill({
  label,
  color = "rgb(0, 255, 255)",
}: CategoryPillProps) {
  return (
    <span
      style={{
        display: "inline-block",
        backgroundColor: toRgba(color, 0.2),
        color,
        padding: "2px 10px",
        borderRadius: "0px",
        fontSize: "12px",
        fontWeight: 300,
      }}
    >
      {label}
    </span>
  );
}
