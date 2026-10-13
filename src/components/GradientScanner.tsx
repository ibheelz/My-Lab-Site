"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function GradientScanner() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[20] overflow-hidden">
      <motion.div
        style={{
          position: "absolute",
          width: "100%",
          height: "70vh",
          background:
            "linear-gradient(180deg, transparent 0%, rgba(0, 255, 106, 0.9) 50%, transparent 100%)",
        }}
        animate={{
          y: ["-70vh", "-70vh", "100vh", "100vh"],
          opacity: [0, 0.32, 0.32, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.05, 0.95, 1],
        }}
        initial={{ y: "-70vh", opacity: 0 }}
      />
    </div>
  );
}
