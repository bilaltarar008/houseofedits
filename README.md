# House of Edits — Shoaib Ur Rehman

Portfolio website for **Shoaib Ur Rehman**, a wedding film editor & colorist.
Built with Next.js (App Router), Tailwind CSS, and Sanity CMS, with strong SEO
and a lazy, adaptive video pipeline.

---

## Stack

| Area | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, React 19, TypeScript) |
| Styling | Tailwind CSS v4, CVA, `motion` for animation |
| CMS | Sanity v3 — embedded Studio at **`/studio`** |
| Video | Self-hosted adaptive **HLS** via `hls.js`, lazy-loaded |
| Email | Resend (contact form) |
| SEO | Metadata API, JSON-LD, dynamic OG images, sitemap, robots, RSS |
| Analytics | Vercel Analytics + Speed Insights |
| Hosting | Vercel |

## Getting started

```bash
npm install
cp .env.local.example .env.local   # fill in when ready — not required to run
npm run dev                        # http://localhost:3000
```

The site runs **without any configuration** — all content falls back to seed
data in `src/lib/fallback-content.ts`. Wire up Sanity and Resend when you're
ready to go live.

### Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` / `npm start` | Production build & serve |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint |
| `npm run format` | Prettier |
| `npm run encode <in> <name>` | Encode a video to an HLS ladder (needs ffmpeg) |

---

## Connecting Sanity (content)

1. Create a project at <https://www.sanity.io/manage>.
2. Put the IDs in `.env.local`:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=xxxxxxxx
   NEXT_PUBLIC_SANITY_DATASET=production
   ```
3. Add `http://localhost:3000` and your Vercel domain under
   **API → CORS origins** (allow credentials).
4. Run `npm run dev`, open **`/studio`**, sign in.
5. Fill in **Site settings** first, then add Projects, Testimonials, Services,
   FAQs, and Journal posts.

Content types: `siteSettings` (singleton), `project`, `testimonial`, `service`,
`faq`, `post`, `author`. Schemas live in `sanity/schemaTypes/`.

Published content revalidates hourly. For instant updates, add a Sanity webhook
to a revalidation route (not included yet — ask when needed).

---

## Adding videos (no lag)

Videos are **not** committed to the repo. The pipeline:

1. Encode a master file to an adaptive ladder:
   ```bash
   npm run encode ./raw/hunza-highlight.mov hunza-highlight
   ```
   → `public/videos/hunza-highlight/master.m3u8` + `poster.jpg`
2. **Local / small:** leave it in `public/videos/` and reference
   `/videos/hunza-highlight/master.m3u8`.
3. **Production (recommended):** upload the `hunza-highlight/` folder to
   Cloudflare R2 or Bunny, then set
   `NEXT_PUBLIC_VIDEO_CDN_BASE=https://media.yourdomain.com`. Paths beginning
   `/videos/...` resolve to the CDN automatically.
4. In Sanity, paste the `.m3u8` URL into a project's **Film → HLS URL** field
   and upload a poster frame.

The `<VideoPlayer>` component:

- loads nothing until it's ~400px from the viewport (IntersectionObserver);
- uses native HLS on Safari, `hls.js` (dynamically imported) elsewhere;
- shows the poster + a "coming soon" state when no source is set.

---

## Contact form email

Set in `.env.local` (and Vercel):

```
RESEND_API_KEY=re_xxx
CONTACT_TO_EMAIL=you@yourdomain.com
CONTACT_FROM_EMAIL=House of Edits <hello@yourdomain.com>
```

Until these are set, submissions are validated and logged server-side (nothing
is lost) and the user still sees a success state.

---

## Details still to be provided by the client

Search for `TODO` in `src/lib/site-config.ts`. Currently empty and hidden from
the UI until filled:

- Contact email, phone, location, WhatsApp
- Social links (Instagram, YouTube, Vimeo, …)
- Real showreel + project videos
- Real photography (cover images, portrait, client logos)

---

## SEO checklist (already wired)

- Per-page `generateMetadata` with canonical URLs, OG + Twitter cards
- Dynamic OG image route: `/api/og?title=...`
- JSON-LD: Organization/ProfessionalService, Person, WebSite, BreadcrumbList,
  CreativeWork, VideoObject, BlogPosting, FAQPage
- `sitemap.xml`, `robots.txt`, `manifest.webmanifest`
- RSS feed at `/blog/rss.xml`
- Semantic headings, skip link, reduced-motion support, `next/font` (no CLS)

After deploying, submit `https://<domain>/sitemap.xml` in Google Search Console.

---

## Deploying to Vercel

1. Push to GitHub, import the repo in Vercel.
2. Add every variable from `.env.local.example` in **Project → Settings →
   Environment Variables** (set `NEXT_PUBLIC_SITE_URL` to the real domain).
3. Deploy. Add the production domain to Sanity CORS origins.
