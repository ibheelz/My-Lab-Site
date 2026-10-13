import AsciiArtHero from "@/components/AsciiArtHero";
import TypewriterText from "@/components/TypewriterText";
import ProfilePicture from "@/components/ProfilePicture";
import CategoryPill from "@/components/CategoryPill";
import PrimaryButton, { MonitorIcon } from "@/components/PrimaryButton";
import SecondaryButton, { GitHubIcon } from "@/components/SecondaryButton";
import BlogCard from "@/components/BlogCard";
import { posts } from "@/data/blog";
import { projects } from "@/data/projects";

const CYAN      = "rgb(0, 255, 255)";
const BLUE      = "rgb(168, 215, 231)";
const NEON_GREEN = "rgb(0, 255, 106)";
const SURFACE   = "rgb(29, 32, 37)";
const YELLOW    = "rgb(250, 204, 21)";

const featured    = projects.find((p) => p.featured) ?? projects[0];
const latestPosts = posts.slice(0, 3);

export default function Home() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="w-full flex justify-center px-5 pt-[60px] pb-4 tablet:px-8 tablet:pt-[75px] tablet:pb-6 desktop:px-10 desktop:pt-[90px] desktop:pb-8">
        <div className="w-full max-w-[1200px] flex flex-col gap-8 tablet:gap-10">

          {/* ASCII art */}
          <div className="tablet:hidden">
            <AsciiArtHero text="ABIOLA" subtitle="Information Technology Portfolio" />
          </div>
          <div className="hidden tablet:block">
            <AsciiArtHero text="ABIOLA ADEYEYE" subtitle="Information Technology Portfolio" />
          </div>

          {/* Portfolio information */}
          <div className="flex flex-col-reverse gap-6 tablet:flex-row tablet:gap-8 tablet:items-start">

            {/* Left: typewriter info */}
            <div className="flex-1 flex flex-col gap-5">
              {/* h1 — 36px / 1.1em */}
              <TypewriterText
                text="Portfolio Information:"
                tag="h1"
                className="text-base leading-[1.6]"
                color={CYAN}
                cursorColor={CYAN}
                cursorThickness={5}
                typingSpeed={0.02}
                showCursor
                hideCursorWhenDone={false}
              />
              {/* h5 — 16px / 1.4em */}
              <div className="flex flex-col gap-2.5">
                <TypewriterText text="Name: Abiola Adeyeye"            tag="h5" className="text-base leading-[1.4]" color={BLUE} cursorColor={BLUE} cursorThickness={2} typingSpeed={0.04} delayStart={1}   showCursor hideCursorWhenDone />
                <TypewriterText text="Based in: Lagos, Nigeria"         tag="h5" className="text-base leading-[1.4]" color={BLUE} cursorColor={BLUE} cursorThickness={2} typingSpeed={0.04} delayStart={1.2} showCursor hideCursorWhenDone />
                <TypewriterText text="Profession: IT Support Specialist" tag="h5" className="text-base leading-[1.4]" color={BLUE} cursorColor={BLUE} cursorThickness={2} typingSpeed={0.04} delayStart={1.4} showCursor hideCursorWhenDone />
                <TypewriterText text="Availability: Open to Work"       tag="h5" className="text-base leading-[1.4]" color={BLUE} cursorColor={BLUE} cursorThickness={2} typingSpeed={0.04} delayStart={1.7} showCursor hideCursorWhenDone />
              </div>
            </div>

            {/* Right: profile picture */}
            <ProfilePicture />
          </div>
        </div>
      </section>

      {/* ── Introduction + Featured Project ── */}
      <section className="w-full flex justify-center px-5 pt-6 pb-8 tablet:px-8 tablet:pt-8 tablet:pb-10 desktop:px-10 desktop:pt-10 desktop:pb-12">
        <div className="w-full max-w-[1200px] flex flex-col gap-10 desktop:gap-20">

          {/* Intro text — Body L (18px) + Body M (16px) */}
          <div className="flex flex-col gap-2.5 max-w-[800px]">
            <p style={{ fontSize: "18px", lineHeight: "1.6em", fontWeight: 500, color: NEON_GREEN, margin: 0 }}>
              Welcome to Abiola&apos;s IT Support Lab!
            </p>
            <p style={{ fontSize: "16px", lineHeight: "1.6em", color: BLUE, margin: 0 }}>
              IT Support Specialist based in Lagos, Nigeria. Keeping systems running, solving
              technical problems, and helping people get the most out of their technology.
            </p>
          </div>

          {/* Featured Project heading — outside the card */}
          <p style={{ fontSize: "16px", lineHeight: "1.6em", color: CYAN, margin: 0 }}>
            Featured Project:
          </p>

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
                <h3 style={{ fontSize: "24px", lineHeight: "1.4em", color: NEON_GREEN, margin: 0 }}>
                  {featured.title}
                </h3>
                <div className="flex gap-[10px] flex-wrap">
                  {featured.tags.slice(0, 2).map((tag, i) => (
                    <CategoryPill key={tag} label={tag} color={i === 0 ? CYAN : YELLOW} />
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
        </div>
      </section>

      {/* ── Blog ── */}
      <section className="w-full flex justify-center px-5 pt-8 pb-20 tablet:px-8 tablet:pt-10 tablet:pb-24 desktop:px-10 desktop:pt-12 desktop:pb-32">
        <div className="w-full max-w-[1200px] flex flex-col gap-8 desktop:gap-20">

          {/* Header */}
          <div className="flex flex-col gap-4">
            {/* h1 — 36px / 1.1em */}
            <TypewriterText
              text="Latest Blog Posts"
              tag="h1"
              className="text-base leading-[1.6]"
              color={CYAN}
              cursorColor={CYAN}
              cursorThickness={5}
              typingSpeed={0.02}
              showCursor
              hideCursorWhenDone={false}
            />
            {/* Body M — 16px */}
            <p style={{ fontSize: "16px", lineHeight: "1.6em", color: BLUE, margin: 0 }}>
              Guides, troubleshooting notes, and IT walkthroughs. Practical documentation from
              real support scenarios, homelab experiments, and system administration.
            </p>
          </div>

          {/* Articles grid */}
          <div className="grid grid-cols-1 gap-5 tablet:grid-cols-2 tablet:gap-8 desktop:grid-cols-3 desktop:gap-10">
            {latestPosts.map((post) => (
              <BlogCard
                key={post.slug}
                slug={post.slug}
                title={post.title}
                description={post.description}
                category={post.category}
                readTime={post.readTime}
                thumbnail={post.thumbnail}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
