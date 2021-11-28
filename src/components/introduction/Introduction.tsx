import type React from 'react';
import styled, { css } from 'styled-components';

export const nameHeadingStyles = css`
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  text-transform: uppercase;
`;

export const Introduction: React.FC = () => {
  return (
    <IntroductionContainer>
      <WelcomeHeading>Patrick Kerschbaum</WelcomeHeading>
      <WelcomeMessage>I&apos;m Patrick</WelcomeMessage>
      <ProfilePicture>TODO</ProfilePicture>
    </IntroductionContainer>
  );
};

const IntroductionContainer = styled.section`
  display: grid;
  grid-template-columns: max-content 1fr;
  grid-template-areas:
    'profile-picture heading'
    'profile-picture message';
  grid-column-gap: calc(2 * var(--spacing-base));
  grid-row-gap: calc(0.5 * var(--spacing-base));
`;

const WelcomeHeading = styled.h1`
  grid-area: heading;

  ${nameHeadingStyles}
`;

const WelcomeMessage = styled.p`
  grid-area: message;
`;

const ProfilePicture = styled.div`
  grid-area: profile-picture;
  margin-top: 4px;
`;
