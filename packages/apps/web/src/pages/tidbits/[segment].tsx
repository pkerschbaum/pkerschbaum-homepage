import dayjs from 'dayjs';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { useRemoteRefresh } from 'next-remote-refresh/hook';
import path from 'path';
import * as React from 'react';
import { z } from 'zod';

import {
  ArticleViewerContainer,
  ArticleViewerContent,
  FaviconDataURLsForWebsiteURLs,
  FrontMatter,
  Time,
} from '#/components/article-viewer';
import { Main } from '#/components/main';
import { MDXViewer } from '#/components/mdx-viewer';
import { MetadataTags } from '#/components/metadata-tags';
import { PATHS } from '#/constants';
import { createFaviconsMapping } from '#/favicons/favicons';
import { getAllMarkdownFiles, MDXParseResult, parseMDXFileAndCollectHrefs } from '#/mdx';

type TidbitPageProps = {
  mdxParseResult: MDXParseResult;
  faviconDataURLsForWebsiteURLs: FaviconDataURLsForWebsiteURLs;
};

const TidbitPage: React.FC<TidbitPageProps> = ({
  mdxParseResult,
  faviconDataURLsForWebsiteURLs,
}) => {
  useRemoteRefresh();

  return (
    <>
      <MetadataTags
        title={mdxParseResult.frontmatter.title}
        description={mdxParseResult.frontmatter.description}
      />

      <Main>
        <ArticleViewerContainer>
          <FrontMatter>
            <h1>{mdxParseResult.frontmatter.title}</h1>
            <Time dateTime={mdxParseResult.frontmatter.lastUpdatedAtISO}>
              Last updated on{' '}
              {dayjs(mdxParseResult.frontmatter.lastUpdatedAtISO).format('DD MMMM, YYYY')}
            </Time>
          </FrontMatter>

          <ArticleViewerContent styleProps={{ faviconDataURLsForWebsiteURLs }}>
            <MDXViewer codeOfMdxParseResult={mdxParseResult.code} />
          </ArticleViewerContent>
        </ArticleViewerContainer>
      </Main>
    </>
  );
};

const schema_staticProps = z.object({ segment: z.string().min(1) });
type StaticProps = z.infer<typeof schema_staticProps>;
export const getStaticProps: GetStaticProps<TidbitPageProps, StaticProps> = async ({ params }) => {
  const parsedParams = schema_staticProps.parse(params);

  const mdxParseResult = await parseMDXFileAndCollectHrefs(
    path.join(PATHS.TIDBITS, `${parsedParams.segment}.mdx`),
  );

  const faviconDataURLsForWebsiteURLs = await createFaviconsMapping(mdxParseResult);

  return {
    props: {
      mdxParseResult,
      faviconDataURLsForWebsiteURLs,
    },
  };
};

export const getStaticPaths: GetStaticPaths<StaticProps> = async () => {
  const articles = await getAllMarkdownFiles(PATHS.TIDBITS);
  const paths = articles.map((article) => ({ params: { segment: article.segment } }));
  return {
    paths,
    fallback: false,
  };
};

export default TidbitPage;
