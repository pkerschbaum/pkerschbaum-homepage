import * as React from 'react';
import styled, { css } from 'styled-components';

import { ColorTheme, DataAttribute } from '~/constants';
import { Anchor, AnchorProps } from '~/elements';
import type { HrefToFaviconsMap } from '~/schema';
import { urlUtils } from '~/utils/url.utils';

export type FancyAnchorProps = AnchorProps & {
  hrefToFaviconsMap: HrefToFaviconsMap;
};

export function FancyAnchor({
  href,
  children,
  hrefToFaviconsMap,
  ...delegated
}: FancyAnchorProps): React.ReactElement {
  let textToDisplay = children;
  if (textToDisplay === 'AUTOGENERATE') {
    const url = new URL(href);
    textToDisplay = urlUtils.createReadableTextFromUrl(url);
  }

  const faviconHrefs = hrefToFaviconsMap.hrefToFaviconHrefsMap[href];
  let lightIconDataURL;
  let darkIconDataURL;
  if (faviconHrefs?.lightIconHref) {
    lightIconDataURL = hrefToFaviconsMap.iconHrefToDataURLsMap[faviconHrefs.lightIconHref];
  }
  if (faviconHrefs?.darkIconHref) {
    darkIconDataURL = hrefToFaviconsMap.iconHrefToDataURLsMap[faviconHrefs.darkIconHref];
  }

  return (
    <StyledAnchor
      styleProps={{ favicons: { lightIconDataURL, darkIconDataURL } }}
      href={href}
      {...delegated}
    >
      {textToDisplay}
    </StyledAnchor>
  );
}

type StyledAnchorProps = {
  favicons: { lightIconDataURL?: string; darkIconDataURL?: string };
};

const StyledAnchor = styled(Anchor)<{ styleProps: StyledAnchorProps }>`
  word-break: break-all;

  &&::before {
    content: '';
    display: inline-block;
    vertical-align: sub;
    margin-inline-end: calc(0.5 * var(--spacing-base));
    height: calc(1.2 * 1em);
    width: 1em;

    background-image: url(${(props) => props.styleProps.favicons.lightIconDataURL});
    background-position: center;
    background-repeat: no-repeat;
    background-size: 1em 1em;
  }

  *:root[${DataAttribute.THEME}='${ColorTheme.DARK}'] &&::before {
    background-image: url(${(props) => props.styleProps.favicons.darkIconDataURL});
  }

  ${(props) =>
    props.styleProps.favicons.lightIconDataURL === undefined &&
    props.styleProps.favicons.darkIconDataURL === undefined &&
    css`
      &&::before {
        display: none;
      }
    `};
`;
