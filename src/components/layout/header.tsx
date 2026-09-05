"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Logo } from "@/components/layout/logo";
import { MobileNav } from "@/components/layout/mobile-nav";
import { InstagramColorIcon } from "@/components/social/instagram-icon";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/whatsapp/whatsapp-icon";
import { siteConfig, whatsappLink } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const waHref = whatsappLink();
  const igHref = siteConfig.social.instagram;

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <div className="container-page flex h-20 items-center justify-between gap-8">
        <Logo />

        <nav className="hidden items-center gap-9 lg:flex" aria-label="Primary">
          {siteConfig.nav.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative py-1 text-sm transition-colors",
                  active ? "text-foreground" : "text-muted hover:text-foreground",
                )}
              >
                {item.label}
                {active && (
                  <span className="absolute -bottom-0.5 left-0 h-px w-full bg-accent" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {igHref && (
            <a
              href={igHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow on Instagram"
              className="flex size-9 items-center justify-center transition-transform hover:scale-110"
            >
              <InstagramColorIcon className="size-6" />
            </a>
          )}
          {waHref && (
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="flex size-9 items-center justify-center rounded-full border border-border text-[#25D366] transition-colors hover:border-[#25D366]/60 hover:bg-[#25D366]/10"
            >
              <WhatsAppIcon className="size-4" />
            </a>
          )}
          <Button href="/contact" size="sm" variant="outline">
            Start a project
          </Button>
        </div>

        <MobileNav />
      </div>
    </header>
  );
}
