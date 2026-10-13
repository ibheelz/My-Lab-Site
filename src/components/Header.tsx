"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NEON = "rgb(0, 255, 106)";
const BLUE = "rgb(168, 215, 231)";
const BG = "rgba(9, 9, 11, 0.95)";

const HomeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const ProjectsIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const BlogIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

const ContactIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const navLinks = [
  { label: "home",     href: "/",        Icon: HomeIcon     },
  { label: "projects", href: "/projects", Icon: ProjectsIcon },
  { label: "blog",     href: "/blog",     Icon: BlogIcon     },
  { label: "contact",  href: "/contact",  Icon: ContactIcon  },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 px-5 tablet:px-8 desktop:px-10"
        style={{
          height: "55px",
          backgroundColor: "rgba(9, 9, 11, 0.85)",
          backdropFilter: "blur(10px)",
          borderBottom: `1px solid ${NEON}`,
        }}
      >
        <div className="max-w-[1200px] mx-auto h-full flex items-center justify-between">
          <Link href="/" style={{ color: NEON, fontWeight: 500, fontSize: "14px", letterSpacing: "0.02em" }}>
            <span style={{ color: NEON }}>abiola</span>
            <span style={{ color: NEON }}>@portfolio</span>
            <span style={{ color: NEON }}>:~$</span>
          </Link>

          {/* Desktop nav */}
          <nav className="header-nav items-center gap-6">
            {navLinks.map(({ label, href, Icon }) => {
              const active = href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");
              const inactiveColor = "rgba(168, 215, 231, 0.5)";
              return (
                <Link
                  key={href}
                  href={href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "13px",
                    color: active ? NEON : inactiveColor,
                    transition: "color 0.2s",
                    textDecoration: "none",
                  }}
                  onMouseEnter={active ? undefined : (e) => {
                    (e.currentTarget as HTMLElement).style.color = BLUE;
                  }}
                  onMouseLeave={active ? undefined : (e) => {
                    (e.currentTarget as HTMLElement).style.color = inactiveColor;
                  }}
                >
                  <Icon />
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Hamburger — mobile only */}
          <button
            className="tablet:hidden flex flex-col justify-center items-center gap-[5px] w-8 h-8"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
          >
            <span style={{ display: "block", width: "22px", height: "2px", backgroundColor: NEON, transition: "transform 0.2s, opacity 0.2s", transform: open ? "translateY(7px) rotate(45deg)" : "none" }} />
            <span style={{ display: "block", width: "22px", height: "2px", backgroundColor: NEON, opacity: open ? 0 : 1, transition: "opacity 0.2s" }} />
            <span style={{ display: "block", width: "22px", height: "2px", backgroundColor: NEON, transition: "transform 0.2s, opacity 0.2s", transform: open ? "translateY(-7px) rotate(-45deg)" : "none" }} />
          </button>
        </div>
      </header>

      {/* Mobile dropdown */}
      {open && (
        <div
          className="fixed top-[55px] left-0 right-0 z-40 tablet:hidden"
          style={{ backgroundColor: BG, backdropFilter: "blur(10px)", borderBottom: `1px solid ${NEON}` }}
        >
          <nav className="flex flex-col px-5 py-4 gap-0">
            {navLinks.map(({ label, href, Icon }) => {
              const active = href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");
              const inactiveColor = "rgba(168, 215, 231, 0.5)";
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontSize: "15px",
                    color: active ? NEON : inactiveColor,
                    padding: "12px 0",
                    borderBottom: "1px solid rgb(40,40,40)",
                    textDecoration: "none",
                  }}
                  onMouseEnter={active ? undefined : (e) => {
                    (e.currentTarget as HTMLElement).style.color = BLUE;
                  }}
                  onMouseLeave={active ? undefined : (e) => {
                    (e.currentTarget as HTMLElement).style.color = inactiveColor;
                  }}
                >
                  <Icon />
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </>
  );
}
