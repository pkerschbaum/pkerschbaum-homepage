import { check } from '@pkerschbaum/ts-utils';
import { getMDXComponent } from 'mdx-bundler/client';
import * as React from 'react';
import styled, { StyledComponentProps } from 'styled-components';

import { FancyAnchor, FancyAnchorProps } from '#/components/fancy-anchor';
import { Anchor } from '#/elements';

export type MDXViewerProps = {
  codeOfMdxParseResult: string;
};

export const MDXViewer: React.FC<MDXViewerProps> = ({ codeOfMdxParseResult }) => {
  const Component = React.useMemo(
    () => getMDXComponent(codeOfMdxParseResult),
    [codeOfMdxParseResult],
  );

  return (
    <Component
      components={{
        a: (props) => {
          if (check.isNullishOrEmptyString(props.href)) {
            throw new Error(`the <a> element must have a href, but has not`);
          }

          return <Anchor target="_blank" {...props} href={props.href} />;
        },
        h2: ({ ref: _ignored, ...delegated }) => {
          return <HeadingWithAnchor as="h2" headingProps={delegated} />;
        },
        h3: ({ ref: _ignored, ...delegated }) => {
          return <HeadingWithAnchor as="h3" headingProps={delegated} />;
        },
        h4: ({ ref: _ignored, ...delegated }) => {
          return <HeadingWithAnchor as="h4" headingProps={delegated} />;
        },
        h5: ({ ref: _ignored, ...delegated }) => {
          return <HeadingWithAnchor as="h5" headingProps={delegated} />;
        },
        h6: ({ ref: _ignored, ...delegated }) => {
          return <HeadingWithAnchor as="h6" headingProps={delegated} />;
        },
        FancyAnchor: (props: FancyAnchorProps) => {
          return <FancyAnchor target="_blank" {...props} />;
        },
      }}
    />
  );
};

// based on https://tomekdev.com/posts/anchors-for-headings-in-mdx
type HeadingWithAnchorProps = {
  as: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  headingProps: StyledComponentProps<'h1', any, {}, never>;
};

const HeadingWithAnchor: React.FC<HeadingWithAnchorProps> = ({ as, headingProps }) => {
  const { children, ...delegatedProps } = headingProps;
  if (typeof children !== 'string' || check.isEmptyString(children)) {
    throw new Error(`should not happen`);
  }

  const headingText = children;
  const idForHeading = getIdForHeading(headingText);
  const hrefForHeading = `#${idForHeading}`;

  return (
    <Heading id={idForHeading} as={as} {...delegatedProps}>
      <HeadingAnchor href={hrefForHeading}>
        {headingText} <HeadingAnchorIcon>#</HeadingAnchorIcon>
      </HeadingAnchor>
    </Heading>
  );
};

const Heading = styled.h1`
  /*
    The <header> is absolutely positioned. Without any scroll-margin-top, if a user goes to our website
    using a fragment pointing to a heading, the user agent would set the scroll position just enough
    to reveal the heading - but the absolutely-positioned <header> would be over that heading, hiding it.
    
    That's why we set some scroll-margin-top to so that the user agent scrolls enough to reveal the heading.
   */
  scroll-margin-top: 100px;
`;

const HeadingAnchorIcon = styled.span``;

const HeadingAnchor = styled(Anchor)`
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }

  &:not(:hover) ${HeadingAnchorIcon} {
    opacity: 0;
  }

  &:hover ${HeadingAnchorIcon} {
    opacity: initial;
  }
`;

function getIdForHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z\d ]/g, '')
    .replace(/ /g, '-');
}
