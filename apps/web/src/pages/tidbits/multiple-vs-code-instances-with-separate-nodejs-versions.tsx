import type { GetStaticProps } from 'next';
import path from 'path';
import * as React from 'react';

import {
  PageContainerTidbit,
  PageContainerTidbitProps,
} from '#pkg/components/page-container-tidbit/index.js';
import { PATHS } from '#pkg/constants.js';
import { createFaviconsMapping } from '#pkg/favicons/favicons.js';
import { parseMDXFileAndCollectHrefs } from '#pkg/mdx/index.js';

const TidbitPage: React.FC<PageContainerTidbitProps> = (props) => {
  return <PageContainerTidbit {...props} />;
};

const segment = 'multiple-vs-code-instances-with-separate-nodejs-versions';

export const getStaticProps: GetStaticProps<PageContainerTidbitProps> = async () => {
  const mdxParseResult = await parseMDXFileAndCollectHrefs(
    path.join(PATHS.TIDBITS, `${segment}.mdx`),
  );

  const faviconDataURLsForWebsiteURLs = await createFaviconsMapping(mdxParseResult);

  return {
    props: {
      mdxParseResult,
      faviconDataURLsForWebsiteURLs,
    },
  };
};

export default TidbitPage;
