import type React from 'react';
import { Rss } from 'react-feather';

import { Anchor } from '#pkg/elements/index.js';

export const RssFeedAnchor: React.FC = () => {
  return (
    <Anchor href="/rss.xml" target="_blank">
      <Rss />
    </Anchor>
  );
};
