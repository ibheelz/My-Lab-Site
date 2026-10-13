import Link from "next/link";

interface SecondaryButtonProps {
  label: string;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  newTab?: boolean;
}

export default function SecondaryButton({
  label,
  href,
  onClick,
  type = "button",
  className = "",
  newTab = false,
}: SecondaryButtonProps) {
  const style = {
    display: "inline-block",
    padding: "10px 20px",
    backgroundColor: "transparent",
    color: "rgb(0, 255, 106)",
    fontSize: "14px",
    fontWeight: 500,
    borderRadius: "4px",
    border: "1px solid rgb(0, 255, 106)",
    cursor: "pointer",
    transition: "background-color 0.2s, color 0.2s",
    textDecoration: "none",
  } as const;

  if (href) {
    return (
      <Link
        href={href}
        style={style}
        className={className}
        target={newTab ? "_blank" : undefined}
        rel={newTab ? "noopener noreferrer" : undefined}
      >
        {label}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} style={style} className={className}>
      {label}
    </button>
  );
}
