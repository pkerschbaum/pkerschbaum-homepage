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

export const schema_faviconDataUrls = z.object({
  lightIconDataURL: z.string().nonempty().optional(),
  darkIconDataURL: z.string().nonempty().optional(),
});
export type FaviconDataUrls = z.infer<typeof schema_faviconDataUrls>;
export type HrefsToFaviconDataUrlsMap = { [href in string]?: FaviconDataUrls };
