import { z } from 'zod';

export type Project = {
  slug: string;
  thumbnailUrl: string;
  title: string;
  description: string;
};

export const schema_faviconDataUrls = z.object({
  lightIconDataURL: z.string().nonempty().optional(),
  darkIconDataURL: z.string().nonempty().optional(),
});
export type FaviconDataUrls = z.infer<typeof schema_faviconDataUrls>;
export const schema_hrefsToFaviconDataUrlsMap = z.record(
  z.string(),
  schema_faviconDataUrls.optional(),
);
export type HrefsToFaviconDataUrlsMap = z.infer<typeof schema_hrefsToFaviconDataUrlsMap>;
