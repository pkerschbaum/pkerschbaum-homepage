type SeoHeadProps = {
  title: string;
  description: string;
};
export const SeoHead: React.FC<SeoHeadProps> = ({ title, description }) => {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} key="desc" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
    </>
  );
};
