import { CogIcon } from "@sanity/icons/Cog";
import { defineArrayMember, defineField, defineType } from "sanity";

/** Singleton — edited from a fixed entry in the Studio structure. */
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  icon: CogIcon,
  groups: [
    { name: "home", title: "Home page", default: true },
    { name: "about", title: "About page" },
  ],
  fields: [
    defineField({
      name: "headline",
      title: "Hero headline",
      type: "string",
      group: "home",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "intro",
      title: "Hero intro paragraph",
      type: "text",
      rows: 3,
      group: "home",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "showreel",
      title: "Showreel",
      type: "videoAsset",
      group: "home",
    }),
    defineField({
      name: "gallery",
      title: "Stills & motion gallery",
      description:
        "Photo stills shown alongside the showreel on the home page. 5–8 works best.",
      type: "array",
      group: "home",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "image",
              type: "image",
              title: "Image",
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
            defineField({ name: "caption", type: "string", title: "Caption" }),
          ],
          preview: { select: { title: "caption", media: "image" } },
        }),
      ],
    }),
    defineField({
      name: "clients",
      title: "Clients / studios",
      type: "array",
      group: "home",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "name", type: "string", title: "Name" }),
            defineField({
              name: "logo",
              type: "image",
              title: "Logo",
              fields: [defineField({ name: "alt", type: "string", title: "Alt text" })],
            }),
          ],
          preview: { select: { title: "name", media: "logo" } },
        }),
      ],
    }),
    defineField({
      name: "stats",
      title: "Stats",
      type: "array",
      group: "home",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "value", type: "string", title: "Value" }),
            defineField({ name: "label", type: "string", title: "Label" }),
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        }),
      ],
    }),
    defineField({
      name: "about",
      title: "About — long-form bio",
      type: "blockContent",
      group: "about",
    }),
    defineField({
      name: "toolkit",
      title: "Editing toolkit",
      type: "array",
      group: "about",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
    }),
  ],
  preview: { prepare: () => ({ title: "Site settings" }) },
});
