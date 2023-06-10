'use client';

import dayjs from 'dayjs';
import type React from 'react';

import {
  Article,
  ArticleContainer,
  ArticleContent,
  ArticleHeading,
  FrontMatter,
  Time,
  TocAnchor,
  TocAndArticle,
  TocAside,
  TocHeading,
  TocNav,
} from '#pkg/components/article-components/index.js';
import { Main } from '#pkg/components/main/index.js';
import { MDXViewer } from '#pkg/components/mdx-viewer/index.js';
import type { MDXParseResult } from '#pkg/mdx/index.js';

export type ArticleContainerTidbitPropsBase = {
  mdxParseResult: MDXParseResult;
};
export type ArticleContainerTidbitProps = ArticleContainerTidbitPropsBase & {
  faviconsClassName: string;
};

export const ArticleContainerTidbit: React.FC<ArticleContainerTidbitProps> = ({
  mdxParseResult,
  faviconsClassName,
}) => {
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
              <Time dateTime={mdxParseResult.frontmatter.lastUpdatedAtISO}>
                Last updated on{' '}
                {dayjs(mdxParseResult.frontmatter.lastUpdatedAtISO).format('DD MMMM, YYYY')}
              </Time>
            </FrontMatter>

            <ArticleContent>
              <MDXViewer codeOfMdxParseResult={mdxParseResult.code} />
            </ArticleContent>
          </Article>
        </TocAndArticle>
      </ArticleContainer>
    </Main>
  );
};
