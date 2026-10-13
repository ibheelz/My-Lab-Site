"use client";

import { useState } from "react";
import TypewriterText from "@/components/TypewriterText";
import PrimaryButton from "@/components/PrimaryButton";

const CYAN = "rgb(0, 255, 255)";
const BLUE = "rgb(168, 215, 231)";
const NEON_GREEN = "rgb(0, 255, 106)";
const SURFACE = "rgb(29, 32, 37)";
const BORDER = "rgb(60, 60, 60)";

const INPUT_STYLE = {
  width: "100%",
  backgroundColor: SURFACE,
  border: `1px solid ${BORDER}`,
  borderRadius: "4px",
  padding: "12px 16px",
  color: "rgb(255,255,255)",
  fontSize: "14px",
  outline: "none",
  boxSizing: "border-box" as const,
  transition: "border-color 0.2s",
  fontFamily: "inherit",
};

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [focused, setFocused] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const field = (id: keyof typeof form) => ({
    style: {
      ...INPUT_STYLE,
      borderColor: focused === id ? NEON_GREEN : BORDER,
    },
    value: form[id],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [id]: e.target.value })),
    onFocus: () => setFocused(id),
    onBlur: () => setFocused(null),
  });

  const details = [
    { label: "Email", value: "abiola@email.com" },
    { label: "Location", value: "Lagos, Nigeria" },
    { label: "Availability", value: "Open to Work" },
    { label: "Response Time", value: "Within 24 hours" },
  ];

  return (
    <section className="w-full flex justify-center px-5 pt-[75px] pb-24 tablet:px-8 tablet:pt-[95px] tablet:pb-36 desktop:px-10 desktop:pt-[120px] desktop:pb-[200px]">
      <div className="w-full max-w-[1200px] flex flex-col gap-10 tablet:gap-14 desktop:gap-16">

        {/* Header */}
        <div className="flex flex-col gap-4">
          <TypewriterText
            text="Contact"
            tag="h1"
            className="text-2xl tablet:text-3xl desktop:text-4xl"
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

        {/* Content: form + details */}
        <div className="flex flex-col gap-8 desktop:flex-row desktop:gap-16 desktop:items-start">

          {/* Form */}
          <div className="flex-1">
            {sent ? (
              <div
                className="flex flex-col gap-4 p-6 rounded"
                style={{ border: `1px solid ${NEON_GREEN}`, backgroundColor: SURFACE }}
              >
                <span className="text-base" style={{ color: NEON_GREEN }}>
                  Message sent.
                </span>
                <p className="text-sm" style={{ color: BLUE, margin: 0 }}>
                  Thanks for reaching out — I&apos;ll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                  style={{ color: BLUE, background: "none", border: "none", cursor: "pointer", fontSize: "13px", padding: 0, textAlign: "left" }}
                >
                  Send another message →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <label style={{ color: BLUE, fontSize: "13px" }}>Name</label>
                  <input type="text" required placeholder="Your name" {...field("name")} />
                </div>
                <div className="flex flex-col gap-1">
                  <label style={{ color: BLUE, fontSize: "13px" }}>Email</label>
                  <input type="email" required placeholder="your@email.com" {...field("email")} />
                </div>
                <div className="flex flex-col gap-1">
                  <label style={{ color: BLUE, fontSize: "13px" }}>Subject</label>
                  <input type="text" required placeholder="What is this about?" {...field("subject")} />
                </div>
                <div className="flex flex-col gap-1">
                  <label style={{ color: BLUE, fontSize: "13px" }}>Message</label>
                  <textarea
                    required
                    rows={6}
                    placeholder="Your message..."
                    style={{
                      ...INPUT_STYLE,
                      borderColor: focused === "message" ? NEON_GREEN : BORDER,
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

          {/* Details */}
          <div
            className="flex flex-col gap-5 desktop:w-[280px]"
            style={{
              border: `1px solid ${BORDER}`,
              borderRadius: "8px",
              padding: "clamp(20px, 4vw, 28px)",
            }}
          >
            <p className="text-sm" style={{ color: BLUE, margin: 0 }}>
              Contact Info:
            </p>
            <div className="flex flex-col gap-4">
              {details.map((d) => (
                <div key={d.label} className="flex flex-col gap-0.5">
                  <span className="text-xs" style={{ color: "rgb(120,120,120)" }}>{d.label}</span>
                  <span className="text-sm" style={{ color: "rgb(255,255,255)" }}>{d.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
