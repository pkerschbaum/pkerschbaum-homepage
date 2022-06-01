import dayjs from 'dayjs';
import fs from 'fs';
import type { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import * as React from 'react';
import { Twitter } from 'react-feather';
import styled from 'styled-components';
import invariant from 'tiny-invariant';
import { z } from 'zod';

import { MDXViewer } from '~/components/mdx-viewer';
import { SeoHead } from '~/components/seo-head';
import { config } from '~/config';
import { HREFS_TO_FAVICONS_PATH, POSTS_PATH } from '~/constants';
import { Anchor } from '~/elements';
import { getAllMarkdownFiles, MDXParseResult, parseMDXFileAndCollectHrefs } from '~/mdx';
import { HrefsToFaviconDataUrlsMap, schema_hrefsToFaviconDataUrlsMap } from '~/schema';

const schema_staticProps = z.object({ segment: z.string().nonempty() });
type StaticProps = z.infer<typeof schema_staticProps>;

type BlogPostPageProps = {
  mdxParseResult: MDXParseResult;
  hrefToFaviconsMap: HrefsToFaviconDataUrlsMap;
};

const BlogPostPage: React.FC<BlogPostPageProps> = ({ mdxParseResult, hrefToFaviconsMap }) => {
  const router = useRouter();
  const { segment } = schema_staticProps.parse(router.query);

  return (
    <>
      <Head>
        <SeoHead
          title={mdxParseResult.frontmatter.title}
          description={mdxParseResult.frontmatter.description}
        />
      </Head>

      <BlogPostContainer>
        <FrontMatter>
          <h1>{mdxParseResult.frontmatter.title}</h1>
          <Time dateTime={mdxParseResult.frontmatter.publishedAtISO}>
            Published on {dayjs(mdxParseResult.frontmatter.publishedAtISO).format('DD MMM, YYYY')}
          </Time>
        </FrontMatter>
        <div>
          <MDXViewer
            codeOfMdxParseResult={mdxParseResult.code}
            hrefToFaviconsMap={hrefToFaviconsMap}
          />
        </div>
        <TwitterAnchor
          href={`https://twitter.com/search?q=${encodeURIComponent(
            `${config.deploymentOrigin}/blog/${segment}`,
          )}`}
          target="_blank"
        >
          <Twitter />
          Discuss on Twitter
        </TwitterAnchor>
      </BlogPostContainer>
    </>
  );
};

const BlogPostContainer = styled.article`
  width: 100%;
  max-width: var(--box-width-md);
  align-self: center;

  display: flex;
  flex-direction: column;
  gap: calc(2 * var(--spacing-base));

  & p {
    margin-block: 1em;
  }
  & ul {
    margin-block: 0.75em;
    --ul-padding-inline-start: 20px;
    padding-inline-start: var(--ul-padding-inline-start);
  }
  & ul li,
  & ul ul li {
    list-style-type: initial;
  }
  & li {
    margin-block: 0.5em;
  }

  /* 
    Code blocks should span entire width.
    We have to undo the app padding and margin-inline-start of ul/ol list elements (if a code block is inside such an element).
   */
  & > pre {
    max-width: var(--box-width-md);
    width: calc(100% + 2 * var(--app-padding-inline));
    margin-inline-start: calc(-1 * var(--app-padding-inline));
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

  & h1,
  & h2,
  & h3 {
    margin-block-start: 2em;
    margin-block-end: 0.5em;
  }
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

const TwitterAnchor = styled(Anchor)`
  display: inline-flex;
  align-items: center;
  gap: calc(0.75 * var(--spacing-base));

  font-size: var(--font-size-sm);
`;

const hrefsToFaviconsReadPromise = fs.promises.readFile(HREFS_TO_FAVICONS_PATH, {
  encoding: 'utf-8',
});
export const getStaticProps: GetStaticProps<BlogPostPageProps, StaticProps> = async ({
  params,
}) => {
  invariant(params?.segment);

  const [mdxParseResult, hrefToFaviconsMapString] = await Promise.all([
    parseMDXFileAndCollectHrefs(POSTS_PATH, `${params.segment}.mdx`),
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
