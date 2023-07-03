import type { Metadata } from 'next';
import type React from 'react';

import { TidbitsOverviewPageContent } from '#pkg/app/tidbits/page-content';
import { PATHS } from '#pkg/constants-server.js';
import { getAllMarkdownFiles } from '#pkg/mdx/index.js';

async function TidbitsOverviewPage() {
  const tidbits = await getAllMarkdownFiles(PATHS.TIDBITS);
  return <TidbitsOverviewPageContent tidbits={tidbits} />;
}

export const metadata: Metadata = {
  title: 'Tidbits',
  description: 'Short always-up-to-date articles written by Patrick Kerschbaum',
  openGraph: {
    title: 'Tidbits',
    description: 'Short always-up-to-date articles written by Patrick Kerschbaum',
  },
};

export default TidbitsOverviewPage;
