import { styled } from '@pigment-css/react';

import { TOC_QUERY } from '#pkg/constants-browser.js';
import { CodeBlockContainer } from '#pkg/mdx-components.jsx';

export const ArticleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: calc(4 * var(--spacing-base));
  align-self: center;

  width: 100%;
`;

export const TocAndArticle = styled.div`
  /* stylelint-disable-next-line media-query-no-invalid -- works */
  @media ${TOC_QUERY} {
    grid-template-areas: 'article toc';
    grid-template-columns: 1fr 250px;
    column-gap: calc(6 * var(--spacing-base));
  }
  display: grid;
  grid-template-areas: 'article';
  grid-template-rows: 1fr;
  grid-template-columns: 1fr;

  margin-block-start: 85px;
`;

export const TocAside = styled.aside`
  /* stylelint-disable-next-line media-query-no-invalid -- works */
  @media ${TOC_QUERY} {
    display: block;
  }
  position: sticky;
  /* some "top" spacing because of the fixed positioned header */
  top: 85px;

  display: none;
  grid-area: toc;
  height: max-content;

  /* some margin for visual alignment */
  margin-block-start: 5px;
`;

export const Article = styled.article`
  grid-area: article;
  min-width: 0;
`;

export const FrontMatter = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-base);
  align-items: center;

  text-align: center;
`;

export const ArticleHeading = styled.h1`
  margin-block-start: 0;
`;

export const Timestamps = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Time = styled.time`
  color: var(--color-fg-less-emphasized);
  text-transform: uppercase;
`;

export const ArticleContent = styled.div`
  & p {
    margin-block: 1em;
  }
  & ul,
  & ol {
    --ul-padding-inline-start: 20px;

    padding-inline-start: var(--ul-padding-inline-start);
    margin-block: 0.5em;
  }
  & li {
    margin-block: 0.25em;
  }
  & ul > li {
    list-style-type: initial;
  }
  & li:first-of-type {
    margin-block-start: 0;
  }

  /* 
    Code blocks should span entire width.
    We have to undo the app padding and margin-inline-start of ul/ol list elements (if a code block is inside such an element).
   */
  &
    > ${
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
      CodeBlockContainer as any
    } {
    /* add some margin-block-start so that there is some space between the copy button and any text before the code block. */
    margin-block-start: calc(3 * var(--spacing-base));
    margin-inline-start: calc(-1 * var(--app-padding-inline));
    margin-inline-end: calc(-1 * var(--app-padding-inline));
  }
  &
    ul
    > li
    > ${
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
      CodeBlockContainer as any
    },
    &
    ol
    > li
    > ${
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
      CodeBlockContainer as any
    } {
    width: calc(100% + 2 * var(--app-padding-inline) + var(--ul-padding-inline-start));
    margin-inline-start: calc(-1 * (var(--app-padding-inline) + var(--ul-padding-inline-start)));
  }
  &
    ul
    ul
    > li
    > ${
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
      CodeBlockContainer as any
    },
    &
    ol
    ol
    > li
    > ${
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
      CodeBlockContainer as any
    },
    &
    ul
    ol
    > li
    > ${
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
      CodeBlockContainer as any
    },
    &
    ol
    ul
    > li
    > ${
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
      CodeBlockContainer as any
    } {
    width: calc(100% + 2 * var(--app-padding-inline) + 2 * var(--ul-padding-inline-start));
    margin-inline-start: calc(
      -1 * (var(--app-padding-inline) + 2 * var(--ul-padding-inline-start))
    );
  }

  & > *:last-of-type {
    margin-block-end: 0;
  }
`;
