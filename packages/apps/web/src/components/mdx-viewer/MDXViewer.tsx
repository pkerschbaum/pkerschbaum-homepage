import { check } from '@pkerschbaum/ts-utils';
import { getMDXComponent } from 'mdx-bundler/client';
import * as React from 'react';

import { CodeBlock } from '~/components/code-block';
import { FancyAnchor, FancyAnchorProps } from '~/components/fancy-anchor';
import { Anchor } from '~/elements';
import type { HrefToFaviconsMap } from '~/schema';

export type MDXViewerProps = {
  codeOfMdxParseResult: string;
  hrefToFaviconsMap: HrefToFaviconsMap;
};

export const MDXViewer: React.FC<MDXViewerProps> = ({
  codeOfMdxParseResult,
  hrefToFaviconsMap,
}) => {
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
        code: CodeBlock,
        FancyAnchor: (props: FancyAnchorProps) => {
          return <FancyAnchor target="_blank" {...props} hrefToFaviconsMap={hrefToFaviconsMap} />;
        },
      }}
    />
  );
};
