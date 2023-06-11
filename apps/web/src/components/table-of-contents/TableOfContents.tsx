'use client';

import React from 'react';
import { styled } from 'styled-components';
import invariant from 'tiny-invariant';

import type { Heading } from '@pkerschbaum-homepage/mdx/schema';

import { DataAttribute, TOC_QUERY } from '#pkg/constants';
import { Anchor } from '#pkg/elements';
import { useMediaMatch } from '#pkg/utils/react.utils';
import { uiUtils } from '#pkg/utils/ui.utils';

export type TableOfContentsProps = {
  headings: Heading[];
};

export const TableOfContents: React.FC<TableOfContentsProps> = ({ headings }) => {
  /*
   * Set up state and effect for tracking the section of the article the user has currently scrolled to.
   * This is used to highlight the anchor of the table of contents which links to the heading of that section.
   */
  const matches = useMediaMatch(TOC_QUERY);
  const [activeHeadingId, setActiveHeadingId] = React.useState<string | undefined>();
  React.useEffect(
    function observeSections() {
      if (matches === 'SSR' || !matches) {
        return;
      }

      const $elementsToObserve: HTMLElement[] = [];
      for (const heading of headings) {
        const $elements = [
          ...document.querySelectorAll(`[${DataAttribute.SECTION_HEADING_ID}="${heading.id}"]`),
        ];
        for (const $element of $elements) {
          if ($element instanceof HTMLElement) {
            $elementsToObserve.push($element);
          }
        }
      }

      const observer = new IntersectionObserver(() => {
        const $lastVisibleEntry = [...$elementsToObserve]
          .reverse()
          .find(($element) => uiUtils.isPartlyInViewport($element));
        if ($lastVisibleEntry) {
          const sectionHeadingId = $lastVisibleEntry.getAttribute(DataAttribute.SECTION_HEADING_ID);
          invariant(sectionHeadingId);
          setActiveHeadingId(sectionHeadingId);
        } else {
          setActiveHeadingId(undefined);
        }
      });

      const cleanupFunctions: Array<() => void> = [];
      for (const $element of $elementsToObserve) {
        observer.observe($element);
        cleanupFunctions.push(() => observer.unobserve($element));
      }

      return function cleanup() {
        for (const cleanupFunction of cleanupFunctions) {
          cleanupFunction();
        }
      };
    },
    [headings, matches],
  );

  return (
    <TocNav>
      <TocHeading>Table of Contents</TocHeading>
      {headings.map((heading) => (
        <TocAnchor
          key={heading.id}
          href={`#${heading.id}`}
          style={{
            color: activeHeadingId === heading.id ? 'var(--color-fg-interactive)' : undefined,
          }}
        >
          {heading.text}
        </TocAnchor>
      ))}
    </TocNav>
  );
};

const TocNav = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: calc(2 * var(--spacing-base));
`;

const TocHeading = styled.h2`
  margin-block-start: 0;
  font-size: var(--font-size-xl);
  text-transform: uppercase;
`;

const TocAnchor = styled(Anchor)`
  text-decoration: none;
  font-size: var(--font-size-sm);
`;
