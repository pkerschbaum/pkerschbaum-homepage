import { z } from 'zod';

export const schema_faviconsForWebsites = z.object({
  websites: z.record(
    z.string().url(),
    z
      .object({
        iconURLs: z.object({
          light: z.string().url().optional(),
          dark: z.string().url().optional(),
        }),
      })
      .optional(),
  ),

  icons: z.record(z.string().url(), z.object({ dataURL: z.string().min(1) }).optional()),
});
export type FaviconsForWebsites = z.infer<typeof schema_faviconsForWebsites>;
