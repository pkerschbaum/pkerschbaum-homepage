import dayjs from 'dayjs';
import type React from 'react';

import {
  Article,
  ArticleContainer,
  ArticleContent,
  ArticleHeading,
  FrontMatter,
  Time,
  TocAndArticle,
  TocAside,
} from '#pkg/components/article-components/index.js';
import { Main } from '#pkg/components/main/index.js';
import { TableOfContents } from '#pkg/components/table-of-contents/index.js';
import type { MDXParseResult } from '#pkg/mdx/index.js';

export type ArticleContainerTidbitPropsBase = {
  mdxContent: React.ReactNode;
  mdxParseResult: MDXParseResult;
};
export type ArticleContainerTidbitProps = ArticleContainerTidbitPropsBase & {
  faviconsClassName: string;
};

export const ArticleContainerTidbit: React.FC<ArticleContainerTidbitProps> = ({
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
              <Time dateTime={mdxParseResult.frontmatter.lastUpdatedAtISO}>
                Last updated on{' '}
                {dayjs(mdxParseResult.frontmatter.lastUpdatedAtISO).format('DD MMMM, YYYY')}
              </Time>
            </FrontMatter>

            <ArticleContent>{mdxContent}</ArticleContent>
          </Article>
        </TocAndArticle>
      </ArticleContainer>
    </Main>
  );
};
