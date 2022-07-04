import { z } from 'zod';

export type Project = {
  segment: string;
  thumbnailUrl: string;
  title: string;
  description: string;
};

const schema_hrefToFaviconHrefsMap = z.record(
  z.string(),
  z
    .object({
      lightIconHref: z.string().min(1).optional(),
      darkIconHref: z.string().min(1).optional(),
    })
    .optional(),
);
export const schema_hrefToFaviconsMap = z.object({
  hrefToFaviconHrefsMap: schema_hrefToFaviconHrefsMap,
  iconHrefToDataURLsMap: z.record(z.string(), z.string().min(1).optional()),
});
export type HrefToFaviconsMap = z.infer<typeof schema_hrefToFaviconsMap>;
