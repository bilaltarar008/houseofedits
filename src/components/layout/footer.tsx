import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/primitives/container";
import { Logo } from "@/components/layout/logo";
import { WhatsAppIcon } from "@/components/whatsapp/whatsapp-icon";
import {
  activeSocialLinks,
  siteConfig,
  whatsappDisplay,
  whatsappLink,
} from "@/lib/site-config";

export function Footer() {
  const socials = activeSocialLinks();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div className="flex flex-col gap-5">
            <Logo />
            <p className="max-w-xs text-sm leading-relaxed text-muted">
              {siteConfig.editor} — {siteConfig.role.toLowerCase()}. Cinematic
              wedding films, feature edits, and social teasers for studios
              worldwide.
            </p>
            {siteConfig.contact.email && (
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="text-sm text-accent hover:text-accent-strong"
              >
                {siteConfig.contact.email}
              </a>
            )}
            {whatsappLink() && (
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-[#25D366]"
              >
                <WhatsAppIcon className="size-4 text-[#25D366]" />
                {whatsappDisplay()}
              </a>
            )}
          </div>

          <nav className="flex flex-col gap-3" aria-label="Footer">
            <span className="eyebrow mb-1">Explore</span>
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-muted transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            <span className="eyebrow mb-1">Elsewhere</span>
            {socials.length > 0 ? (
              socials.map((s) => (
                <a
                  key={s.key}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-foreground"
                >
                  {s.label}
                  <ArrowUpRight className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                </a>
              ))
            ) : (
              <span className="text-sm text-muted-foreground">
                Social links coming soon
              </span>
            )}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {year} {siteConfig.name}. All rights reserved.
          </span>
          <span>
            {siteConfig.editor} · Built with Next.js
          </span>
        </div>
      </Container>
    </footer>
  );
}
