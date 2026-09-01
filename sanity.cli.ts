import { defineCliConfig } from "sanity/cli";

import { dataset, projectId } from "./sanity/env";

export default defineCliConfig({
  api: { projectId, dataset },
  /** Studio is served by Next.js at /studio, not deployed separately. */
  autoUpdates: true,
});
