import TypewriterText from "@/components/TypewriterText";
import BlogCard from "@/components/BlogCard";
import ScrollReveal from "@/components/ScrollReveal";
import { posts } from "@/data/blog";
import { TAG_COLORS } from "@/data/colors";

const CYAN = "rgb(0, 255, 255)";
const BLUE = "rgb(168, 215, 231)";

export default function Blog() {
  return (
    <section className="w-full flex justify-center px-5 pt-10 pb-16 tablet:px-8 tablet:pt-14 tablet:pb-20 desktop:px-10 desktop:pt-20 desktop:pb-28">
      <ScrollReveal className="w-full max-w-[1200px] flex flex-col gap-8 desktop:gap-20">

        {/* Header */}
        <div className="flex flex-col gap-4">
          {/* h1 — 36px / 1.1em */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={CYAN} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <path d="M9 3h6v11l3.5 6H5.5L9 14V3z" />
              <line x1="9" y1="3" x2="15" y2="3" />
              <path d="M6.5 19.5h11" />
            </svg>
            <TypewriterText
              text="Labs"
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
          {/* Body M — 16px */}
          <p style={{ fontSize: "16px", lineHeight: "1.6em", color: BLUE, margin: 0 }}>
            Practical documentation from real support scenarios, homelab experiments, and system administration.
          </p>
        </div>

        {/* Posts grid: 1 col mobile → 2 col tablet → 3 col desktop */}
        <div className="grid grid-cols-1 gap-5 tablet:grid-cols-2 tablet:gap-8 desktop:grid-cols-3 desktop:gap-10">
          {posts.map((post, i) => (
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
  );
}
