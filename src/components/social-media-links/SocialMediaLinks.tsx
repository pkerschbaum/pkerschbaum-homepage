import type React from 'react';
import { GitHub, Linkedin, Twitter } from 'react-feather';
import styled from 'styled-components';

export const SocialMediaLinks: React.FC = () => {
  return (
    <LinksList>
      <LinkElement title="GitHub">
        <SocialMediaLink href="https://github.com/pkerschbaum/">
          <GitHub aria-label="GitHub" />
        </SocialMediaLink>
      </LinkElement>

      <LinkElement title="LinkedIn">
        <SocialMediaLink
          href="https://www.linkedin.com/in/patrick-kerschbaum/"
          aria-label="LinkedIn"
        >
          <Linkedin />
        </SocialMediaLink>
      </LinkElement>

      <LinkElement title="Twitter">
        <SocialMediaLink href="https://twitter.com/pkerschbaum/">
          <Twitter aria-label="Twitter" />
        </SocialMediaLink>
      </LinkElement>
    </LinksList>
  );
};

const LinksList = styled.ul`
  flex-shrink: 0;

  display: flex;
  align-items: baseline;
  gap: calc(3 * var(--spacing-base));
`;

const LinkElement = styled.li``;

const SocialMediaLink = styled.a.attrs({
  target: '_blank',
  rel: 'noopener noreferrer',
})`
  color: inherit;
`;
