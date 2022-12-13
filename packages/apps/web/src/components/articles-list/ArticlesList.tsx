import dayjs from 'dayjs';
import type React from 'react';
import styled from 'styled-components';

import type { MDXFile } from '@pkerschbaum-homepage/mdx/schema';

import { ArticleTile } from '#/components/article-tile';
import { QUERIES } from '#/constants';

type ArticlesListProps = {
  pathPrefix: string;
  articles: MDXFile[];
};

export const ArticlesList: React.FC<ArticlesListProps> = ({ pathPrefix, articles }) => {
  return (
    <ArticlesListContainer>
      {articles
        .sort((a, b) => dayjs(b.frontmatter.publishedAtISO).diff(a.frontmatter.publishedAtISO))
        .map((article) => (
          <ArticleTile
            key={article.segment}
            article={article}
            href={`${pathPrefix}/${encodeURIComponent(article.segment)}`}
          />
        ))}
    </ArticlesListContainer>
  );
};

const ArticlesListContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: calc(2 * var(--spacing-base));
  grid-column-gap: calc(2 * var(--spacing-base));
  align-items: stretch;

  @media ${QUERIES.tabletAndUp} {
    grid-template-columns: 1fr 1fr;
  }
`;