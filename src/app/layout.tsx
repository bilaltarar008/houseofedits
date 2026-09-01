import type { Metadata, Viewport } from "next";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/site-config";
import {
  graph,
  organizationSchema,
  personSchema,
  websiteSchema,
} from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  ...buildMetadata(),
  title: {
    default: `${siteConfig.editor} — ${siteConfig.role}`,
    template: `%s — ${siteConfig.name}`,
  },
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.editor }],
  creator: siteConfig.editor,
  keywords: [
    "wedding film editor",
    "wedding video editor",
    "wedding highlight film editor",
    "wedding videographer editor",
    "color grading wedding films",
    "DaVinci Resolve wedding",
    "outsource wedding editing",
    siteConfig.editor,
  ],
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  themeColor: "#09090b",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* If JS never runs, don't leave scroll-reveal content hidden. */}
        <noscript>
          <style>{`[style*="opacity:0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <JsonLd
          data={graph(
            organizationSchema(),
            personSchema(),
            websiteSchema(),
          )}
        />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
