import type React from 'react';
import styled from 'styled-components';

export const SocialMediaLinks: React.FC = () => {
  return (
    <LinksContainer>
      <SocialMediaLink href="https://github.com/pkerschbaum/">Github</SocialMediaLink>
      <SocialMediaLink href="https://www.linkedin.com/in/patrick-kerschbaum/">
        LinkedIn
      </SocialMediaLink>
      <SocialMediaLink href="https://twitter.com/pkerschbaum/">Twitter</SocialMediaLink>
    </LinksContainer>
  );
};

const LinksContainer = styled.div`
  display: flex;
  align-items: baseline;
  gap: calc(1 * var(--spacing-base));
`;

const SocialMediaLink = styled.a.attrs({
  target: '_blank',
  rel: 'noopener noreferrer',
})``;
