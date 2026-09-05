"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { WhatsAppIcon } from "@/components/whatsapp/whatsapp-icon";
import { siteConfig, whatsappLink } from "@/lib/site-config";

/**
 * Sticky floating WhatsApp button, rendered once per page in the site layout.
 * z-40 keeps it under the header (z-50) and the mobile-menu overlay (z-60), so
 * it never covers navigation. The bottom offset respects the iOS safe area.
 */
export function WhatsAppFloat() {
  const href = whatsappLink();
  const reduce = useReducedMotion();
  const [ready, setReady] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 700);
    return () => clearTimeout(t);
  }, []);

  if (!href) return null;

  return (
    <div
      className="fixed right-4 z-40 flex items-center gap-3 sm:right-6"
      style={{ bottom: "calc(1rem + env(safe-area-inset-bottom))" }}
    >
      {/* desktop hover label */}
      <AnimatePresence>
        {ready && hovered && (
          <motion.span
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
            transition={{ duration: 0.2 }}
            className="hidden rounded-full border border-border bg-surface px-3.5 py-2 text-sm text-foreground shadow-lg sm:block"
          >
            Chat with us
          </motion.span>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {ready && (
          <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Chat on WhatsApp — ${siteConfig.name}`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onFocus={() => setHovered(true)}
            onBlur={() => setHovered(false)}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_28px_-6px_rgba(0,0,0,0.55)] ring-1 ring-black/10 transition-transform duration-200 hover:scale-105 hover:bg-[#20bd5a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-95"
          >
            {!reduce && (
              <span className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-[#25D366] opacity-40 motion-safe:animate-ping" />
            )}
            <WhatsAppIcon className="size-7" />
          </motion.a>
        )}
      </AnimatePresence>
    </div>
  );
}
