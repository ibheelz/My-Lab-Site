/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef, useState } from "react";
import { BlogSection } from "@/data/blog";
import BlogImage from "@/components/BlogImage";
import FaqItem from "@/components/FaqItem";
import CodeTypewriter from "@/components/CodeTypewriter";
import ScrollReveal from "@/components/ScrollReveal";

const CYAN   = "rgb(0, 255, 255)";
const BLUE   = "rgb(168, 215, 231)";
const NEON   = "rgb(0, 255, 106)";
const BORDER = "rgb(60, 60, 60)";

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

// Keyword highlight groups — background highlight, grouped by context
// Each term uses \b word boundaries in the regex to prevent partial matches (ISO ≠ isolate)
const KEYWORD_GROUPS: Array<{ bg: string; terms: string[] }> = [
  {
    // Networking & connectivity
    bg: "rgba(56, 189, 248, 1)",
    terms: [
      "bridged networking", "bridged network adapter", "bridged mode", "bridged adapter",
      "NAT adapter", "IP address", "IPv4 address", "IPv4",
      "DNS", "DHCP", "subnet mask", "subnet", "default gateway",
      "port forwarding", "TCP/IP", "network segment",
    ],
  },
  {
    // Active Directory & identity
    bg: "rgba(251, 146, 60, 1)",
    terms: [
      "Active Directory Domain Services", "Active Directory Users and Computers",
      "Active Directory", "AD DS", "ADUC", "domain controller",
      "zenithcreative.com", "domain name",
    ],
  },
  {
    // Group Policy
    bg: "rgba(250, 204, 21, 1)",
    terms: [
      "Group Policy Management Editor", "Group Policy Management Console",
      "Group Policy Management", "Group Policy Object", "Group Policy",
      "GPME", "GPMC", "GPO",
    ],
  },
  {
    // VM & hardware
    bg: "rgba(167, 139, 250, 1)",
    terms: [
      "VirtualBox", "virtual machine", "EFI firmware", "dynamically allocated",
    ],
  },
  {
    // Windows & OS
    bg: "rgba(52, 211, 153, 1)",
    terms: [
      "Windows Server 2022 Standard Evaluation", "Windows Server 2022",
      "Windows Server", "Windows 11", "Server Manager", "Desktop Experience",
    ],
  },
  {
    // File, storage & permissions
    bg: "rgba(251, 113, 133, 1)",
    terms: [
      "NTFS permissions", "UNC path", "file share",
      "shared folder", "drive mapping", "mapped drive",
    ],
  },
  {
    // PowerShell
    bg: "rgba(94, 234, 212, 1)",
    terms: ["PowerShell"],
  },
  {
    // Named identifiers
    bg: "rgba(192, 132, 252, 1)",
    terms: ["Zenith Creative", "ZCDC01", "ZCPC01", "adm.abiola"],
  },
];

// Sort longest-first so multi-word phrases match before their substrings
const ALL_TERMS = KEYWORD_GROUPS
  .flatMap(({ bg, terms }) => terms.map((term) => ({ term, bg })))
  .sort((a, b) => b.term.length - a.term.length);

