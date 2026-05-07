"use client";

import { useEffect, type ReactNode } from "react";
import { cn } from "@/src/ui/lib/cn";

/**
 * Accessible modal: overlay + container.
 * - ESC closes
 * - Click outside closes
 * - Locks body scroll while open
 */
export function Modal({
  open,
  onClose,
  children,
  className,
  labelledBy,
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  labelledBy?: string;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledBy}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-black/60 backdrop-blur-sm animate-[fade_200ms_ease-out]"
      />
      <div
        className={cn(
          "relative z-[101] flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-background shadow-2xl animate-[modalIn_240ms_cubic-bezier(0.16,1,0.3,1)]",
          className,
        )}
      >
        {children}
      </div>
      <style>{`
        @keyframes fade { from { opacity: 0 } to { opacity: 1 } }
        @keyframes modalIn {
          from { opacity: 0; transform: translateY(16px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}
