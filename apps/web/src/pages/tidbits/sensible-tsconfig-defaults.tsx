import type { GetStaticProps } from 'next';
import path from 'path';
import * as React from 'react';
import invariant from 'tiny-invariant';

import {
  PageContainerTidbit,
  PageContainerTidbitPropsBase,
} from '#pkg/components/page-container-tidbit/index.js';
import { ClassesAliases, PATHS } from '#pkg/constants.js';
import { createFaviconsMapping } from '#pkg/favicons/favicons.js';
import { parseMDXFileAndCollectHrefs } from '#pkg/mdx/index.js';
import styles from '#pkg/pages/tidbits/sensible-tsconfig-defaults.module.css';

const faviconsClassName = styles[ClassesAliases.FAVICONS];
invariant(faviconsClassName);

const TidbitPage: React.FC<PageContainerTidbitPropsBase> = (props) => {
  return <PageContainerTidbit {...props} faviconsClassName={faviconsClassName} />;
};

const segment = 'sensible-tsconfig-defaults';

export const getStaticProps: GetStaticProps<PageContainerTidbitPropsBase> = async () => {
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
