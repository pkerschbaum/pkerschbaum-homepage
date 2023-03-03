import { assertIsUnreachable } from '@pkerschbaum/ts-utils';
import dayjs from 'dayjs';
import _Image from 'next/image.js';
import type React from 'react';
import sanitizeHTML from 'sanitize-html';
import { styled } from 'styled-components';

import { Anchor } from '#pkg/elements/index.js';
import type { Webmention } from '#pkg/webmentions/index.js';

const Image = _Image as unknown as typeof _Image.default;

type WebmentionTileProps = {
  webmention: Webmention;
};

export const WebmentionTile: React.FC<WebmentionTileProps> = ({ webmention }) => {
  return (
    <WebmentionContainer>
      <AuthorAvatar src={webmention.data.author.photo} alt="" width={48} height={48} />
      <Headline>
        <AuthorName>{webmention.data.author.name}</AuthorName>
        <ActivityType href={webmention.data.url} target="_blank">
          {webmentionToActionVerb(webmention)}
        </ActivityType>
        {webmention.data.published_ts && (
          <Timestamp>
            <TimestampSpacer>⋅</TimestampSpacer>
            <span>{dayjs.unix(webmention.data.published_ts).format('DD MMMM, YYYY')}</span>
          </Timestamp>
        )}
      </Headline>
      {webmention.data.content && webmention.activity.type === 'reply' && (
        <Content dangerouslySetInnerHTML={{ __html: sanitizeHTML(webmention.data.content) }} />
      )}
    </WebmentionContainer>
  );
};

function webmentionToActionVerb(webmention: Webmention): string {
  switch (webmention.activity.type) {
    case 'reply': {
      if (webmention.data.url.startsWith('https://twitter')) {
        return 'mentioned this';
      }
      return 'replied';
    }
    case 'repost': {
      if (webmention.data.url.startsWith('https://twitter')) {
        return 'retweeted';
      }
      return 'reposted';
    }
    default:
      assertIsUnreachable(webmention.activity.type);
  }
}

const WebmentionContainer = styled.div`
  display: grid;
  grid-template-areas:
    'avatar headline'
    'avatar content';
  grid-template-rows: max-content max-content;
  grid-template-columns: max-content 1fr;
  grid-row-gap: calc(1 * var(--spacing-base));
  grid-column-gap: calc(2 * var(--spacing-base));
`;

const AuthorAvatar = styled(Image)`
  grid-area: avatar;
  border-radius: 50%;
  object-fit: cover;
`;

const Headline = styled.div`
  display: flex;
  flex-wrap: wrap;
  grid-area: headline;
  gap: calc(0.5 * var(--spacing-base));
  align-items: baseline;
`;

const AuthorName = styled.div``;

const ActivityType = styled(Anchor)`
  font-style: italic;
`;

const Timestamp = styled.div`
  font-size: var(--font-size-sm);
  color: var(--color-fg-less-emphasized);
`;

const TimestampSpacer = styled.span`
  padding-inline: 4px;
`;

const Content = styled.div`
  grid-area: content;
`;
