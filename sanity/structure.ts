import type { StructureResolver } from "sanity/structure";

/** Custom desk structure — singleton for Site settings, lists for the rest. */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site settings")
        .id("siteSettings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.divider(),
      S.documentTypeListItem("project").title("Projects"),
      S.documentTypeListItem("testimonial").title("Testimonials"),
      S.documentTypeListItem("service").title("Service packages"),
      S.documentTypeListItem("faq").title("FAQs"),
      S.divider(),
      S.documentTypeListItem("post").title("Journal posts"),
      S.documentTypeListItem("author").title("Authors"),
    ]);
