/* eslint-disable @next/next/no-img-element */
import TypewriterText from "@/components/TypewriterText";
import CategoryPill from "@/components/CategoryPill";
import PrimaryButton from "@/components/PrimaryButton";
import SecondaryButton, { GitHubIcon } from "@/components/SecondaryButton";
import { projects } from "@/data/projects";

const CYAN = "rgb(0, 255, 255)";
const BLUE = "rgb(168, 215, 231)";
const NEON = "rgb(0, 255, 106)";
const YELLOW = "rgb(250, 204, 21)";

const COLORS = [NEON, YELLOW, CYAN];

export default function Projects() {
  return (
    <section className="w-full flex justify-center px-5 pt-[75px] pb-24 tablet:px-8 tablet:pt-[95px] tablet:pb-36 desktop:px-10 desktop:pt-[120px] desktop:pb-[200px]">
      <div className="w-full max-w-[1200px] flex flex-col gap-[60px] desktop:gap-[80px]">

        {/* Terminal breadcrumb */}
        <p className="hidden tablet:block" style={{ fontSize: "16px", lineHeight: "1.6em", color: BLUE, margin: 0 }}>
          abiola@portfolio:~$ projects
        </p>

        <div className="flex flex-col gap-[40px] desktop:gap-[60px]">

          {/* Page header */}
          <div className="flex flex-col gap-[20px] desktop:gap-[30px]">
            <TypewriterText
              text="Selected Projects"
              tag="h3"
              className="text-2xl tablet:text-3xl"
              color={CYAN}
              cursorColor={CYAN}
              cursorThickness={5}
              typingSpeed={0.02}
              showCursor
              hideCursorWhenDone={false}
            />
            <p className="text-sm tablet:text-base leading-relaxed" style={{ color: BLUE, margin: 0 }}>
              Homelab projects, support tools, and automation scripts. Built to solve real IT
              problems and document solutions.
            </p>
          </div>

          {/* 2-column project grid */}
          <div className="grid grid-cols-1 gap-6 tablet:grid-cols-2 tablet:gap-10">
            {projects.map((project, i) => (
              <div
                key={project.slug}
                style={{
                  border: `1px solid ${project.featured ? NEON : "rgb(60, 60, 60)"}`,
                  borderRadius: "8px",
                  padding: "clamp(20px, 4vw, 28px)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                {/* Image / placeholder */}
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    style={{
                      width: "100%",
                      aspectRatio: "16 / 9",
                      objectFit: "cover",
                      borderRadius: "6px",
                      border: "1px solid rgb(50, 55, 60)",
                      display: "block",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      aspectRatio: "16 / 9",
                      backgroundColor: "rgb(29, 32, 37)",
                      borderRadius: "6px",
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
                  <h3 style={{ fontSize: "22px", lineHeight: "1.4em", color: NEON, margin: 0, fontWeight: 400 }}>
                    {project.title}
                  </h3>
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    {project.tags.slice(0, 2).map((tag, ti) => (
                      <CategoryPill key={tag} label={tag} color={COLORS[ti % COLORS.length]} />
                    ))}
                  </div>
                </div>

                {/* Description */}
                <p style={{ fontSize: "14px", lineHeight: "1.8em", color: BLUE, margin: 0, flex: 1 }}>
                  {project.description}
                </p>

                {/* Buttons */}
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  {project.liveUrl && (
                    <PrimaryButton label="Live Demo" href={project.liveUrl} newTab />
                  )}
                  {project.githubUrl && (
                    <SecondaryButton label="Code" href={project.githubUrl} newTab icon={<GitHubIcon />} />
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
