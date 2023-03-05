import Head from 'next/head.js';

type MetadataTagsProps = {
  title: string;
  description: string;
};

export const MetadataTags: React.FC<MetadataTagsProps> = ({ title, description }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} key="desc" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
    </Head>
  );
};
