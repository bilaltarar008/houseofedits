import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId, sanityConfigured, useCdn } from "../env";

/**
 * Shared read client. When no project id is configured we still create a
 * client (so imports don't blow up) but the fetch layer never calls it.
 */
export const client = createClient({
  projectId: projectId || "placeholder",
  dataset,
  apiVersion,
  useCdn,
  perspective: "published",
  stega: false,
});

export { sanityConfigured };
