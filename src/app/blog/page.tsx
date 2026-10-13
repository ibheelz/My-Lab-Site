import TypewriterText from "@/components/TypewriterText";
import BlogCard from "@/components/BlogCard";
import { posts } from "@/data/blog";
import { TAG_COLORS } from "@/data/colors";

const CYAN = "rgb(0, 255, 255)";
const BLUE = "rgb(168, 215, 231)";

export default function Blog() {
  return (
    <section className="w-full flex justify-center px-5 pt-10 pb-16 tablet:px-8 tablet:pt-14 tablet:pb-20 desktop:px-10 desktop:pt-20 desktop:pb-28">
      <div className="w-full max-w-[1200px] flex flex-col gap-8 desktop:gap-20">

        {/* Header */}
        <div className="flex flex-col gap-4">
          {/* h1 — 36px / 1.1em */}
          <TypewriterText
            text="Blog"
            tag="h1"
            className="text-lg leading-[1.6]"
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
              categoryColor={TAG_COLORS[i % TAG_COLORS.length]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
