"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import TypewriterText from "@/components/TypewriterText";
import CategoryPill from "@/components/CategoryPill";
import ScrollReveal from "@/components/ScrollReveal";
import { projects } from "@/data/projects";
import { TAG_COLORS } from "@/data/colors";

const CYAN = "rgb(0, 255, 255)";
const BLUE = "rgb(168, 215, 231)";
const NEON = "rgb(0, 255, 106)";

export default function Projects() {
  let colorIdx = 0;
  const projectTagColors = projects.map((project) =>
    project.tags.slice(0, 2).map(() => TAG_COLORS[colorIdx++ % TAG_COLORS.length])
  );

  return (
    <section className="w-full flex justify-center px-5 pt-10 pb-16 tablet:px-8 tablet:pt-14 tablet:pb-20 desktop:px-10 desktop:pt-20 desktop:pb-28">
      <div className="w-full max-w-[1200px] flex flex-col gap-[60px] desktop:gap-[80px]">


        <div className="flex flex-col gap-[40px] desktop:gap-[60px]">

          {/* Page header */}
          <ScrollReveal>
          <div className="flex flex-col gap-[20px] desktop:gap-[30px]">
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={CYAN} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
              </svg>
              <TypewriterText
                text="Selected Projects"
                tag="h3"
                className="text-xl tablet:text-2xl"
                color={CYAN}
                cursorColor={CYAN}
                cursorThickness={5}
                typingSpeed={0.02}
                showCursor
                hideCursorWhenDone={false}
              />
            </div>
            <p className="text-sm tablet:text-base leading-relaxed" style={{ color: BLUE, margin: 0 }}>
              Homelab projects, support tools, and automation scripts. Built to solve real IT
              problems and document solutions.
            </p>
          </div>
          </ScrollReveal>

          {/* 2-column project grid */}
          <ScrollReveal delay={150}>
          <div className="grid grid-cols-1 gap-6 tablet:grid-cols-2 tablet:gap-10">
            {projects.map((project, i) => (
              <div
                key={project.slug}
                style={{
                  border: `1px solid ${project.featured ? NEON : "rgb(60, 60, 60)"}`,
                  borderRadius: "10px",
                  padding: "clamp(20px, 4vw, 28px)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                  backgroundColor: "rgb(0, 0, 0)",
                  position: "relative",
                  zIndex: 25,
                }}
              >
                {/* Image / placeholder */}
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    style={{
                      width: "100%",
                      aspectRatio: "4 / 3",
                      objectFit: "cover",
                      borderRadius: "8px",
                      border: "1px solid rgb(50, 55, 60)",
                      display: "block",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      aspectRatio: "4 / 3",
                      backgroundColor: "rgb(29, 32, 37)",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px solid rgb(50, 55, 60)",
                    }}
                  >
                    <span style={{ color: "rgba(168, 215, 231, 0.3)", fontSize: "12px", fontWeight: 300 }}>[ image ]</span>
                  </div>
                )}

                {/* Title + tags */}
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {project.featured && (
                    <span style={{ fontSize: "12px", color: NEON }}>★ Featured Project</span>
                  )}
                  <h3 style={{ fontSize: "18px", lineHeight: "1.4em", color: NEON, margin: 0, fontWeight: 400 }}>
                    {project.title}
                  </h3>
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    {project.tags.slice(0, 2).map((tag, ti) => (
                      <CategoryPill key={tag} label={tag} color={projectTagColors[i][ti]} />
                    ))}
                  </div>
                </div>

                {/* Description */}
                <p style={{ fontSize: "14px", lineHeight: "1.8em", color: BLUE, margin: 0, flex: 1 }}>
                  {project.description}
                </p>

                {/* View Project button — full width */}
                <Link
                  href={project.liveUrl ?? project.githubUrl ?? "#"}
                  target={project.liveUrl || project.githubUrl ? "_blank" : undefined}
                  rel={project.liveUrl || project.githubUrl ? "noopener noreferrer" : undefined}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "8px 20px",
                    backgroundColor: "transparent",
                    color: NEON,
                    fontSize: "14px",
                    fontWeight: 300,
                    borderRadius: "10px",
                    border: `1px solid ${NEON}`,
                    cursor: "pointer",
                    textDecoration: "none",
                    alignSelf: "stretch",
                    transition: "background-color 0.2s, color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.backgroundColor = NEON;
                    el.style.color = "rgb(0, 0, 0)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.backgroundColor = "transparent";
                    el.style.color = NEON;
                  }}
                >
                  View Project
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: "6px", flexShrink: 0 }}>
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
