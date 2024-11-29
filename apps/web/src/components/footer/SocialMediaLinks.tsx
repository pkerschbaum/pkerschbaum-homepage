import { styled } from '@pigment-css/react';
import type React from 'react';
import { GitHub, Linkedin } from 'react-feather';

import { Bsky } from '#pkg/components/icon-library/index.js';
import { config } from '#pkg/config.js';
import { Anchor, type AnchorProps } from '#pkg/elements/index.js';

export const SocialMediaLinks: React.FC = () => (
  <LinksList>
    <LinkElement title="GitHub">
      <SocialMediaAnchor
        href={`https://github.com/${config.socialMedia.handles.gitHub}/`}
        aria-label="GitHub"
      >
        <GitHub />
      </SocialMediaAnchor>
    </LinkElement>

    <LinkElement title="LinkedIn">
      <SocialMediaAnchor
        href={`https://www.linkedin.com/in/${config.socialMedia.handles.linkedIn}`}
        aria-label="LinkedIn"
      >
        <Linkedin />
      </SocialMediaAnchor>
    </LinkElement>

    <LinkElement title="Bluesky">
      <SocialMediaAnchor
        href={`https://bsky.app/profile/${config.socialMedia.handles.bsky}/`}
        aria-label="Bluesky"
      >
        <Bsky />
      </SocialMediaAnchor>
    </LinkElement>
  </LinksList>
);

const LinksList = styled.ul`
  display: flex;
  flex-shrink: 0;
  gap: calc(3 * var(--spacing-base));
  align-items: baseline;
`;

const LinkElement = styled.li``;

const SocialMediaAnchor: React.FC<AnchorProps> = ({ children, ...delegated }) => {
  return (
    <Anchor target="_blank" rel="noopener noreferrer" {...delegated}>
      {children}
    </Anchor>
  );
};
