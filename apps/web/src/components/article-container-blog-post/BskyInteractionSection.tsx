'use client';
import { styled } from '@pigment-css/react';
import type React from 'react';
import { Share2 } from 'react-feather';

import { Bsky } from '#pkg/components/icon-library/index.js';
import { config } from '#pkg/config.js';
import { Anchor } from '#pkg/elements/index.js';
import type { MDXParseResult } from '#pkg/mdx/index.js';
import { usePageUrl } from '#pkg/utils/next.utils.js';

export type BskyInteractionSectionProps = { mdxParseResult: MDXParseResult };

export const BskyInteractionSection: React.FC<BskyInteractionSectionProps> = ({
  mdxParseResult,
}) => {
  const blogPostUrl = usePageUrl();
  const blogPostHref = blogPostUrl.href;

  // compose link, see https://docs.bsky.app/docs/advanced-guides/intent-links
  const bskyShareUrl = new URL(`https://bsky.app/intent/compose`);
  bskyShareUrl.searchParams.set(
    'text',
    `${mdxParseResult.frontmatter.title} (by @${config.socialMedia.handles.bsky})
<br><br>
${mdxParseResult.frontmatter.description}
<br><br>
${blogPostHref}
<br><br>
${mdxParseResult.frontmatter.tags.map((tag) => `#${tag}`).join(' ')}`,
  );
  const bskyShareHref = bskyShareUrl.href;
  const bskyDiscussUrl = new URL(`https://bsky.app/search`);
  bskyDiscussUrl.searchParams.set('q', blogPostHref);
  const bskyDiscussHref = bskyDiscussUrl.href;

  return (
    <InteractionSection>
      <InteractionAnchor href={bskyShareHref} target="_blank">
        <Share2 />
        Share on Bluesky
      </InteractionAnchor>

      <InteractionAnchor href={bskyDiscussHref} target="_blank">
        <Bsky /> Discuss on Bluesky
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
