import Link from "next/link";

interface PrimaryButtonProps {
  label: string;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  newTab?: boolean;
}

export default function PrimaryButton({
  label,
  href,
  onClick,
  type = "button",
  className = "",
  newTab = false,
}: PrimaryButtonProps) {
  const style = {
    display: "inline-block",
    padding: "10px 20px",
    backgroundColor: "rgb(0, 255, 106)",
    color: "rgb(0, 0, 0)",
    fontSize: "14px",
    fontWeight: 500,
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    transition: "opacity 0.2s",
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
