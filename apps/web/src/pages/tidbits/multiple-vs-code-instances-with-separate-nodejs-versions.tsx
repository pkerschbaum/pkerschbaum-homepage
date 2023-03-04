import type { GetStaticProps } from 'next';
import path from 'path';
import * as React from 'react';
import invariant from 'tiny-invariant';

import {
  PageContainerTidbit,
  PageContainerTidbitPropsBase,
} from '#pkg/components/page-container-tidbit/index.js';
import { ClassesAliases, PATHS } from '#pkg/constants.js';
import { parseMDXFileAndCollectHrefs } from '#pkg/mdx/index.js';
import styles from '#pkg/pages/tidbits/multiple-vs-code-instances-with-separate-nodejs-versions.module.css';

const SEGMENT = path.parse(__filename).name;

const faviconsClassName = styles[ClassesAliases.FAVICONS];
invariant(faviconsClassName);

const TidbitPage: React.FC<PageContainerTidbitPropsBase> = (props) => {
  return <PageContainerTidbit {...props} faviconsClassName={faviconsClassName} />;
};

export const getStaticProps: GetStaticProps<PageContainerTidbitPropsBase> = async () => {
  const mdxParseResult = await parseMDXFileAndCollectHrefs(
    path.join(PATHS.TIDBITS, `${SEGMENT}.mdx`),
  );

  return {
    props: {
      mdxParseResult,
    },
  };
};

export default TidbitPage;
