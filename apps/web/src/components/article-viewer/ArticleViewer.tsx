import { styled } from 'styled-components';

import { CodeBlockContainer } from '#pkg/components/mdx-viewer/index.js';

export const ArticleViewerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: calc(4 * var(--spacing-base));
  align-self: center;

  width: 100%;
`;

export const ArticleViewer = styled.article`
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

export const Time = styled.time`
  color: var(--color-fg-less-emphasized);
  text-transform: uppercase;
`;

export const ArticleViewerContent = styled.div`
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
  & > ${CodeBlockContainer} {
    /* add some margin-block-start so that there is some space between the copy button and any text before the code block. */
    margin-block-start: calc(3 * var(--spacing-base));
    margin-inline-start: calc(-1 * var(--app-padding-inline));
    margin-inline-end: calc(-1 * var(--app-padding-inline));
  }
  &
    ul
    > li
    > ${/* sc-selector */ CodeBlockContainer},
    &
    ol
    > li
    > ${/* sc-selector */ CodeBlockContainer} {
    width: calc(100% + 2 * var(--app-padding-inline) + var(--ul-padding-inline-start));
    margin-inline-start: calc(-1 * (var(--app-padding-inline) + var(--ul-padding-inline-start)));
  }
  &
    ul
    ul
    > li
    > ${/* sc-selector */ CodeBlockContainer},
    &
    ol
    ol
    > li
    > ${/* sc-selector */ CodeBlockContainer},
    &
    ul
    ol
    > li
    > ${/* sc-selector */ CodeBlockContainer},
    &
    ol
    ul
    > li
    > ${/* sc-selector */ CodeBlockContainer} {
    width: calc(100% + 2 * var(--app-padding-inline) + 2 * var(--ul-padding-inline-start));
    margin-inline-start: calc(
      -1 * (var(--app-padding-inline) + 2 * var(--ul-padding-inline-start))
    );
  }
`;
