import Head from 'next/head';
import type React from 'react';

import { SeoHead } from '~/components/seo-head';

const ResumePage: React.FC = () => {
  return (
    <>
      <Head>
        <SeoHead title="Resume | Patrick Kerschbaum" description="Resume of Patrick Kerschbaum" />
      </Head>

      <span>TODO ResumePage</span>
    </>
  );
};

export default ResumePage;