// Use \b word boundaries so short terms like NAT, DNS don't fire inside other words
const HIGHLIGHT_REGEX = new RegExp(
  `(${ALL_TERMS.map((t) => `\\b${t.term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`).join("|")})`,
  "gi"
);

function highlightText(text: string): React.ReactNode {
  const parts = text.split(HIGHLIGHT_REGEX);
  return parts.map((part, i) => {
    const match = ALL_TERMS.find((t) => t.term.toLowerCase() === part.toLowerCase());
    if (!match) return part;
    return (
      <mark
        key={i}
        style={{
          background: match.bg,
          color: "#000",
          fontWeight: 600,
          padding: "1px 4px",
          borderRadius: "3px",
        }}
      >
        {part}
      </mark>
    );
  });
}

function SectionContent({ section, isFirst, noHighlight }: { section: BlogSection; isFirst?: boolean; noHighlight?: boolean }) {
  switch (section.type) {
    case "h2":
      return (
        <h2
          id={slugify(section.content as string)}
          className="text-base tablet:text-lg"
          style={{ color: CYAN, margin: isFirst ? "0" : "16px 0 0", fontWeight: 500 }}
        >
          {section.content as string}
        </h2>
      );

    case "h3":
      return (
        <h3
          id={slugify(section.content as string)}
          className="text-sm tablet:text-base"
          style={{ color: CYAN, margin: "8px 0 0", fontWeight: 500 }}
        >
          {section.content as string}
        </h3>
      );

    case "tasklist":
      return (
        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-3">
          {section.links?.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "12px",
                padding: "clamp(12px, 2.5vw, 14px) clamp(14px, 3vw, 18px)",
                backgroundColor: "rgb(0, 0, 0)",
                border: `1px solid ${BORDER}`,
                borderRadius: "0px",
                color: CYAN,
                fontSize: "13px",
                textDecoration: "none",
                position: "relative",
                zIndex: 25,
              }}
            >
              <span style={{ lineHeight: 1.5 }}>{label}</span>
              <span style={{ flexShrink: 0, color: NEON }}>→</span>
            </a>
          ))}
        </div>
      );

    case "p": {
      const isAnswer = (section.content as string).startsWith("My answer:");
      const color = isAnswer ? "rgb(255, 255, 255)" : BLUE;
      const sentences = (section.content as string)
        .split(/(?<=[.?!])\s+(?=[A-Z])/)
        .map((s) => s.trim())
        .filter(Boolean);
      return (
        <div className="flex flex-col gap-3">
          {sentences.map((s, i) => (
            <p key={i} className="text-sm tablet:text-base leading-loose" style={{ color, margin: 0 }}>
              {noHighlight ? s : highlightText(s)}
            </p>
          ))}
        </div>
      );
    }

    case "ul":
      return (
        <ul className="flex flex-col gap-2" style={{ margin: 0, paddingLeft: "0" }}>
          {(section.content as string[]).map((item, j) => (
            <li
              key={j}
              className="text-sm tablet:text-base leading-relaxed flex gap-3"
              style={{ color: BLUE, listStyle: "none" }}
            >
              <span style={{ color: NEON, flexShrink: 0 }}>▸</span>
              {item}
            </li>
          ))}
        </ul>
      );

    case "code":
      return <CodeTypewriter content={section.content as string} />;

    case "note":
      return (
        <div
          className="flex gap-3"
          style={{
            backgroundColor: "rgb(0, 0, 0)",
            border: `1px solid ${CYAN}`,
            borderRadius: "0px",
            padding: "clamp(12px, 3vw, 16px)",
            position: "relative",
            zIndex: 25,
          }}
        >
          <p
            className="text-sm tablet:text-base leading-relaxed"
            style={{ color: BLUE, margin: 0 }}
          >
            {section.content as string}
          </p>
        </div>
      );

    case "aside": {
      const asideSentences = (section.content as string)
        .split(/(?<=[.?!])\s+(?=[A-Z])/)
        .map((s) => s.trim())
        .filter(Boolean);
      return (
        <div
          style={{
            borderLeft: "2px solid rgb(100, 100, 100)",
            paddingLeft: "14px",
          }}
        >
          <div className="flex flex-col gap-2">
            {asideSentences.map((s, i) => (
              <p
                key={i}
                className="text-sm leading-relaxed"
                style={{ color: "rgb(120, 130, 145)", margin: 0, fontStyle: "italic" }}
              >
                {i === 0 && (
                  <span style={{ fontStyle: "normal", fontWeight: 600, color: "rgb(150, 155, 165)", marginRight: "6px" }}>PS —</span>
                )}
                {s}
              </p>
            ))}
          </div>
        </div>
      );
    }

    case "img":
      return (
        <BlogImage
          src={section.content as string}
          alt={section.alt ?? ""}
          caption={section.caption}
        />
      );

    case "navpath": {
      const segments = (section.content as string).split(">").map((s) => s.trim());
      return (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "4px",
            backgroundColor: "rgb(10, 10, 10)",
            border: `1px solid ${BORDER}`,
            borderLeft: `3px solid ${CYAN}`,
            borderRadius: "0px",
            padding: "10px 14px",
            fontFamily: "var(--font-mono)",
            fontSize: "12px",
          }}
        >
          {segments.map((seg, k) => (
            <span key={k} style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
              <span style={{ color: "rgb(255, 255, 255)" }}>{seg}</span>
              {k < segments.length - 1 && (
                <span style={{ color: NEON, fontWeight: 700, margin: "0 2px" }}>›</span>
              )}
            </span>
          ))}
        </div>
      );
    }

    case "label":
      return (
        <p
          style={{
            color: NEON,
            fontSize: "11px",
            fontWeight: 500,
            margin: "4px 0 0",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          {section.content as string}
        </p>
      );

    case "qa":
      return (
        <FaqItem
          question={section.content as string}
          answer={section.answer ?? ""}
        />
      );

    default:
      return null;
  }
}

