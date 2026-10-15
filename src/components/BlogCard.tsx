"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { TAG_COLORS } from "@/data/colors";

function pillColor(category: string): string {
  let hash = 0;
  for (let i = 0; i < category.length; i++) {
    hash = (hash * 31 + category.charCodeAt(i)) >>> 0;
  }
  return TAG_COLORS[hash % TAG_COLORS.length];
}

function toRgba(rgb: string, alpha: number): string {
  return rgb.replace("rgb(", "rgba(").replace(")", `, ${alpha})`);
}

interface BlogCardProps {
  slug: string;
  title: string;
  description: string;
  category: string;
  readTime: number;
  thumbnail?: string;
  categoryColor?: string;
}

export default function BlogCard({ slug, title, description, category, readTime, thumbnail, categoryColor }: BlogCardProps) {
  const color = categoryColor ?? pillColor(category);

  return (
    <div
      style={{
        border: "1px solid rgb(0, 255, 106)",
        borderRadius: "0px",
        padding: "24px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        position: "relative",
        zIndex: 25,
        backgroundColor: "rgb(0, 0, 0)",
      }}
    >
      {/* Top: category pill + read time */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span
          style={{
            backgroundColor: toRgba(color, 0.2),
            color,
            padding: "2px 10px",
            borderRadius: "0px",
            fontSize: "12px",
            fontWeight: 300,
          }}
        >
          {category}
        </span>
        <span style={{ color: "rgb(168, 215, 231)", fontSize: "12px", fontWeight: 300, display: "inline-flex", alignItems: "center", gap: "4px" }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          {readTime} Min Read
        </span>
      </div>

      {/* Title */}
      <h3 style={{ color: "rgb(0, 255, 106)", fontSize: "18px", lineHeight: "1.4em", fontWeight: 400, margin: 0 }}>
        {title}
      </h3>

      {/* Thumbnail or placeholder */}
      {thumbnail ? (
        <img
          src={thumbnail}
          alt={title}
          style={{
            width: "100%",
            aspectRatio: "16 / 9",
            objectFit: "cover",
            borderRadius: "0px",
            border: "1px solid rgb(50, 55, 60)",
            display: "block",
            position: "relative",
            zIndex: 25,
          }}
        />
      ) : (
        <div
          style={{
            width: "100%",
            aspectRatio: "16 / 9",
            backgroundColor: "rgb(29, 32, 37)",
            borderRadius: "0px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid rgb(50, 55, 60)",
            position: "relative",
            zIndex: 25,
          }}
        >
          <span style={{ color: "rgba(168, 215, 231, 0.3)", fontSize: "12px", fontWeight: 300 }}>[ image ]</span>
        </div>
      )}

      {/* Description */}
      <p style={{ color: "rgb(168, 215, 231)", fontSize: "14px", lineHeight: "1.8em", margin: 0, flex: 1, fontWeight: 300 }}>
        {description}
      </p>

      {/* Read the blog button */}
      <Link
        href={`/blog/${slug}`}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "8px 20px",
          backgroundColor: "transparent",
          color: "rgb(0, 255, 106)",
          fontSize: "14px",
          fontWeight: 300,
          borderRadius: "0px",
          border: "1px solid rgb(0, 255, 106)",
          cursor: "pointer",
          textDecoration: "none",
          alignSelf: "stretch",
          transition: "background-color 0.2s, color 0.2s",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.backgroundColor = "rgb(0, 255, 106)";
          el.style.color = "rgb(0, 0, 0)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.backgroundColor = "transparent";
          el.style.color = "rgb(0, 255, 106)";
        }}
      >
        Read the blog
      </Link>
    </div>
  );
}
