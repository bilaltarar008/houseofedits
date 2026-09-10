import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { Media } from "@/components/media/media";
import { PortableText } from "@/components/portable-text";
import { Container } from "@/components/primitives/container";
import { Reveal } from "@/components/primitives/reveal";
import { CtaSection } from "@/components/sections/cta";
import { JsonLd } from "@/components/seo/json-ld";
import { VideoPlayer } from "@/components/media/video-player";
import { Badge } from "@/components/ui/badge";
import { getProject, getProjects, getProjectSlugs } from "@/lib/content";
import {
  breadcrumbSchema,
  graph,
  projectSchema,
} from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { WorkGrid } from "@/components/work/work-grid";

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return buildMetadata({ title: "Project not found", noindex: true });

  return buildMetadata({
    title: project.title,
    description: project.excerpt,
    path: `/work/${project.slug}`,
    image: project.cover?.url || undefined,
    type: "article",
  });
}

export default async function ProjectPage({
  params,
}: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const [project, all] = await Promise.all([getProject(slug), getProjects()]);

  if (!project) notFound();

  const related = all.filter((p) => p.slug !== project.slug).slice(0, 3);
  const meta = [
    project.couple && { label: "Couple", value: project.couple },
    project.location && { label: "Location", value: project.location },
    project.year && { label: "Year", value: String(project.year) },
    project.category && { label: "Format", value: project.category },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <>
      <JsonLd
        data={graph(
          projectSchema(project),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Work", path: "/work" },
            { name: project.title, path: `/work/${project.slug}` },
          ]),
        )}
      />

      <article>
        <Container className="py-10 sm:py-14">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            All work
          </Link>

          <div className="mt-8 flex flex-col gap-5">
            <div className="flex flex-wrap gap-2">
              <Badge>{project.category}</Badge>
              {project.services.map((service) => (
                <Badge key={service}>{service}</Badge>
              ))}
            </div>
            <h1 className="max-w-3xl text-4xl leading-[1.08] sm:text-5xl lg:text-6xl">
              {project.title}
            </h1>
            <p className="max-w-xl text-lg text-muted">{project.excerpt}</p>
          </div>
        </Container>

        <Container>
          {project.video ? (
            <VideoPlayer
              video={project.video}
              priority
              controls
              sizes="(min-width: 1280px) 1200px, 100vw"
              className="border border-border"
            />
          ) : (
            <Media
              image={project.cover}
              aspect="16 / 9"
              priority
              sizes="(min-width: 1280px) 1200px, 100vw"
              className="border border-border"
              placeholderLabel={project.couple ?? project.title}
            />
          )}
        </Container>

        <Container className="py-14">
          <div className="grid gap-12 lg:grid-cols-[1fr_18rem] lg:gap-16">
            <div className="min-w-0 max-w-2xl">
              {project.body?.length ? (
                <PortableText value={project.body} />
              ) : (
                <p className="leading-relaxed text-muted">
                  A full write-up for this film is on the way. In the meantime,
                  the highlight above shows the pacing, grade, and sound design
                  approach.
                </p>
              )}
            </div>

            <aside className="flex flex-col gap-8 lg:sticky lg:top-28 lg:self-start">
              <dl className="flex flex-col divide-y divide-border border-y border-border">
                {meta.map((row) => (
                  <div
                    key={row.label}
                    className="flex justify-between gap-4 py-3 text-sm"
                  >
                    <dt className="text-muted-foreground">{row.label}</dt>
                    <dd className="text-right text-foreground">{row.value}</dd>
                  </div>
                ))}
              </dl>

              {project.credits?.length ? (
                <div className="flex flex-col gap-2">
                  <span className="eyebrow">Credits</span>
                  <ul className="flex flex-col gap-1.5 text-sm">
                    {project.credits.map((c) => (
                      <li key={`${c.role}-${c.name}`} className="flex justify-between gap-4">
                        <span className="text-muted-foreground">{c.role}</span>
                        <span className="text-right text-foreground">{c.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </aside>
          </div>

          {project.gallery?.length ? (
            <div className="mt-14 grid gap-4 sm:grid-cols-2">
              {project.gallery.map((image, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <Media
                    image={image}
                    aspect="3 / 2"
                    sizes="(min-width: 640px) 50vw, 100vw"
                  />
                </Reveal>
              ))}
            </div>
          ) : null}
        </Container>

        {related.length > 0 && (
          <Container className="border-t border-border py-16">
            <h2 className="mb-10 font-display text-2xl">More films</h2>
            <WorkGrid projects={related} />
          </Container>
        )}
      </article>

      <CtaSection />
    </>
  );
}
