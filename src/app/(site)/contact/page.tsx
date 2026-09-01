import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

import { Container } from "@/components/primitives/container";
import { PageHeader } from "@/components/primitives/page-header";
import { JsonLd } from "@/components/seo/json-ld";
import { activeSocialLinks, siteConfig } from "@/lib/site-config";
import { breadcrumbSchema, graph, organizationSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

import { ContactForm } from "./contact-form";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description: `Start a project with ${siteConfig.editor}. Tell me about the wedding, your style, and your deadline — I reply within one business day.`,
  path: "/contact",
});

export default function ContactPage() {
  const socials = activeSocialLinks();

  const details = [
    siteConfig.contact.email && {
      icon: Mail,
      label: "Email",
      value: siteConfig.contact.email,
      href: `mailto:${siteConfig.contact.email}`,
    },
    siteConfig.contact.phone && {
      icon: Phone,
      label: "Phone",
      value: siteConfig.contact.phone,
      href: `tel:${siteConfig.contact.phone.replace(/\s/g, "")}`,
    },
    siteConfig.contact.location && {
      icon: MapPin,
      label: "Based in",
      value: siteConfig.contact.location,
    },
    siteConfig.contact.availability && {
      icon: Clock,
      label: "Availability",
      value: siteConfig.contact.availability,
    },
  ].filter(Boolean) as {
    icon: typeof Mail;
    label: string;
    value: string;
    href?: string;
  }[];

  return (
    <>
      <JsonLd
        data={graph(
          organizationSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
          {
            "@type": "ContactPage",
            name: "Contact — House of Edits",
          },
        )}
      />

      <PageHeader
        eyebrow="Contact"
        title="Let's talk about your film"
        lede="The more detail you share now, the faster I can come back with real availability and a quote."
      />

      <section className="py-16 sm:py-24">
        <Container className="grid gap-14 lg:grid-cols-[1fr_20rem] lg:gap-20">
          <ContactForm />

          <aside className="flex flex-col gap-8">
            {details.length > 0 ? (
              <ul className="flex flex-col gap-6">
                {details.map((d) => (
                  <li key={d.label} className="flex gap-3">
                    <d.icon className="mt-0.5 size-4 shrink-0 text-accent" />
                    <div className="flex flex-col">
                      <span className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                        {d.label}
                      </span>
                      {d.href ? (
                        <a href={d.href} className="text-sm text-foreground hover:text-accent">
                          {d.value}
                        </a>
                      ) : (
                        <span className="text-sm text-foreground">{d.value}</span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted">
                Direct contact details are being finalised — use the form and your
                message will reach me.
              </p>
            )}

            {socials.length > 0 && (
              <div className="flex flex-col gap-3 border-t border-border pt-6">
                <span className="eyebrow">Follow the work</span>
                <ul className="flex flex-wrap gap-x-5 gap-y-2">
                  {socials.map((s) => (
                    <li key={s.key}>
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted hover:text-foreground"
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </Container>
      </section>
    </>
  );
}
