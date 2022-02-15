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
      <IntroductionHeading>Patrick Kerschbaum</IntroductionHeading>
      <IntroductionMessage>
        I&apos;m Patrick, a software developer with a great passion for web technologies and the
        JavaScript ecosystem.
      </IntroductionMessage>
      <IntroductionMessageDetails>
        I&apos;m currently based in Vienna, Austria. I have a history of working in the field of
        national-scaled web and mobile application engineering.
      </IntroductionMessageDetails>
      <ProfilePicture src={'/profile-picture.jpg'} alt=""></ProfilePicture>
    </IntroductionContainer>
  );
};

const IntroductionContainer = styled.section`
  max-width: 600px;
  margin-block: calc(8 * var(--spacing-base));

  display: grid;
  grid-template-columns: 120px 1fr;
  grid-template-areas:
    'profile-picture heading'
    'profile-picture message'
    'profile-picture message-details';
  grid-column-gap: calc(3 * var(--spacing-base));
  grid-row-gap: calc(0.5 * var(--spacing-base));
`;

const IntroductionHeading = styled.h1`
  grid-area: heading;

  ${nameHeadingStyles}
`;

const IntroductionMessage = styled.p`
  grid-area: message;
`;

const IntroductionMessageDetails = styled.p`
  grid-area: message-details;
`;

const ProfilePicture = styled.img`
  grid-area: profile-picture;
  margin-top: 8px;
  border-radius: 50%;
`;
