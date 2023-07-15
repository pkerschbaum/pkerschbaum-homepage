import { styled } from '@linaria/react';
import type React from 'react';
import { GitHub, Linkedin, Twitter } from 'react-feather';

import { config } from '#pkg/config.js';
import { Anchor, type AnchorProps } from '#pkg/elements/index.js';

export const SocialMediaLinks: React.FC = () => (
  <LinksList>
    <LinkElement title="GitHub">
      <SocialMediaAnchor href="https://github.com/pkerschbaum/" aria-label="GitHub">
        <GitHub />
      </SocialMediaAnchor>
    </LinkElement>

    <LinkElement title="LinkedIn">
      <SocialMediaAnchor href={config.socialMediaLinks.linkedIn} aria-label="LinkedIn">
        <Linkedin />
      </SocialMediaAnchor>
    </LinkElement>

    <LinkElement title="Twitter">
      <SocialMediaAnchor href="https://twitter.com/pkerschbaum/" aria-label="Twitter">
        <Twitter />
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
