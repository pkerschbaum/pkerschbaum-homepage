import { arrays } from '@pkerschbaum/ts-utils';
import dayjs from 'dayjs';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router.js';
import { useRemoteRefresh } from 'next-remote-refresh/hook.js';
import path from 'path';
import * as React from 'react';
import { Share2, Twitter } from 'react-feather';
import { styled } from 'styled-components';
import { z } from 'zod';

import {
  ArticleViewerContainer,
  ArticleViewerContent,
  FaviconDataURLsForWebsiteURLs,
  FrontMatter,
  Time,
} from '#pkg/components/article-viewer/index.js';
import { Main } from '#pkg/components/main/index.js';
import { MDXViewer } from '#pkg/components/mdx-viewer/index.js';
import { MetadataTags } from '#pkg/components/metadata-tags/index.js';
import { WebmentionTile } from '#pkg/components/webmention-tile/index.js';
import { config } from '#pkg/config.js';
import { PATHS } from '#pkg/constants.js';
import { Anchor, FullBleedWrapper } from '#pkg/elements/index.js';
import { createFaviconsMapping } from '#pkg/favicons/favicons.js';
import {
  getAllMarkdownFiles,
  MDXParseResult,
  parseMDXFileAndCollectHrefs,
} from '#pkg/mdx/index.js';
import { fetchWebmentions, Webmention } from '#pkg/webmentions/index.js';

type BlogPostPageProps = {
  mdxParseResult: MDXParseResult;
  faviconDataURLsForWebsiteURLs: FaviconDataURLsForWebsiteURLs;
  webmentions: Webmention[];
};

const BlogPostPage: React.FC<BlogPostPageProps> = ({
  mdxParseResult,
  faviconDataURLsForWebsiteURLs,
  webmentions,
}) => {
  useRemoteRefresh();

  const router = useRouter();

  let blogPostUrl = config.deploymentOrigin;
  blogPostUrl = new URL(router.basePath, blogPostUrl);
  blogPostUrl = new URL(router.asPath, blogPostUrl);
  const blogPostHref = blogPostUrl.href;

  const twitterShareUrl = new URL(`https://twitter.com/intent/tweet`);
  twitterShareUrl.searchParams.set('url', blogPostHref);
  twitterShareUrl.searchParams.set('text', mdxParseResult.frontmatter.title);
  twitterShareUrl.searchParams.set('via', 'pkerschbaum');
  twitterShareUrl.searchParams.set('hashtags', mdxParseResult.frontmatter.tags.join(','));
  const twitterShareHref = twitterShareUrl.href;
  const twitterDiscussUrl = new URL(`https://twitter.com/search`);
  twitterDiscussUrl.searchParams.set('q', blogPostHref);
  const twitterDiscussHref = twitterDiscussUrl.href;

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
            <Time dateTime={mdxParseResult.frontmatter.publishedAtISO}>
              Published on{' '}
              {dayjs(mdxParseResult.frontmatter.publishedAtISO).format('DD MMMM, YYYY')}
            </Time>
          </FrontMatter>

          <ArticleViewerContent styleProps={{ faviconDataURLsForWebsiteURLs }}>
            <MDXViewer codeOfMdxParseResult={mdxParseResult.code} />
          </ArticleViewerContent>

          <InteractionSection>
            <InteractionAnchor href={twitterShareHref} target="_blank">
              <Share2 />
              Share on Twitter
            </InteractionAnchor>

            <InteractionAnchor href={twitterDiscussHref} target="_blank">
              <Twitter />
              Discuss on Twitter
            </InteractionAnchor>
          </InteractionSection>

          <ContactTeaserWrapper>
            <ContactTeaser>
              <ContactTeaserHeadline>Did you like this blog post?</ContactTeaserHeadline>

              <p>
                Great, then let&apos;s keep in touch!{' '}
                <Anchor
                  href="https://twitter.com/pkerschbaum"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Follow me on Twitter
                </Anchor>
                , I tweet about TypeScript, testing and web development in general - and of course
                about updates on my own blog posts.
              </p>
            </ContactTeaser>
          </ContactTeaserWrapper>

          {webmentions.length > 0 && (
            <WebmentionsWrapper>
              <WebmentionsHeadline>Webmentions</WebmentionsHeadline>
              <WebmentionsList>
                {arrays
                  .shallowCopy(webmentions)
                  .sort((a, b) => b.data.published_ts - a.data.published_ts)
                  .map((webmention) => (
                    <WebmentionTile key={webmention.id} webmention={webmention} />
                  ))}
              </WebmentionsList>
            </WebmentionsWrapper>
          )}
        </ArticleViewerContainer>
      </Main>
    </>
  );
};

const InteractionSection = styled.div`
  display: flex;
  gap: calc(4 * var(--spacing-base));
`;

const InteractionAnchor = styled(Anchor)`
  display: inline-flex;
  gap: calc(1 * var(--spacing-base));
  align-items: center;

  font-size: var(--font-size-sm);
`;

const ContactTeaserWrapper = styled(FullBleedWrapper)`
  padding-block: calc(2 * var(--spacing-base));
  padding-inline: var(--app-padding-inline);
  background-color: var(--color-bg-interactive);
`;

const ContactTeaser = styled.div`
  max-width: var(--max-width);
  margin-inline: auto;
`;

const ContactTeaserHeadline = styled.h2`
  margin-block-start: 0;
`;

const WebmentionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: calc(2 * var(--spacing-base));
`;

const WebmentionsHeadline = styled.h2`
  margin-block-start: 0;
`;

const WebmentionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: calc(4 * var(--spacing-base));
`;

const schema_staticProps = z.object({ segment: z.string().min(1) });
type StaticProps = z.infer<typeof schema_staticProps>;
export const getStaticProps: GetStaticProps<BlogPostPageProps, StaticProps> = async ({
  params,
}) => {
  const parsedParams = schema_staticProps.parse(params);

  const [{ mdxParseResult, faviconDataURLsForWebsiteURLs }, { webmentions }] = await Promise.all([
    fetchMDXFileAndFavicons(parsedParams.segment),
    fetchWebmentions(
      new URL(`/blog/${parsedParams.segment}`, `https://${config.canonicalTLDPlus1}`).href,
    ),
  ]);

  return {
    props: {
      mdxParseResult,
      faviconDataURLsForWebsiteURLs,
      webmentions,
    },
    revalidate: 60, // seconds
  };
};

export const getStaticPaths: GetStaticPaths<StaticProps> = async () => {
  const articles = await getAllMarkdownFiles(PATHS.POSTS);
  const paths = articles.map((article) => ({ params: { segment: article.segment } }));
  return {
    paths,
    fallback: false,
  };
};

export default BlogPostPage;

async function fetchMDXFileAndFavicons(segment: string) {
  const mdxParseResult = await parseMDXFileAndCollectHrefs(
    path.join(PATHS.POSTS, `${segment}.mdx`),
  );

  const faviconDataURLsForWebsiteURLs = await createFaviconsMapping(mdxParseResult);

  return {
    mdxParseResult,
    faviconDataURLsForWebsiteURLs,
  };
}
