/* eslint-disable @next/next/no-img-element */
import { notFound } from "next/navigation";
import Link from "next/link";
import { posts } from "@/data/blog";
import TypewriterText from "@/components/TypewriterText";
import CategoryPill from "@/components/CategoryPill";
import BlogImage from "@/components/BlogImage";
import FaqItem from "@/components/FaqItem";
import { TAG_COLORS } from "@/data/colors";
import ScrollReveal from "@/components/ScrollReveal";

function tagColor(tag: string): string {
  let hash = 0;
  for (let i = 0; i < tag.length; i++) hash = (hash * 31 + tag.charCodeAt(i)) >>> 0;
  return TAG_COLORS[hash % TAG_COLORS.length];
}

const CYAN      = "rgb(0, 255, 255)";
const BLUE      = "rgb(168, 215, 231)";
const NEON      = "rgb(0, 255, 106)";
const MUTED     = "rgb(168, 215, 231)";
const SURFACE   = "rgb(29, 32, 37)";
const BORDER    = "rgb(60, 60, 60)";

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

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
        <ScrollReveal>
        <div className="flex flex-col gap-6">
          <TypewriterText
            text={post.title}
            tag="h1"
            className="text-base leading-[1.6]"
            color={NEON}
            cursorColor={NEON}
            cursorThickness={4}
            typingSpeed={0.015}
            showCursor
            hideCursorWhenDone={false}
          />

          <span style={{ color: "rgb(255, 255, 255)", fontSize: "13px", whiteSpace: "nowrap", display: "inline-flex", alignItems: "center", gap: "5px" }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            {post.readTime} Min Read &nbsp;·&nbsp; {formattedDate}
          </span>

          {/* Cover image */}
          {post.thumbnail && (
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
          )}

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-3">
            <CategoryPill label={post.category} color={CYAN} />
            {post.tags?.map((tag) => (
              <CategoryPill key={tag} label={tag} color={tagColor(tag)} />
            ))}
          </div>

          {/* Description */}
          <p
            className="text-sm tablet:text-base leading-relaxed"
            style={{ color: BLUE, margin: 0, borderLeft: `2px solid ${NEON}`, paddingLeft: "16px" }}
          >
            {post.description}
          </p>
        </div>
        </ScrollReveal>

        {/* Divider */}
        <div style={{ height: "1px", backgroundColor: BORDER }} />

        {/* Article body */}
        <ScrollReveal delay={100}>
        <article className="flex flex-col gap-6">
          {post.sections?.map((section, i) => {
            switch (section.type) {
              case "h2":
                return (
                  <h2
                    key={i}
                    id={slugify(section.content as string)}
                    className="text-base tablet:text-lg"
                    style={{ color: CYAN, margin: "16px 0 0", fontWeight: 500 }}
                  >
                    {section.content as string}
                  </h2>
                );

              case "h3":
                return (
                  <h3
                    key={i}
                    id={slugify(section.content as string)}
                    className="text-sm tablet:text-base"
                    style={{ color: CYAN, margin: "8px 0 0", fontWeight: 500 }}
                  >
                    {section.content as string}
                  </h3>
                );

              case "tasklist":
                return (
                  <div
                    key={i}
                    className="grid grid-cols-1 tablet:grid-cols-2 gap-3"
                  >
                    {section.links?.map(({ label, href }) => (
                      <a
                        key={href}
                        href={href}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: "12px",
                          padding: "clamp(12px, 2.5vw, 14px) clamp(14px, 3vw, 18px)",
                          backgroundColor: "rgb(0, 0, 0)",
                          border: `1px solid ${BORDER}`,
                          borderRadius: "0px",
                          color: CYAN,
                          fontSize: "13px",
                          textDecoration: "none",
                          position: "relative",
                          zIndex: 25,
                        }}
                      >
                        <span style={{ lineHeight: 1.5 }}>{label}</span>
                        <span style={{ flexShrink: 0, color: NEON }}>→</span>
                      </a>
                    ))}
                  </div>
                );

              case "p": {
                const isAnswer = (section.content as string).startsWith("My answer:");
                return (
                  <p
                    key={i}
                    className="text-sm tablet:text-base leading-loose"
                    style={{ color: isAnswer ? "rgb(255, 255, 255)" : BLUE, margin: 0 }}
                  >
                    {section.content as string}
                  </p>
                );
              }

              case "ul":
                return (
                  <ul key={i} className="flex flex-col gap-2" style={{ margin: 0, paddingLeft: "0" }}>
                    {(section.content as string[]).map((item, j) => (
                      <li
                        key={j}
                        className="text-sm tablet:text-base leading-relaxed flex gap-3"
                        style={{ color: BLUE, listStyle: "none" }}
                      >
                        <span style={{ color: NEON, flexShrink: 0 }}>▸</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                );

              case "code": {
                const lines = (section.content as string).split("\n");
                return (
                  <pre
                    key={i}
                    className="text-xs tablet:text-sm leading-relaxed overflow-x-auto"
                    style={{
                      backgroundColor: "rgb(0, 0, 0)",
                      border: `1px solid ${BORDER}`,
                      borderRadius: "0px",
                      padding: "clamp(14px, 3vw, 20px)",
                      margin: 0,
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-word",
                      position: "relative",
                      zIndex: 25,
                    }}
                  >
                    {lines.map((line, j) => {
                      const isComment = line.trimStart().startsWith("#");
                      const addSpacing = j > 0 && !isComment && line.trim() !== "";
                      return (
                        <span
                          key={j}
                          style={{
                            display: "block",
                            color: isComment ? "rgb(255, 255, 255)" : NEON,
                            marginTop: addSpacing ? "12px" : undefined,
                          }}
                        >
                          {line}
                        </span>
                      );
                    })}
                  </pre>
                );
              }

              case "note":
                return (
                  <div
                    key={i}
                    className="flex gap-3"
                    style={{
                      backgroundColor: "rgb(0, 0, 0)",
                      border: `1px solid ${CYAN}`,
                      borderRadius: "0px",
                      padding: "clamp(12px, 3vw, 16px)",
                      position: "relative",
                      zIndex: 25,
                    }}
                  >
                    <p
                      className="text-sm tablet:text-base leading-relaxed"
                      style={{ color: BLUE, margin: 0 }}
                    >
                      {section.content as string}
                    </p>
                  </div>
                );

              case "img":
                return (
                  <BlogImage
                    key={i}
                    src={section.content as string}
                    alt={section.alt ?? ""}
                    caption={section.caption}
                  />
                );

              case "label":
                return (
                  <p
                    key={i}
                    style={{
                      color: NEON,
                      fontSize: "11px",
                      fontWeight: 500,
                      margin: "4px 0 0",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    {section.content as string}
                  </p>
                );

              case "qa":
                return (
                  <FaqItem
                    key={i}
                    question={section.content as string}
                    answer={section.answer ?? ""}
                  />
                );

              default:
                return null;
            }
          })}
        </article>
        </ScrollReveal>

        {/* Divider */}
        <div style={{ height: "1px", backgroundColor: BORDER }} />

        {/* Back link */}
        <Link
          href="/blog"
          style={{
            color: NEON,
            fontSize: "14px",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          ← back to blog
        </Link>
      </div>
    </section>
  );
}
