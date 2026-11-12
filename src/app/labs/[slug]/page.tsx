/* eslint-disable @next/next/no-img-element */
import { notFound } from "next/navigation";
import Link from "next/link";
import { posts } from "@/data/blog";
import TypewriterText from "@/components/TypewriterText";
import CategoryPill from "@/components/CategoryPill";
import AccordionArticle from "@/components/AccordionArticle";
import { TAG_COLORS } from "@/data/colors";
import ScrollReveal from "@/components/ScrollReveal";

function tagColor(tag: string): string {
  let hash = 0;
  for (let i = 0; i < tag.length; i++) hash = (hash * 31 + tag.charCodeAt(i)) >>> 0;
  return TAG_COLORS[hash % TAG_COLORS.length];
}

const CYAN   = "rgb(0, 255, 255)";
const BLUE   = "rgb(168, 215, 231)";
const NEON   = "rgb(0, 255, 106)";
const BORDER = "rgb(60, 60, 60)";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const d = new Date(post.date);
  const day = d.getDate();
  const ordinal = day % 10 === 1 && day !== 11 ? "st" : day % 10 === 2 && day !== 12 ? "nd" : day % 10 === 3 && day !== 13 ? "rd" : "th";
  const month = d.toLocaleDateString("en-GB", { month: "long" });
  const year = d.getFullYear();
  const formattedDate = `${day}${ordinal} ${month} ${year}`;

  return (
    <section className="w-full flex justify-center px-5 pt-10 pb-16 tablet:px-8 tablet:pt-14 tablet:pb-20 desktop:px-10 desktop:pt-20 desktop:pb-28">
      <div className="w-full max-w-[800px] flex flex-col gap-10 tablet:gap-14">

        {/* Post header */}
        <div className="flex flex-col gap-6">
          <ScrollReveal>
          <TypewriterText
            text={post.title}
            tag="h1"
            className="text-xl tablet:text-2xl leading-[1.4]"
            color={NEON}
            cursorColor={NEON}
            cursorThickness={4}
            typingSpeed={0.015}
            showCursor
            hideCursorWhenDone={false}
            splitAt="Part"
            secondColor="rgb(255, 255, 255)"
          />
          </ScrollReveal>

          <ScrollReveal delay={80}>
          <span style={{ color: "rgb(255, 255, 255)", fontSize: "13px", whiteSpace: "nowrap", display: "inline-flex", alignItems: "center", gap: "5px" }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            {post.readTime} Min Read &nbsp;·&nbsp; {formattedDate}
          </span>
          </ScrollReveal>

          {/* Cover image */}
          {post.thumbnail && (
            <ScrollReveal delay={120}>
            <img
              src={post.thumbnail}
              alt={post.title}
              style={{
                width: "100%",
                borderRadius: "0px",
                border: `1px solid ${BORDER}`,
                display: "block",
                position: "relative",
                zIndex: 25,
              }}
            />
            </ScrollReveal>
          )}

          {/* Meta row */}
          <ScrollReveal delay={160}>
          <div className="flex flex-wrap items-center gap-3">
            <CategoryPill label={post.category} color={CYAN} />
            {post.tags?.map((tag) => (
              <CategoryPill key={tag} label={tag} color={tagColor(tag)} />
            ))}
          </div>
          </ScrollReveal>

          {/* Description */}
          <ScrollReveal delay={200}>
          <p
            className="text-sm tablet:text-base leading-relaxed"
            style={{ color: BLUE, margin: 0, borderLeft: `2px solid ${NEON}`, paddingLeft: "16px" }}
          >
            {post.description}
          </p>
          </ScrollReveal>
        </div>

        {/* Article body */}
        <AccordionArticle sections={post.sections ?? []} />

        {/* Back link */}
        <Link
          href="/labs"
          style={{
            color: NEON,
            fontSize: "14px",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          ← back to labs
        </Link>
      </div>
    </section>
  );
}
