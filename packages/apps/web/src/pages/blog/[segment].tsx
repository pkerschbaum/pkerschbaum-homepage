import { PATHS } from '@pkerschbaum-homepage/shared-node/constants';
import { schema_faviconsForWebsites } from '@pkerschbaum-homepage/shared-node/schema';
import dayjs from 'dayjs';
import fs from 'fs';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { useRemoteRefresh } from 'next-remote-refresh/hook';
import Head from 'next/head';
import { useRouter } from 'next/router';
import * as React from 'react';
import { Share2, Twitter } from 'react-feather';
import styled, { css } from 'styled-components';
import invariant from 'tiny-invariant';
import { z } from 'zod';

import { StyledAnchor } from '~/components/fancy-anchor';
import { Main } from '~/components/main';
import { MDXViewer } from '~/components/mdx-viewer';
import { config } from '~/config';
import { ColorTheme, DataAttribute, POSTS_PATH } from '~/constants';
import { Anchor } from '~/elements';
import { FullBleedWrapper } from '~/elements/FullBleedWrapper';
import { getAllMarkdownFiles, MDXParseResult, parseMDXFileAndCollectHrefs } from '~/mdx';

type IconURLToAssociatedWebsitesMap = {
  [iconURL in string]?: {
    iconDataURL: string;
    associatedWebsites: string[];
  };
};
type FaviconDataURLsForWebsiteURLs = {
  lightIcons: IconURLToAssociatedWebsitesMap;
  darkIcons: IconURLToAssociatedWebsitesMap;
};

type BlogPostPageProps = {
  mdxParseResult: MDXParseResult;
  faviconDataURLsForWebsiteURLs: FaviconDataURLsForWebsiteURLs;
};

const BlogPostPage: React.FC<BlogPostPageProps> = ({
  mdxParseResult,
  faviconDataURLsForWebsiteURLs,
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

          <BlogPostContent styleProps={{ faviconDataURLsForWebsiteURLs }}>
            <MDXViewer codeOfMdxParseResult={mdxParseResult.code} />
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

type StyleProps = {
  faviconDataURLsForWebsiteURLs: FaviconDataURLsForWebsiteURLs;
};

const BlogPostContent = styled.div<{ styleProps: StyleProps }>`
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
    Add icons to FancyAnchors.
    We construct CSS such that we transmit every data URL only once and apply it to the associated
    FancyAnchors via attribute selectors.

    @example
    & FancyAnchor[href="https://playwright.dev/docs/test-fixtures"]::before,
    & FancyAnchor[href="https://playwright.dev/docs/test-advanced#projects"]::before,
    & FancyAnchor[href="https://playwright.dev/docs/test-components#planned-work"]::before {
      display: inline-block;
      background-image: url(DATA_URL_OF_PLAYWRIGHT_FAVICON);
    }
   */
  & ${StyledAnchor}::before {
    display: none;
  }

  ${({ styleProps }) => {
    const lightIconsCss = Object.values(styleProps.faviconDataURLsForWebsiteURLs.lightIcons).map(
      (icon) => {
        invariant(icon);
        return css`
          ${icon.associatedWebsites
            .map((url) => `& ${StyledAnchor}[href="${url}"]::before`)
            .join(', ')} {
            display: inline-block;
            background-image: url(${icon.iconDataURL});
          }
        `;
      },
    );

    const darkIconsCss = Object.values(styleProps.faviconDataURLsForWebsiteURLs.darkIcons).map(
      (icon) => {
        invariant(icon);
        return css`
          ${icon.associatedWebsites
            .map(
              (url) =>
                `*:root[${DataAttribute.THEME}='${ColorTheme.DARK}'] & ${StyledAnchor}[href="${url}"]::before`,
            )
            .join(', ')} {
            display: inline-block;
            background-image: url(${icon.iconDataURL});
          }
        `;
      },
    );

    return [...lightIconsCss, ...darkIconsCss];
  }}

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
const faviconsForWebsitesReadPromise = fs.promises.readFile(PATHS.FAVICONS_FOR_WEBSITES, {
  encoding: 'utf-8',
});
export const getStaticProps: GetStaticProps<BlogPostPageProps, StaticProps> = async ({
  params,
}) => {
  const parsedParams = schema_staticProps.parse(params);

  const [mdxParseResult, faviconsForWebsitesString] = await Promise.all([
    parseMDXFileAndCollectHrefs(POSTS_PATH, `${parsedParams.segment}.mdx`),
    faviconsForWebsitesReadPromise,
  ]);

  const faviconsForWebsites = schema_faviconsForWebsites.parse(
    JSON.parse(faviconsForWebsitesString),
  );
  const faviconDataURLsForWebsiteURLs: FaviconDataURLsForWebsiteURLs = {
    lightIcons: {},
    darkIcons: {},
  };
  for (const collectedHref of mdxParseResult.collectedHrefs) {
    const iconURLs = faviconsForWebsites.websites[collectedHref]?.iconURLs;

    let lightIconDataURL;
    if (iconURLs?.light) {
      lightIconDataURL = faviconsForWebsites.icons[iconURLs.light]?.dataURL;

      if (lightIconDataURL) {
        let matching = faviconDataURLsForWebsiteURLs.lightIcons[iconURLs.light];
        if (!matching) {
          matching = { iconDataURL: lightIconDataURL, associatedWebsites: [] };
          faviconDataURLsForWebsiteURLs.lightIcons[iconURLs.light] = matching;
        }
        matching.associatedWebsites.push(collectedHref);
      }
    }

    if (iconURLs?.dark) {
      const darkIconDataURL = faviconsForWebsites.icons[iconURLs.dark]?.dataURL;

      if (darkIconDataURL && darkIconDataURL !== lightIconDataURL) {
        let matching = faviconDataURLsForWebsiteURLs.darkIcons[iconURLs.dark];
        if (!matching) {
          matching = { iconDataURL: darkIconDataURL, associatedWebsites: [] };
          faviconDataURLsForWebsiteURLs.darkIcons[iconURLs.dark] = matching;
        }
        matching.associatedWebsites.push(collectedHref);
      }
    }
  }

  return {
    props: {
      mdxParseResult,
      faviconDataURLsForWebsiteURLs,
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
