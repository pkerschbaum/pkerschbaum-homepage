import styled, { css } from 'styled-components';
import invariant from 'tiny-invariant';

import { StyledAnchor } from '#/components/fancy-anchor';
import { ColorTheme, DataAttribute } from '#/constants';

type IconURLToAssociatedWebsitesMap = {
  [iconURL in string]?: {
    iconDataURL: string;
    associatedWebsites: string[];
  };
};
export type FaviconDataURLsForWebsiteURLs = {
  lightIcons: IconURLToAssociatedWebsitesMap;
  darkIcons: IconURLToAssociatedWebsitesMap;
};

export const ArticleViewerContainer = styled.article`
  --max-width: var(--box-width-md);

  display: flex;
  flex-direction: column;
  gap: calc(4 * var(--spacing-base));
  align-self: center;

  width: 100%;
  max-width: var(--max-width);
`;

export const FrontMatter = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-base);
  align-items: center;

  text-align: center;
`;

export const Time = styled.time`
  color: var(--color-fg-less-emphasized);
  text-transform: uppercase;
`;

type StyleProps = {
  faviconDataURLsForWebsiteURLs: FaviconDataURLsForWebsiteURLs;
};

export const ArticleViewerContent = styled.div<{ styleProps: StyleProps }>`
  & p {
    margin-block: 1em;
  }
  & ul {
    --ul-padding-inline-start: 20px;

    padding-inline-start: var(--ul-padding-inline-start);
    margin-block: 0.5em;
  }
  & li {
    margin-block: 0.25em;
  }
  & ul li {
    list-style-type: initial;
  }
  & li:first-of-type {
    margin-block-start: 0;
  }

  /* 
    Add icons to FancyAnchors.
    We construct CSS such that we transmit every data URL only once and apply it to the associated
    FancyAnchors via attribute selectors.

    @example
    & FancyAnchor[href="https://playwright.dev/docs/test-fixtures"]::before,
    & FancyAnchor[href="https://playwright.dev/docs/test-advanced#projects"]::before,
    & FancyAnchor[href="https://playwright.dev/docs/test-components#planned-work"]::before {
      display: inline-block;
      background-image: url(DATA_URL_OF_PLAYWRIGHT_FAVICON);
    }
   */
  & ${/* sc-selector */ StyledAnchor}::before {
    display: none;
  }

  /* stylelint-disable */
  ${({ styleProps }) => {
    const lightIconsCss = Object.values(styleProps.faviconDataURLsForWebsiteURLs.lightIcons).map(
      (icon) => {
        invariant(icon);
        return css`
          ${icon.associatedWebsites
            .map((url) => `& ${StyledAnchor}[href="${url}"]::before`)
            .join(', ')} {
            display: inline-block;
            background-image: url(${icon.iconDataURL});
          }
        `;
      },
    );

    const darkIconsCss = Object.values(styleProps.faviconDataURLsForWebsiteURLs.darkIcons).map(
      (icon) => {
        invariant(icon);
        return css`
          ${icon.associatedWebsites
            .map(
              (url) =>
                `*:root[${DataAttribute.THEME}='${ColorTheme.DARK}'] & ${StyledAnchor}[href="${url}"]::before`,
            )
            .join(', ')} {
            display: inline-block;
            background-image: url(${icon.iconDataURL});
          }
        `;
      },
    );

    return [...lightIconsCss, ...darkIconsCss];
  }}
  /* stylelint-enable */

  /* 
    Code blocks should span entire width.
    We have to undo the app padding and margin-inline-start of ul/ol list elements (if a code block is inside such an element).
   */
  & > pre {
    margin-inline-start: calc(-1 * var(--app-padding-inline));
    margin-inline-end: calc(-1 * var(--app-padding-inline));
  }
  & ul > li > pre,
  & ol > li > pre {
    width: calc(100% + 2 * var(--app-padding-inline) + var(--ul-padding-inline-start));
    margin-inline-start: calc(-1 * (var(--app-padding-inline) + var(--ul-padding-inline-start)));
  }
  & ul ul > li > pre,
  & ol ol > li > pre {
    width: calc(100% + 2 * var(--app-padding-inline) + 2 * var(--ul-padding-inline-start));
    margin-inline-start: calc(
      -1 * (var(--app-padding-inline) + 2 * var(--ul-padding-inline-start))
    );
  }
`;
