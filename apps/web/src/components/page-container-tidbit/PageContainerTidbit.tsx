import dayjs from 'dayjs';
import { useRemoteRefresh } from 'next-remote-refresh/hook.js';
import * as React from 'react';

import {
  ArticleViewerContainer,
  ArticleViewerContent,
  FrontMatter,
  Time,
} from '#pkg/components/article-viewer/index.js';
import { Main } from '#pkg/components/main/index.js';
import { MDXViewer } from '#pkg/components/mdx-viewer/index.js';
import { MetadataTags } from '#pkg/components/metadata-tags/index.js';
import type { MDXParseResult } from '#pkg/mdx/index.js';

export type PageContainerTidbitPropsBase = {
  mdxParseResult: MDXParseResult;
};
export type PageContainerTidbitProps = PageContainerTidbitPropsBase & {
  faviconsClassName: string;
};

export const PageContainerTidbit: React.FC<PageContainerTidbitProps> = ({
  mdxParseResult,
  faviconsClassName,
}) => {
  useRemoteRefresh();

  return (
    <>
      <MetadataTags
        title={mdxParseResult.frontmatter.title}
        description={mdxParseResult.frontmatter.description}
      />

      <Main className={faviconsClassName}>
        <ArticleViewerContainer>
          <FrontMatter>
            <h1>{mdxParseResult.frontmatter.title}</h1>
            <Time dateTime={mdxParseResult.frontmatter.lastUpdatedAtISO}>
              Last updated on{' '}
              {dayjs(mdxParseResult.frontmatter.lastUpdatedAtISO).format('DD MMMM, YYYY')}
            </Time>
          </FrontMatter>

          <ArticleViewerContent>
            <MDXViewer codeOfMdxParseResult={mdxParseResult.code} />
          </ArticleViewerContent>
        </ArticleViewerContainer>
      </Main>
    </>
  );
};