'use client';

import type React from 'react';

import type { Heading } from '@pkerschbaum-homepage/mdx/schema';

import { TocAnchor, TocHeading, TocNav } from '#pkg/components/article-components/index.js';

export type TableOfContentsProps = {
  headings: Heading[];
};

export const TableOfContents: React.FC<TableOfContentsProps> = ({ headings }) => {
  return (
    <TocNav>
      <TocHeading>Table of Contents</TocHeading>
      {headings.map((heading) => (
        <TocAnchor key={heading.id} href={`#${heading.id}`}>
          {heading.text}
        </TocAnchor>
      ))}
    </TocNav>
  );
};
