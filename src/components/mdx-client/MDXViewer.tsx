import { check } from '@pkerschbaum/ts-utils';
import { getMDXComponent } from 'mdx-bundler/client';
import * as React from 'react';

import { CodeBlock } from '~/components/code-block';
import { Anchor } from '~/elements';
import { urlUtils } from '~/utils/url.utils';

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

          let textToDisplay = props.children;
          if (textToDisplay === 'AUTOGENERATE') {
            const url = new URL(props.href);
            textToDisplay = urlUtils.createReadableTextFromUrl(url);
          }

          return (
            <Anchor {...props} href={props.href}>
              {textToDisplay}
            </Anchor>
          );
        },
        code: CodeBlock,
      }}
    />
  );
};
