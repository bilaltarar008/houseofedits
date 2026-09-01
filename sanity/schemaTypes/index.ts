import type { SchemaTypeDefinition } from "sanity";

import { blockContent } from "./objects/blockContent";
import { videoAsset } from "./objects/videoAsset";
import { author } from "./documents/author";
import { faq } from "./documents/faq";
import { post } from "./documents/post";
import { project } from "./documents/project";
import { service } from "./documents/service";
import { siteSettings } from "./documents/siteSettings";
import { testimonial } from "./documents/testimonial";

export const schemaTypes: SchemaTypeDefinition[] = [
  // Objects
  videoAsset,
  blockContent,
  // Documents
  project,
  testimonial,
  service,
  faq,
  post,
  author,
  siteSettings,
];
