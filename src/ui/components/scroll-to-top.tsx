"use client";

import { useEffect, useState } from "react";
import { cn } from "@/src/ui/lib/cn";

/**
 * Floating button that returns the user to the top of the page.
 * Appears once the user has scrolled past the hero zone (~600 px).
 */
export function ScrollToTop({ label = "Top" }: { label?: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label={label}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={cn(
        "fixed bottom-6 right-6 z-40 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-accent text-white shadow-lg shadow-accent/30 transition-all duration-300 ease-out hover:bg-accent-hover hover:shadow-xl hover:shadow-accent/40 sm:bottom-8 sm:right-8",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        aria-hidden
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
}
