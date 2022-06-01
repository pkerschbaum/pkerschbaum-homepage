import Head from 'next/head';
import type React from 'react';

const ResumePage: React.FC = () => {
  const title = 'Resume | Patrick Kerschbaum';
  const description = 'Resume of Patrick Kerschbaum';

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} key="desc" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>

      <span>TODO ResumePage</span>
    </>
  );
};

export default ResumePage;
