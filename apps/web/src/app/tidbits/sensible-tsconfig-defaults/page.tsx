import type { Metadata } from 'next';
import path from 'path';
import type React from 'react';

import { TidbitPageContent } from '#pkg/app/tidbits/sensible-tsconfig-defaults/page-content';
import { PATHS } from '#pkg/constants.js';
import { mapMDXParseResultToMetadata, parseMDXFileAndCollectHrefs } from '#pkg/mdx/index.js';

const SEGMENT = path.parse(__dirname).name;

async function TidbitPage() {
  const mdxParseResult = await parseMDXFileAndCollectHrefs(
    path.join(PATHS.TIDBITS, `${SEGMENT}.mdx`),
  );

  return <TidbitPageContent mdxParseResult={mdxParseResult} />;
}

export async function generateMetadata(): Promise<Metadata> {
  const mdxParseResult = await parseMDXFileAndCollectHrefs(
    path.join(PATHS.TIDBITS, `${SEGMENT}.mdx`),
  );

  return mapMDXParseResultToMetadata(mdxParseResult);
}

export default TidbitPage;
