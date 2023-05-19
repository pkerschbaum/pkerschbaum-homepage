import { check, numbers } from '@pkerschbaum/ts-utils';
import { MDXRemote } from 'next-mdx-remote';
import * as React from 'react';
import { CheckCircle, Clipboard } from 'react-feather';
import * as ReactIs from 'react-is';
import { styled } from 'styled-components';
import invariant from 'tiny-invariant';

import { FancyAnchor, FancyAnchorProps } from '#pkg/components/fancy-anchor/index.js';
import { Classes, ColorTheme, DataAttribute } from '#pkg/constants.js';
import { Anchor, Button } from '#pkg/elements/index.js';

export type MDXViewerProps = {
  codeOfMdxParseResult: string;
};

export const MDXViewer: React.FC<MDXViewerProps> = ({ codeOfMdxParseResult }) => {
  return (
    <MDXRemote
      compiledSource={codeOfMdxParseResult}
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
        pre: PreComponent,
      }}
    />
  );
};

// based on https://tomekdev.com/posts/anchors-for-headings-in-mdx
type HeadingWithAnchorProps = {
  as: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  headingProps: React.HTMLAttributes<HTMLHeadingElement>;
};

const HeadingWithAnchor: React.FC<HeadingWithAnchorProps> = ({ as, headingProps }) => {
  const { children, ...delegatedProps } = headingProps;

  const headingText = getNodeText(children);
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

const PreComponent: React.FC<React.ComponentProps<'pre'>> = ({
  children,
  ref: _ignored,
  ...delegated
}) => {
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

function getIdForHeading(text: string): string {
  return text
    .toLowerCase()
    .replaceAll(/[^\d a-z]/g, '')
    .replaceAll(' ', '-');
}

/**
 * based on https://stackoverflow.com/a/60564620/1700319
 */
function getNodeText(node: React.ReactNode): string {
  if (typeof node === 'string') {
    return node;
  }
  if (typeof node === 'number') {
    return numbers.toString(node);
  }
  if (Array.isArray(node)) {
    return node.map((node) => getNodeText(node as React.ReactNode)).join('');
  }
  if (ReactIs.isElement(node)) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    return getNodeText(node.props.children);
  }
  throw new Error(`should not get here`);
}