const NAV_HEIGHT = 55;

export default function AccordionArticle({ sections }: { sections: BlogSection[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const groupRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const scrollTargetRef = useRef<number | null>(null);

  function handleGroupClick(i: number) {
    scrollTargetRef.current = i;
    setOpenIdx((prev) => (prev === i ? null : i));
  }

  useEffect(() => {
    if (scrollTargetRef.current === null) return;
    const i = scrollTargetRef.current;
    scrollTargetRef.current = null;
    const el = groupRefs.current.get(i);
    if (!el) return;
    requestAnimationFrame(() => {
      const top = window.scrollY + el.getBoundingClientRect().top - NAV_HEIGHT;
      window.scrollTo({ top, behavior: "smooth" });
    });
  }, [openIdx]);

  const noHighlightIndices = (() => {
    const set = new Set<number>();
    let inOverview = false;
    sections.forEach((section, i) => {
      if (section.type === "h2") {
        inOverview = (section.content as string) === "Overview";
      } else if (section.type === "group") {
        inOverview = false;
      }
      if (inOverview && section.type === "p") set.add(i);
    });
    return set;
  })();

  return (
    <article className="flex flex-col gap-6">
      {sections.map((section, i) => {
        if (section.type !== "group") {
          return (
            <ScrollReveal key={i} delay={Math.min(i * 50, 150)}>
              <SectionContent section={section} isFirst={i === 0} noHighlight={noHighlightIndices.has(i)} />
            </ScrollReveal>
          );
        }

        const isOpen = openIdx === i;

        return (
          <ScrollReveal key={i} delay={Math.min(i * 50, 150)}>
          <div
            ref={(el) => {
              if (el) groupRefs.current.set(i, el);
              else groupRefs.current.delete(i);
            }}
            style={{
              border: `1px solid ${BORDER}`,
              position: "relative",
              zIndex: 25,
            }}
          >
            <button
              onClick={() => handleGroupClick(i)}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "16px",
                padding: "clamp(14px, 3vw, 18px)",
                backgroundColor: "rgb(0, 0, 0)",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                color: CYAN,
                fontSize: "14px",
                lineHeight: "1.6",
                fontFamily: "inherit",
                fontWeight: 500,
                position: "sticky",
                top: "55px",
                zIndex: 30,
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span
                  style={{
                    color: NEON,
                    fontSize: "11px",
                    display: "inline-block",
                    transform: isOpen ? "rotate(90deg)" : "none",
                    transition: "transform 0.2s",
                  }}
                >
                  ▸
                </span>
                {section.title}
              </span>
              <span
                style={{
                  flexShrink: 0,
                  fontSize: "16px",
                  color: CYAN,
                  transform: isOpen ? "rotate(180deg)" : "none",
                  transition: "transform 0.2s",
                  display: "inline-block",
                }}
              >
                ▾
              </span>
            </button>

            {isOpen && (
              <div
                style={{
                  padding: "clamp(16px, 3vw, 24px)",
                  borderTop: `1px solid ${BORDER}`,
                  display: "flex",
                  flexDirection: "column",
                  gap: "24px",
                }}
              >
                {section.children?.map((child, j) => (
                  <SectionContent key={j} section={child} />
                ))}
              </div>
            )}
          </div>
          </ScrollReveal>
        );
      })}
    </article>
  );
}
