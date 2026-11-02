"use client";
import { useEffect } from "react";

export default function MielaRedirect() {
  useEffect(() => {
    window.location.replace("/miela/index.html");
  }, []);
  return null;
}
