import * as React from 'react';
import styled from 'styled-components';

import { Anchor, AnchorProps } from '#/elements';
import { urlUtils } from '#/utils/url.utils';

export type FancyAnchorProps = AnchorProps & {};

export function FancyAnchor({
  href,
  children,
  ...delegated
}: FancyAnchorProps): React.ReactElement {
  let textToDisplay = children;
  if (textToDisplay === 'AUTOGENERATE') {
    const url = new URL(href);
    textToDisplay = urlUtils.createReadableTextFromUrl(url);
  }

  return (
    <StyledAnchor href={href} {...delegated}>
      {textToDisplay}
    </StyledAnchor>
  );
}

export const StyledAnchor = styled(Anchor)`
  word-break: break-all;

  &&::before {
    width: 1em;
    height: calc(1.2 * 1em);
    margin-inline-end: calc(0.5 * var(--spacing-base));
    vertical-align: sub;
    content: '';

    background-repeat: no-repeat;
    background-position: center;
    background-size: 1em 1em;
  }
`;
