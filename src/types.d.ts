export type MDXFile = {
  frontmatter: FrontmatterData;
  slug: string;
};

export type MDXParseResult = {
  frontmatter: FrontmatterData;
  code: string;
};

export type FrontmatterData = {
  title: string;
  description: string;
  date: string;
};
