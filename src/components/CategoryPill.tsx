interface CategoryPillProps {
  label: string;
  color?: string;
}

export default function CategoryPill({
  label,
  color = "rgb(0, 255, 106)",
}: CategoryPillProps) {
  return (
    <span
      style={{
        display: "inline-block",
        border: `1px solid ${color}`,
        color,
        padding: "2px 10px",
        borderRadius: "9999px",
        fontSize: "13px",
        fontWeight: 500,
      }}
    >
      {label}
    </span>
  );
}
