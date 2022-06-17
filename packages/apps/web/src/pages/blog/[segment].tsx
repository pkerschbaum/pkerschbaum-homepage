import dayjs from 'dayjs';
import fs from 'fs';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { useRemoteRefresh } from 'next-remote-refresh/hook';
import Head from 'next/head';
import { useRouter } from 'next/router';
import * as React from 'react';
import { Share2, Twitter } from 'react-feather';
import styled from 'styled-components';
import { z } from 'zod';

import { Main } from '~/components/main';
import { MDXViewer } from '~/components/mdx-viewer';
import { config } from '~/config';
import { HREFS_TO_FAVICONS_PATH, POSTS_PATH } from '~/constants';
import { Anchor } from '~/elements';
import { FullBleedWrapper } from '~/elements/FullBleedWrapper';
import { getAllMarkdownFiles, MDXParseResult, parseMDXFileAndCollectHrefs } from '~/mdx';
import { HrefsToFaviconDataUrlsMap, schema_hrefsToFaviconDataUrlsMap } from '~/schema';

type BlogPostPageProps = {
  mdxParseResult: MDXParseResult;
  hrefToFaviconsMap: HrefsToFaviconDataUrlsMap;
};

const BlogPostPage: React.FC<BlogPostPageProps> = ({ mdxParseResult, hrefToFaviconsMap }) => {
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

  const title = mdxParseResult.frontmatter.title;
  const description = mdxParseResult.frontmatter.description;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} key="desc" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>

      <Main>
        <BlogPostContainer>
          <FrontMatter>
            <h1>{mdxParseResult.frontmatter.title}</h1>
            <Time dateTime={mdxParseResult.frontmatter.publishedAtISO}>
              Published on{' '}
              {dayjs(mdxParseResult.frontmatter.publishedAtISO).format('DD MMMM, YYYY')}
            </Time>
          </FrontMatter>

          <BlogPostContent>
            <MDXViewer
              codeOfMdxParseResult={mdxParseResult.code}
              hrefToFaviconsMap={hrefToFaviconsMap}
            />
          </BlogPostContent>

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
              <ContactTeaserHeadline>Let&apos;s keep in touch!</ContactTeaserHeadline>

              <p>
                <Anchor
                  href="https://twitter.com/pkerschbaum"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Follow me on Twitter
                </Anchor>
                <span>
                  {' '}
                  to get informed when I publish new blog posts, I also tweet about TypeScript,
                  JavaScript and testing.
                </span>
              </p>
            </ContactTeaser>
          </ContactTeaserWrapper>
        </BlogPostContainer>
      </Main>
    </>
  );
};

const BlogPostContainer = styled.article`
  width: 100%;
  --max-width: var(--box-width-md);
  max-width: var(--max-width);
  align-self: center;

  display: flex;
  flex-direction: column;
  gap: calc(4 * var(--spacing-base));
`;

const BlogPostContent = styled.div`
  & p {
    margin-block: 1em;
  }
  & ul {
    margin-block: 0.75em;
    --ul-padding-inline-start: 20px;
    padding-inline-start: var(--ul-padding-inline-start);
  }
  & ul li {
    list-style-type: initial;
  }
  & li {
    margin-block: 0.5em;
  }
  & li:first-of-type {
    margin-block-start: 0;
  }

  /* 
    Code blocks should span entire width.
    We have to undo the app padding and margin-inline-start of ul/ol list elements (if a code block is inside such an element).
   */
  & > pre {
    margin-inline-start: calc(-1 * var(--app-padding-inline));
    margin-inline-end: calc(-1 * var(--app-padding-inline));
  }
  & ul > li > pre,
  & ol > li > pre {
    width: calc(100% + 2 * var(--app-padding-inline) + var(--ul-padding-inline-start));
    margin-inline-start: calc(-1 * (var(--app-padding-inline) + var(--ul-padding-inline-start)));
  }
  & ul ul > li > pre,
  & ol ol > li > pre {
    width: calc(100% + 2 * var(--app-padding-inline) + 2 * var(--ul-padding-inline-start));
    margin-inline-start: calc(
      -1 * (var(--app-padding-inline) + 2 * var(--ul-padding-inline-start))
    );
  }
`;

const InteractionSection = styled.div`
  display: flex;
  gap: calc(4 * var(--spacing-base));
`;

const FrontMatter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-base);

  text-align: center;
`;

const Time = styled.time`
  color: var(--color-fg-less-emphasized);
  text-transform: uppercase;
`;

const InteractionAnchor = styled(Anchor)`
  display: inline-flex;
  align-items: center;
  gap: calc(1 * var(--spacing-base));

  font-size: var(--font-size-sm);
`;

const ContactTeaserWrapper = styled(FullBleedWrapper)`
  padding-block: calc(2 * var(--spacing-base));
  padding-inline: var(--app-padding-inline);
  background-color: var(--color-bg-interactive);
`;

const ContactTeaser = styled.div`
  margin-inline: auto;
  max-width: var(--max-width);
`;

const ContactTeaserHeadline = styled.h2`
  margin-block-start: 0;
`;

const schema_staticProps = z.object({ segment: z.string().min(1) });
type StaticProps = z.infer<typeof schema_staticProps>;
const hrefsToFaviconsReadPromise = fs.promises.readFile(HREFS_TO_FAVICONS_PATH, {
  encoding: 'utf-8',
});
export const getStaticProps: GetStaticProps<BlogPostPageProps, StaticProps> = async ({
  params,
}) => {
  const parsedParams = schema_staticProps.parse(params);

  const [mdxParseResult, hrefToFaviconsMapString] = await Promise.all([
    parseMDXFileAndCollectHrefs(POSTS_PATH, `${parsedParams.segment}.mdx`),
    hrefsToFaviconsReadPromise,
  ]);

  return {
    props: {
      mdxParseResult,
      hrefToFaviconsMap: schema_hrefsToFaviconDataUrlsMap.parse(
        JSON.parse(hrefToFaviconsMapString),
      ),
    },
  };
};

export const getStaticPaths: GetStaticPaths<StaticProps> = async () => {
  const posts = await getAllMarkdownFiles(POSTS_PATH);
  const paths = posts.map((post) => ({ params: { segment: post.segment } }));
  return {
    paths,
    fallback: false,
  };
};

export default BlogPostPage;
