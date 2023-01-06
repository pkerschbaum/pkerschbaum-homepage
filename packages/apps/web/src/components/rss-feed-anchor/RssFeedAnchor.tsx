import * as React from 'react';
import { Rss } from 'react-feather';

import { Anchor } from '#pkg/elements';

export const RssFeedAnchor: React.FC = () => {
  return (
    <Anchor href="/rss.xml" target="_blank">
      <Rss />
    </Anchor>
  );
};
