import { z } from 'zod';

export type Project = {
  segment: string;
  thumbnailUrl: string;
  title: string;
  description: string;
};

export const schema_hrefToFaviconHrefsMap = z.object({
  lightIconHref: z.string().min(1).optional(),
  darkIconHref: z.string().min(1).optional(),
});
export type HrefToFaviconHrefsMap = z.infer<typeof schema_hrefToFaviconHrefsMap>;
export const schema_hrefToFaviconsMap = z.object({
  hrefToFaviconHrefsMap: z.record(z.string(), schema_hrefToFaviconHrefsMap.optional()),
  iconHrefToDataURLsMap: z.record(z.string(), z.string().min(1).optional()),
});
export type HrefToFaviconsMap = z.infer<typeof schema_hrefToFaviconsMap>;
