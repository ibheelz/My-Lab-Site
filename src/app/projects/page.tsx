import TypewriterText from "@/components/TypewriterText";
import CategoryPill from "@/components/CategoryPill";
import PrimaryButton from "@/components/PrimaryButton";
import SecondaryButton from "@/components/SecondaryButton";
import { projects } from "@/data/projects";

const CYAN = "rgb(0, 255, 255)";
const BLUE = "rgb(168, 215, 231)";
const NEON_GREEN = "rgb(0, 255, 106)";
const YELLOW = "rgb(250, 204, 21)";
const SURFACE = "rgb(29, 32, 37)";

const COLORS = [NEON_GREEN, YELLOW, CYAN];

export default function Projects() {
  return (
    <section className="w-full flex justify-center px-5 pt-[75px] pb-24 tablet:px-8 tablet:pt-[95px] tablet:pb-36 desktop:px-10 desktop:pt-[120px] desktop:pb-[200px]">
      <div className="w-full max-w-[1200px] flex flex-col gap-10 tablet:gap-14 desktop:gap-16">

        {/* Header */}
        <div className="flex flex-col gap-4">
          <TypewriterText
            text="Projects"
            tag="h1"
            className="text-2xl tablet:text-3xl desktop:text-4xl"
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

        {/* Project cards */}
        <div className="flex flex-col gap-6 tablet:gap-8">
          {projects.map((project, i) => (
            <div
              key={project.slug}
              className="flex flex-col gap-6 desktop:flex-row desktop:gap-12"
              style={{
                border: `1px solid ${project.featured ? NEON_GREEN : "rgb(60, 60, 60)"}`,
                borderRadius: "8px",
                padding: "clamp(20px, 4vw, 28px)",
              }}
            >
              {/* Left: info */}
              <div className="flex-1 flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  {project.featured && (
                    <span className="text-xs" style={{ color: NEON_GREEN }}>
                      ★ Featured Project
                    </span>
                  )}
                  <h2
                    className="text-lg tablet:text-xl desktop:text-2xl"
                    style={{ color: NEON_GREEN, margin: 0 }}
                  >
                    {project.title}
                  </h2>
                </div>

                <div className="flex gap-2 flex-wrap">
                  {project.tags.map((tag, ti) => (
                    <CategoryPill key={tag} label={tag} color={COLORS[ti % COLORS.length]} />
                  ))}
                </div>

                <p className="text-sm leading-loose" style={{ color: BLUE, margin: 0 }}>
                  {project.description}
                </p>

                <div className="flex gap-2.5 flex-wrap">
                  {project.liveUrl && <PrimaryButton label="Live Demo" href={project.liveUrl} newTab />}
                  {project.githubUrl && <SecondaryButton label="Code" href={project.githubUrl} newTab />}
                </div>
              </div>

              {/* Right: placeholder stats / index */}
              <div
                className="self-start flex items-center justify-center rounded min-w-[80px] min-h-[80px] desktop:min-w-[100px] desktop:min-h-[100px]"
                style={{ backgroundColor: SURFACE }}
              >
                <span
                  className="text-3xl desktop:text-4xl font-medium"
                  style={{ color: "rgb(60, 60, 60)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
