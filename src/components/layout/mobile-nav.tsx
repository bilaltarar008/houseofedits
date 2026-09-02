"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/whatsapp/whatsapp-icon";
import { siteConfig, whatsappLink } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();
  const close = React.useCallback(() => setOpen(false), []);

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className="flex size-10 items-center justify-center text-foreground"
      >
        <Menu className="size-5" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-background"
          >
            <div className="container-page flex h-20 items-center justify-between">
              <span className="font-display text-[0.95rem]">{siteConfig.name}</span>
              <button
                type="button"
                onClick={close}
                aria-label="Close menu"
                className="flex size-10 items-center justify-center text-foreground"
              >
                <X className="size-5" />
              </button>
            </div>

            <nav className="container-page mt-8 flex flex-col">
              {siteConfig.nav.map((item, i) => {
                const active =
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href));
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={close}
                      className={cn(
                        "block border-b border-border py-5 font-display text-2xl",
                        active ? "text-accent" : "text-foreground",
                      )}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            <div className="container-page mt-10 flex flex-col gap-3">
              <Button href="/contact" size="lg" className="w-full" onClick={close}>
                Start a project
              </Button>
              {whatsappLink() && (
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={close}
                  className="flex h-13 w-full items-center justify-center gap-2.5 rounded-sm bg-[#25D366] text-sm font-medium text-white transition-colors hover:bg-[#20bd5a]"
                >
                  <WhatsAppIcon className="size-5" />
                  Chat on WhatsApp
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
