import type { Metadata } from 'next';
import path from 'path';
import type React from 'react';
import invariant from 'tiny-invariant';

import styles from '#pkg/app/tidbits/sensible-tsconfig-defaults/styles.module.css';
import { ArticleContainerTidbit } from '#pkg/components/article-container-tidbit/index.js';
import { PATHS, ClassesAliases } from '#pkg/constants.js';
import { mapMDXParseResultToMetadata, parseMDXFileAndCollectHrefs } from '#pkg/mdx/index.js';

const faviconsClassName = styles[ClassesAliases.FAVICONS];

const SEGMENT = path.parse(__dirname).name;

async function TidbitPage() {
  invariant(faviconsClassName);

  const mdxParseResult = await parseMDXFileAndCollectHrefs(
    path.join(PATHS.TIDBITS, `${SEGMENT}.mdx`),
  );

  return (
    <ArticleContainerTidbit mdxParseResult={mdxParseResult} faviconsClassName={faviconsClassName} />
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const mdxParseResult = await parseMDXFileAndCollectHrefs(
    path.join(PATHS.TIDBITS, `${SEGMENT}.mdx`),
  );

  return mapMDXParseResultToMetadata(mdxParseResult);
}

export default TidbitPage;
