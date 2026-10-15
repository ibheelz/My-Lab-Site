import Link from "next/link";

export const MonitorIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);

interface PrimaryButtonProps {
  label: string;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  newTab?: boolean;
  icon?: React.ReactNode;
}

export default function PrimaryButton({
  label,
  href,
  onClick,
  type = "button",
  className = "",
  newTab = false,
  icon,
}: PrimaryButtonProps) {
  const style = {
    display: "inline-block",
    padding: "10px 20px",
    backgroundColor: "rgb(0, 255, 106)",
    color: "rgb(0, 0, 0)",
    fontSize: "14px",
    fontWeight: 500,
    borderRadius: "0px",
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
