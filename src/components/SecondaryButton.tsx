import Link from "next/link";

export const GitHubIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

interface SecondaryButtonProps {
  label: string;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  newTab?: boolean;
  icon?: React.ReactNode;
}

export default function SecondaryButton({
  label,
  href,
  onClick,
  type = "button",
  className = "",
  newTab = false,
  icon,
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
