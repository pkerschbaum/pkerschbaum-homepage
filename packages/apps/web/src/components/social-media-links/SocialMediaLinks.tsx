import type React from 'react';
import { GitHub, Linkedin, Twitter } from 'react-feather';
import { styled } from 'styled-components';

import { config } from '#pkg/config.js';
import { Anchor } from '#pkg/elements/index.js';

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

const SocialMediaAnchor = styled(Anchor).attrs({
  target: '_blank',
  rel: 'noopener noreferrer',
  href: '',
})``;
