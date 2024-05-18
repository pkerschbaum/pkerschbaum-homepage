'use client';
import { styled } from '@linaria/react';
import { check } from '@pkerschbaum/commons-ecma/util/assert';
import type { MDXComponents } from 'mdx/types';
import React from 'react';
import { CheckCircle, Clipboard } from 'react-feather';
import invariant from 'tiny-invariant';

import { FancyAnchor, type FancyAnchorProps } from '#pkg/components/fancy-anchor/index.js';
import { Classes, ColorTheme, DataAttribute } from '#pkg/constants-browser.js';
import { Anchor, type AnchorProps, Button } from '#pkg/elements/index.js';
import { reactUtils } from '#pkg/utils/react.utils';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  let currentSectionHeadingId = {
    [DataAttribute.SECTION_HEADING_ID]: undefined as string | undefined,
  };

  return {
    p: (props) => {
      return <p {...props} {...currentSectionHeadingId} />;
    },
    ul: (props) => {
      return <ul {...props} {...currentSectionHeadingId} />;
    },
    ol: (props) => {
      return <ol {...props} {...currentSectionHeadingId} />;
    },
    a: (props) => {
      if (check.isNullishOrEmptyString(props.href)) {
        throw new Error(`the <a> element must have a href, but has not`);
      }

      return (
        <Anchor
          target="_blank"
          {...(props as AnchorProps)}
          href={props.href}
          {...currentSectionHeadingId}
        />
      );
    },
    h2: ({ ref: _ignored, id, ...delegated }) => {
      currentSectionHeadingId = { [DataAttribute.SECTION_HEADING_ID]: id };
      return <HeadingWithAnchor as="h2" headingProps={{ id, ...delegated }} />;
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
    pre: ({ ref: _ignored, ...delegated }) => {
      return <PreComponent {...delegated} {...currentSectionHeadingId} />;
    },
    ...components,
  };
}

// based on https://tomekdev.com/posts/anchors-for-headings-in-mdx
type HeadingWithAnchorProps = {
  as: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  headingProps: React.HTMLAttributes<HTMLHeadingElement>;
};

const HeadingWithAnchor: React.FC<HeadingWithAnchorProps> = ({ as, headingProps }) => {
  const { children, id, ...delegatedProps } = headingProps;
  invariant(id, `should have got an "id" from parsing the MDX`);

  const headingText = reactUtils.getNodeText(children);
  const hrefForHeading = `#${id}`;

  return (
    <Heading id={id} as={as} {...delegatedProps}>
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

export const PreComponent: React.FC<React.ComponentProps<'pre'>> = ({ children, ...delegated }) => {
  const codePreRef = React.useRef<HTMLPreElement>(null);
  const [codeWasCopied, setCodeWasCopied] = React.useState(false);

  async function copyCode() {
    invariant(codePreRef.current);
    invariant(codePreRef.current.textContent);
    await navigator.clipboard.writeText(codePreRef.current.textContent);
    setCodeWasCopied(true);
  }

  return (
    <CodeBlockContainer>
      <CopyCodeButton onClick={copyCode} className={Classes.JS_REQUIRED}>
        {codeWasCopied ? (
          <>
            <CheckCircle size="1em" />
            Copied!
          </>
        ) : (
          <>
            <Clipboard size="1em" />
            Copy
          </>
        )}
      </CopyCodeButton>
      <pre {...delegated} ref={codePreRef}>
        {children}
      </pre>
    </CodeBlockContainer>
  );
};

export const CodeBlockContainer = styled.div`
  position: relative;
  overflow: visible;
`;

const CopyCodeButton = styled(Button)`
  position: absolute;
  top: 0;
  right: 0;

  display: flex;
  gap: calc(1 * var(--spacing-base));
  align-items: center;
  padding-inline: calc(1.5 * var(--spacing-base));

  font-size: var(--font-size-sm);
  background: var(--prism-theme-github-bg);
  *:root[${DataAttribute.THEME}='${ColorTheme.DARK}'] & {
    background: var(--prism-theme-nord-bg);
  }
  border-radius: var(--prism-border-radius);
  transform: translateY(-60%);
`;
