'use client';
import { styled } from '@linaria/react';
import type React from 'react';
import { Share2, Twitter } from 'react-feather';

import { Anchor } from '#pkg/elements/index.js';
import type { MDXParseResult } from '#pkg/mdx/index.js';
import { usePageUrl } from '#pkg/utils/next.utils';

export type TwitterInteractionSectionProps = { mdxParseResult: MDXParseResult };

export const TwitterInteractionSection: React.FC<TwitterInteractionSectionProps> = ({
  mdxParseResult,
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
  );
};

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
