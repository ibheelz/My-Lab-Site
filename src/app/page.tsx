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
      {/* ── Hero ── */}
      <section className="w-full flex justify-center px-5 pt-10 pb-6 tablet:px-8 tablet:pt-14 tablet:pb-8 desktop:px-10 desktop:pt-20 desktop:pb-10">
        <div className="w-full max-w-[1200px] flex flex-col gap-8 tablet:flex-row tablet:items-stretch tablet:gap-[120px]">
          <img
            src="/hero-ascii.svg"
            alt="ibheelz"
            className="mx-auto translate-x-[10px] tablet:translate-x-0 tablet:mx-0"
            style={{
              width: "100%",
              maxWidth: "420px",
              display: "block",
              flexShrink: 0,
            }}
          />
          {/* Right: name ASCII art */}
          <div className="flex flex-1">
            <div
              className="items-start"
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                paddingBottom: "clamp(24px, 8vw, 100px)",
                overflow: "hidden",
              }}
            >
            {/* ASCII name — centered on mobile */}
            <div className="w-full flex justify-center tablet:justify-start mb-8 tablet:mb-10">
              {/* Mobile: ABIOLA indented/centered */}
              <pre
                className="block tablet:hidden"
                style={{
                  fontFamily: "'Courier New', Courier, monospace",
                  fontSize: "clamp(6px, 0.85vw, 10px)",
                  lineHeight: 1.25,
                  color: "#00ff6a",
                  margin: 0,
                  whiteSpace: "pre",
                  overflow: "hidden",
                }}
              >{`          ______   _______   ______   ______   __         ______
         /      \\ /       \\ /      | /      \\ /  |       /      \\
        /$$$$$$  |$$$$$$$  |$$$$$$/ /$$$$$$  |$$ |      /$$$$$$  |
        $$ |__$$ |$$ |__$$ |  $$ |  $$ |  $$ |$$ |      $$ |__$$ |
        $$    $$ |$$    $$<   $$ |  $$ |  $$ |$$ |      $$    $$ |
        $$$$$$$$ |$$$$$$$  |  $$ |  $$ |  $$ |$$ |      $$$$$$$$ |
        $$ |  $$ |$$ |__$$ | _$$ |_ $$ \\__$$ |$$ |_____ $$ |  $$ |
        $$ |  $$ |$$    $$/ / $$   |$$    $$/ $$       |$$ |  $$ |
        $$/   $$/ $$$$$$$/  $$$$$$/  $$$$$$/  $$$$$$$$/ $$/   $$/

  ______   _______   ________  __      __  ________  __      __  ________
 /      \\ /       \\ /        |/  \\    /  |/        |/  \\    /  |/        |
/$$$$$$  |$$$$$$$  |$$$$$$$$/ $$  \\  /$$/ $$$$$$$$/ $$  \\  /$$/ $$$$$$$$/
$$ |__$$ |$$ |  $$ |$$ |__     $$  \\/$$/  $$ |__     $$  \\/$$/  $$ |__
$$    $$ |$$ |  $$ |$$    |     $$  $$/   $$    |     $$  $$/   $$    |
$$$$$$$$ |$$ |  $$ |$$$$$/       $$$$/    $$$$$/       $$$$/    $$$$$/
$$ |  $$ |$$ |__$$ |$$ |_____     $$ |    $$ |_____     $$ |    $$ |_____
$$ |  $$ |$$    $$/ $$       |    $$ |    $$       |    $$ |    $$       |
$$/   $$/ $$$$$$$/  $$$$$$$$/     $$/     $$$$$$$$/     $$/     $$$$$$$$/`}</pre>

              {/* Tablet+: ABIOLA left-aligned, no indent */}
              <pre
                className="hidden tablet:block"
                style={{
                  fontFamily: "'Courier New', Courier, monospace",
                  fontSize: "clamp(6px, 0.85vw, 10px)",
                  lineHeight: 1.25,
                  color: "#00ff6a",
                  margin: 0,
                  whiteSpace: "pre",
                  overflow: "hidden",
                }}
              >{`  ______   _______   ______   ______   __         ______
 /      \\ /       \\ /      | /      \\ /  |       /      \\
/$$$$$$  |$$$$$$$  |$$$$$$/ /$$$$$$  |$$ |      /$$$$$$  |
$$ |__$$ |$$ |__$$ |  $$ |  $$ |  $$ |$$ |      $$ |__$$ |
$$    $$ |$$    $$<   $$ |  $$ |  $$ |$$ |      $$    $$ |
$$$$$$$$ |$$$$$$$  |  $$ |  $$ |  $$ |$$ |      $$$$$$$$ |
$$ |  $$ |$$ |__$$ | _$$ |_ $$ \\__$$ |$$ |_____ $$ |  $$ |
$$ |  $$ |$$    $$/ / $$   |$$    $$/ $$       |$$ |  $$ |
$$/   $$/ $$$$$$$/  $$$$$$/  $$$$$$/  $$$$$$$$/ $$/   $$/

  ______   _______   ________  __      __  ________  __      __  ________
 /      \\ /       \\ /        |/  \\    /  |/        |/  \\    /  |/        |
/$$$$$$  |$$$$$$$  |$$$$$$$$/ $$  \\  /$$/ $$$$$$$$/ $$  \\  /$$/ $$$$$$$$/
$$ |__$$ |$$ |  $$ |$$ |__     $$  \\/$$/  $$ |__     $$  \\/$$/  $$ |__
$$    $$ |$$ |  $$ |$$    |     $$  $$/   $$    |     $$  $$/   $$    |
$$$$$$$$ |$$ |  $$ |$$$$$/       $$$$/    $$$$$/       $$$$/    $$$$$/
$$ |  $$ |$$ |__$$ |$$ |_____     $$ |    $$ |_____     $$ |    $$ |_____
$$ |  $$ |$$    $$/ $$       |    $$ |    $$       |    $$ |    $$       |
$$/   $$/ $$$$$$$/  $$$$$$$$/     $$/     $$$$$$$$/     $$/     $$$$$$$$/`}</pre>
            </div>

            {/* About me — always left-aligned */}
            <div>
            <div className="hidden tablet:flex" style={{ alignItems: "center", gap: "10px", marginTop: "0" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={CYAN} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <TypewriterText
                text="About me"
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
            <p style={{ fontSize: "14px", lineHeight: "1.9em", color: BLUE, margin: "16px 0 0" }}>
              IT support engineer with a deep curiosity for how systems work under the hood.
              I run a homelab to get hands-on with the technologies I work with daily —
              Active Directory, virtualisation, networking, and system administration.
            </p>
            <p style={{ fontSize: "14px", lineHeight: "1.9em", color: BLUE, margin: "16px 0 0" }}>
              This site is where I document what I build, break, and figure out.
              Everything here comes from real scenarios, not textbooks.
            </p>

            <div className="justify-center tablet:justify-start mt-5 desktop:mt-[40px]" style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
              {/* Windows */}
              <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: NEON_GREEN, fontSize: "13px" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill={NEON_GREEN}>
                  <path d="M0 3.449L9.75 2.1v9.451H0zm10.949-1.349L24 0v11.4H10.949zM0 12.6h9.75v9.451L0 20.699zm10.949 0H24V24l-13.051-1.851z"/>
                </svg>
                Windows
              </span>
              {/* macOS */}
              <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: NEON_GREEN, fontSize: "13px" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill={NEON_GREEN}>
                  <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/>
                </svg>
                macOS
              </span>
              {/* Linux */}
              <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: NEON_GREEN, fontSize: "13px" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill={NEON_GREEN}>
                  <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.09-2.346 2.625-2.127 4.667.173 1.6.678 2.93 1.768 3.855.356.3.732.512 1.13.678-.28 2.09-.538 4.18-.777 6.28H8.04l1.106 1.06h.638c.284 0 .567 0 .84-.01.282-.008.565-.016.848-.016.524 0 1.047.008 1.57.016.523.008 1.046.01 1.57.01h.638l1.106-1.06h-.757c-.24-2.1-.5-4.19-.776-6.28.398-.166.774-.378 1.13-.678 1.09-.925 1.595-2.255 1.768-3.855.22-2.042-1.24-3.577-2.127-4.667-.75-1.067-.975-1.928-1.05-3.02-.066-1.49 1.055-5.965-3.17-6.298-.165-.013-.326-.021-.48-.021zm.06 2.604c1.83 0 1.83 1.394 1.83 2.083 0 .69-.41 1.25-1.83 1.25-1.42 0-1.83-.56-1.83-1.25 0-.69 0-2.083 1.83-2.083z"/>
                </svg>
                Linux
              </span>
            </div>
            </div>{/* end About me */}
            </div>
          </div>
        </div>
      </section>

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
