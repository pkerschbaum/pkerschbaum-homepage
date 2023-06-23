'use client';

import React from 'react';
import { styled } from 'styled-components';
import invariant from 'tiny-invariant';

import type { Heading } from '@pkerschbaum-homepage/mdx/schema';

import { TOC_QUERY } from '#pkg/constants';
import { Anchor } from '#pkg/elements';
import { useMediaMatch } from '#pkg/utils/react.utils';
import { uiUtils } from '#pkg/utils/ui.utils';

export type TableOfContentsProps = {
  headings: Heading[];
};

export const TableOfContents: React.FC<TableOfContentsProps> = ({ headings }) => {
  const matches = useMediaMatch(TOC_QUERY);

  /*
   * Set up state and effect for tracking the section of the article the user has currently scrolled to.
   * This is used to highlight the anchor of the table of contents which links to the heading of that section.
   */
  const [lastHeadingAboveTheFold, setLastHeadingAboveTheFold] = React.useState<
    string | undefined
  >();
  const [lastScrolledToHeading, setLastScrolledToHeading] = React.useState<
    undefined | { id: string; wentOutOfViewport: boolean }
  >();

  React.useEffect(
    function observeLastScrolledToHeadingGoingOutOfViewport() {
      if (matches === 'SSR' || !matches) {
        return;
      }

      if (!lastScrolledToHeading || lastScrolledToHeading.wentOutOfViewport) {
        return;
      }

      let unobserveViewportObserver = startViewportObserver();
      let unobserveRemovalObserver = startRemovalObserver();

      function startViewportObserver() {
        invariant(lastScrolledToHeading);

        const $lastScrolledToHeading = document.querySelector(`#${lastScrolledToHeading.id}`);
        invariant($lastScrolledToHeading instanceof HTMLElement);

        let firstObserverInvocationHasBeenIgnored = false;
        const observer = new IntersectionObserver(() => {
          if (!firstObserverInvocationHasBeenIgnored) {
            firstObserverInvocationHasBeenIgnored = true;
            return;
          }

          if (uiUtils.isEntirelyInViewport($lastScrolledToHeading)) {
            return;
          }

          setLastScrolledToHeading({ ...lastScrolledToHeading, wentOutOfViewport: true });
        });

        observer.observe($lastScrolledToHeading);

        return function unobserve() {
          observer.unobserve($lastScrolledToHeading);
        };
      }

      function startRemovalObserver() {
        invariant(lastScrolledToHeading);

        const $lastScrolledToHeading = document.querySelector(`#${lastScrolledToHeading.id}`);
        invariant($lastScrolledToHeading instanceof HTMLElement);
        invariant($lastScrolledToHeading.parentElement);

        const removalObserver = new MutationObserver((mutationList) => {
          const removedNodes = mutationList.flatMap((mutation) => [...mutation.removedNodes]);
          if (removedNodes.includes($lastScrolledToHeading)) {
            unobserveViewportObserver();
            unobserveRemovalObserver();
            unobserveViewportObserver = startViewportObserver();
            unobserveRemovalObserver = startRemovalObserver();
          }
        });

        removalObserver.observe($lastScrolledToHeading.parentElement, { childList: true });
        return function unobserve() {
          removalObserver.disconnect();
        };
      }

      return function cleanup() {
        unobserveViewportObserver();
        unobserveRemovalObserver();
      };
    },
    [lastScrolledToHeading, matches],
  );

  React.useEffect(
    function observeHeadingsAndDetectLastHeadingAboveTheFold() {
      if (matches === 'SSR' || !matches) {
        return;
      }

      const $headings: HTMLElement[] = [];
      for (const heading of headings) {
        const $element = document.querySelector(`#${heading.id}`);
        invariant($element instanceof HTMLElement);
        $headings.push($element);
      }

      const observer = new IntersectionObserver(() => {
        const $headingsAboveTheFold = $headings.filter(($heading) => {
          const boundingClientRect = $heading.getBoundingClientRect();
          return boundingClientRect.top - window.innerHeight <= 0;
        });
        const $lastHeadingAboveTheFold = $headingsAboveTheFold.at(-1);
        if ($lastHeadingAboveTheFold) {
          setLastHeadingAboveTheFold($lastHeadingAboveTheFold.id);
        }
      });

      for (const $element of $headings) {
        observer.observe($element);
      }

      return function cleanup() {
        for (const $element of $headings) {
          observer.unobserve($element);
        }
      };
    },
    [headings, matches],
  );

  const highlightedHeadingId =
    lastScrolledToHeading && !lastScrolledToHeading.wentOutOfViewport
      ? lastScrolledToHeading.id
      : lastHeadingAboveTheFold;

  return (
    <TocNav>
      <TocHeading>Table of Contents</TocHeading>
      {headings.map((heading) => {
        const highlighted = highlightedHeadingId === heading.id;
        return (
          <TocAnchor
            key={heading.id}
            href={`#${heading.id}`}
            style={{
              color: highlighted ? 'var(--color-fg-interactive)' : undefined,
            }}
            onClick={() => {
              setLastScrolledToHeading({
                id: heading.id,
                wentOutOfViewport: false,
              });
            }}
          >
            {heading.text}
          </TocAnchor>
        );
      })}
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
