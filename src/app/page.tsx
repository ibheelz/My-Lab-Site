import TypewriterText from "@/components/TypewriterText";
import AsciiReveal from "@/components/AsciiReveal";
import HeroAscii from "@/components/HeroAscii";
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
          <HeroAscii
            className="mx-auto translate-x-[10px] tablet:translate-x-0 tablet:mx-0 block"
            style={{
              width: "100%",
              maxWidth: "420px",
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
              <AsciiReveal
                className="block tablet:hidden"
                style={{
                  fontFamily: "'Courier New', Courier, monospace",
                  fontSize: "clamp(6px, 0.85vw, 10px)",
                  lineHeight: 1.25,
                  margin: 0,
                  whiteSpace: "pre",
                  overflow: "hidden",
                }}
                text={`          ______   _______   ______   ______   __         ______
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
$$/   $$/ $$$$$$$/  $$$$$$$$/     $$/     $$$$$$$$/     $$/     $$$$$$$$/`}
              />

              {/* Tablet+: ABIOLA left-aligned, no indent */}
              <AsciiReveal
                className="hidden tablet:block"
                style={{
                  fontFamily: "'Courier New', Courier, monospace",
                  fontSize: "clamp(6px, 0.85vw, 10px)",
                  lineHeight: 1.25,
                  margin: 0,
                  whiteSpace: "pre",
                  overflow: "hidden",
                }}
                text={`  ______   _______   ______   ______   __         ______
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
$$/   $$/ $$$$$$$/  $$$$$$$$/     $$/     $$$$$$$$/     $$/     $$$$$$$$/`}
              />
            </div>

            {/* About me — always left-aligned */}
            <div>
            <div className="hidden tablet:flex" style={{ alignItems: "center", gap: "10px", marginTop: "0", animationName: "fadeBlurIn", animationDuration: "0.65s", animationTimingFunction: "ease-out", animationFillMode: "both", animationDelay: "900ms", willChange: "transform, opacity" }}>
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
            <p style={{ fontSize: "14px", lineHeight: "1.9em", color: BLUE, margin: "16px 0 0", animationName: "fadeBlurIn", animationDuration: "0.65s", animationTimingFunction: "ease-out", animationFillMode: "both", animationDelay: "1100ms", willChange: "transform, opacity" }}>
              IT support engineer with a deep curiosity for how systems work under the hood.
              I run a homelab to get hands-on with the technologies I work with daily —
              Active Directory, virtualisation, networking, and system administration.
            </p>
            <p style={{ fontSize: "14px", lineHeight: "1.9em", color: BLUE, margin: "16px 0 0", animationName: "fadeBlurIn", animationDuration: "0.65s", animationTimingFunction: "ease-out", animationFillMode: "both", animationDelay: "1300ms", willChange: "transform, opacity" }}>
              This site is where I document what I build, break, and figure out.
              Everything here comes from real scenarios, not textbooks.
            </p>

            <div className="justify-center tablet:justify-start desktop:justify-between mt-5 desktop:mt-[40px]" style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "16px", animationName: "fadeBlurIn", animationDuration: "0.65s", animationTimingFunction: "ease-out", animationFillMode: "both", animationDelay: "1500ms", willChange: "transform, opacity" }}>
              {/* OS icons */}
              <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: NEON_GREEN, fontSize: "13px" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill={NEON_GREEN}>
                    <path d="M0 3.449L9.75 2.1v9.451H0zm10.949-1.349L24 0v11.4H10.949zM0 12.6h9.75v9.451L0 20.699zm10.949 0H24V24l-13.051-1.851z"/>
                  </svg>
                  Windows
                </span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: NEON_GREEN, fontSize: "13px" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill={NEON_GREEN}>
                    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/>
                  </svg>
                  macOS
                </span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: NEON_GREEN, fontSize: "13px" }}>
                  <svg width="22" height="22" viewBox="0 0 15 15" fill={NEON_GREEN} xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M4.53918 2.40715C4.82145 1.0075 6.06066 0 7.49996 0C8.93926 0 10.1785 1.0075 10.4607 2.40715L10.798 4.07944C10.9743 4.9539 11.3217 5.78562 11.8205 6.52763L12.4009 7.39103C12.7631 7.92978 12.9999 8.5385 13.0979 9.17323C13.6747 9.22167 14.1803 9.58851 14.398 10.1283L14.8897 11.3474C15.1376 11.962 14.9583 12.665 14.4455 13.0887L12.5614 14.6458C12.0128 15.0992 11.2219 15.1193 10.6506 14.6944L9.89192 14.1301C9.88189 14.1227 9.87197 14.1151 9.86216 14.1074C9.48973 14.2075 9.09793 14.261 8.69355 14.261H6.30637C5.90201 14.261 5.51023 14.2076 5.13782 14.1074C5.12802 14.1151 5.11811 14.1227 5.10808 14.1301L4.34942 14.6944C3.77811 15.1193 2.98725 15.0992 2.43863 14.6458L0.55446 13.0887C0.0417175 12.665 -0.1376 11.962 0.110281 11.3474L0.602025 10.1283C0.819715 9.58854 1.32527 9.2217 1.90198 9.17324C2 8.5385 2.2368 7.92978 2.59897 7.39103L3.17938 6.52763C3.67818 5.78562 4.02557 4.9539 4.20193 4.07944L4.53918 2.40715ZM10.8445 9.47585C10.6345 9.63293 10.4642 9.84382 10.3561 10.0938L9.58799 11.8713C9.20026 12.0979 8.75209 12.2237 8.28465 12.2237H6.7153C6.24789 12.2237 5.79975 12.0979 5.41203 11.8714L4.64386 10.0938C4.53581 9.8438 4.36552 9.6329 4.15546 9.47582C4.18121 9.15355 4.2689 8.83503 4.41853 8.53826L5.67678 6.04259L5.68433 6.05007C6.68715 7.04458 8.31304 7.04458 9.31585 6.05007L9.32324 6.04274L10.5814 8.53825C10.7311 8.83504 10.8187 9.15357 10.8445 9.47585ZM9.04068 4.26906V3.05592H8.01353V3.85713C8.23151 3.90123 8.44506 3.97371 8.64848 4.07458L9.04068 4.26906ZM6.98638 3.85718V3.05592H5.95923V4.26919L6.3517 4.07458C6.55504 3.97375 6.7685 3.90129 6.98638 3.85718ZM2.03255 10.1864C1.82255 10.1864 1.6337 10.3132 1.55571 10.5066L1.06397 11.7257C0.981339 11.9306 1.04111 12.1649 1.21203 12.3062L3.0962 13.8633C3.27907 14.0144 3.54269 14.0211 3.73313 13.8795L4.49179 13.3152C4.6813 13.1743 4.74901 12.923 4.6557 12.7071L3.69976 10.4951C3.61884 10.3078 3.43316 10.1864 3.22771 10.1864H2.03255ZM13.4443 10.5066C13.3663 10.3132 13.1775 10.1864 12.9674 10.1864H11.7723C11.5668 10.1864 11.3812 10.3078 11.3002 10.4951L10.3443 12.7071C10.251 12.923 10.3187 13.1743 10.5082 13.3152L11.2669 13.8795C11.4573 14.0211 11.7209 14.0144 11.9038 13.8633L13.788 12.3062C13.9589 12.1649 14.0187 11.9306 13.936 11.7257L13.4443 10.5066ZM6.81106 4.98568C7.24481 4.7706 7.75537 4.7706 8.18912 4.98568L8.68739 5.23275L8.58955 5.32978C7.98786 5.92649 7.01232 5.92649 6.41063 5.32978L6.31279 5.23275L6.81106 4.98568Z"/>
                  </svg>
                  Linux
                </span>
              </div>

              {/* Resume download — desktop only */}
              <a
                href="/resume.pdf"
                download="Abiola_Adeyeye_Resume.pdf"
                className="resume-btn hidden desktop:inline-flex"
                style={{
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: NEON_GREEN,
                  backgroundColor: "transparent",
                  border: `1px solid ${NEON_GREEN}`,
                  borderRadius: "10px",
                  padding: "8px 20px",
                  textDecoration: "none",
                  cursor: "pointer",
                  transition: "background-color 0.2s, color 0.2s",
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Resume
              </a>
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
