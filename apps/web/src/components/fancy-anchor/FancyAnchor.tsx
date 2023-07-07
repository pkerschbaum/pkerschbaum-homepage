import { styled } from '@linaria/react';
import { urlUtils } from '@pkerschbaum/commons-ecma/util/url';
import type React from 'react';

import { Classes } from '#pkg/constants-browser.js';
import { Anchor, AnchorProps } from '#pkg/elements/index.js';

const MAX_TEXT_LENGTH_TO_BREAK_ICON_WITH_TEXT = 15;

export type FancyAnchorProps = AnchorProps & {};

/**
 * The `FancyAnchor` allows to put an icon right at the beginning of the anchor.
 *
 * It applies some logic to get a nice line wrapping behaviour.
 * First it does a rudimentary scan for a line wrapping opportunity.
 * Then:
 * - If there is no wrap opportunity and the text is rather short, it will be put with the icon in
 *   one "group" (with `display: inline-block`). The result is that the anchor content does not line
 *   wrap; the whole anchor, together with the icon, will be put into the next line if necessary.
 * - If there is a wrap opportunity and the text part until that wrap opportunity is rather short,
 *   that text part will be put into one "group" with the icon (so that they wrap together into the
 *   next line if necessary). The rest of the text will be put into a normal span.
 * - Otherwise - if there is long text without a wrap opportunity, or the first text part would be
 *   rather long - everything will just be put in a span with `word-break: break-all`, meaning the
 *   anchor's content will wrap at every character.
 *
 * "rather short" and "rather long" was just determined by some manual testing :)
 */
export function FancyAnchor({
  href,
  children,
  className,
  ...delegated
}: FancyAnchorProps): React.ReactElement {
  let childrenToRender;

  if (typeof children !== 'string') {
    childrenToRender = <IconGroupedSpan>{children}</IconGroupedSpan>;
  } else {
    let textToDisplay = children;
    if (textToDisplay === 'AUTOGENERATE') {
      const url = new URL(href);
      textToDisplay = urlUtils.createReadableTextFromUrl(url);
    }

    let wrapOpportunity:
      | undefined
      | {
          textToWrapChar: string;
          wrapChar: string;
          textFromWrapChar: string;
        };
    for (let i = 0; i < textToDisplay.length; i++) {
      const char = textToDisplay.charAt(i);
      if (char === ' ' || char === '-') {
        wrapOpportunity = {
          textToWrapChar: textToDisplay.slice(0, i),
          wrapChar: char,
          textFromWrapChar: textToDisplay.slice(i + 1, textToDisplay.length),
        };
        break;
      }
    }

    if (!wrapOpportunity) {
      childrenToRender =
        textToDisplay.length <= MAX_TEXT_LENGTH_TO_BREAK_ICON_WITH_TEXT ? (
          <>
            <IconGroupedSpan>{textToDisplay}</IconGroupedSpan>
          </>
        ) : (
          <>
            <IconBreakAllSpan>{textToDisplay}</IconBreakAllSpan>
          </>
        );
    } else {
      childrenToRender =
        wrapOpportunity.textToWrapChar.length <= MAX_TEXT_LENGTH_TO_BREAK_ICON_WITH_TEXT ? (
          <>
            <IconGroupedSpan>{wrapOpportunity.textToWrapChar}</IconGroupedSpan>
            {wrapOpportunity.wrapChar}
            {wrapOpportunity.textFromWrapChar.length > 0 && (
              <span>{wrapOpportunity.textFromWrapChar}</span>
            )}
          </>
        ) : (
          <>
            <IconBreakAllSpan>{textToDisplay}</IconBreakAllSpan>
          </>
        );
    }
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

export const StyledAnchor = styled(Anchor)``;

const IconSpanInner: React.FC<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>
> = ({ children, className, ...delegated }) => {
  return (
    <span className={`${className ?? ''} ${Classes.FANCY_ANCHOR_ICON}`} {...delegated}>
      {children}
    </span>
  );
};

const IconSpan = styled(IconSpanInner)`
  &::before {
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

const IconGroupedSpan = styled(IconSpan)`
  display: inline-block;
  text-decoration: underline;
`;

const IconBreakAllSpan = styled(IconSpan)`
  word-break: break-all;
`;
