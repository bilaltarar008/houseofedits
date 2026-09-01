"use client";

/**
 * Sanity Studio configuration — mounted at /studio.
 *
 * Add NEXT_PUBLIC_SANITY_PROJECT_ID (and dataset) to .env.local, then run the
 * dev server and visit /studio to sign in and start adding content.
 */

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { apiVersion, dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";

export default defineConfig({
  basePath: "/studio",
  projectId: projectId || "placeholder",
  dataset,
  title: "House of Edits",
  schema: { types: schemaTypes },
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
