import * as React from 'react';
import styled, { css } from 'styled-components';

import { ColorTheme, DataAttribute } from '~/constants';
import { Anchor, AnchorProps } from '~/elements';
import { useFaviconDataURL, UseFaviconResult } from '~/global-cache/favicon';
import type { FaviconDataUrls } from '~/schema';
import { urlUtils } from '~/utils/url.utils';

export function FancyAnchor({ href, children, ...delegated }: AnchorProps): React.ReactElement {
  const { data, status } = useFaviconDataURL(href);

  let textToDisplay = children;
  if (textToDisplay === 'AUTOGENERATE') {
    const url = new URL(href);
    textToDisplay = urlUtils.createReadableTextFromUrl(url);
  }

  return (
    <StyledAnchor styleProps={{ favicon: { status, data } }} href={href} {...delegated}>
      {textToDisplay}
    </StyledAnchor>
  );
}

type StyledAnchorProps = {
  favicon: {
    status: UseFaviconResult['status'];
    data?: FaviconDataUrls;
  };
};

const StyledAnchor = styled(Anchor)<{ styleProps: StyledAnchorProps }>`
  word-break: break-all;

  &::before {
    content: '';
    vertical-align: sub;
    margin-right: calc(0.5 * var(--spacing-base));
    height: calc(1.2 * 1em);
    width: 1em;

    ${(props) =>
      props.styleProps.favicon.status !== 'error' &&
      css`
        display: inline-block;
      `};
    background-image: url(${(props) => props.styleProps.favicon.data?.lightIconDataURL});
    background-position: center;
    background-repeat: no-repeat;
    background-size: 1em 1em;
  }

  *:root[${DataAttribute.THEME}='${ColorTheme.DARK}'] &::before {
    background-image: url(${(props) => props.styleProps.favicon.data?.darkIconDataURL});
  }
`;
