import { DocumentVideoIcon } from "@sanity/icons/DocumentVideo";
import { defineArrayMember, defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  icon: DocumentVideoIcon,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "media", title: "Media" },
    { name: "meta", title: "Meta" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Film title",
      type: "string",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "couple",
      title: "Couple / event",
      type: "string",
      group: "content",
      description: 'e.g. "Ayesha & Hamza"',
    }),
    defineField({ name: "location", title: "Location", type: "string", group: "content" }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      group: "content",
      options: {
        list: ["Highlight Film", "Feature Film", "Teaser", "Same-Day Edit", "Color Grade"],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "number",
      group: "content",
      validation: (rule) => rule.min(2000).max(2100),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 2,
      group: "content",
      description: "One line shown on cards and in meta description.",
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: "services",
      title: "Services performed",
      type: "array",
      group: "content",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
    }),
    defineField({
      name: "credits",
      title: "Credits",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "role", type: "string", title: "Role" }),
            defineField({ name: "name", type: "string", title: "Name" }),
          ],
          preview: { select: { title: "name", subtitle: "role" } },
        }),
      ],
    }),
    defineField({
      name: "cover",
      title: "Cover image",
      type: "image",
      group: "media",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alt text",
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "video", title: "Film", type: "videoAsset", group: "media" }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      group: "media",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              type: "string",
              title: "Alt text",
              validation: (rule) => rule.required(),
            }),
          ],
        }),
      ],
    }),
    defineField({ name: "body", title: "Write-up", type: "blockContent", group: "content" }),
    defineField({
      name: "featured",
      title: "Feature on home page",
      type: "boolean",
      group: "meta",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Manual sort order",
      type: "number",
      group: "meta",
    }),
  ],
  orderings: [
    {
      title: "Manual order",
      name: "manual",
      by: [
        { field: "order", direction: "asc" },
        { field: "year", direction: "desc" },
      ],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "cover" },
  },
});
