import type React from 'react';
import { GitHub, Linkedin, Twitter } from 'react-feather';
import styled from 'styled-components';

import { Anchor } from '~/elements';

export const SocialMediaLinks: React.FC = () => (
  <LinksList>
    <LinkElement title="GitHub">
      <SocialMediaAnchor href="https://github.com/pkerschbaum/">
        <GitHub aria-label="GitHub" />
      </SocialMediaAnchor>
    </LinkElement>

    <LinkElement title="LinkedIn">
      <SocialMediaAnchor
        href="https://www.linkedin.com/in/patrick-kerschbaum/"
        aria-label="LinkedIn"
      >
        <Linkedin />
      </SocialMediaAnchor>
    </LinkElement>

    <LinkElement title="Twitter">
      <SocialMediaAnchor href="https://twitter.com/pkerschbaum/">
        <Twitter aria-label="Twitter" />
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
