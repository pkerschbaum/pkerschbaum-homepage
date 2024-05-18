import { styled } from '@linaria/react';
import React from 'react';

import type { Heading } from '@pkerschbaum-homepage/mdx/schema';

import { TableOfContentsAnchors } from '#pkg/components/table-of-contents/TableOfContentsAnchors.jsx';

export type TableOfContentsProps = {
  headings: Heading[];
};

export const TableOfContents: React.FC<TableOfContentsProps> = ({ headings }) => {
  return (
    <TocNav>
      <TocHeading>Table of Contents</TocHeading>
      <TableOfContentsAnchors headings={headings} />
    </TocNav>
  );
};

const TocNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: calc(2 * var(--spacing-base));
  align-items: start;
`;

const TocHeading = styled.h2`
  margin-block-start: 0;
  font-size: var(--font-size-xl);
  text-transform: uppercase;
`;
