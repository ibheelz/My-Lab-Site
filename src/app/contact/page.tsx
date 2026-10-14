"use client";

import { useState } from "react";
import Link from "next/link";
import TypewriterText from "@/components/TypewriterText";
import PrimaryButton from "@/components/PrimaryButton";
import ScrollReveal from "@/components/ScrollReveal";

const CYAN   = "rgb(0, 255, 255)";
const BLUE   = "rgb(168, 215, 231)";
const NEON   = "rgb(0, 255, 106)";
const BORDER = "rgb(60, 60, 60)";

const INPUT_STYLE: React.CSSProperties = {
  width: "100%",
  backgroundColor: "transparent",
  border: `1px solid ${BORDER}`,
  borderRadius: "4px",
  padding: "12px 16px",
  color: "rgb(255, 255, 255)",
  fontSize: "14px",
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 0.2s",
  fontFamily: "inherit",
};

const directLinks = [
  { label: "$ email",    value: "abioladeyeyey@gmail.com",      href: "mailto:abioladeyeyey@gmail.com" },
  { label: "$ location", value: "Lagos, Nigeria",               href: null },
  { label: "$ status",   value: "Open to Work",                 href: null },
];

const socialLinks = [
  { label: "$ github",   value: "github.com/ibheelz",           href: "https://github.com/ibheelz" },
  { label: "$ linkedin", value: "linkedin.com/in/abioladeyeye", href: "https://linkedin.com/in/abioladeyeye" },
  { label: "$ twitter",  value: "twitter.com/ibheelz",          href: "https://twitter.com/ibheelz" },
];

function InfoRow({ label, value, href }: { label: string; value: string; href: string | null }) {
  return (
    <div className="flex gap-3 items-baseline min-w-0">
      <span className="shrink-0 text-sm" style={{ color: BLUE, minWidth: "80px" }}>{label}</span>
      {href ? (
        <a
          href={href}
          className="text-sm min-w-0 break-all"
          style={{ color: "rgb(255,255,255)", textDecoration: "none", lineHeight: "1.8em" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = NEON)}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgb(255,255,255)")}
        >
          {value}
        </a>
      ) : (
        <span className="text-sm min-w-0 break-words" style={{ color: "rgb(255,255,255)", lineHeight: "1.8em" }}>{value}</span>
      )}
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [focused, setFocused] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const field = (id: keyof typeof form) => ({
    style: { ...INPUT_STYLE, borderColor: focused === id ? NEON : BORDER },
    value: form[id],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [id]: e.target.value })),
    onFocus: () => setFocused(id),
    onBlur: () => setFocused(null),
  });

  return (
    <section className="w-full flex justify-center px-5 pt-10 pb-16 tablet:px-8 tablet:pt-14 tablet:pb-20 desktop:px-10 desktop:pt-20 desktop:pb-28">
      <div className="w-full max-w-[1200px] flex flex-col gap-10 tablet:gap-14 desktop:gap-[80px]">


        {/* Page header */}
        <ScrollReveal>
        <div className="flex flex-col gap-3">
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={CYAN} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            <TypewriterText
              text="Contact Information"
              tag="h3"
              className="text-xl tablet:text-2xl"
              color={CYAN}
              cursorColor={CYAN}
              cursorThickness={5}
              typingSpeed={0.02}
              showCursor
              hideCursorWhenDone={false}
            />
          </div>
          <p className="text-sm tablet:text-base leading-relaxed" style={{ color: BLUE, margin: 0 }}>
            Have a project, open role, or question? Get in touch.
          </p>
        </div>
        </ScrollReveal>

        {/* Body: info left + form right */}
        <ScrollReveal delay={150}>
        <div className="grid grid-cols-1 gap-10 tablet:gap-12 desktop:grid-cols-2 desktop:gap-16 desktop:items-start">

          {/* Left column: Direct Contact + Social Links */}
          <div className="flex flex-col gap-10 min-w-0">

            <div className="flex flex-col gap-5 min-w-0">
              <TypewriterText
                text="Direct Contact"
                tag="h4"
                className="text-lg tablet:text-xl"
                color={NEON}
                cursorColor={NEON}
                cursorThickness={2}
                typingSpeed={0.02}
                showCursor
                hideCursorWhenDone
              />
              <div className="flex flex-col gap-4 min-w-0">
                {directLinks.map((l) => <InfoRow key={l.label} {...l} />)}
              </div>
            </div>

            <div className="flex flex-col gap-5 min-w-0">
              <TypewriterText
                text="Social Links"
                tag="h4"
                className="text-lg tablet:text-xl"
                color={NEON}
                cursorColor={NEON}
                cursorThickness={2}
                typingSpeed={0.02}
                showCursor
                hideCursorWhenDone
              />
              <div className="flex flex-col gap-4 min-w-0">
                {socialLinks.map(({ label, value, href }) => (
                  <div key={label} className="flex gap-3 items-baseline min-w-0">
                    <span className="shrink-0 text-sm" style={{ color: BLUE, minWidth: "80px" }}>{label}</span>
                    <Link
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm min-w-0 break-all"
                      style={{ color: "rgb(255,255,255)", textDecoration: "none", lineHeight: "1.8em" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = NEON)}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "rgb(255,255,255)")}
                    >
                      {value}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column: Form */}
          <div className="flex flex-col gap-5 min-w-0">
            <TypewriterText
              text="Say hello!"
              tag="h4"
              className="text-lg tablet:text-xl"
              color={NEON}
              cursorColor={NEON}
              cursorThickness={2}
              typingSpeed={0.02}
              showCursor
              hideCursorWhenDone
            />

            {sent ? (
              <div className="flex flex-col gap-4 rounded-lg p-6" style={{ border: `1px dashed ${NEON}` }}>
                <span style={{ color: NEON, fontSize: "16px" }}>Message sent.</span>
                <p style={{ color: BLUE, fontSize: "14px", lineHeight: "1.8em", margin: 0 }}>
                  Thanks for reaching out — I&apos;ll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => { setSent(false); setForm({ name: "", email: "", message: "" }); }}
                  style={{ color: BLUE, background: "none", border: "none", cursor: "pointer", fontSize: "13px", padding: 0, textAlign: "left", fontFamily: "inherit" }}
                >
                  Send another message →
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-5 rounded-lg"
                style={{ border: `1px dashed ${NEON}`, padding: "clamp(20px, 4vw, 36px)" }}
              >
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm" style={{ color: BLUE }}>Name</label>
                  <input type="text" required placeholder="Your name" {...field("name")} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm" style={{ color: BLUE }}>Email</label>
                  <input type="email" required placeholder="your@email.com" {...field("email")} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm" style={{ color: BLUE }}>Message</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Your message..."
                    style={{ ...INPUT_STYLE, borderColor: focused === "message" ? NEON : BORDER, resize: "vertical" }}
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                  />
                </div>
                <PrimaryButton label="Send Message" type="submit" />
              </form>
            )}
          </div>

        </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
