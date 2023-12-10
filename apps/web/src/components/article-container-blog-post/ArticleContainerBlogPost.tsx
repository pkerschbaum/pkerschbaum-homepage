import { styled } from '@linaria/react';
import { arrays } from '@pkerschbaum/commons-ecma/util/arrays';
import dayjs from 'dayjs';
import type React from 'react';

import {
  ArticleHeading,
  Article,
  ArticleContainer,
  ArticleContent,
  FrontMatter,
  Time,
  TocAndArticle,
  TocAside,
  Timestamps,
} from '#pkg/components/article-components/index.js';
import { TwitterInteractionSection } from '#pkg/components/article-container-blog-post/TwitterInteractionSection.jsx';
import { Main } from '#pkg/components/main/index.js';
import { MDXViewer } from '#pkg/components/mdx-viewer/index.js';
import { TableOfContents } from '#pkg/components/table-of-contents';
import { WebmentionTile } from '#pkg/components/webmention-tile/index.js';
import { Anchor, FullBleedWrapper } from '#pkg/elements/index.js';
import type { MDXParseResult } from '#pkg/mdx/index.js';
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
  return (
    <Main className={faviconsClassName}>
      <ArticleContainer>
        <TocAndArticle>
          <TocAside>
            <TableOfContents headings={mdxParseResult.collectedHeadings} />
          </TocAside>

          <Article>
            <FrontMatter>
              <ArticleHeading>{mdxParseResult.frontmatter.title}</ArticleHeading>
              <Timestamps>
                <Time dateTime={mdxParseResult.frontmatter.publishedAtISO}>
                  Published on{' '}
                  {dayjs(mdxParseResult.frontmatter.publishedAtISO).format('DD MMMM, YYYY')}
                </Time>
                {mdxParseResult.frontmatter.lastUpdatedAtISO && (
                  <Time dateTime={mdxParseResult.frontmatter.lastUpdatedAtISO}>
                    Last updated on{' '}
                    {dayjs(mdxParseResult.frontmatter.lastUpdatedAtISO).format('DD MMMM, YYYY')}
                  </Time>
                )}
              </Timestamps>
            </FrontMatter>

            <ArticleContent>
              <MDXViewer codeOfMdxParseResult={mdxParseResult.code} />
            </ArticleContent>
          </Article>
        </TocAndArticle>

        <TwitterInteractionSection mdxParseResult={mdxParseResult} />

        <ContactTeaserWrapper>
          <ContactTeaser>
            <ContactTeaserHeadline>Did you like this blog post?</ContactTeaserHeadline>

            <p>
              Great, then let&apos;s keep in touch!{' '}
              <Anchor
                href="https://twitter.com/intent/follow?screen_name=pkerschbaum"
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
