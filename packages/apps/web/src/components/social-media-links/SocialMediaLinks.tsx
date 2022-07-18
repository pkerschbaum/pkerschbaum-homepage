import type React from 'react';
import { GitHub, Linkedin, Twitter } from 'react-feather';
import styled from 'styled-components';

import { config } from '#/config';
import { Anchor } from '#/elements';

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
  flex-shrink: 0;

  display: flex;
  align-items: baseline;
  gap: calc(3 * var(--spacing-base));
`;

const LinkElement = styled.li``;

const SocialMediaAnchor = styled(Anchor).attrs({
  target: '_blank',
  rel: 'noopener noreferrer',
})``;
