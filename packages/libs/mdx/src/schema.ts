import { z } from 'zod';

export type MDXFile = {
  segment: string;
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
