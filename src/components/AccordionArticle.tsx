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

function SectionContent({ section, isFirst }: { section: BlogSection; isFirst?: boolean }) {
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
      return (
        <p
          className="text-sm tablet:text-base leading-loose"
          style={{ color: isAnswer ? "rgb(255, 255, 255)" : BLUE, margin: 0 }}
        >
          {section.content as string}
        </p>
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

  return (
    <article className="flex flex-col gap-6">
      {sections.map((section, i) => {
        if (section.type !== "group") {
          return (
            <ScrollReveal key={i} delay={Math.min(i * 50, 150)}>
              <SectionContent section={section} isFirst={i === 0} />
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
