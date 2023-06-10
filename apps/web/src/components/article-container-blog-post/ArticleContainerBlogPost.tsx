'use client';

import { arrays } from '@pkerschbaum/ts-utils';
import dayjs from 'dayjs';
import type React from 'react';
import { Share2, Twitter } from 'react-feather';
import { styled } from 'styled-components';

import {
  ArticleHeading,
  Article,
  ArticleContainer,
  ArticleContent,
  FrontMatter,
  Time,
} from '#pkg/components/article-components/index.js';
import { Main } from '#pkg/components/main/index.js';
import { MDXViewer } from '#pkg/components/mdx-viewer/index.js';
import { WebmentionTile } from '#pkg/components/webmention-tile/index.js';
import { TOC_QUERY } from '#pkg/constants';
import { Anchor, FullBleedWrapper } from '#pkg/elements/index.js';
import type { MDXParseResult } from '#pkg/mdx/index.js';
import { usePageUrl } from '#pkg/utils/next.utils';
import type { Webmention } from '#pkg/webmentions/index.js';

export type ArticleContainerBlogPostPropsBase = {
  mdxParseResult: MDXParseResult;
  webmentions: Webmention[];
};
export type ArticleContainerBlogPostProps = ArticleContainerBlogPostPropsBase & {
  faviconsClassName: string;
};

export const ArticleContainerBlogPost: React.FC<ArticleContainerBlogPostProps> = ({
  mdxParseResult,
  webmentions,
  faviconsClassName,
}) => {
  const blogPostUrl = usePageUrl();
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
    <Main className={faviconsClassName}>
      <ArticleContainer>
        <TocAndArticle>
          <TocAside>
            <TocNav>
              <TocHeading>Table of Contents</TocHeading>
              {mdxParseResult.collectedHeadings.map((heading) => (
                <TocAnchor key={heading.id} href={`#${heading.id}`}>
                  {heading.text}
                </TocAnchor>
              ))}
            </TocNav>
          </TocAside>

          <Article>
            <FrontMatter>
              <ArticleHeading>{mdxParseResult.frontmatter.title}</ArticleHeading>
              <Time dateTime={mdxParseResult.frontmatter.publishedAtISO}>
                Published on{' '}
                {dayjs(mdxParseResult.frontmatter.publishedAtISO).format('DD MMMM, YYYY')}
              </Time>
            </FrontMatter>

            <ArticleContent>
              <MDXViewer codeOfMdxParseResult={mdxParseResult.code} />
            </ArticleContent>
          </Article>
        </TocAndArticle>

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
      </ArticleContainer>
    </Main>
  );
};

const TocAndArticle = styled.div`
  @media ${TOC_QUERY} {
    grid-template-areas: 'article-components-container aside';
    grid-template-columns: 1fr 250px;
    column-gap: calc(6 * var(--spacing-base));
  }

  margin-block-start: 100px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: 'article-components-container';
`;

const TocAside = styled.aside`
  @media ${TOC_QUERY} {
    display: block;
  }

  display: none;
  position: sticky;
  top: 85px;
  grid-area: aside;
  height: max-content;
`;

const TocNav = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: calc(2 * var(--spacing-base));
`;

const TocHeading = styled.h2`
  margin-block-start: 0;
  font-size: var(--font-size-xl);
  text-transform: uppercase;
`;

const TocAnchor = styled(Anchor)`
  text-decoration: none;
  font-size: var(--font-size-sm);
`;

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
  max-width: var(--app-box-width);
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
