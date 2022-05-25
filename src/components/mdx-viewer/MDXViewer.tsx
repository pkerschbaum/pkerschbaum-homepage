import { check } from '@pkerschbaum/ts-utils';
import { getMDXComponent } from 'mdx-bundler/client';
import * as React from 'react';

import { CodeBlock } from '~/components/code-block';
import { FancyAnchor } from '~/components/fancy-anchor';
import { Anchor } from '~/elements';

type MDXViewerProps = {
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

          return <Anchor {...props} href={props.href} />;
        },
        code: CodeBlock,
        FancyAnchor,
      }}
    />
  );
};
