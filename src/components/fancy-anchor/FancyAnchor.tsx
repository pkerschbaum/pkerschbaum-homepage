import * as React from 'react';
import styled, { css } from 'styled-components';

import { ColorTheme, DataAttribute } from '~/constants';
import { Anchor, AnchorProps } from '~/elements';
import type { FaviconDataUrls } from '~/schema';
import { urlUtils } from '~/utils/url.utils';

export type FancyAnchorProps = AnchorProps & {
  favicons?: FaviconDataUrls;
};

export function FancyAnchor({
  href,
  children,
  favicons,
  ...delegated
}: FancyAnchorProps): React.ReactElement {
  let textToDisplay = children;
  if (textToDisplay === 'AUTOGENERATE') {
    const url = new URL(href);
    textToDisplay = urlUtils.createReadableTextFromUrl(url);
  }

  return (
    <StyledAnchor styleProps={{ favicons }} href={href} {...delegated}>
      {textToDisplay}
    </StyledAnchor>
  );
}

type StyledAnchorProps = {
  favicons?: FaviconDataUrls;
};

const StyledAnchor = styled(Anchor)<{ styleProps: StyledAnchorProps }>`
  word-break: break-all;

  ${(props) =>
    props.styleProps.favicons !== undefined &&
    css`
      &::before {
        content: '';
        display: inline-block;
        vertical-align: sub;
        margin-right: calc(0.5 * var(--spacing-base));
        height: calc(1.2 * 1em);
        width: 1em;

        background-image: url(${props.styleProps.favicons.lightIconDataURL});
        background-position: center;
        background-repeat: no-repeat;
        background-size: 1em 1em;
      }

      *:root[${DataAttribute.THEME}='${ColorTheme.DARK}'] &::before {
        background-image: url(${props.styleProps.favicons.darkIconDataURL});
      }
    `};
`;
