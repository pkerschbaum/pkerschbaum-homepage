import { check } from '@pkerschbaum/ts-utils';
import { getMDXComponent } from 'mdx-bundler/client';
import * as React from 'react';

import { FancyAnchor, FancyAnchorProps } from '~/components/fancy-anchor';
import { Anchor } from '~/elements';

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
        FancyAnchor: (props: FancyAnchorProps) => {
          return <FancyAnchor target="_blank" {...props} />;
        },
      }}
    />
  );
};
