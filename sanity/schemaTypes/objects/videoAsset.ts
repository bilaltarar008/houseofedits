import { PlayIcon } from "@sanity/icons/Play";
import { defineField, defineType } from "sanity";

/**
 * A self-hosted adaptive video. The editor uploads the encoded HLS ladder to a
 * CDN (Cloudflare R2 / Bunny / Vercel Blob) and pastes the master playlist URL
 * here. See scripts/encode-video.sh for producing the ladder + poster.
 */
export const videoAsset = defineType({
  name: "videoAsset",
  title: "Video",
  type: "object",
  icon: PlayIcon,
  fields: [
    defineField({
      name: "hlsUrl",
      title: "HLS master playlist URL (.m3u8)",
      type: "url",
      description:
        "Adaptive stream — the primary source. Leave empty to show a 'coming soon' poster.",
      validation: (rule) =>
        rule.uri({ scheme: ["http", "https"] }).custom((value) => {
          if (!value) return true;
          return value.endsWith(".m3u8") || "URL should point to an .m3u8 playlist";
        }),
    }),
    defineField({
      name: "mp4Url",
      title: "MP4 fallback URL",
      type: "url",
      description: "Optional progressive MP4 for instant first paint / older browsers.",
    }),
    defineField({
      name: "poster",
      title: "Poster frame",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: "title",
      title: "Title (for accessibility & SEO)",
      type: "string",
    }),
    defineField({
      name: "aspect",
      title: "Aspect ratio",
      type: "string",
      options: {
        list: [
          { title: "Cinemascope 2.39:1", value: "2.39 / 1" },
          { title: "Widescreen 16:9", value: "16 / 9" },
          { title: "Vertical 9:16", value: "9 / 16" },
          { title: "Square 1:1", value: "1 / 1" },
        ],
        layout: "radio",
      },
      initialValue: "16 / 9",
    }),
    defineField({
      name: "durationSeconds",
      title: "Duration (seconds)",
      type: "number",
      description: "Used for VideoObject structured data (rich results).",
    }),
    defineField({
      name: "uploadDate",
      title: "Publish date",
      type: "date",
      description: "Used for VideoObject structured data.",
    }),
  ],
  preview: {
    select: { title: "title", media: "poster" },
    prepare: ({ title, media }) => ({ title: title || "Video", media }),
  },
});
