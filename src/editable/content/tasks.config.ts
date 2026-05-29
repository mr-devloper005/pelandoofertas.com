import type { TaskKey } from "@/lib/site-config";

export const slot4TaskSupport = {
  article: false,
  classified: true,
  sbm: false,
  profile: false,
  pdf: false,
  listing: false,
  image: false,
} satisfies Record<TaskKey, boolean>;

export const slot4TaskNotes = {
  article: "Classified post pages and detail backlinks",
  classified: "Classified ads pages and detail backlinks",
  sbm: "Saved classified pages and detail backlinks",
  profile: "Seller profile pages and detail backlinks",
  pdf: "Classified document pages and detail backlinks",
  listing: "Business classified pages and detail backlinks",
  image: "Image-first classified pages and detail backlinks",
} satisfies Record<TaskKey, string>;
