import TypewriterText from "@/components/TypewriterText";
import ScrollReveal from "@/components/ScrollReveal";
import CategoryPill from "@/components/CategoryPill";
import PrimaryButton, { MonitorIcon } from "@/components/PrimaryButton";
import SecondaryButton, { GitHubIcon } from "@/components/SecondaryButton";
import BlogCard from "@/components/BlogCard";
import { posts } from "@/data/blog";
import { projects } from "@/data/projects";
import { TAG_COLORS } from "@/data/colors";

const CYAN      = "rgb(0, 255, 255)";
const BLUE      = "rgb(168, 215, 231)";
const NEON_GREEN = "rgb(0, 255, 106)";
const SURFACE   = "rgb(29, 32, 37)";

const featured    = projects.find((p) => p.featured) ?? projects[0];
const latestPosts = posts.slice(0, 3);

export default function Home() {
  return (
    <>
      {/* ── Featured Project ── */}
      <section className="w-full flex justify-center px-5 pt-6 pb-8 tablet:px-8 tablet:pt-8 tablet:pb-10 desktop:px-10 desktop:pt-10 desktop:pb-12">
        <ScrollReveal className="w-full max-w-[1200px] flex flex-col gap-4">

          {/* Featured Project heading — outside the card */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={CYAN} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <TypewriterText
              text="Featured Project"
              tag="h2"
              className="text-xl tablet:text-2xl"
              color={CYAN}
              cursorColor={CYAN}
              cursorThickness={5}
              typingSpeed={0.02}
              showCursor
              hideCursorWhenDone={false}
            />
          </div>

          {/* Featured project card */}
          <div
            className="flex flex-col gap-8 desktop:flex-row desktop:gap-10"
            style={{
              border: `1px solid ${NEON_GREEN}`,
              borderRadius: "10px",
              padding: "clamp(20px, 4vw, 30px)",
            }}
          >
            {/* Left: image placeholder */}
            <div
              className="flex-1 flex items-center justify-center"
              style={{
                backgroundColor: SURFACE,
                borderRadius: "10px",
                minHeight: "220px",
                border: "1px solid rgb(50, 55, 60)",
                position: "relative",
                zIndex: 25,
              }}
            >
              <span style={{ color: "rgba(168, 215, 231, 0.3)", fontSize: "12px", fontWeight: 300 }}>[ image ]</span>
            </div>

            {/* Right: details */}
            <div className="flex-1 flex flex-col gap-[30px]">
              <div className="flex flex-col gap-[10px]">
                <h3 style={{ fontSize: "18px", lineHeight: "1.4em", color: NEON_GREEN, margin: 0 }}>
                  {featured.title}
                </h3>
                <div className="flex gap-[10px] flex-wrap">
                  {featured.tags.slice(0, 2).map((tag, i) => (
                    <CategoryPill key={tag} label={tag} color={TAG_COLORS[i]} />
                  ))}
                </div>
                <p style={{ fontSize: "14px", lineHeight: "1.8em", color: BLUE, margin: 0 }}>
                  {featured.description}
                </p>
              </div>

              <div className="flex gap-[10px] flex-wrap">
                {featured.liveUrl  && <PrimaryButton label="Live Demo" href={featured.liveUrl} newTab className="flex-1" icon={<MonitorIcon />} />}
                {featured.githubUrl && <SecondaryButton label="Code" href={featured.githubUrl} newTab icon={<GitHubIcon />} />}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ── Blog ── */}
      <section className="w-full flex justify-center px-5 pt-8 pb-16 tablet:px-8 tablet:pt-10 tablet:pb-20 desktop:px-10 desktop:pt-12 desktop:pb-28">
        <ScrollReveal delay={100} className="w-full max-w-[1200px] flex flex-col gap-8 desktop:gap-20">

          {/* Header */}
          <div className="flex flex-col gap-4">
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={CYAN} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
            <TypewriterText
              text="Latest Blog Posts"
              tag="h1"
              className="text-xl tablet:text-2xl"
              color={CYAN}
              cursorColor={CYAN}
              cursorThickness={5}
              typingSpeed={0.02}
              showCursor
              hideCursorWhenDone={false}
            />
            </div>
            <p style={{ fontSize: "16px", lineHeight: "1.6em", color: BLUE, margin: 0 }}>
              Guides, troubleshooting notes, and IT walkthroughs. Practical documentation from
              real support scenarios, homelab experiments, and system administration.
            </p>
          </div>

          {/* Articles grid */}
          <div className="grid grid-cols-1 gap-5 tablet:grid-cols-2 tablet:gap-8 desktop:grid-cols-3 desktop:gap-10">
            {latestPosts.map((post, i) => (
              <BlogCard
                key={post.slug}
                slug={post.slug}
                title={post.title}
                description={post.description}
                category={post.category}
                readTime={post.readTime}
                thumbnail={post.thumbnail}
                categoryColor={post.color ?? TAG_COLORS[i % TAG_COLORS.length]}
              />
            ))}
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
