import type React from 'react';
import { styled } from 'styled-components';

import { Classes } from '#pkg/constants.js';
import { Anchor, AnchorProps } from '#pkg/elements/index.js';
import { urlUtils } from '#pkg/utils/url.utils.js';

export type FancyAnchorProps = AnchorProps & {};

export function FancyAnchor({
  href,
  children,
  className,
  ...delegated
}: FancyAnchorProps): React.ReactElement {
  let childrenToRender;

  if (typeof children === 'string') {
    let textToDisplay = children;
    if (textToDisplay === 'AUTOGENERATE') {
      const url = new URL(href);
      textToDisplay = urlUtils.createReadableTextFromUrl(url);
    }

    const [firstTextPart, ...otherTextParts] = textToDisplay.split(' ');

    childrenToRender = (
      <>
        <span>{firstTextPart}</span>
        {otherTextParts.length > 0 && (
          <>
            {' '}
            <span>{otherTextParts.join(' ')}</span>
          </>
        )}
      </>
    );
  } else {
    childrenToRender = <span>{children}</span>;
  }

  return (
    <StyledAnchor
      href={href}
      className={`${className ?? ''} ${Classes.STYLED_ANCHOR}`}
      {...delegated}
    >
      {childrenToRender}
    </StyledAnchor>
  );
}

export const StyledAnchor = styled(Anchor)`
  && > span:first-of-type {
    display: inline-block;
    text-decoration: underline;
  }
  && > span:first-of-type::before {
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
