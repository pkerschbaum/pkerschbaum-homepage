export type MDXFile = {
  slug: string;
  frontmatter: FrontmatterData;
};

export type MDXParseResult = {
  code: string;
  frontmatter: FrontmatterData;
};

export type FrontmatterData = {
  title: string;
  description: string;
  publishedAtISO: string;
  tags: string[];
};

export type Project = {
  slug: string;
  thumbnailUrl: StaticImageData;
  title: string;
  description: string;
};
