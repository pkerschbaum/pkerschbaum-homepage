import * as React from 'react';
import styled, { css } from 'styled-components';

import { Anchor, AnchorProps } from '~/elements';
import { useFaviconDataURL, UseFaviconResult } from '~/global-cache/favicon';
import { urlUtils } from '~/utils/url.utils';

export function FancyAnchor({ href, children, ...delegated }: AnchorProps): React.ReactElement {
  const { data: dataURL, status } = useFaviconDataURL(href);

  let textToDisplay = children;
  if (textToDisplay === 'AUTOGENERATE') {
    const url = new URL(href);
    textToDisplay = urlUtils.createReadableTextFromUrl(url);
  }

  return (
    <StyledAnchor styleProps={{ favicon: { status, dataURL } }} href={href} {...delegated}>
      {textToDisplay}
    </StyledAnchor>
  );
}

type StyledAnchorProps = {
  favicon: {
    status: UseFaviconResult['status'];
    dataURL?: string;
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
    background: url(${(props) => props.styleProps.favicon.dataURL}) no-repeat center center;
    background-size: 1em 1em;
  }
`;
