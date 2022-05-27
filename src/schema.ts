import { z } from 'zod';

export type MDXFile = {
  slug: string;
  frontmatter: FrontmatterData;
};

export type MDXParseResult = {
  code: string;
  frontmatter: FrontmatterData;
  collectedHrefs: string[];
};

export const schema_frontmatterData = z.object({
  title: z.string(),
  published: z.boolean(),
  publishedAtISO: z.string(),
  description: z.string(),
  shortenedURL: z.string(),
  tags: z.array(z.string()),
});
export type FrontmatterData = z.infer<typeof schema_frontmatterData>;

export type Project = {
  slug: string;
  thumbnailUrl: string;
  title: string;
  description: string;
};

export const schema_faviconDataUrlResponse = z.object({
  dataURL: z.string().nonempty(),
});
export type FaviconDataUrlResponse = z.infer<typeof schema_faviconDataUrlResponse>;
