import { z } from 'zod';

export type MDXFile = {
  segment: string;
  frontmatter: FrontmatterData;
};

export type MDXParseResult = {
  code: string;
  frontmatter: FrontmatterData;
  collectedHrefs: string[];
  collectedHeadings: Heading[];
};

export const schema_frontmatterData = z.object({
  title: z.string(),
  published: z.boolean(),
  publishedAtISO: z.string(),
  lastUpdatedAtISO: z.string().optional(),
  description: z.string(),
  tags: z.array(z.string()),
});
export type FrontmatterData = z.infer<typeof schema_frontmatterData>;

export type Heading = {
  text: string;
  id: string;
  level: HeadingLevel;
};
export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
