import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="fixed bottom-0 left-0 right-0 z-50 px-5 tablet:px-8 desktop:px-10"
      style={{
        height: "55px",
        backgroundColor: "rgba(9, 9, 11, 0.85)",
        backdropFilter: "blur(10px)",
        borderTop: "1px solid rgb(0, 255, 106)",
        animationName: "slideUpFooter",
        animationDuration: "1s",
        animationTimingFunction: "ease-out",
        animationFillMode: "both",
        animationDelay: "0ms",
      }}
    >
      <div className="max-w-[1200px] mx-auto h-full flex items-center justify-between gap-6">
        <p style={{ fontSize: "12px", color: "rgb(0, 255, 106)", margin: 0 }}>
          2026 all rights reserved.
        </p>

        <div className="flex gap-6">
          <Link
            href="https://github.com/ibheelz"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            style={{ color: "rgb(0, 255, 106)", opacity: 1, transition: "opacity 0.2s" }}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </Link>
          <Link
            href="https://twitter.com/ibheelz"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X"
            style={{ color: "rgb(0, 255, 106)", transition: "opacity 0.2s" }}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.514l-5.106-6.665-5.834 6.665h-3.308l7.73-8.835L.424 2.25h6.679l4.882 6.479 5.259-6.479zM17.002 18.807h1.646L6.154 4.556H4.388l12.614 14.251z" />
            </svg>
          </Link>
          <Link
            href="https://linkedin.com/in/abioladeyeye"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            style={{ color: "rgb(0, 255, 106)", transition: "opacity 0.2s" }}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </Link>
        </div>
      </div>
    </footer>
  );
}
