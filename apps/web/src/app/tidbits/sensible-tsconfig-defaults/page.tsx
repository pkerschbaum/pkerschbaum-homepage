import type { Metadata } from 'next';
import path from 'path';
import type React from 'react';
import invariant from 'tiny-invariant';

import { MDXContentClientComponent } from '#pkg/app/tidbits/sensible-tsconfig-defaults/mdx-content-client-component.jsx';
import styles from '#pkg/app/tidbits/sensible-tsconfig-defaults/styles.module.css';
import { ArticleContainerTidbit } from '#pkg/components/article-container-tidbit/index.js';
import { ClassesAliases } from '#pkg/constants-browser.js';
import { PATHS } from '#pkg/constants-server.js';
import { mapMDXParseResultToMetadata, parseMDXFileAndCollectHrefs } from '#pkg/mdx/index.js';

const faviconsClassName = styles[ClassesAliases.FAVICONS];

const SEGMENT = path.parse(__dirname).name;

async function TidbitPage() {
  invariant(faviconsClassName);

  const mdxParseResult = await parseMDXFileAndCollectHrefs(
    path.join(PATHS.TIDBITS, `${SEGMENT}.mdx`),
  );

  return (
    <ArticleContainerTidbit
      mdxContent={<MDXContentClientComponent />}
      mdxParseResult={mdxParseResult}
      faviconsClassName={faviconsClassName}
    />
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const mdxParseResult = await parseMDXFileAndCollectHrefs(
    path.join(PATHS.TIDBITS, `${SEGMENT}.mdx`),
  );

  return mapMDXParseResultToMetadata(mdxParseResult);
}

export default TidbitPage;
