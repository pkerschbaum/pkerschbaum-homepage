'use client';

import dayjs from 'dayjs';
import type React from 'react';

import {
  ArticleContainer,
  ArticleContent,
  FrontMatter,
  Time,
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
        <FrontMatter>
          <h1>{mdxParseResult.frontmatter.title}</h1>
          <Time dateTime={mdxParseResult.frontmatter.lastUpdatedAtISO}>
            Last updated on{' '}
            {dayjs(mdxParseResult.frontmatter.lastUpdatedAtISO).format('DD MMMM, YYYY')}
          </Time>
        </FrontMatter>

        <ArticleContent>
          <MDXViewer codeOfMdxParseResult={mdxParseResult.code} />
        </ArticleContent>
      </ArticleContainer>
    </Main>
  );
};
