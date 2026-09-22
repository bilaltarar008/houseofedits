import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/primitives/container";
import { Logo } from "@/components/layout/logo";
import { InstagramIcon } from "@/components/social/instagram-icon";
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
      <Container className="py-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.9fr_0.9fr]">
          <div className="flex flex-col gap-4">
            <Logo />
            <p className="max-w-xs text-sm leading-relaxed text-muted">
              {siteConfig.name} — {siteConfig.role.toLowerCase()}. A team of
              editors, videographers, and photographers crafting cinematic
              wedding films and galleries worldwide.
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

          <nav className="flex flex-col gap-2.5" aria-label="Footer">
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

          <div className="flex flex-col gap-2.5">
            <span className="eyebrow mb-1">Elsewhere</span>
            {socials.length > 0 ? (
              socials.map((s) => (
                <a
                  key={s.key}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
                >
                  {s.key === "instagram" && <InstagramIcon className="size-4" />}
                  {s.label}
                  <ArrowUpRight className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                </a>
              ))
            ) : (
              <span className="text-sm text-muted-foreground">
                Social links coming soon
              </span>
            )}

            {siteConfig.contact.mapEmbedSrc && (
              <div className="mt-2 flex flex-col gap-2">
                {siteConfig.contact.location && (
                  <span className="text-xs text-muted-foreground">
                    {siteConfig.contact.location}
                  </span>
                )}
                <div className="h-24 w-full overflow-hidden rounded-sm border border-border">
                  <iframe
                    src={siteConfig.contact.mapEmbedSrc}
                    className="h-full w-full border-0"
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                    title={`${siteConfig.name} — ${siteConfig.contact.location}`}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-border pt-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {year} {siteConfig.name}. All rights reserved.
          </span>
          <span>{siteConfig.role}</span>
        </div>
      </Container>
    </footer>
  );
}
