import { styled } from '@pigment-css/react';
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
import { BskyInteractionSection } from '#pkg/components/article-container-blog-post/BskyInteractionSection.jsx';
import { Main } from '#pkg/components/main/index.js';
import { TableOfContents } from '#pkg/components/table-of-contents/index.js';
import { Anchor, FullBleedWrapper } from '#pkg/elements/index.js';
import type { MDXParseResult } from '#pkg/mdx/index.js';

export type ArticleContainerBlogPostPropsBase = {
  mdxContent: React.ReactNode;
  mdxParseResult: MDXParseResult;
};
export type ArticleContainerBlogPostProps = ArticleContainerBlogPostPropsBase & {
  faviconsClassName: string;
};

export const ArticleContainerBlogPost: React.FC<ArticleContainerBlogPostProps> = ({
  mdxContent,
  mdxParseResult,
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

            <ArticleContent>{mdxContent}</ArticleContent>
          </Article>
        </TocAndArticle>

        <BskyInteractionSection mdxParseResult={mdxParseResult} />

        <ContactTeaserWrapper>
          <ContactTeaser>
            <ContactTeaserHeadline>Did you like this blog post?</ContactTeaserHeadline>

            <p>
              Great, then let&apos;s keep in touch!{' '}
              <Anchor
                href="https://bsky.app/profile/pkerschbaum.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Follow me on Bluesky
              </Anchor>
              , I post about TypeScript, testing and web development in general - and of course
              about updates on my own blog posts.
            </p>
          </ContactTeaser>
        </ContactTeaserWrapper>
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
