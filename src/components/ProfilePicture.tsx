"use client";
/* eslint-disable @next/next/no-img-element */

import { useState } from "react";

export default function ProfilePicture() {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="flex flex-col items-center tablet:items-end gap-2 w-full tablet:w-auto">
      {imageError || true ? (
        <div
          className="bg-surface flex items-center justify-center border border-border"
          style={{ width: "clamp(110px, 22vw, 150px)", aspectRatio: "4 / 5", position: "relative", zIndex: 25 }}
        >
          <span style={{ color: "rgba(168, 215, 231, 0.3)", fontSize: "12px" }}>[ photo ]</span>
        </div>
      ) : (
        <img
          src="/images/abiola.jpg"
          alt="abiola"
          className="object-cover"
          style={{ width: "clamp(110px, 22vw, 150px)", aspectRatio: "4 / 5", position: "relative", zIndex: 25 }}
          onError={() => setImageError(true)}
        />
      )}
      <span style={{ color: "rgb(168, 215, 231)", fontSize: "12px" }}>abiola.jpg</span>
    </div>
  );
}
