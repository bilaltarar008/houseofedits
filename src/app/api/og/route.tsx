import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site-config";

export const runtime = "nodejs";

const accent = "#c8a46b";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = (searchParams.get("title") ?? siteConfig.tagline).slice(0, 110);
  const kicker = (searchParams.get("kicker") ?? siteConfig.name).slice(0, 40);

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
          width: "100%",
          padding: 72,
          background: "#09090b",
          backgroundImage:
            "radial-gradient(1000px 520px at 12% -10%, rgba(200,164,107,0.20), transparent 60%)",
          fontFamily: "Georgia, 'Times New Roman', serif",
          color: "#f5f3ef",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              width: 34,
              height: 34,
              marginRight: 18,
              borderRadius: 9,
              border: `3px solid ${accent}`,
            }}
          />
          <div
            style={{
              display: "flex",
              fontFamily: "monospace",
              fontSize: 20,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: accent,
            }}
          >
            {kicker}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: title.length > 55 ? 62 : 78,
              lineHeight: 1.05,
              letterSpacing: -1.5,
              marginBottom: 24,
            }}
          >
            {title}
          </div>
          <div style={{ display: "flex", fontSize: 29, color: "#a1a1a6" }}>
            {`${siteConfig.name} · ${siteConfig.role}`}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 21,
            color: "#8a8a90",
          }}
        >
          <div style={{ display: "flex" }}>
            {siteConfig.url.replace(/^https?:\/\//, "")}
          </div>
          <div style={{ display: "flex" }}>Wedding films, cut with feeling.</div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: {
        "Cache-Control": "public, max-age=86400, s-maxage=86400, immutable",
      },
    },
  );
}
