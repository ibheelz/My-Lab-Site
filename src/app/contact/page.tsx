"use client";

import { useState } from "react";
import Link from "next/link";
import TypewriterText from "@/components/TypewriterText";
import PrimaryButton from "@/components/PrimaryButton";

const CYAN = "rgb(0, 255, 255)";
const BLUE = "rgb(168, 215, 231)";
const NEON = "rgb(0, 255, 106)";
const BORDER = "rgb(60, 60, 60)";

const INPUT_STYLE = {
  width: "100%",
  backgroundColor: "transparent",
  border: `1px solid ${BORDER}`,
  borderRadius: "4px",
  padding: "12px 16px",
  color: "rgb(255, 255, 255)",
  fontSize: "14px",
  outline: "none",
  boxSizing: "border-box" as const,
  transition: "border-color 0.2s",
  fontFamily: "inherit",
};

const directLinks = [
  { label: "$ email",    value: "abiola@abioladeyeye.com",      href: "mailto:abiola@abioladeyeye.com" },
  { label: "$ location", value: "Lagos, Nigeria",               href: null },
  { label: "$ status",   value: "Open to Work",                 href: null },
];

const socialLinks = [
  { label: "$ github",   value: "github.com/ibheelz",           href: "https://github.com/ibheelz" },
  { label: "$ linkedin", value: "linkedin.com/in/abioladeyeye", href: "https://linkedin.com/in/abioladeyeye" },
  { label: "$ twitter",  value: "twitter.com/ibheelz",          href: "https://twitter.com/ibheelz" },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [focused, setFocused] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const field = (id: keyof typeof form) => ({
    style: {
      ...INPUT_STYLE,
      borderColor: focused === id ? NEON : BORDER,
    },
    value: form[id],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [id]: e.target.value })),
    onFocus: () => setFocused(id),
    onBlur: () => setFocused(null),
  });

  return (
    <section className="w-full flex justify-center px-5 pt-[75px] pb-24 tablet:px-8 tablet:pt-[95px] tablet:pb-36 desktop:px-10 desktop:pt-[120px] desktop:pb-[200px]">
      <div className="w-full max-w-[1200px] flex flex-col gap-[60px] desktop:gap-[80px]">

        {/* Terminal breadcrumb */}
        <p className="hidden tablet:block" style={{ fontSize: "16px", lineHeight: "1.6em", color: NEON, margin: 0 }}>
          abiola@portfolio:~$ contact
        </p>

        <div className="flex flex-col gap-[60px] desktop:gap-[80px]">

          {/* Page header */}
          <div className="flex flex-col gap-[20px] desktop:gap-[30px]">
            <TypewriterText
              text="Contact Information"
              tag="h3"
              className="text-2xl tablet:text-3xl"
              color={CYAN}
              cursorColor={CYAN}
              cursorThickness={5}
              typingSpeed={0.02}
              showCursor
              hideCursorWhenDone={false}
            />
            <p className="text-sm tablet:text-base leading-relaxed" style={{ color: BLUE, margin: 0 }}>
              Have a project, open role, or question? Get in touch.
            </p>
          </div>

          {/* 2-column: contact info left, form right */}
          <div className="flex flex-col gap-[60px] desktop:flex-row desktop:gap-[60px] desktop:items-start">

            {/* Left: Direct Contact + Social */}
            <div className="flex-1 flex flex-col gap-[50px] desktop:gap-[60px]">

              {/* Direct Contact */}
              <div className="flex flex-col gap-[24px]">
                <TypewriterText
                  text="Direct Contact"
                  tag="h4"
                  className="text-xl"
                  color={NEON}
                  cursorColor={NEON}
                  cursorThickness={2}
                  typingSpeed={0.02}
                  showCursor
                  hideCursorWhenDone
                />
                <div className="flex flex-col gap-[20px] tablet:gap-[28px]" style={{ paddingLeft: "clamp(0px, 4vw, 60px)" }}>
                  {directLinks.map(({ label, value, href }) => (
                    <div key={label} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                      <span style={{ fontSize: "14px", lineHeight: "1.8em", color: BLUE, whiteSpace: "nowrap", minWidth: "90px" }}>
                        {label}
                      </span>
                      {href ? (
                        <a
                          href={href}
                          style={{ fontSize: "14px", lineHeight: "1.8em", color: "rgb(255, 255, 255)", textDecoration: "none" }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = NEON)}
                          onMouseLeave={(e) => (e.currentTarget.style.color = "rgb(255, 255, 255)")}
                        >
                          {value}
                        </a>
                      ) : (
                        <span style={{ fontSize: "14px", lineHeight: "1.8em", color: "rgb(255, 255, 255)" }}>{value}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="flex flex-col gap-[24px]">
                <TypewriterText
                  text="Social Links"
                  tag="h4"
                  className="text-xl"
                  color={NEON}
                  cursorColor={NEON}
                  cursorThickness={2}
                  typingSpeed={0.02}
                  showCursor
                  hideCursorWhenDone
                />
                <div className="flex flex-col gap-[20px] tablet:gap-[28px]" style={{ paddingLeft: "clamp(0px, 4vw, 60px)" }}>
                  {socialLinks.map(({ label, value, href }) => (
                    <div key={label} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                      <span style={{ fontSize: "14px", lineHeight: "1.8em", color: BLUE, whiteSpace: "nowrap", minWidth: "90px" }}>
                        {label}
                      </span>
                      <Link
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ fontSize: "14px", lineHeight: "1.8em", color: "rgb(255, 255, 255)", textDecoration: "none" }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = NEON)}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "rgb(255, 255, 255)")}
                      >
                        {value}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="flex-1 flex flex-col gap-[28px]">
              <TypewriterText
                text="Say hello!"
                tag="h4"
                className="text-xl"
                color={NEON}
                cursorColor={NEON}
                cursorThickness={2}
                typingSpeed={0.02}
                showCursor
                hideCursorWhenDone
              />

              {sent ? (
                <div
                  style={{
                    border: `1px dashed ${NEON}`,
                    borderRadius: "8px",
                    padding: "clamp(24px, 5vw, 40px)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                  }}
                >
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
                  style={{
                    border: `1px dashed ${NEON}`,
                    borderRadius: "8px",
                    padding: "clamp(24px, 5vw, 40px)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                  }}
                >
                  <div className="flex flex-col gap-1.5">
                    <label style={{ color: BLUE, fontSize: "14px" }}>Name</label>
                    <input type="text" required placeholder="Your name" {...field("name")} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label style={{ color: BLUE, fontSize: "14px" }}>Email</label>
                    <input type="email" required placeholder="your@email.com" {...field("email")} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label style={{ color: BLUE, fontSize: "14px" }}>Message</label>
                    <textarea
                      required
                      rows={6}
                      placeholder="Your message..."
                      style={{
                        ...INPUT_STYLE,
                        borderColor: focused === "message" ? NEON : BORDER,
                        resize: "vertical",
                      }}
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
        </div>
      </div>
    </section>
  );
}
