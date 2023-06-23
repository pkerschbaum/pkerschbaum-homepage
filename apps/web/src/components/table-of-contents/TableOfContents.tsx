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
  const [headingsAboveTheFold, setHeadingsAboveTheFold] = React.useState<{
    idOfLastHeadingAboveTheFold?: string | undefined;
    idOfFirstHeadingInViewport?: string | undefined;
  }>({});
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

      function startViewportObserver() {
        invariant(lastScrolledToHeading);

        const $lastScrolledToHeading = document.querySelector(`#${lastScrolledToHeading.id}`);
        invariant($lastScrolledToHeading instanceof HTMLElement);

        let firstObserverInvocationHasBeenIgnored = false;
        const observer = new IntersectionObserver(
          () => {
            if (!firstObserverInvocationHasBeenIgnored) {
              firstObserverInvocationHasBeenIgnored = true;
              return;
            }

            if (uiUtils.isEntirelyInViewport($lastScrolledToHeading)) {
              return;
            }

            setLastScrolledToHeading({ ...lastScrolledToHeading, wentOutOfViewport: true });
          },
          { threshold: 1 },
        );

        observer.observe($lastScrolledToHeading);

        uiUtils.observeRemovalOfElementOnce($lastScrolledToHeading, () => {
          unobserveViewportObserver();
          unobserveViewportObserver = startViewportObserver();
        });

        return function unobserve() {
          observer.unobserve($lastScrolledToHeading);
        };
      }

      return function cleanup() {
        unobserveViewportObserver();
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

      const observer = new IntersectionObserver(
        () => {
          const $headingsAboveTheFold = $headings.filter(($heading) =>
            uiUtils.isEntirelyAboveTheFold($heading),
          );
          const $firstHeadingInViewport = $headingsAboveTheFold.find(($heading) =>
            uiUtils.isEntirelyInViewport($heading),
          );
          const $lastHeadingAboveTheFold = $headingsAboveTheFold.at(-1);

          if ($lastHeadingAboveTheFold || $firstHeadingInViewport) {
            setHeadingsAboveTheFold({
              idOfLastHeadingAboveTheFold: $lastHeadingAboveTheFold?.id,
              idOfFirstHeadingInViewport: $firstHeadingInViewport?.id,
            });
          } else {
            setHeadingsAboveTheFold({});
          }
        },
        { threshold: 1 },
      );

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

  const highlightedHeadingId: string | undefined =
    lastScrolledToHeading && !lastScrolledToHeading.wentOutOfViewport
      ? lastScrolledToHeading.id
      : headingsAboveTheFold.idOfFirstHeadingInViewport ??
        headingsAboveTheFold.idOfLastHeadingAboveTheFold;

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
